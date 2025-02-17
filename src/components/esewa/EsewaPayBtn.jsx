import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useState } from "react";

function EsewaPayBtn({ property }) {
  /*  const [taxAmount, setTaxAmount] = useState();
  setTaxAmount(50);
 */

  const taxAmount = property.taxAmount;

  //esewa
  let uuid = uuidv4();
  let message = `total_amount=${taxAmount},transaction_uuid=${uuid},product_code=EPAYTEST`;
  let key = "8gBm/:&EnhH.1/q";
  var hash = CryptoJS.HmacSHA256(message, key);
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  //persiting property
  window.localStorage.setItem("property", JSON.stringify(property));

  return (
    <>
      {taxAmount && (
        <form
          target="_blank"
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          <input
            type="hidden"
            id="amount"
            name="amount"
            value={taxAmount}
            required
          ></input>
          <input
            type="hidden"
            id="tax_amount"
            name="tax_amount"
            value="0"
            required
          ></input>
          <input
            type="hidden"
            id="total_amount"
            name="total_amount"
            value={taxAmount}
            required
          ></input>
          <input
            type="hidden"
            id="transaction_uuid"
            name="transaction_uuid"
            value={uuid}
            required
          ></input>
          <input
            type="hidden"
            id="product_code"
            name="product_code"
            value="EPAYTEST"
            required
          ></input>
          <input
            type="hidden"
            id="product_service_charge"
            name="product_service_charge"
            value="0"
            required
          ></input>
          <input
            type="hidden"
            id="product_delivery_charge"
            name="product_delivery_charge"
            value="0"
            required
          ></input>
          <input
            type="hidden"
            id="success_url"
            name="success_url"
            value="http://localhost:5173/success"
            required
          ></input>
          <input
            type="hidden"
            id="failure_url"
            name="failure_url"
            value="http://localhost:5173/failure"
            required
          ></input>
          <input
            type="hidden"
            id="signed_field_names"
            name="signed_field_names"
            value="total_amount,transaction_uuid,product_code"
            required
          ></input>
          <input
            type="hidden"
            id="signature"
            name="signature"
            value={hashInBase64}
            required
          ></input>
          <input
            value="Pay Through Esewa"
            className="cursor-pointer py-4 px-6 rounded-lg  bg-[#60bb46] text-white  hover:bg-[#48873d] hover:text-white duration-300 hover:duration-300  text-3xl font-extrabold opacity-85 hover:opacity-80 "
            type="submit"
          ></input>
        </form>
      )}
    </>
  );
}

export default EsewaPayBtn;
