import React, { useEffect, useMemo, useRef, useState } from "react";
import BookPage from "./BookPage";
import { getPdfDocument, loadPageFlip, resolveAnnotationTarget } from "../../lib/pdfRuntime";

function useSinglePage() {
  const [single, setSingle] = useState(() => typeof window !== "undefined" && window.innerWidth < 860);
  useEffect(() => {
    const onResize = () => setSingle(window.innerWidth < 860);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return single;
}

function spreadForPage(page, single, numPages) {
  if (single || page === 1) return [page];
  const left = page % 2 === 0 ? page : page - 1;
  return [left, left + 1].filter((value) => value <= numPages);
}

function SimpleBookViewer({ pdfUrl, page, numPages, onNavigate }) {
  const pages = useMemo(() => spreadForPage(page, true, numPages), [page, numPages]);
  const [animation, setAnimation] = useState("");

  const animateTo = (nextPage, direction) => {
    setAnimation(direction);
    window.setTimeout(() => {
      onNavigate(nextPage);
      window.setTimeout(() => setAnimation(""), 280);
    }, 130);
  };

  const next = () => page < numPages && animateTo(page + 1, "turn-next");
  const previous = () => page > 1 && animateTo(page - 1, "turn-prev");

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") next();
      if (event.key === "ArrowLeft" || event.key === "PageUp") previous();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="thesis-book-shell">
      <div className={`thesis-book-spread ${animation} single`}>
        {pages.map((pageNumber) => (
          <div className="thesis-book-leaf leaf-0" key={pageNumber}>
            <BookPage pdfUrl={pdfUrl} pageNumber={pageNumber} onNavigate={onNavigate} />
          </div>
        ))}
      </div>
      <div className="thesis-book-controls">
        <button type="button" onClick={previous} disabled={page <= 1}>← Previous</button>
        <span>PDF page {page}</span>
        <button type="button" onClick={next} disabled={page >= numPages}>Next →</button>
      </div>
      <p className="thesis-book-tip">Swipe or use ← → on smaller screens. PDF hyperlinks remain clickable.</p>
    </div>
  );
}

async function renderIntoFlipPage({ pdf, pageNumber, node, onNavigate, objectUrls, cancelled }) {
  if (!node || node.dataset.rendered === "true" || node.dataset.rendering === "true") return;
  node.dataset.rendering = "true";
  try {
    const pdfPage = await pdf.getPage(pageNumber);
    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const targetWidth = 1000;
    const viewport = pdfPage.getViewport({ scale: targetWidth / baseViewport.width });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await pdfPage.render({ canvasContext: context, viewport }).promise;
    if (cancelled()) return;

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.91));
    if (!blob) throw new Error("Could not encode page");
    const objectUrl = URL.createObjectURL(blob);
    objectUrls.add(objectUrl);

    const img = document.createElement("img");
    img.className = "st-book-page-image";
    img.src = objectUrl;
    img.alt = `Thesis PDF page ${pageNumber}`;
    img.draggable = false;

    const loading = node.querySelector(".st-book-page-loading");
    loading?.remove();
    node.prepend(img);

    const annotations = await pdfPage.getAnnotations({ intent: "display" });
    for (const annotation of annotations) {
      if (cancelled() || annotation.subtype !== "Link" || !annotation.rect) continue;
      const target = await resolveAnnotationTarget(pdf, annotation);
      if (!target) continue;
      const rect = viewport.convertToViewportRectangle(annotation.rect);
      const link = document.createElement(target.type === "external" ? "a" : "button");
      link.className = "st-book-page-link";
      link.style.left = `${Math.min(rect[0], rect[2]) / viewport.width * 100}%`;
      link.style.top = `${Math.min(rect[1], rect[3]) / viewport.height * 100}%`;
      link.style.width = `${Math.abs(rect[2] - rect[0]) / viewport.width * 100}%`;
      link.style.height = `${Math.abs(rect[3] - rect[1]) / viewport.height * 100}%`;
      if (target.type === "external") {
        link.href = target.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.setAttribute("aria-label", "Open PDF link");
      } else {
        link.type = "button";
        link.setAttribute("aria-label", `Go to PDF page ${target.page}`);
        link.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          onNavigate(target.page);
        });
      }
      node.appendChild(link);
    }

    node.dataset.rendered = "true";
  } catch (error) {
    console.error(`Unable to render flip-book page ${pageNumber}`, error);
    const loading = node.querySelector(".st-book-page-loading");
    if (loading) loading.textContent = "Preview unavailable";
  } finally {
    node.dataset.rendering = "false";
  }
}

function CurlBookViewer({ pdfUrl, page, numPages, onNavigate, onFallback }) {
  const rootRef = useRef(null);
  const flipRef = useRef(null);
  const nodesRef = useRef([]);
  const pdfRef = useRef(null);
  const renderQueueRef = useRef(new Set());
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isCancelled = false;
    const objectUrls = new Set();

    async function init() {
      try {
        const [PageFlip, pdf] = await Promise.all([loadPageFlip(), getPdfDocument(pdfUrl)]);
        if (isCancelled || !rootRef.current) return;
        pdfRef.current = pdf;

        const root = rootRef.current;
        root.innerHTML = "";
        const nodes = [];
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
          const node = document.createElement("div");
          node.className = "st-book-page";
          node.dataset.page = String(pageNumber);
          if (pageNumber === 1 || pageNumber === numPages) node.dataset.density = "hard";
          const loading = document.createElement("div");
          loading.className = "st-book-page-loading";
          loading.textContent = `Page ${pageNumber}`;
          const number = document.createElement("span");
          number.className = "st-book-page-number";
          number.textContent = String(pageNumber);
          node.append(loading, number);
          root.appendChild(node);
          nodes.push(node);
        }
        nodesRef.current = nodes;

        const flip = new PageFlip(root, {
          width: 550,
          height: 712,
          size: "stretch",
          minWidth: 300,
          maxWidth: 550,
          minHeight: 388,
          maxHeight: 712,
          drawShadow: true,
          flippingTime: 780,
          usePortrait: false,
          startPage: Math.max(0, page - 1),
          autoSize: true,
          maxShadowOpacity: 0.38,
          showCover: true,
          mobileScrollSupport: true,
          clickEventForward: true,
          useMouseEvents: true,
          disableFlipByClick: false,
        });
        flipRef.current = flip;

        const renderAround = async (center) => {
          const first = Math.max(1, center - 4);
          const last = Math.min(numPages, center + 5);
          for (let number = first; number <= last; number += 1) {
            if (renderQueueRef.current.has(number)) continue;
            renderQueueRef.current.add(number);
            renderIntoFlipPage({
              pdf,
              pageNumber: number,
              node: nodes[number - 1],
              onNavigate,
              objectUrls,
              cancelled: () => isCancelled,
            }).finally(() => renderQueueRef.current.delete(number));
          }
        };

        flip.on("flip", (event) => {
          const current = Number(event.data) + 1;
          onNavigate(current);
          renderAround(current);
        });
        flip.on("init", (event) => renderAround(Number(event.data?.page ?? page - 1) + 1));
        flip.loadFromHTML(nodes);
        await renderAround(page);
        setStatus("ready");
      } catch (error) {
        console.error("Realistic page-flip viewer failed to initialize", error);
        if (!isCancelled) {
          setStatus("error");
          onFallback();
        }
      }
    }

    init();
    return () => {
      isCancelled = true;
      renderQueueRef.current.clear();
      try { flipRef.current?.destroy(); } catch { /* no-op */ }
      flipRef.current = null;
      nodesRef.current = [];
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pdfUrl, numPages]);

  useEffect(() => {
    const flip = flipRef.current;
    if (!flip) return;
    const targetIndex = Math.max(0, Math.min(numPages - 1, page - 1));
    if (flip.getCurrentPageIndex() !== targetIndex) {
      flip.turnToPage(targetIndex);
    }
  }, [page, numPages]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") flipRef.current?.flipNext("top");
      if (event.key === "ArrowLeft" || event.key === "PageUp") flipRef.current?.flipPrev("top");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="thesis-book-shell thesis-curl-book-shell">
      {status === "loading" && <div className="thesis-book-initializing">Preparing realistic page-turn view…</div>}
      <div ref={rootRef} className="thesis-curl-book" aria-label="Turnable thesis book" />
      <div className="thesis-book-controls">
        <button type="button" onClick={() => flipRef.current?.flipPrev("top")} disabled={page <= 1}>← Previous</button>
        <span>PDF page {page} of {numPages}</span>
        <button type="button" onClick={() => flipRef.current?.flipNext("top")} disabled={page >= numPages}>Next →</button>
      </div>
      <p className="thesis-book-tip">Drag a page corner, click the page edge, or use ← →. PDF hyperlinks remain clickable.</p>
    </div>
  );
}

export default function BookViewer({ pdfUrl, page, numPages, onNavigate }) {
  const single = useSinglePage();
  const [forceSimple, setForceSimple] = useState(false);

  if (single || forceSimple) {
    return <SimpleBookViewer pdfUrl={pdfUrl} page={page} numPages={numPages} onNavigate={onNavigate} />;
  }

  return (
    <CurlBookViewer
      pdfUrl={pdfUrl}
      page={page}
      numPages={numPages}
      onNavigate={onNavigate}
      onFallback={() => setForceSimple(true)}
    />
  );
}
