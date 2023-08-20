import Login from "./pages/login/Login.jsx"
import Home from "./pages/home/home.jsx"
import Profile from "./pages/profile/Profile.jsx"
import "./style.scss"
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
  Navigate
} from "react-router-dom";
import Leftbar from "./components/leftBar/LeftBar.jsx";
import RightBar from "./components/rightBar/RightBar.jsx";
import Navbar from "./components/navBar/NavBar.jsx";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import { AuthContext } from "./context/authContext.js";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

function App() {

  const queryClient = new QueryClient()


const {currentUser}=useContext(AuthContext);

const {darkMode} =useContext(DarkModeContext)

  const Layout= ()=>{
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{display:"flex" }}>
          <Leftbar/>
         <div style={{flex:6, marginTop:-10}}>
            <Outlet/>
         </div>
            <RightBar/>
        </div>
      </div>
    </QueryClientProvider>

    )
  }

const ProtectedRoute = ({children })=>{
  if (!currentUser ) {
    return <Navigate to="/login"/>
  }
  return children;
};

  const router = createBrowserRouter([
    {
      path: "/",
      element:(<ProtectedRoute>
         <Layout/>
         </ProtectedRoute>),
      children:[
        {
          path: "/",
          element: <Home/>
          
        },
        {
          path: "/profile/:id",
          element: <Profile/>
          
        },
      ]
    },

    {
      path: "/home",
      element: <Home/>,
    },
    {
  
      path: "/login",
      element: <Login/>,
    },
  ]);


  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
