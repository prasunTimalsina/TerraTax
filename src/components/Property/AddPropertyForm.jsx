import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";

import authService from "../../appwrite/auth";
import appwriteService from "../../appwrite/config";

import { Input, Button } from "../index.js";

function AddPropertyForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { handleSubmit, register } = useForm();

  const computeTaxAmount = function (assessedValue, propertyType) {
    // Define default rates (as a percentage expressed in decimal form)
    let taxRate = 0.002; // default for residential (e.g., 0.2%)

    switch (propertyType.toLowerCase()) {
      case "agricultural":
        // Agricultural land often has a lower tax rate.
        taxRate = 0.001; // 0.1%
        break;
      case "commercial":
        // Commercial property usually carries a higher rate.
        taxRate = 0.003; // 0.3%
        break;
      case "residential":
      default:
        taxRate = 0.002; // 0.2%
        break;
    }

    const taxAmount = assessedValue * taxRate;
    return taxAmount;
  };
  const addProperty = async (data) => {
    setError("");
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        console.log(userData);
        const similar = await appwriteService.checkSimilarProperty(
          data.propertyId
        );

        if (!similar) {
          console.log("adding....");
          appwriteService.addProperty({
            ...data,
            userId: userData.$id,
            taxAmount: computeTaxAmount(data.assetValue + 0.0, data.landType),
            assetValue: parseFloat(data.assetValue),
          });
          navigate("/dashboard/property");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          Property Data Collection
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Please fill in the property details below.
        </p>
        {error && (
          <div>
            <p className="text-red-600">{error.message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(addProperty)} className="mt-8 space-y-5">
          <Input
            label="Property ID:"
            placeholder="Enter your kitta no."
            {...register("propertyId", { required: "Property ID is required" })}
          />

          <Input
            label="Province:"
            placeholder="Enter the province"
            {...register("province", { required: "Province is required" })}
          />

          <Input
            label="District:"
            placeholder="Enter the district"
            {...register("district", { required: "District is required" })}
          />

          <Input
            label="Municipality:"
            placeholder="Enter the municipality"
            {...register("municipality", {
              required: "Municipality is required",
            })}
          />

          <Input
            label="Ward:"
            placeholder="Enter the ward number"
            type="number"
            {...register("ward", { required: "Ward number is required" })}
          />

          <Input
            label="Asset Value:"
            placeholder="Enter the asset value in NPR"
            type="number"
            {...register("assetValue", { required: "Asset value is required" })}
          />

          {/* Land Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Land Type:
            </label>
            <select
              {...register("landType", { required: "Land Type is required" })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Land Type</option>
              <option value="residential">Residential</option>
              <option value="agricultural">Agricultural</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Submit Property Data
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;
