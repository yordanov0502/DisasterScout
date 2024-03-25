import { useMutation, useQuery } from "@tanstack/react-query";
// import { useQueryHasError } from "../../../hooks/useQueryHasError";
// import { useMutationHasError } from "../../../hooks/useMutationHasError";
import { addNewDispatcherRequest, testRequest } from "../../../services/userService";
import { useIsRequestSent } from "../../../hooks/useIsRequestSent";
import "./cms_dashboard_page.scss";

export const CmsDashboardPage = () => {

  const { isRequestSent, setIsRequestSent } = useIsRequestSent();

    const testQuery = useQuery({
     queryKey:["testRequestt"],
     queryFn: testRequest,
     //meta: {}, 
     enabled: false, //!Disables the query from automatically running. 
  });

      
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
           setIsRequestSent(false);
         }
      });

      const addNewDispatcher = (event) =>{
        event.preventDefault();
        if(!isRequestSent){addDispatcherMutation.mutate();}
      }
      
      
        

      /* {testQuery.isError && display a message with a snack bar}  MUST BE PUT INSIDE THE <div> in the return*/
  return (
    <div className="cms_dashboard_page">
      <button onClick={onFetchData}>Fetch Data</button>
      <button onClick={addNewDispatcher}>Добави диспечер</button>
    </div>
  );
};
