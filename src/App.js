import "./App.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Home } from "./pages/home/Home";
import { Gigs } from "./pages/gigs/Gigs";
import { Gig } from "./pages/gig/Gig";
import { Login } from "./pages/login/Login";

import { Add } from "./pages/add/Add";
import { Order} from "./pages/order/Order";
import { Messages } from "./pages/messages/Messages";
import { Message } from "./pages/message/Message";
import { MyGigs } from "./pages/myGigs/MyGigs";
import { Register } from "./pages/regisret/Register";
function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Order/>,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
