import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/context/themeContext";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Movie Hub",
  description: "A movie related website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
         
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}