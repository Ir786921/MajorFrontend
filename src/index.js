import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './component/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import {Outlet, RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import { Auth0Provider } from '@auth0/auth0-react';
import TestLib from './component/TestLib';
import { useContext ,useState} from 'react';
import alltestContext from './utils/Context';
import CreateTest from './component/CreateTest';
import Instruction from './component/Instruction';
import Verification from './component/Verification';
import TestEnv from './component/TestEnv';
import { Provider } from 'react-redux';
import Store from './Redux/reduxStore';



const Index = () => {
  const {ALLTEST,Coding,Role,technical,Foundation,aptitude,breadcrum,title,duration,instruction,newTest} = useContext(alltestContext);

  const[show,setShow]= useState(ALLTEST);
  const[crum,setCrum] = useState(breadcrum);
  const[newTitle,setNewTitle] = useState(title);
  const[newDuration,setNewDuration] = useState(duration);
  const[newInst,setNewInst] = useState(instruction);

  
  
  return (
  
   
      <Auth0Provider
     
          domain="dev-dwmiurazt22uk2yg.us.auth0.com"
          clientId="iqaX4WWMg1UtxFtnKmwEGGne1yVz9zne"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
        
         <alltestContext.Provider value={{aptitude,Foundation,technical,show,setShow,Role,Coding,crum,setCrum,setNewTitle,setNewDuration,setNewInst,ALLTEST,newTitle,newInst,newDuration,newTest}}>
         <Provider store={Store}>
            <div className='container-fluid'>
        <Header/>
        <Outlet/>
    </div>
    </Provider>
    </alltestContext.Provider>
    
        </Auth0Provider>
  )
}

const routeConfig = createBrowserRouter([
  {
    path :"/",
    element:<Index/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/About",
        element:<About/>

      },
      {
        path:"/Contact",
        element:<Contact/>
      },{
        path:"/test",
        element:<TestLib/>
      },
      {
        path:"/customtest",
        element:<CreateTest/>
      },
      {
        path:"/details/:id",
        element:<Instruction/>
      },
      {
        path:"/verification/:id",
        element:<Verification/>
      },
      {
        path:"/testenv/:id",
        element:<TestEnv/>
      },
      {
        path:"/getdata/:id",
        element:<TestEnv/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routeConfig}/>);

