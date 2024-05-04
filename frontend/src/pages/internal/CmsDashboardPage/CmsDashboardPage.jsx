import { useQuery } from "@tanstack/react-query";
// import { useQueryHasError } from "../../../hooks/useQueryHasError";
// import { useMutationHasError } from "../../../hooks/useMutationHasError";
import { testRequest } from "../../../services/userService";
import "./cms_dashboard_page.scss";

export const CmsDashboardPage = () => {

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


      
      
      
        

      /* {testQuery.isError && display a message with a snack bar}  MUST BE PUT INSIDE THE <div> in the return*/
  return (
    <div className="cms_dashboard_page">
      <button onClick={onFetchData}>Fetch Data</button>
    </div>
  );
};
