"use client";
import { store } from "@/lib/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { Provider } from "react-redux";

export const SpinnerContext = createContext(null);

// Create a client
const queryClient = new QueryClient();

export const Providers = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
          {children}
        </SpinnerContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
};
