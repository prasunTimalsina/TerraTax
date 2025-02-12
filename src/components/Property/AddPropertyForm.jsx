import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";

import authService from "../../appwrite/auth";
import appwriteService from "../../appwrite/config";

function AddPropertyForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { handleSubmit, register } = useForm();

  const computeTaxAmount = function (assetValue, taxRate = 5) {
    if (assetValue <= 0 || taxRate < 0) {
      throw new Error(
        "Assessed value must be positive and tax rate cannot be negative."
      );
    }
    const value = assetValue * (taxRate / 100);
    console.log(value);
    return value;
  };

  const addProperty = async (data) => {
    setError("");
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        console.log(userData);
        appwriteService.addProperty({
          ...data,
          userId: userData.$id,
          taxAmount: computeTaxAmount(data.assetValue + 0.0),
          assetValue: parseFloat(data.assetValue),
        });
        navigate("/dashboard/property");
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
            placeholder="Enter the asset value"
            type="number"
            {...register("assetValue", { required: "Asset value is required" })}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Submit Property Data
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddPropertyForm;
