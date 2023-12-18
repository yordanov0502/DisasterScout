import "./App.css";
import { Suspense } from "react";
import { PageLoader } from "./components/Loaders/PageLoader.jsx";
import { Router } from "./routes";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router />
    </Suspense>
  );
}

export default App;
