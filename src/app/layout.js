import { Jost } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
      <body
        className={`${jost.className} bg-black text-blue-gray-100 min-h-screen flex flex-col`}
      >
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #f1ff00",
                padding: "16px",
                color: "#f1ff00",
                backgroundColor: "#191919",
              },
            }}
          />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
