import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LogoutBtn from "./LogOutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);

  return (
    <div className="bg-slate-700 flex justify-center items-center text-white text-4xl w-full h-20">
      {authStatus && <LogoutBtn />}
    </div>
  );
}

export default Header;
