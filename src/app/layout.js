import "./globals.css";


export const metadata = {
  title: "Shocker Mechanical",
  description: "Meta description goes here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
