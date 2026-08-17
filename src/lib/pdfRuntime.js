const PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.min.mjs";
const PDFJS_WORKER_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.2.108/build/pdf.worker.min.mjs";

let pdfJsPromise;
const documentPromises = new Map();

export async function loadPdfJs() {
  if (!pdfJsPromise) {
    pdfJsPromise = import(/* @vite-ignore */ PDFJS_URL).then((pdfjsLib) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      return pdfjsLib;
    });
  }
  return pdfJsPromise;
}

export async function getPdfDocument(url) {
  if (!documentPromises.has(url)) {
    documentPromises.set(
      url,
      loadPdfJs().then((pdfjsLib) => pdfjsLib.getDocument({ url }).promise)
    );
  }
  return documentPromises.get(url);
}

export async function resolveAnnotationTarget(pdf, annotation) {
  if (annotation.url) return { type: "external", url: annotation.url };
  if (annotation.unsafeUrl) return { type: "external", url: annotation.unsafeUrl };
  if (!annotation.dest) return null;

  let destination = annotation.dest;
  if (typeof destination === "string") {
    destination = await pdf.getDestination(destination);
  }
  if (!Array.isArray(destination) || !destination[0]) return null;

  const first = destination[0];
  if (typeof first === "number") return { type: "internal", page: first + 1 };

  try {
    const pageIndex = await pdf.getPageIndex(first);
    return { type: "internal", page: pageIndex + 1 };
  } catch {
    return null;
  }
}

const PAGE_FLIP_URL = "https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js";
let pageFlipPromise;

export async function loadPageFlip() {
  if (window.St?.PageFlip) return window.St.PageFlip;
  if (!pageFlipPromise) {
    pageFlipPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${PAGE_FLIP_URL}"]`);
      const script = existing || document.createElement("script");
      const finish = () => window.St?.PageFlip ? resolve(window.St.PageFlip) : reject(new Error("StPageFlip did not initialize"));
      if (existing) {
        if (window.St?.PageFlip) finish();
        else {
          existing.addEventListener("load", finish, { once: true });
          existing.addEventListener("error", () => reject(new Error("StPageFlip failed to load")), { once: true });
        }
        return;
      }
      script.src = PAGE_FLIP_URL;
      script.async = true;
      script.onload = finish;
      script.onerror = () => reject(new Error("StPageFlip failed to load"));
      document.head.appendChild(script);
    });
  }
  return pageFlipPromise;
}
