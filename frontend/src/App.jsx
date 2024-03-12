import { Suspense, useRef} from "react";
import { PageLoader } from "./components/Loaders/PageLoader.jsx";
//import {Progress} from "./components/Loaders/Progress.jsx" //!kept for UI debug purposes because of PageLoader overriding MUI components. This progress loader does NOT override any of the MUI components
import { Router } from "./routes";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./hooks/useUserContext.js";
import "./App.css";

const LOCAL_STORAGE_KEY1 = `${import.meta.env.VITE_LOCAL_STORAGE_KEY1}`;
const REDIRECT_HEADER = `${import.meta.env.VITE_REDIRECT_HEADER}`;
const REDIRECT_HEADER_VALUE = `${import.meta.env.VITE_REDIRECT_HEADER_VALUE}`;

function App() {

  const { clearUserContext } = useUserContext();
  const navigate = useNavigate();
  const queryClientRef = useRef(null);

  function checkErrorForRedirectHeader(error/*, query*/) { //? "error" and "query" args are automatically passed by the global onError callback of the QueryCache instance
    if (error?.response?.headers[REDIRECT_HEADER] === REDIRECT_HEADER_VALUE) {
      clearUserContext();
      localStorage.removeItem(LOCAL_STORAGE_KEY1);
      queryClientRef.current.clear();
      navigate("/login"); //? Navigation is possible because of the <BrowserRouter> in the index.jsx file, despite the fact that the routes are specified one level below - in the Routes.jsx file
    } 
  }

  if(!queryClientRef.current) //? QueryClient is ONLY created once, when it is null. After that no matter how many times the App component re-renders, the QueryClient will remain the same, since useRef persists its content across re-renders.
  { 
    //console.log('queryClientInstance created');
    queryClientRef.current = new QueryClient({
      defaultOptions:{
        queries:{
          refetchOnWindowFocus:false,
          refetchOnMount:false,
          refetchOnReconnect:false,
          retry:false,
    
          //? https://dev.to/delisrey/react-query-staletime-vs-cachetime-hml
          staleTime:0, //5*60*1000,
    
          //!By default, data will be retained in the cache for 5 minutes (cacheTime of 300,000 milliseconds). After that time elapses, the data will be automatically removed from the cache.
          //gcTime:0 //! is actually cacheTime in v5
          //!
        }
      },
      queryCache: new QueryCache({
        onError: checkErrorForRedirectHeader //? This callback "will only be invoked once per useQuery. It also exists outside the component that called useQuery, so we don't have a closure problem." This is done mainly bacause ReactQuery v5 REMOVED the onError callback from every useQuery, and there are 2 remaining options - 1. using a custom hook with useEffect(NOT SUITABLE AND APPROPRIATE) 2.global handling as I did here and as the whole react community suggests
      }),
      mutationCache: new MutationCache({
        onError: checkErrorForRedirectHeader //? This callback is used as a global error callback of useMutation to handle error(perform specific logic - check for custom header for redirect). HOWEVER, the onError callback inside the useMutation(wherever it is in the component tree) is still executed.
      })
    });
  }
  //else { console.log('queryClientInstance ALREADY created');}

  return (
    <QueryClientProvider client={queryClientRef.current}>
     <Suspense fallback={<PageLoader />}>
       <Router />
        <ReactQueryDevtools //!For development purposes ONLY
          initialIsOpen
          position="right"
          buttonPosition="bottom-right"
        />
     </Suspense>
    </QueryClientProvider>   
  );
}

export default App;
  