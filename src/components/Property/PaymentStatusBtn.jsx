function PaymentStatusBtn({ paidStatus }) {
  let bgColor = "";
  let message = "";

  function PaymentStatus(status) {
    switch (status) {
      case "overdue":
        bgColor = "bg-red-600";
        message = "Overdue Payment";
        break;
      case "upcoming":
        bgColor = "bg-yellow-600";
        message = "Upcoming Payment";
        break;
      case "paid":
        bgColor = "bg-green-600";
        message = "Paid";
        break;
      default:
        bgColor = "bg-gray-600";
        message = "Unknown";
    }
  }

  PaymentStatus(paidStatus);

  return (
    <div
      className={`${bgColor} w-auto rounded mt-1.5 text-white text-center py-1 px-2`}
    >
      {message}
    </div>
  );
}

export default PaymentStatusBtn;
