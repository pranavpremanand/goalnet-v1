"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const SpinnerContext = createContext(null);

// Create a client
const queryClient = new QueryClient();

export const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
      </SpinnerContext.Provider>
    </QueryClientProvider>
  );
};
