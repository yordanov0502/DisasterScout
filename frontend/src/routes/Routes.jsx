import { Route, Routes } from "react-router-dom";
import { 
    LoginPage,
    WelcomePage 
} from "../pages";



export const Router = () =>{
    return(
       <Routes>
        <Route index element={<WelcomePage/>} />
        <Route path="/login" element={<LoginPage/>} />

        
       </Routes>
    );
};