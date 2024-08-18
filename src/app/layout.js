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

export const viewport = {
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  maximumScale: 1,
  themeColor: 'black',
  // colorScheme: 'dark',
}

export const metadata = {
  title: {
    default: "GoalNet",
    template: "%s | GoalNet",
  },
  description:
    "GoalNet: Your gateway to football. Discover trending stories, transfer rumors, tactics, and more.",
  icons: { icon: "/assets/images/logo.png" },
  openGraph: {
    title: "GoalNet",
    description: "GoalNet: Your gateway to football. Discover trending stories, transfer rumors, tactics, and more.",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/assets/images/GoalNet%20-%20Logo.png`,
        width: 800,
        height: 600,
        alt: "GoalNet Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} text-blue-gray-100 bg-secondary min-h-screen flex flex-col`}
      >
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #f1ff00",
                padding: "10px",
                color: "#f1ff00",
                backgroundColor: "#000000",
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
