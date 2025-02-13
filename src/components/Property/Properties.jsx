import { Link } from "react-router";
import PropertyPreview from "./PropertyPreview";

function Properties() {
  return (
    <div className="w-full bg-white flex gap-7 flex-wrap p-6 h-[80vh]">
      <PropertyPreview />
      <Link className="self-start" to="addPropertyForm">
        Add Property
      </Link>
    </div>
  );
}

export default Properties;
