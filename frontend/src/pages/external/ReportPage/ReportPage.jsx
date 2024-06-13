import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReport, validCategories, validIssues, validSeverityTypes, validZoneIds } from "../../../services/reportService";
import { getAllAreasOfZoneForSearch } from "../../../services/zoneService";
import { PublicReportComponent } from "../../../components/external/PublicReportComponent";
import "./report_page.scss";

export const ReportPage = () => {

  const navigate = useNavigate();
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);
  const [searchParams] = useSearchParams(); 
  const [reportId] = useState(searchParams.get("reportId") || null);
  const [severityType] = useState(searchParams.get("severityType") || null);
  const [zoneId] = useState(searchParams.get("zoneId") || null);
  const [area] = useState(searchParams.get("area") || null);
  const [category] = useState(searchParams.get("category") || null);
  const [issue] = useState(searchParams.get("issue") || null);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [reportForm, setReportForm] = useState({
    issue: "",
    severity: "",
    submittedAt: "",
    expiresAt: "",
    description: "", 
    zone: "",
    area: "",
    imageUrl: "",
    locationUrl: "",
  });



  const {
    data,
    status,
    isLoading,
    error,
  } = useQuery({ 
    queryKey: ["getReport",reportId,severityType,zoneId,area,category,issue], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getReport(reportId,severityType,zoneId,area,category,issue),
    enabled: isQueryEnabled
  });
  
 

  useEffect(() => {
    
    //! Validation whether the url has searchParams set from previous page 
    if(!searchParams.has("reportId") || !searchParams.has("severityType") || !searchParams.has("zoneId") || !searchParams.has("area") || !searchParams.has("category") || !searchParams.has("issue")) 
    {
      navigate("/search-reports");
      return;    
    }
    else
    {
      const reportIdSearchParam = Number(reportId);

      if((!Number.isInteger(reportIdSearchParam) || reportIdSearchParam < 1)
          || !validSeverityTypes.includes(severityType)
          || !validZoneIds.includes(zoneId)
          || !getAllAreasOfZoneForSearch(zoneId).includes(area) //! if area is not part of the zone
          || !validCategories.includes(category)
          || !validIssues.includes(issue) 
        ) 
      {
        navigate("/search-reports");
        return;
      }
      else
      {
        setIsQueryEnabled(true);//? all validations passed
      }

    }

  }, [searchParams]);

  

  useEffect(() => {

    if(isLoading)
    {
      setIsLoadingComponent(true);
    }

    if (status === 'success') 
    {
      const response = data.data;
      //console.log(response);
       
      const submittedAt = new Date(response.submittedAt);
      const formattedSubmittedAt = `${submittedAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${submittedAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
     
      const expiresAt = response.expiresAt ? new Date(response.expiresAt) : null;
      const formattedExpiresAt = expiresAt ? `${expiresAt.toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })} ч., ${expiresAt.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit', year: 'numeric' })}` : '-';


      setReportForm({
        issue: response.issue,
        severity: response.severityType,
        submittedAt: formattedSubmittedAt,
        expiresAt: formattedExpiresAt,
        description: response.description,
        zone: response.zoneId,
        area: response.area,
        imageUrl: response.imageUrl,
        locationUrl: response.locationUrl
      });

      setIsLoadingComponent(false);
    }

    if(status === 'error') 
    {
      if(error.response?.data === "Report doesn't exist.")
      {
        navigate("/search-reports", { state: { showErrorSnackbar: true, message: "Сигналът вече не съществува." } });
      }
      else if(error.response?.data === "Report info mismatch.[state]")
      {
        navigate("/search-reports", { state: { showErrorSnackbar: true, message: "Сигналът вече не е актуален." } });
      }
      else if(error.response?.data === "Report info mismatch.[severityType]" || error.response?.data === "Report info mismatch.[zoneId]" || error.response?.data === "Report info mismatch.[area]" || error.response?.data === "Report info mismatch.[category]" || error.response?.data === "Report info mismatch.[issue]")
      {
        navigate("/search-reports", { state: { showErrorSnackbar: true, message: "Сигналът е бил актуализиран." } });
      }
      else
      {
        navigate("/search-reports", { state: { showErrorSnackbar: true, message: "Възникна грешка. Моля опитайте отново." } });
      } 
    }

  }, [status, data, error]);





  return (
    <div className="report_page">

      <PublicReportComponent
          isLoadingComponent={isLoadingComponent}
          reportForm={reportForm}
      />

    </div>
  );

};