import "./App.css";
import { Suspense } from "react";
import { PageLoader } from "./components/Loaders/PageLoader.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./routes";

const queryClient = new QueryClient({
  
}); //TODO: Should be properly configured to match the usecases of the whole webapp

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <QueryClientProvider client={queryClient}>
      <Router />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
