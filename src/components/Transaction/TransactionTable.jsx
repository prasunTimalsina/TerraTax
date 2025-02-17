import { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";

function TransactionTable() {
  const userId = JSON.parse(window.localStorage.getItem("userData")).$id;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    appwriteService.getTransactions(userId).then((data) => {
      if (data) {
        console.log(data.documents);
        setTransactions(data.documents);
      }
    });
  }, [transactions, userId]);

  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-2  p-10 h-[90vh]">
      <p className="text-base font-bold text-white">Latest Payments</p>

      <div className="mt-6 overflow-hidden rounded-xl border shadow bg-amber-50">
        <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-1.5">
          <thead className="border-b">
            <tr>
              <td
                width="20%"
                className="whitespace-normal py-4 text-sm  text-gray-500 px-6 font-bold"
              >
                Kitta No.
              </td>
              <td className="whitespace-normal py-4 text-sm  text-gray-500 px-4 font-bold">
                Payment Date
              </td>
              <td className="whitespace-normal py-4 text-sm  text-gray-500 px-6 text-center font-bold">
                Amount
              </td>
              <td className="whitespace-normal py-4 text-sm  text-gray-500 px-6 text-center font-bold">
                Transaction Id
              </td>
              <td className="whitespace-normal py-4 text-sm  text-gray-500 px-6 font-bold">
                Status
              </td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transactionId}>
                <td
                  width="20%"
                  className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 px-6"
                >
                  {transaction.propertyId}
                </td>
                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 px-4">
                  {
                    new Date(transaction.paymentDate)
                      .toISOString()
                      .split("T")[0]
                  }
                </td>
                <td className="whitespace-no-wrap py-4  text-sm text-gray-600 px-6 text-center">
                  <strong>NPR </strong>
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="whitespace-no-wrap py-4  text-sm text-gray-600 px-6 text-center">
                  {transaction.transactionId}
                </td>
                <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 px-6">
                  <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                    {transaction.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
