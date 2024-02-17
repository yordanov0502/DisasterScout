import { useNavigate } from "react-router-dom";
import "./not_found_component.scss";

export const NotFoundComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="not_found_component">
      Изглежда, че се отклонихте от маршрута. Страницата, която търсите не
      съществува или в момента не е налична.
      <button className="not_found_component__button" onClick={handleClick}>
        Начало
      </button>
    </div>
  );
};
