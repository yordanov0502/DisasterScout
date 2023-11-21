import "./App.css";
import { Suspense } from "react";
import { PageLoader } from "./utils/PageLoader";
import { Router } from "./routes";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router />
    </Suspense>
  );
}

export default App;
