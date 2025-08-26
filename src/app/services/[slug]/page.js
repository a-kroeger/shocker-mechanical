import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import Portfolio from "@/app/portfolio/page";
import { fetchServiceEntryBySlug, fetchAllServices, getSiteContent } from "@/utils/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function ServicePage({ params }) {
  const service = await fetchServiceEntryBySlug(params.slug);
  const allServices = await fetchAllServices();
  const extras = await getSiteContent();

  const { contactPhone, contactEmail, address } = extras.fields
  const { title, coverPhoto, bodyText, portfolio } = service.fields;

  // Filter out the current service
  const otherServices = allServices.filter(
    (s) => s.fields.slug !== params.slug
  );

  // Shuffle and pick 3
  const randomServices = otherServices
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <main className={styles.page}>
      {/* Cover Image */}
      <div className={styles.coverImage}>
        <Image
          src={`https:${coverPhoto.fields.file.url}`}
          alt={title}
          fill
          className={styles.image}
        />
      </div>

      {/* Two-column layout */}
      <div className={styles.main}>
        {/* Body Content */}
        <section className={styles.section}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.bodyText}>
            {documentToReactComponents(bodyText)}
          </div>
        </section>

        {/* Sticky Sidebar with CTA */}
        <aside className={styles.ctaSection}>
          <div className={styles.ctaBox}>
            <h3>Book Your Appointment Today!</h3>
            <p>{contactPhone}</p>
            <p>{contactEmail}</p>
            <p>{address}</p>
          </div>

          <div className={styles.sidebar}>
            <h4>Other Services</h4>
            <div className={styles.serviceList}>
              {randomServices.map((service, i) => (
                <Link
                  href={`/services/${service.fields.slug}`}
                  key={i}
                  className={styles.serviceItem}
                >
                  <Image
                    src={`https:${service.fields.coverPhoto.fields.file.url}`}
                    alt={service.fields.title}
                    width={80}
                    height={50}
                    className={styles.serviceImage}
                  />
                  <span>{service.fields.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Portfolio portfolio={portfolio} />
    </main>
  );
}
