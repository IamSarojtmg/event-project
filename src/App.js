import Login from "./components/auth/login/index";
import Register from "./components/auth/register";

import Header from "./components/header/index";
import Home from "./components/home/index";

import { AuthProvider } from "./contexts";
import { useRoutes } from "react-router-dom";
import "./App.css";
import AddButton from "./components/addButton";
import AsAGuest from "./components/asaguest";


function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path:"/addevent",
      element: <AddButton/>
    },
    {
      path:"/guest",
      element:<AsAGuest/>
      
    }
  ];

  let routeElements = useRoutes(routesArray);

  return (
    <AuthProvider>
      {/* <Header /> */}
      <div>{routeElements}</div>
    </AuthProvider>
  );
}

export default App;
