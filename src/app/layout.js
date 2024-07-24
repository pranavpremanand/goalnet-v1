import { Jost } from "next/font/google";
import "./globals.css";
import { SpinnerProvider } from "./components/SpinnerContext";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "keen-slider/keen-slider.min.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "GoalNet",
    template: "%s | GoalNet",
  },
  description:
    "GoalNet: Your gateway to football. Discover trending stories, transfer rumors, tactics, and more.",
  icons: { icon: "/assets/images/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jost.className} bg-black text-white `}>
        <SpinnerProvider>
          <Toaster position="top-center" />
          <Header />
          {children}
          <Footer />
        </SpinnerProvider>
      </body>
    </html>
  );
}
