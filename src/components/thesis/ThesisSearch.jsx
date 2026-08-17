import React, { useEffect, useMemo, useState } from "react";
import { pdfPageLabel } from "../../data/thesisData";

function makeSnippet(text, query) {
  const lower = text.toLowerCase();
  const target = query.toLowerCase();
  const index = lower.indexOf(target);
  if (index < 0) return text.slice(0, 180);
  const start = Math.max(0, index - 90);
  const end = Math.min(text.length, index + target.length + 120);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

function Highlight({ text, query }) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? <mark key={index}>{part}</mark> : part
  );
}

export default function ThesisSearch({ indexUrl, onNavigate }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(indexUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Search index failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setIndex(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => { cancelled = true; };
  }, [indexUrl]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term || !index) return [];
    return index
      .filter((entry) => entry.text.toLowerCase().includes(term))
      .slice(0, 75)
      .map((entry) => ({ ...entry, snippet: makeSnippet(entry.text, query.trim()) }));
  }, [index, query]);

  return (
    <div className="thesis-search">
      <label className="thesis-search-label" htmlFor="thesis-search-input">Search the full thesis</label>
      <div className="thesis-search-row">
        <input
          id="thesis-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try ‘pressure drop’, ‘JPR’, or ‘mesh sensitivity’"
          autoComplete="off"
        />
        {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
      </div>
      <p className="thesis-search-help">
        {status === "loading" && "Loading searchable text…"}
        {status === "error" && "The site search index could not be loaded. The PDF reader still has its native search."}
        {status === "ready" && !query && "Searches all 101 PDF pages and jumps directly to matching pages."}
        {status === "ready" && query && `${results.length}${results.length === 75 ? "+" : ""} matching pages`}
      </p>

      {query && results.length > 0 && (
        <div className="thesis-search-results" aria-live="polite">
          {results.map((result) => (
            <button
              type="button"
              className="thesis-search-result"
              key={`${result.page}-${result.snippet}`}
              onClick={() => onNavigate(result.page)}
            >
              <span className="thesis-search-result-page">PDF {result.page} · {pdfPageLabel(result.page)}</span>
              <span className="thesis-search-result-snippet"><Highlight text={result.snippet} query={query.trim()} /></span>
            </button>
          ))}
        </div>
      )}

      {status === "ready" && query && results.length === 0 && (
        <p className="thesis-empty-state">No matching pages found.</p>
      )}
    </div>
  );
}
