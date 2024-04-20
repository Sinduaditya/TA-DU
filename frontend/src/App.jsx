import "./App.css";
import Home from "./Pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayouts";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Blogs from "./Pages/Blog/BlogPage.jsx"
import AboutPage from "./Pages/About/AboutPage.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/blogs",
          element: <Blogs/>
        },
        {
          path:"/about",
          element: <AboutPage/>
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

  ]);

  return <RouterProvider router={router} />;
}
