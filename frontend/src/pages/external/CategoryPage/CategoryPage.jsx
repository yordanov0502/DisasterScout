import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validCategoryTypes } from "../../../services/reportService";
import { SeismicActivityComponent } from "../../../components/external/CategoryComponents/SeismicActivityComponent";
import { MilitaryConditionsComponent } from "../../../components/external/CategoryComponents/MilitaryConditionsComponent";
import { PageLoader } from "../../../components/Loaders/PageLoader";
import './category_page.scss';

export const CategoryPage = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const [categoryType] = useState(searchParams.get("type"));
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    
    if(!validCategoryTypes.includes(categoryType)) 
    {
      navigate('*');
      return;
    }
    else
    {
      setIsLoadingPage(false);
    }
   
  }, [searchParams]);

  //? Cleanup effect to reset scroll position when component unmounts
  useEffect(() => {
    return () => {
      window.scroll({ top: 0, behavior: 'auto' });
    };
  }, []);

  if(isLoadingPage)
  {
    return (
      <div className="category_page">
        <div className="category_page__loader-box">
         <PageLoader />
        </div>
      </div>
    );
  }
  else
  {
    if(categoryType === 'SEISMIC_ACTIVITY')
    {
      return (
        <div className="category_page">
          <SeismicActivityComponent />
        </div>
      );
    }
    // else if(categoryType === 'ROAD_CONDITIONS')
    // {
    //   return (
    //     <div className="category_page">
    //       <RoadConditionsComponent />
    //     </div>
    //   );
    // }

    // else if(categoryType === 'PUBLIC_CONDITIONS')
    // {
    //   return (
    //     <div className="category_page">
    //       <PublicConditionsComponent />
    //     </div>
    //   );
    // }

    // else if(categoryType === 'METEOROLOGICAL_CONDITIONS')
    // {
    //   return (
    //     <div className="category_page">
    //       <MeteorologicalConditionsComponent />
    //     </div>
    //   );
    // }

    // else if(categoryType === 'SPACE_PHENOMENON')
    // {
    //   return (
    //     <div className="category_page">
    //       <SpacePhenomenonComponent />
    //     </div>
    //   );
    // }

    else (categoryType === 'MILITARY_CONDITIONS')
    {
      return (
        <div className="category_page">
          <MilitaryConditionsComponent />
        </div>
      );
    }
    
    
  }
 
};