import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThesisReader from "../components/thesis/ThesisReader";
import {
  archiveUrl,
  thesis,
  thesisArchiveFiles,
  thesisFigures,
  thesisOutline,
  thesisTables,
} from "../data/thesisData";
import "../thesis.css";

function CopyButton({ text, children }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return <button type="button" className="thesis-copy-button" onClick={copy}>{copied ? "Copied" : children}</button>;
}

export default function Thesis() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${thesis.title} | Eliot Hunter`;

    const restore = [];
    const setMeta = (selector, attribute, value, createAttributes) => {
      let element = document.querySelector(selector);
      let created = false;
      if (!element) {
        element = document.createElement("meta");
        Object.entries(createAttributes || {}).forEach(([key, entryValue]) => element.setAttribute(key, entryValue));
        document.head.appendChild(element);
        created = true;
      }
      const previous = element.getAttribute(attribute);
      element.setAttribute(attribute, value);
      restore.push(() => created ? element.remove() : (previous === null ? element.removeAttribute(attribute) : element.setAttribute(attribute, previous)));
    };

    const description = "Eliot Hunter's 2026 M.S. Mechanical Engineering thesis on hybrid microchannel and jet-impingement cooling for high-heat-flux electronics.";
    setMeta('meta[name="description"]', "content", description, { name: "description" });
    setMeta('meta[property="og:type"]', "content", "article", { property: "og:type" });
    setMeta('meta[property="og:title"]', "content", thesis.title, { property: "og:title" });
    setMeta('meta[property="og:description"]', "content", description, { property: "og:description" });
    setMeta('meta[property="og:url"]', "content", `${window.location.origin}/thesis`, { property: "og:url" });
    setMeta('meta[property="og:image"]', "content", `${window.location.origin}${thesis.resultsImage}`, { property: "og:image" });
    setMeta('meta[name="twitter:title"]', "content", thesis.title, { name: "twitter:title" });
    setMeta('meta[name="twitter:description"]', "content", description, { name: "twitter:description" });
    setMeta('meta[name="twitter:image"]', "content", `${window.location.origin}${thesis.resultsImage}`, { name: "twitter:image" });

    let canonical = document.querySelector('link[rel="canonical"]');
    const canonicalCreated = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.getAttribute("href");
    canonical.href = `${window.location.origin}/thesis`;

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.thesisSchema = "true";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      name: thesis.title,
      headline: thesis.title,
      author: { "@type": "Person", name: thesis.author, url: `${window.location.origin}/` },
      publisher: { "@type": "CollegeOrUniversity", name: thesis.university },
      learningResourceType: "Master's thesis",
      educationalLevel: thesis.degree,
      about: thesis.keywords,
      url: `${window.location.origin}/thesis`,
      encoding: {
        "@type": "MediaObject",
        contentUrl: `${window.location.origin}${thesis.pdfUrl}`,
        encodingFormat: "application/pdf",
      },
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      restore.reverse().forEach((fn) => fn());
      if (canonicalCreated) canonical.remove();
      else if (previousCanonical === null) canonical.removeAttribute("href");
      else canonical.setAttribute("href", previousCanonical);
      schema.remove();
    };
  }, []);

  const citation = `${thesis.author}. “${thesis.title}.” M.S. thesis, ${thesis.university}, 2026.`;
  const bibtex = `@mastersthesis{hunter2026hybridcooling,\n  author = {Hunter, Eliot},\n  title = {${thesis.title}},\n  school = {${thesis.university}},\n  year = {2026},\n  month = {aug}\n}`;

  const jumpToReader = (event, page) => {
    event.preventDefault();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#page=${page}`);
    window.dispatchEvent(new CustomEvent("thesis:navigate", { detail: { page } }));
    document.getElementById("read")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="thesis-page" role="main">
      <section className="thesis-hero">
        <div className="thesis-hero-copy">
          <div className="thesis-breadcrumbs"><Link to="/projects">Projects</Link><span>/</span><span>Master's Thesis</span></div>
          <span className="thesis-eyebrow">Master's Thesis · Mechanical Engineering · 2026</span>
          <h1>{thesis.title}</h1>
          <p className="thesis-byline">{thesis.author} · {thesis.university}</p>
          <p className="thesis-degree">{thesis.degree} · Thesis directed by {thesis.advisor}</p>
          <div className="thesis-hero-actions">
            <a className="thesis-primary-button" href="#read">Read thesis</a>
            <a className="thesis-secondary-button" href={thesis.pdfUrl} download>Download PDF</a>
            <a className="thesis-secondary-button" href={thesis.pdfUrl} target="_blank" rel="noreferrer">Open PDF</a>
            {thesis.officialUrl && <a className="thesis-secondary-button" href={thesis.officialUrl} target="_blank" rel="noreferrer">Official repository</a>}
          </div>
          {!thesis.officialUrl && <p className="thesis-repository-status">Permanent GW ETD / ProQuest link will be added after publication.</p>}
          <div className="thesis-keywords" aria-label="Thesis keywords">
            {thesis.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        </div>
        <a className="thesis-cover-card" href="#read" aria-label="Read thesis">
          <img src={thesis.coverUrl} alt="Cover page of Eliot Hunter's master's thesis" />
          <span>101-page PDF</span>
        </a>
      </section>

      <section className="thesis-overview-grid">
        <article className="thesis-overview-card thesis-abstract-card">
          <span className="thesis-eyebrow">Abstract</span>
          <h2>Near-junction cooling for extreme stacked-chip heat loads</h2>
          <p>{thesis.abstract}</p>
          <p>{thesis.abstract2}</p>
        </article>
        <div className="thesis-stats" aria-label="Selected thesis results">
          {thesis.stats.map((stat) => (
            <div className="thesis-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="thesis-visuals">
        <article className="thesis-visual-card">
          <img src={thesis.geometryImage} alt="Final three-dimensional hybrid microchannel and jet-impingement cooling geometry from Figure 3.3" />
          <div>
            <span className="thesis-eyebrow">Computational architecture</span>
            <h2>Embedded microchannels + distributed impingement</h2>
            <p>The final model combines three heat-generating silicon tiers, two embedded microchannel layers, and an upper jet-impingement region in a parameterized 3D conjugate heat-transfer model.</p>
            <a href="#read" onClick={(event) => jumpToReader(event, 37)}>View Figure 3.3 in thesis →</a>
          </div>
        </article>
        <article className="thesis-visual-card reverse">
          <img src={thesis.resultsImage} alt="Selected hybrid configuration temperature, velocity, and pressure fields from Figure 4.15" />
          <div>
            <span className="thesis-eyebrow">Selected configuration</span>
            <h2>103 K reduction in maximum chip temperature</h2>
            <p>The selected configuration reduced maximum chip temperature from approximately 477 K to 374 K while reducing maximum thermal resistance from 0.262 to 0.115 K/W.</p>
            <a href="#read" onClick={(event) => jumpToReader(event, 73)}>View Figure 4.15 in thesis →</a>
          </div>
        </article>
      </section>

      <ThesisReader
        pdfUrl={thesis.pdfUrl}
        searchIndexUrl={thesis.searchIndexUrl}
        outline={thesisOutline}
        figures={thesisFigures}
        tables={thesisTables}
      />

      <section id="archive" className="thesis-archive-section">
        <div className="thesis-section-heading">
          <span className="thesis-eyebrow">Reproducibility archive</span>
          <h2>Models, data, notebooks, and figure sources</h2>
          <p>The thesis appendix defines a reproducibility archive containing the COMSOL models, source CSV exports, plotting notebook, and figure-source files.</p>
        </div>
        <div className="thesis-archive-grid">
          {thesisArchiveFiles.map((file) => {
            const url = file.available ? archiveUrl(file.path) : null;
            return (
              <article className="thesis-file-card" key={file.name}>
                <span className="thesis-file-type">{file.type}</span>
                <h3>{file.name}</h3>
                <p>{file.description}</p>
                {file.contents?.length > 0 && (
                  <details className="thesis-file-contents">
                    <summary>Included files</summary>
                    <ul>{file.contents.map((item) => <li key={item}>{item}</li>)}</ul>
                  </details>
                )}
                {url ? (
                  <a href={url} download>Download</a>
                ) : (
                  <button type="button" disabled title="Enable this file in thesisData.js after uploading it to R2">Coming soon</button>
                )}
              </article>
            );
          })}
        </div>
        <p className="thesis-archive-note">Appendix A of the PDF lists the expected archive contents and their role in reproducing the reported plots and tables.</p>
      </section>

      <section className="thesis-citation-section">
        <div>
          <span className="thesis-eyebrow">Citation</span>
          <h2>Cite this thesis</h2>
          <p>{citation}</p>
          <div className="thesis-citation-actions">
            <CopyButton text={citation}>Copy citation</CopyButton>
            <CopyButton text={bibtex}>Copy BibTeX</CopyButton>
          </div>
        </div>
        <pre>{bibtex}</pre>
      </section>
    </main>
  );
}
