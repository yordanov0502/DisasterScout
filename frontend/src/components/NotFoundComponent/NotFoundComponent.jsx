import { Button } from "@mui/material";
import "./not_found_component.scss";

export const NotFoundComponent = () => {
  return (
    <div className="not_found_component">
      Изглежда, че се отклонихте от маршрута. Страницата, която търсите не
      съществува или в момента не е налична.
        <Button className="not_found_component__button">Начало</Button>
    </div>
  );
};
