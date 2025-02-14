import { Link } from "react-router";
import PaymentStatusBtn from "./PaymentStatusBtn";

function PropertyPreview({ property }) {
  let paidStatus = "";
  //TODO: this break the DRY rule fix this
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
    <div className="max-w-[17rem] p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 self-start">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Kitta NO: {property.propertyId}
        </h5>
      </a>

      <Link
        to={`propertyView/${property.$id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        See Details
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>

      {<PaymentStatusBtn paidStatus={paidStatus} />}
    </div>
  );
}

export default PropertyPreview;
