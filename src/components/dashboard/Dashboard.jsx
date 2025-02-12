import { Link } from "react-router";

function Dashboard() {
  return (
    <div className="w-full h-screen bg-blue-300 text-black flex justify-center items-center text-4xl">
      <Link to="userDetail">Your Information</Link>
      <Link to="property">Property</Link>
    </div>
  );
}

export default Dashboard;
