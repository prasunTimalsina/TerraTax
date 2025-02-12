import { useSelector } from "react-redux";

function UserName() {
  const userName = useSelector((state) => state.auth.userData["name"]);
  console.log(userName);

  return (
    <>
      {userName && (
        <div className="text-black text-3xl border-2  p-2">{userName}</div>
      )}
    </>
  );
}

export default UserName;
