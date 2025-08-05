import "./globals.css";
import Navigation from "@/components/global/Navigation.js";
import Footer from "@/components/global/Footer.js";

export const metadata = {
  title: "Shocker Mechanical",
  description: "Meta description goes here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Navigation />
        <body>
          {children}
        </body>
      <Footer />
    </html>
  );
}
