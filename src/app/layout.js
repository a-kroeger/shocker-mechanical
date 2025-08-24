import "./globals.css"
import Navigation from "@/components/global/Navigation.js"
import Footer from "@/components/global/Footer.js"
import { fetchAllServices, getSiteContent } from "@/utils/contentful"

export const metadata = {
  title: "Shocker Mechanical",
  description: "Meta description goes here",
}

export default async function RootLayout({ children }) {
  // Fetch all service entries once on the server
  const services = await fetchAllServices()
  const content = await getSiteContent()

  return (
    <html lang="en">
      <body>
        <Navigation services={services} />
        {children}
        <Footer data={content} />
      </body>
    </html>
  )
}
