import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  downloadUrl,
  martialArtsVideos,
  videoUrl,
} from "../data/martialArtsVideos";

const PAGE_TITLE = "Martial Arts Video Library — Eliot Hunter";

function VideoThumbnail({ video }) {
  const previewRef = useRef(null);

  const handleLoadedMetadata = () => {
    const el = previewRef.current;
    if (!el) return;

    // Seek a fraction of a second in so the card shows an actual frame rather
    // than the blank frame many videos contain at exactly 0:00.
    try {
      if (Number.isFinite(el.duration) && el.duration > 0.15) {
        el.currentTime = Math.min(0.25, el.duration / 10);
      }
    } catch (_) {
      // Some browsers may not permit an immediate seek. loadeddata below will
      // still leave the first decodable frame visible.
    }
  };

  return (
    <span className="video-card-preview" aria-hidden="true">
      <video
        ref={previewRef}
        className="video-card-thumbnail"
        src={`${videoUrl(video.file)}#t=0.1`}
        muted
        playsInline
        preload="metadata"
        onLoadedMetadata={handleLoadedMetadata}
      />
      <span className="video-card-play-overlay">
        <span className="video-play-icon">▶</span>
      </span>
    </span>
  );
}

export default function VideoLibrary() {
  const [selectedId, setSelectedId] = useState(martialArtsVideos[0]?.id || "");
  const playerRef = useRef(null);

  const selected = useMemo(
    () => martialArtsVideos.find((video) => video.id === selectedId) || martialArtsVideos[0],
    [selectedId]
  );

  useEffect(() => {
    const oldTitle = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const oldRobots = robots?.getAttribute("content");
    const oldCanonical = canonical?.getAttribute("href");

    document.title = PAGE_TITLE;
    robots?.setAttribute("content", "noindex,nofollow,noarchive");
    canonical?.setAttribute("href", window.location.href);

    return () => {
      document.title = oldTitle;
      if (robots && oldRobots) robots.setAttribute("content", oldRobots);
      if (canonical && oldCanonical) canonical.setAttribute("href", oldCanonical);
    };
  }, []);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.load();
    playerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedId]);

  if (!selected) {
    return (
      <main className="video-library-wrap">
        <section className="video-empty">No videos have been configured yet.</section>
      </main>
    );
  }

  const src = videoUrl(selected.file);
  const download = downloadUrl(selected.file);

  return (
    <main className="video-library-wrap">
      <section className="video-library-heading">
        <p className="video-library-kicker">Unlisted collection</p>
        <h1>Martial Arts Videos</h1>
        <p>
          Select a video below to watch it here. Use Download original MP4 to save the full file.
        </p>
      </section>

      <section className="video-feature" aria-live="polite">
        <div className="video-player-shell">
          <video
            key={selected.id}
            ref={playerRef}
            className="video-player"
            controls
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div className="video-feature-info">
          <div>
            <h2>{selected.title}</h2>
            {selected.date && <p className="video-meta">{selected.date}</p>}
            {selected.description && <p className="video-description">{selected.description}</p>}
          </div>

          <a className="video-download-button" href={download}>
            Download original MP4
          </a>
        </div>
      </section>

      <section className="video-gallery" aria-labelledby="video-gallery-title">
        <div className="video-gallery-header">
          <h2 id="video-gallery-title">All videos</h2>
          <span>{martialArtsVideos.length} videos</span>
        </div>

        <div className="video-grid">
          {martialArtsVideos.map((video, index) => {
            const active = video.id === selected.id;
            return (
              <button
                type="button"
                key={video.id}
                className={`video-card${active ? " active" : ""}`}
                onClick={() => setSelectedId(video.id)}
                aria-current={active ? "true" : undefined}
              >
                <VideoThumbnail video={video} />
                <span className="video-card-body">
                  <span className="video-card-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="video-card-title">{video.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
