import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../../hooks/useUserContext";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import { logoutRequest, testRequest } from "../../../services/userService";
//! Must add import from scss when creating the page

export const CmsHomePage = () => {

    const { isRequestSent, setIsRequestSent } = useIsRequestSent();
    const { clearUserContext } = useUserContext();
    const navigate = useNavigate();

    //////////////////////////////////////////////////////////////////////////////////
    const {data,status,refetch} = useQuery({queryKey:["testRequest"],queryFn: testRequest});
   

     // New function to handle data fetch on button click
     const onFetchData = (event) => {
      event.preventDefault();
      refetch(); // This will trigger the useQuery to refetch the data
      console.log(data);
      console.log(status);
  };
    //////////////////////////////////////////////////////////////////////////////////
  
    const logoutMutation = useMutation({
        mutationFn: logoutRequest,
        onMutate: () => {
          setIsRequestSent(true); // isRequestSent is set to true right before the mutation starts, to prevent any further button clicks, before the request is resolved
        },
        onSuccess: (response) => {
          console.log("Logout Successful", response.data); //TODO: remove this log when no more is needed
          clearUserContext();
          localStorage.removeItem("isAuthenticated");
          navigate("/login");
        },
        onError: (error) => {
          console.log("Logout Failed", error); //TODO: remove this log when no more is needed
        },
        onSettled: () => {
          setIsRequestSent(false); // isRequestSent is set to false after mutation has completed(request has been resolved a.k.a response was received) regardless of success or error, to make button available again
        }
      });

      const onPressLogout = (event) => {
        event.preventDefault();
        if(!isRequestSent){logoutMutation.mutate();} //? Here the above useMutation hook is called
        }
      

  return (
    <div>
      <button onClick={onPressLogout}>Изход</button>
      <button onClick={onFetchData}>Fetch Data</button>
    </div>
  );
};
