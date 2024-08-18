"use client";
import { store } from "@/lib/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { Provider } from "react-redux";
import MiniLoader from "./MiniLoader";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const SpinnerContext = createContext(null);

// Create a client
const queryClient = new QueryClient();

export const Providers = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Provider store={store}>
        <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
          {isLoading && (
            <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-secondary/70">
              <MiniLoader />
            </div>
          )}
          {children}
        </SpinnerContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
};
