import React, { useEffect, useMemo, useState } from "react";
import BookViewer from "./BookViewer";
import ThesisSearch from "./ThesisSearch";
import { pdfPageLabel } from "../../data/thesisData";

function OutlineList({ items, onNavigate, level = 0 }) {
  return (
    <div className={`thesis-nav-list thesis-nav-level-${level}`}>
      {items.map((item) => (
        <div className="thesis-nav-group" key={`${item.label}-${item.page}`}>
          <button type="button" onClick={() => onNavigate(item.page)}>
            <span>{item.label}</span>
            <small>{pdfPageLabel(item.page)}</small>
          </button>
          {item.children?.length > 0 && (
            <div className="thesis-nav-children">
              <OutlineList items={item.children} onNavigate={onNavigate} level={level + 1} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ThesisReader({ pdfUrl, searchIndexUrl, outline, figures, tables }) {
  const numPages = 101;
  const [mode, setMode] = useState("reader");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [sidebarTab, setSidebarTab] = useState("contents");

  useEffect(() => {
    const readHash = () => {
      const match = window.location.hash.match(/page=(\d+)/i);
      if (!match) return;
      const requested = Math.min(numPages, Math.max(1, Number(match[1])));
      setPage(requested);
      setPageInput(String(requested));
    };
    const handleNavigateEvent = (event) => {
      const requested = Math.min(numPages, Math.max(1, Number(event.detail?.page) || 1));
      setPage(requested);
      setPageInput(String(requested));
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("thesis:navigate", handleNavigateEvent);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("thesis:navigate", handleNavigateEvent);
    };
  }, []);

  const navigate = (nextPage) => {
    const safe = Math.min(numPages, Math.max(1, Number(nextPage) || 1));
    setPage(safe);
    setPageInput(String(safe));
    const nextHash = `#page=${safe}`;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
  };

  const readerUrl = useMemo(
    () => `${pdfUrl}#page=${page}&zoom=page-width&view=FitH`,
    [pdfUrl, page]
  );

  const submitPage = (event) => {
    event.preventDefault();
    navigate(pageInput);
  };

  const tabContent = {
    contents: <OutlineList items={outline} onNavigate={navigate} />,
    figures: <OutlineList items={figures} onNavigate={navigate} />,
    tables: <OutlineList items={tables} onNavigate={navigate} />,
    search: <ThesisSearch indexUrl={searchIndexUrl} onNavigate={navigate} />,
  }[sidebarTab];

  return (
    <section id="read" className="thesis-reader-section" aria-labelledby="thesis-reader-title">
      <div className="thesis-section-heading">
        <span className="thesis-eyebrow">Interactive document</span>
        <h2 id="thesis-reader-title">Read the thesis</h2>
        <p>Reader mode prioritizes native PDF fidelity and accessibility. Book mode presents the same PDF as a turnable two-page document while retaining PDF hyperlinks.</p>
      </div>

      <div className="thesis-reader-app">
        <div className="thesis-reader-toolbar">
          <div className="thesis-mode-switch" role="group" aria-label="Thesis viewing mode">
            <button type="button" className={mode === "reader" ? "active" : ""} onClick={() => setMode("reader")}>Reader</button>
            <button type="button" className={mode === "book" ? "active" : ""} onClick={() => setMode("book")}>Book</button>
          </div>

          <form className="thesis-page-jump" onSubmit={submitPage}>
            <button type="button" onClick={() => navigate(page - 1)} disabled={page <= 1} aria-label="Previous PDF page">←</button>
            <label htmlFor="thesis-page-input">PDF page</label>
            <input
              id="thesis-page-input"
              inputMode="numeric"
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value)}
              onBlur={() => setPageInput(String(page))}
              aria-label="PDF page number"
            />
            <span>of {numPages}</span>
            <button type="button" onClick={() => navigate(page + 1)} disabled={page >= numPages} aria-label="Next PDF page">→</button>
          </form>

          <div className="thesis-reader-actions">
            <a href={pdfUrl} target="_blank" rel="noreferrer">Open PDF</a>
            <a href={pdfUrl} download>Download</a>
          </div>
        </div>

        <div className="thesis-reader-layout">
          <aside className="thesis-reader-sidebar" aria-label="Thesis navigation">
            <div className="thesis-sidebar-tabs" role="tablist" aria-label="Thesis navigation tabs">
              {[
                ["contents", "Contents"],
                ["figures", "Figures"],
                ["tables", "Tables"],
                ["search", "Search"],
              ].map(([key, label]) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={sidebarTab === key}
                  className={sidebarTab === key ? "active" : ""}
                  key={key}
                  onClick={() => setSidebarTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="thesis-sidebar-content">{tabContent}</div>
          </aside>

          <div className="thesis-reader-stage">
            {mode === "reader" ? (
              <div className="thesis-pdf-frame-wrap">
                <iframe
                  key={readerUrl}
                  className="thesis-pdf-frame"
                  src={readerUrl}
                  title="Eliot Hunter master's thesis PDF reader"
                />
                <p className="thesis-reader-note">
                  Your browser's PDF viewer provides selectable text, built-in find, zoom, print, and the original PDF's internal/external links. The site navigation at left provides direct chapter, figure, table, and full-text jumps.
                </p>
              </div>
            ) : (
              <BookViewer pdfUrl={pdfUrl} page={page} numPages={numPages} onNavigate={navigate} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
