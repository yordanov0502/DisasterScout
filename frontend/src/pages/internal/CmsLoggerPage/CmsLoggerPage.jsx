import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoggerComponent } from "../../../components/internal/LoggerComponent/LoggerComponent";
import { getLogsFromPage } from "../../../services/userService";

import "./cms_logger_page.scss";

export const CmsLoggerPage = () => {

  const [rows, setRows] = useState([]);
  
  const getLogsFromPage1 = useQuery({
    queryKey: ["getLogsFromPage1"],
    queryFn: () => getLogsFromPage(1),
    enabled: false, //!The query is disabled from running automatically
  });

  useEffect(() => {
    console.log("useEffect started")

    if(getLogsFromPage1.isSuccess !== true)
    {
      console.log("if 1");
      getLogsFromPage1.refetch(); // Manually trigger the fetch on component mount
    }
    else if(getLogsFromPage1.isSuccess)
    {
      console.log("if2")
      console.log(getLogsFromPage1);

      const newRows = getLogsFromPage1.data.data.content.map((item, index) => ({
        number: index + 1,
        action: item.message,
        level: item.level,
        dateTime: new Date(item.createdAt).toLocaleString()
      }));
      setRows(newRows);
    }
  }, [getLogsFromPage1.isSuccess]);
  

  //TODO: think about these
  // if (isLoading) {
  //   return <div>Loading...</div>; // Render a loading state while the data is fetching
  // }

  // if (error) {
  //   return <div>Error loading logs: {error.message}</div>; // Render an error message if the fetch fails
  // }

  return (
    <div className="cms_logger_page">
     <LoggerComponent
     rows={rows}
     />
    </div>
  );
};
