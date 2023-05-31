import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";

import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

const cacheTime = 1000 * 60 * 10;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheTime,
      cacheTime,
      refetchOnWindowFocus: false,
    },
  },
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: cacheTime,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
