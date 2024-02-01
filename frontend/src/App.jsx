import "./App.css";
import { Suspense } from "react";
import { PageLoader } from "./components/Loaders/PageLoader.jsx";
//import {Progress} from "./components/Loaders/Progress.jsx" //!kept for UI debug purposes because of PageLoader overriding MUI components. This progress loader does NOT override any of the MUI components
import { Router } from "./routes";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router />
    </Suspense>
  );
}

export default App;
