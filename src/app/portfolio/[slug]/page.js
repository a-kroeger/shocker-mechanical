import Gallery from "@/components/portfolio/Gallery";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import style from "../page.module.css";
import {
  fetchPortfolioEntryBySlug,
  fetchPortfolioSlugs,
} from "@/utils/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default async function PortfolioPage({ params }) {
  const project = await fetchPortfolioEntryBySlug(params.slug);
  const portfolioSlugs = await fetchPortfolioSlugs();

  const otherProjects = await Promise.all(
    portfolioSlugs.map((slug) => fetchPortfolioEntryBySlug(slug))
  );

  return (
    <main className={style.projectPage}>
      <Gallery images={project.fields.imageGallery} />

      <section className={style.projectContent}>
        <div className={style.projectText}>
          <h1>{project.fields.title}</h1>
          <div>{documentToReactComponents(project.fields.description)}</div>
        </div>

        <div className={style.projectSidebar}>
          <h2>Scope Of Work</h2>
          <div>{documentToReactComponents(project.fields.scope)}</div>
        </div>
      </section>

      <div className={style.ctaBox}>
        <h3>Have a project for us?</h3>
        <a href="/contact">Get in touch</a>
      </div>

      <PortfolioGrid title="Our Other Work" portfolio={otherProjects} />
    </main>
  );
}
