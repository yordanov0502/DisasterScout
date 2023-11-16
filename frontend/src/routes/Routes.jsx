import { Route, Routes } from "react-router-dom";
import { 
    LoginPage,
    ResetPasswordPage,
    WelcomePage
} from "../pages";



export const Router = () =>{
    return(
       <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />

        <Route index element={<WelcomePage/>} />
        {/* <Route path="*" element={<NoPage />} /> */}
       </Routes>
    );
};