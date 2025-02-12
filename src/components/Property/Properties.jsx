import { Link } from "react-router";

function Properties() {
  return (
    <div className="w-full bg-white flex flex-wrap p-6">
      <Link to="addPropertyForm">Add Property</Link>
    </div>
  );
}

export default Properties;
