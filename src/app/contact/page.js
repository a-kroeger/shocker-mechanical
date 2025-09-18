// app/contact/page.js
import ContactForm from "@/components/contact/ContactForm"

export const metadata = {
  title: 'Contact Us | Shocker Mechanical Custom Auto Shop',
  description:
    'Get in touch with Shocker Mechanical for custom automotive projects, performance upgrades, restorations, and fabrication. Call, email, or visit our Camrose shop today.',
  openGraph: {
    title: 'Contact Us | Shocker Mechanical',
    description:
      'Reach out to Shocker Mechanical for custom builds, performance upgrades, restorations, and fabrication.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  )
}
