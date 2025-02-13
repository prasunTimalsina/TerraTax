import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <button
      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4
       focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 
      py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
