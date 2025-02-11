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
        path: "logIn",
        element: <LogIn />,
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
