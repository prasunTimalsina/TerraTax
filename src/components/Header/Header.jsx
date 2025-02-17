import { useSelector } from "react-redux";
import { Button, LogoutBtn, UserName } from "../index";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "About",
      slug: "/about",
    },
    {
      name: "Contact",
      slug: "/contact",
    },
  ];

  /* return (
    <div className="bg-slate-700 flex gap-2 justify-center items-center text-white text-4xl w-full h-20">
      {authStatus && <LogoutBtn />}
      {authStatus && <UserName />}
    </div>
  ); */

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-900 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              TerraTax
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {authStatus && <LogoutBtn />}
            {authStatus && <UserName />}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navItems.map((item) => {
                const isActive = location.pathname === item.slug;

                const activeClasses =
                  "block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white";

                const defaultClasses =
                  "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700";

                return (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className={isActive ? activeClasses : defaultClasses}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
