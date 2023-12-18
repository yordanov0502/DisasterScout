import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({}); //TODO: Should be properly configured to match the usecases of the whole webapp

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools //!Should be deleted when the whole project is finished on 100%
          initialIsOpen
          position="right"
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
