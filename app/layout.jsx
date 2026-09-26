import "./globals.css";
import { ToastContainer } from "react-toastify";
import { FitLogProvider } from "../context/FitLogContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export const metadata = {
  title: "FitLog",
  description: "A dark, no-nonsense gym companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <FitLogProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #2a2a2a",
              },
              iconTheme: { primary: "#ccff00", secondary: "#000" },
            }}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}
