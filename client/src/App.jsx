import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Page from "./components/Page";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

function App() {
  const routeDefinitions = createRoutesFromElements(
    <Route>
      <Route path="/:listingId" element={<Page />} />
      {/* <Route path="*" element={<Page />} / */}
    </Route>
  );

  const router = createBrowserRouter(routeDefinitions);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
