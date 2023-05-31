import "./index.css";
import Page from "./components/Page";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const routeDefinitions = createRoutesFromElements(
    <Route>
      <Route path="/:listingId" element={<Page />} />
      {/* <Route path="*" element={<Page />} / */}
    </Route>
  );
  const router = createBrowserRouter(routeDefinitions);
  return <RouterProvider router={router} />;
}

export default App;
