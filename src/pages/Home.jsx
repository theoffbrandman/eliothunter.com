import React from "react";
import "../App.css";

/*
 * Drop homepage photos into:
 *   src/assets/home-gallery/
 *
 * Vite discovers them automatically. The filename only affects the stable
 * sort order; you do not need to import each image by hand.
 */
const photoModules = import.meta.glob(
  "../assets/home-gallery/*.{avif,AVIF,gif,GIF,jpeg,JPEG,jpg,JPG,png,PNG,webp,WEBP}",
  { eager: true, import: "default" }
);

const loadedPhotos = Object.entries(photoModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, { numeric: true })
  )
  .map(([path, src]) => ({
    id: path,
    src,
  }));
console.log("Homepage photos found:", loadedPhotos);

/*
 * These appear only until you add real photos.
 * They let you preview the moving layout immediately.
 */
const fallbackPhotos = [
  "4 / 5", "3 / 2", "2 / 3", "5 / 4", "4 / 3", "3 / 4",
  "16 / 10", "5 / 7", "7 / 5", "1 / 1", "3 / 5", "5 / 3",
  "4 / 6", "6 / 4", "9 / 13", "13 / 9", "4 / 5", "3 / 2",
  "2 / 3", "5 / 4", "4 / 3", "3 / 4", "16 / 10", "5 / 7",
].map((aspectRatio, index) => ({
  id: `placeholder-${index}`,
  aspectRatio,
}));

const photos = loadedPhotos.length > 0 ? loadedPhotos : fallbackPhotos;

/*
 * Fixed pixel widths are intentional.
 *
 * The columns NEVER resize with the viewport.
 * Smaller screens simply see fewer columns.
 * Larger screens reveal the repeated banks.
 *
 * duration = seconds for one complete upward cycle
 * delay    = starting offset so the columns are asynchronous
 */
const columnSpecs = [
  { width: 148, duration: 56, delay: -11 },
  { width: 192, duration: 72, delay: -37 },
  { width: 132, duration: 49, delay: -23 },
  { width: 176, duration: 64, delay: -51 },
  { width: 156, duration: 59, delay: -8 },
  { width: 214, duration: 78, delay: -43 },
  { width: 142, duration: 53, delay: -29 },
  { width: 184, duration: 69, delay: -17 },
  { width: 164, duration: 61, delay: -47 },
  { width: 202, duration: 75, delay: -33 },
];

const bankCopies = [-1, 0, 1];
const photosPerColumn = 10;

function getColumnPhotos(columnIndex, bankIndex) {
  /*
   * Each column receives a consecutive section of the gallery.
   *
   * This guarantees that, provided we have at least
   * `photosPerColumn` photographs, an individual column won't
   * contain accidental duplicates.
   *
   * Neighboring columns continue where the previous column left off,
   * so the entire gallery is exhausted before we begin repeating it.
   *
   * Side banks begin at different offsets so ultrawide displays
   * don't simply show an obvious photographic clone of the center.
   */
  const bankOffset =
    (bankIndex + 1) * 17;

  const columnStart =
    columnIndex * photosPerColumn;

  return Array.from(
    { length: photosPerColumn },
    (_, slotIndex) => {
      const photoIndex =
        (
          bankOffset +
          columnStart +
          slotIndex
        ) % photos.length;

      return photos[photoIndex];
    }
  );
}

function PhotoTile({ photo }) {
  if (!photo.src) {
    return (
      <div
        className="home-photo home-photo--placeholder"
        style={{ aspectRatio: photo.aspectRatio }}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className="home-photo"
      src={photo.src}
      alt=""
      aria-hidden="true"
      draggable="false"
      decoding="async"
      loading="eager"
    />
  );
}

function PhotoStack({ columnPhotos, duplicate = false }) {
  return (
    <div className="home-photo-stack" aria-hidden="true">
      {columnPhotos.map((photo, index) => (
        <PhotoTile
          key={`${photo.id}-${index}-${duplicate ? "duplicate" : "primary"}`}
          photo={photo}
        />
      ))}
    </div>
  );
}

function PhotoColumn({ spec, columnIndex, bankIndex }) {
  const columnPhotos = getColumnPhotos(columnIndex, bankIndex);

  return (
    <div
      className="home-photo-column"
      style={{
        "--column-width": `${spec.width}px`,
        "--column-duration": `${spec.duration}s`,
        "--column-delay": `${spec.delay - bankIndex * 3}s`,
      }}
      aria-hidden="true"
    >
      <div className="home-photo-track">
        <PhotoStack columnPhotos={columnPhotos} />
        <PhotoStack columnPhotos={columnPhotos} duplicate />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="home-hero">
      {/* Infinite fixed-scale photo field */}
      <div className="home-photo-viewport" aria-hidden="true">
        <div className="home-photo-wall">
          {bankCopies.map((bankIndex) => (
            <div className="home-photo-bank" key={bankIndex}>
              {columnSpecs.map((spec, columnIndex) => (
                <PhotoColumn
                  key={`${bankIndex}-${columnIndex}`}
                  spec={spec}
                  columnIndex={columnIndex}
                  bankIndex={bankIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Header/footer transition fades */}
      <div
        className="home-vignette home-vignette--top"
        aria-hidden="true"
      />
      <div
        className="home-vignette home-vignette--bottom"
        aria-hidden="true"
      />

      {/* Static central introduction */}
      <section className="intro-card">
        <h1 className="intro-title">Hello!</h1>

        <p className="intro-text">
          I’m Eliot - an engineer and researcher focused on energy systems,
          thermal management, and the intersection of engineering and policy.
          Explore my projects, CV, and other facets. :p
        </p>
      </section>
    </main>
  );
}