import { Route, Routes } from "react-router-dom";
import { 
    Login,
    Welcome 
} from "../pages";



export const Router = () =>{
    return(
       <Routes>
        <Route index element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />

        
       </Routes>
    );
};