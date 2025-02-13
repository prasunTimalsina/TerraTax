import { Link } from "react-router";
import PropertyPreview from "./PropertyPreview";
import { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";

function Properties() {
  const userId = useSelector((state) => state.auth.userData.$id);
  console.log(userId);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    appwriteService.getProperties(userId).then((properties) => {
      if (properties) {
        setProperties(properties.documents);
      }
    });
  }, [userId]);
  console.log(properties);

  return (
    <div className="w-full bg-white flex gap-7 flex-wrap p-6 h-[80vh] ">
      {properties.length === 0 ? (
        <div>Add Properties to See..</div>
      ) : (
        properties.map((property) => (
          <PropertyPreview key={property.$id} property={property} />
        ))
      )}
      <Link
        className=" bg-black text-white px-2 py-1 rounded self-start mt-32  "
        to="addPropertyForm"
      >
        Add Property
      </Link>
    </div>
  );
}

export default Properties;
