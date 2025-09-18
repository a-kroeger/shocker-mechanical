import Gallery from "@/components/portfolio/Gallery";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import style from "../page.module.css";
import {
  fetchPortfolioEntryBySlug,
  fetchPortfolioSlugs,
} from "@/utils/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// --- Helper: turn Contentful Rich Text JSON into plain text ---
function richTextToPlainText(node) {
  if (!node) return "";

  // Leaf text nodes
  if (node.nodeType === "text") {
    return node.value;
  }

  // Recursive walk for content arrays
  if (Array.isArray(node.content)) {
    return node.content.map(richTextToPlainText).join(" ");
  }

  return "";
}

// --- Dynamic Metadata ---
export async function generateMetadata({ params }) {
  const project = await fetchPortfolioEntryBySlug(params.slug);

  const plainDescription = project?.fields?.description
    ? richTextToPlainText(project.fields.description)
    : "";

  return {
    title: `${project.fields.title} | Shocker Mechanical`,
    description:
      plainDescription ||
      "Explore this custom project from Shocker Mechanical’s portfolio.",
    openGraph: {
      title: `${project.fields.title} | Shocker Mechanical`,
      description: plainDescription,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.fields.title} | Shocker Mechanical`,
      description: plainDescription,
    },
  };
}

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

          {/* ✅ YouTube Embed if link exists */}
          {project.fields.youTubeLink && (
            <div className={style.videoWrapper}>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${project.fields.youTubeLink}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
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
