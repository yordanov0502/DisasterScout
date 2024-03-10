import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../../hooks/useUserContext";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
// import { useQueryHasError } from "../../../hooks/useQueryHasError";
// import { useMutationHasError } from "../../../hooks/useMutationHasError";
import { addNewDispatcherRequest, logoutRequest, testRequest } from "../../../services/userService";
//! Must add import from scss when creating the page

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`; 

export const CmsHomePage = () => {

    const { isRequestSent, setIsRequestSent } = useIsRequestSent();
    const { clearUserContext } = useUserContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const testQuery = useQuery({
     queryKey:['testRequestt'],
     queryFn: testRequest,
     //meta: {}, 
     enabled: false, //!Disables the query from automatically running. 
  });

    //useMutationHasError([{error: addDispatcherMutation.error}]);

    
    const logoutMutation = useMutation({
        mutationFn: logoutRequest,
        onMutate: () => {
          setIsRequestSent(true); // isRequestSent is set to true right before the mutation starts, to prevent any further button clicks, before the request is resolved
        },
        onSuccess: (response) => {
          console.log("Logout Successful", response.data); //TODO: remove this log when no more is needed
        },
        onError: (error) => {
          console.log("Logout Failed", error); //TODO: remove this log when no more is needed
        },
        onSettled: () => {
          //? This approach ensures that even if the server fails to process the logout for some reason 
          //? (e.g., the server is down, or there's a network issue), the client application still behaves as 
          //? if the user has been logged out, which is a safe default for security reasons.
          queryClient.clear(); //! Completely clears the query cache of all queries and mutations. This method is the most drastic as it removes everything from the cache.
          clearUserContext();
          localStorage.removeItem(LOCAL_STORAGE_KEY1);
          navigate("/login");
          setIsRequestSent(false); // isRequestSent is set to false after mutation has completed(request has been resolved a.k.a response was received) regardless of success or error, to make button available again
        }
      });

      const onPressLogout = (event) => {
        event.preventDefault();
        if(!isRequestSent){logoutMutation.mutate();}
        }

      const onFetchData = (event) => {
        event.preventDefault();
        testQuery.refetch();
      };


      const addDispatcherMutation = useMutation({
        mutationFn: addNewDispatcherRequest,
        onMutate: () => {
          setIsRequestSent(true);
        },
        onSuccess: (response) => {
          console.log("New user added successfully", response.data); //TODO: remove this log when no more is needed
        },
        onError: (error) => {
          console.log("POST operation Failed", error); //TODO: remove this log when no more is needed
        },
         onSettled: () => {
           setIsRequestSent(false); // isRequestSent is set to false after mutation has completed(request has been resolved a.k.a response was received) regardless of success or error, to make button available again
         }
      });

      const addNewDispatcher = (event) =>{
        event.preventDefault();
        if(!isRequestSent){addDispatcherMutation.mutate();}
      }
      
      
        

      /* {testQuery.isError && display a message with a snack bar}  MUST BE PUT INSIDE THE <div> in the return*/
  return (
    <div>
      <button onClick={onPressLogout}>Изход</button>
      <button onClick={onFetchData}>Fetch Data</button>
      <button onClick={addNewDispatcher}>Добави диспечер</button>
    </div>
  );
};
