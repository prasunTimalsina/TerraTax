import { useNavigate, useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";

import appwriteService from "../../appwrite/config";

function Sucess() {
  const navigate = useNavigate();

  const handleBack = () => navigate("/dashboard");

  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const obj = JSON.parse(atob(data));
  console.log(obj);
  let key = "8gBm/:&EnhH.1/q";
  let message = `transaction_code=${obj.transaction_code},status=${obj.status},total_amount=${obj.total_amount},transaction_uuid=${obj.transaction_uuid},product_code=${obj.product_code},signed_field_names=${obj.signed_field_names}`;
  var hash = CryptoJS.HmacSHA256(message, key);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  console.log(obj.signature, "hash from esewa");
  console.log(hashInBase64, "hash form encoding");
  const isvalid = obj.signature == hashInBase64;
  console.log(isvalid);
  const userId = JSON.parse(window.localStorage.getItem("userData")).$id;

  const property = JSON.parse(window.localStorage.getItem("property"));

  // add transaction to database
  const transactionData = {
    transactionId: obj.transaction_uuid,
    amount: parseFloat(obj.total_amount),
    paymentDate: new Date(Date.now()).toISOString(),
    userId: userId,
    status: obj.status,
    propertyId: property.propertyId,
  };
  appwriteService.addTransactionData(transactionData);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <button
              onClick={handleBack}
              href="#"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sucess;
