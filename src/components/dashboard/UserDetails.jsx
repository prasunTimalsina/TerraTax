import { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
function UserDetails() {
  const userId = JSON.parse(window.localStorage.getItem("userData")).$id;
  const [user, setUser] = useState(null);
  useEffect(() => {
    appwriteService.getUserData(userId).then((data) => {
      if (data) {
        console.log(data);
        setUser(data);
      }
    });
  }, [userId]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="w-full flex justify-center items-center bg-white p-5 h-[90vh] border-none">
      <div className="bg-white overflow-hidden shadow-2xl rounded-lg border w-[50%]  ">
        <div className="px-4 py-5 sm:px-6 ">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.phoneNumber}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">PAN Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.PANNumber}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
