function TransactionTable() {
  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-2  p-10 h-[90vh]">
      <p className="text-base font-bold text-white">Latest Payments</p>

      <div className="mt-6 overflow-hidden rounded-xl border shadow bg-amber-50">
        <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-1.5">
          <thead className="border-b">
            <tr>
              <td
                width="50%"
                className="whitespace-normal py-4 text-sm font-medium text-gray-500 px-6"
              >
                Kitta No.
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 px-4">
                Payment Date
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 px-6">
                Amount
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 px-6">
                Transaction Id
              </td>
              <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 px-6">
                Status
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                width="50%"
                className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 px-6"
              >
                Basic Plan - Oct 2021
              </td>
              <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 px-4">
                15 October, 2021
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 px-6 ">
                $29.00
              </td>
              <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 px-6 ">
                k43j5k4l5k34l5j34l5
              </td>
              <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-500 px-6">
                <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">
                  Complete
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
