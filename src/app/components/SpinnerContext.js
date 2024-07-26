"use client";
import { createContext, useState } from "react";
import Loading from "./Loading";
import Header from "./Header";
import Footer from "./Footer";

export const SpinnerContext = createContext(null);

export const SpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      <Header />
      {children}
      <Footer />
    </SpinnerContext.Provider>
  );
};
