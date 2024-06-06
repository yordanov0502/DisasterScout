import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnChart } from "../../../components/internal/Dashboard/ColumnChart";
import { PieChart } from "../../../components/internal/Dashboard/PieChart";
import { getCountOfFreshReportsOfZones, getProportionOfCategoriesOfFreshReports } from "../../../services/reportService";
import { PageLoader } from "../../../components/Loaders/PageLoader";
import "./cms_dashboard_page.scss";

export const CmsDashboardPage = () => {

  const [columnChartData, setColumnChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  const {
    data: data1,
    status: status1
  } = useQuery({
    queryKey: ["getCountOfFreshReportsOfZones"], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getCountOfFreshReportsOfZones(), 
    enabled: true
  });

  const {
    data: data2,
    status: status2
  } = useQuery({
    queryKey: ["getProportionOfCategories"], //? When any value in the queryKey array changes, react-query will re-run the query.
    queryFn: () => getProportionOfCategoriesOfFreshReports(), 
    enabled: true
  });


  useEffect(() => {

    if (status1 === 'success') 
    {
      setColumnChartData(data1.data.freshReportsOfZones);
    }

  }, [status1, data1]);

  useEffect(() => {

    if (status2 === 'success') 
    {
      setPieChartData(data2.data.proportionOfFreshReportsCategories);
    }

  }, [status2, data2]);
      




  if(!columnChartData || !pieChartData)
  {
    return (<PageLoader />);
  }

  else
  {
    return (
      <div className="cms_dashboard_page">

        <div className="cms_dashboard_page__container1">
           <div className="cms_dashboard_page__container1__title">
            Брой активни бедствия и аварии по области
           </div>
           <ColumnChart data={columnChartData}/>
        </div>
  
        <div className="cms_dashboard_page__container2">
          <div className="cms_dashboard_page__container2__title">
           Съотношение между категории
          </div>
          <PieChart data={pieChartData}/>
        </div>
   
      </div>
    );
  }

};