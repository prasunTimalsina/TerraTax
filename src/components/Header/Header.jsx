import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LogoutBtn from "./LogOutBtn";
import UserName from "./UserName";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <div className="bg-slate-700 flex gap-2 justify-center items-center text-white text-4xl w-full h-20">
      {authStatus && <LogoutBtn />}
      {authStatus && <UserName />}
    </div>
  );
}

export default Header;
