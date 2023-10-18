import { Route, Routes } from "react-router-dom";
import { Login 
} from "../pages";



export const Router = () =>{
    return(
       <Routes>

        
        <Route path="/login" element={<Login/>} />
       </Routes>
    );
};