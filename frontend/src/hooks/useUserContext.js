import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUserContext = () => useContext(UserContext);
