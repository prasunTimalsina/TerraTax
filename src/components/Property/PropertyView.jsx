import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import appwriteService from "../../appwrite/config";
import PaymentStatusBtn from "./PaymentStatusBtn";
import EsewaPayBtn from "../esewa/EsewaPayBtn";

function PropertyView() {
  const [property, setProperty] = useState(null);
  let paidStatus = "";
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getProperty(slug).then((property) => {
        if (property) {
          setProperty(property);
          console.log(property);
        } else {
          navigate("dashboard/property");
        }
      });
    }
  }, [slug, navigate]);

  /// payment status
  function getPaymentStatus(prevPaidDate) {
    const paidDate = new Date(prevPaidDate);
    const now = new Date();

    // Due date: 1 year after paid date
    const dueDate = new Date(paidDate);
    dueDate.setFullYear(dueDate.getFullYear() + 1);

    // Upcoming threshold: 1 month before due date
    const upcomingThreshold = new Date(dueDate);
    upcomingThreshold.setMonth(upcomingThreshold.getMonth() - 1);

    // Paid period: first 6 months after payment
    const paidThreshold = new Date(paidDate);
    paidThreshold.setMonth(paidThreshold.getMonth() + 6);

    if (now >= dueDate) {
      return "overdue";
    }
    if (now >= upcomingThreshold) {
      return "upcoming";
    }
    if (now <= paidThreshold) {
      return "paid";
    }

    // If not within first 6 months and not in upcoming period,
    // you may decide on a default (for example, still "paid")
    return "paid";
  }

  paidStatus = property ? getPaymentStatus(property.paidDate) : null;

  return (
    <>
      {property ? (
        <div className="flex p-5 justify-center gap-3">
          <div className="w-full flex justify-center items-center">
            <div className="bg-white overflow-hidden shadow rounded-lg border w-[50%]">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Property Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the property.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Kitta No.
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {property.propertyId}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Asset Value
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <strong>NPR</strong>. {property.assetValue}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Land Type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {property.landType}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Province
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {property.province}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      District
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {property.district}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Municipality
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {property.municipality}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Ward No.
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {property.ward}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Tax Amount Per Anum.
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <strong>NPR</strong> {property.taxAmount}
                    </dd>
                  </div>
                  {<PaymentStatusBtn paidStatus={paidStatus} />}
                </dl>
              </div>
            </div>
          </div>
          {(paidStatus === "overdue" || paidStatus === "upcoming") && (
            <EsewaPayBtn property={property} />
          )}
        </div>
      ) : null}
    </>
  );
}

export default PropertyView;
