import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./store/store.js";
import Protected from "./components/AuthLayout.jsx";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import "./index.css";
import App from "./App.jsx";
import SignUp from "./components/SignUp.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import LogIn from "./components/LogIn.jsx";
import UserDetails from "./components/dashboard/UserDetails.jsx";
import Properties from "./components/Property/Properties.jsx";
import AddPropertyForm from "./components/Property/AddPropertyForm.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PropertyView from "./components/Property/PropertyView.jsx";
import Sucess from "./components/esewa/Sucess.jsx";
import Failure from "./components/esewa/Failure.jsx";
import TransactionTable from "./components/Transaction/TransactionTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/dashboard",
        element: (
          <Protected authentication>
            {" "}
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: "dashboard/userDetail",
        element: (
          <Protected authentication>
            {" "}
            <UserDetails />
          </Protected>
        ),
      },
      {
        path: "dashboard/property",
        element: (
          <Protected authentication>
            {" "}
            <Properties />
          </Protected>
        ),
      },
      {
        path: "dashboard/property/addPropertyForm",
        element: (
          <Protected authentication>
            {" "}
            <AddPropertyForm />
          </Protected>
        ),
      },
      {
        path: "dashboard/property/propertyView/:slug",
        element: (
          <Protected authentication>
            {" "}
            <PropertyView />
          </Protected>
        ),
      },
      {
        path: "success",
        element: (
          <Protected authentication>
            {" "}
            <Sucess />
          </Protected>
        ),
      },
      {
        path: "failure",
        element: (
          <Protected authentication>
            {" "}
            <Failure />
          </Protected>
        ),
      },
      {
        path: "dashboard/transactions",
        element: (
          <Protected authentication>
            {" "}
            <TransactionTable />
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
