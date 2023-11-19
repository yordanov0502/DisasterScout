import "./App.css";
import { Suspense } from "react";
import { Loader } from "./utils/Loader";
import { Router } from "./routes";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router />
    </Suspense>
  );
}

export default App;
