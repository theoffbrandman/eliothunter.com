import React, { useEffect, useState } from "react";
import { getPdfDocument, resolveAnnotationTarget } from "../../lib/pdfRuntime";

export default function BookPage({ pdfUrl, pageNumber, onNavigate }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let objectUrl = null;

    async function renderPage() {
      try {
        setError(false);
        const pdf = await getPdfDocument(pdfUrl);
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const targetWidth = Math.min(1250, Math.max(850, 900 * (window.devicePixelRatio || 1)));
        const scale = targetWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false });
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        await page.render({ canvasContext: context, viewport }).promise;

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.92));
        if (!blob) throw new Error("Could not encode rendered page");
        objectUrl = URL.createObjectURL(blob);

        const annotations = await page.getAnnotations({ intent: "display" });
        const linkEntries = [];
        for (const annotation of annotations) {
          if (annotation.subtype !== "Link" || !annotation.rect) continue;
          const target = await resolveAnnotationTarget(pdf, annotation);
          if (!target) continue;
          const rect = viewport.convertToViewportRectangle(annotation.rect);
          const left = Math.min(rect[0], rect[2]) / viewport.width * 100;
          const top = Math.min(rect[1], rect[3]) / viewport.height * 100;
          const width = Math.abs(rect[2] - rect[0]) / viewport.width * 100;
          const height = Math.abs(rect[3] - rect[1]) / viewport.height * 100;
          linkEntries.push({ target, left, top, width, height, id: annotation.id || `${left}-${top}` });
        }

        if (!cancelled) {
          setImageUrl(objectUrl);
          setLinks(linkEntries);
        }
      } catch (renderError) {
        console.error("Unable to render PDF book page", renderError);
        if (!cancelled) setError(true);
      }
    }

    renderPage();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [pdfUrl, pageNumber]);

  return (
    <div className="book-page" aria-label={`PDF page ${pageNumber}`}>
      {imageUrl && <img className="book-page-image" src={imageUrl} alt={`Thesis PDF page ${pageNumber}`} draggable="false" />}
      {!imageUrl && !error && <div className="book-page-loading">Rendering page {pageNumber}…</div>}
      {error && <div className="book-page-loading">Page preview unavailable. Use Reader mode for this page.</div>}
      {links.map((link) => {
        const style = {
          left: `${link.left}%`,
          top: `${link.top}%`,
          width: `${link.width}%`,
          height: `${link.height}%`,
        };
        if (link.target.type === "external") {
          return (
            <a
              key={link.id}
              className="book-page-link"
              style={style}
              href={link.target.url}
              target="_blank"
              rel="noreferrer"
              title="Open linked source"
              aria-label="Open PDF link"
            />
          );
        }
        return (
          <button
            key={link.id}
            type="button"
            className="book-page-link"
            style={style}
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(link.target.page);
            }}
            title={`Go to PDF page ${link.target.page}`}
            aria-label={`Go to PDF page ${link.target.page}`}
          />
        );
      })}
      <span className="book-page-number">{pageNumber}</span>
    </div>
  );
}
