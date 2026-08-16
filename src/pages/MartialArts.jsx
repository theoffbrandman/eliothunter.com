import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../App.css";

export default function MartialArts() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const el = document.getElementById(hash.replace("#", ""));
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [hash]);

    return (
        <div className="page-root">
            <main className="martial-wrap" role="main">
                {/* Sidebar (sticky) */}
                <aside className="martial-sidebar" aria-label="Sections">
                    <div className="cv-card">
                        <h2 className="cv-side-title">Martial Arts</h2>
                        <nav className="martial-toc">
                            <a href="#aikido">Aikido</a>
                            <a href="#jujutsu">Jujutsu</a>
                            <a href="#kenjutsu">Kenjutsu</a>
                        </nav>
                    </div>

                    <div className="cv-card">
                        <h2 className="cv-side-title">Explore</h2>
                        <Link className="cv-button" to="/projects">View Projects</Link>
                    </div>
                </aside>

                {/* Main column */}
                <section className="martial-main">
                    <header className="martial-header">
                        <h1 className="martial-title">Martial Arts</h1>
                        <p className="martial-sub">
                            Training notes and technique references across Aikido, Jujutsu, and Kenjutsu.
                        </p>
                    </header>

                    {/* ================= Aikido ================= */}
                    <article id="aikido" className="martial-article" aria-labelledby="aikido-title">
                        <h2 id="aikido-title" className="martial-section-title">Aikido</h2>
                        <p className="martial-meta">Fundamentals • Body alignment • Blending</p>

                        {/* Technique sets wrapper */}
                        <section className="set-wrapper" aria-label="Aikido Technique Sets">
                            <h3 className="set-title">Technique Sets (6)</h3>
                            <div className="set-grid">
                                {["Ukemi Basics", "Ikkyo Variations", "Nikkyo Flow", "Sankyo Locking", "Iriminage Series", "Kokyunage Series"].map((name) => (
                                    <div className="set-card" key={name}>
                                        <div className="set-pill">Set</div>
                                        <div className="set-name">{name}</div>
                                        <p className="set-desc">Short description / notes placeholder.</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Techniques */}
                        <div className="tech-grid">
                            {[
                                { name: "Ikkyo (Omote)", cues: ["Entry: irimi", "Control elbow, pin to mat", "Keep spine long"] },
                                { name: "Iriminage", cues: ["Blend offline", "Enter and wrap", "Cut through center"] },
                                { name: "Kokyunage", cues: ["Center drop", "Breath timing", "Maintain connection"] },
                            ].map((t) => (
                                <article key={t.name} className="tech-card" aria-label={t.name}>
                                    <h3 className="tech-title">{t.name}</h3>
                                    {/* Video skeleton */}
                                    <div className="video-ph" aria-label="video placeholder" />
                                    {/* Instructions */}
                                    <ul className="tech-instructions">
                                        {t.cues.map((c) => <li key={c}>{c}</li>)}
                                    </ul>
                                </article>
                            ))}
                        </div>

                        <hr className="martial-sep" />
                    </article>

                    {/* ================= Jujutsu ================= */}
                    <article id="jujutsu" className="martial-article" aria-labelledby="jujutsu-title">
                        <h2 id="jujutsu-title" className="martial-section-title">Jujutsu</h2>
                        <p className="martial-meta">Leverage • Clinch to ground • Control</p>

                        {/* Technique sets wrapper */}
                        <section className="set-wrapper" aria-label="Jujutsu Technique Sets">
                            <h3 className="set-title">Technique Sets (6)</h3>
                            <div className="set-grid">
                                {["Breakfalls", "Arm Locks", "Chokes", "Takedowns", "Sweeps", "Escapes"].map((name) => (
                                    <div className="set-card" key={name}>
                                        <div className="set-pill">Set</div>
                                        <div className="set-name">{name}</div>
                                        <p className="set-desc">Short description / notes placeholder.</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Techniques */}
                        <div className="tech-grid">
                            {[
                                { name: "Osoto Gari", cues: ["Collar + sleeve", "Off-balance to rear corner", "Sweep thigh-to-thigh"] },
                                { name: "Seoi Nage", cues: ["Break posture", "Turn in tight", "Drive through"] },
                                { name: "Kesa Gatame", cues: ["Head control", "Underhook arm", "Hip pressure steady"] },
                            ].map((t) => (
                                <article key={t.name} className="tech-card" aria-label={t.name}>
                                    <h3 className="tech-title">{t.name}</h3>
                                    <div className="video-ph" aria-label="video placeholder" />
                                    <ul className="tech-instructions">
                                        {t.cues.map((c) => <li key={c}>{c}</li>)}
                                    </ul>
                                </article>
                            ))}
                        </div>

                        <hr className="martial-sep" />
                    </article>

                    {/* ================= Kenjutsu ================= */}
                    <article id="kenjutsu" className="martial-article" aria-labelledby="kenjutsu-title">
                        <h2 id="kenjutsu-title" className="martial-section-title">Kenjutsu</h2>
                        <p className="martial-meta">Kamae • Maai • Cut mechanics</p>

                        {/* Technique sets wrapper */}
                        <section className="set-wrapper" aria-label="Kenjutsu Technique Sets">
                            <h3 className="set-title">Technique Sets (4)</h3>
                            <div className="set-grid">
                                {["Kamae Basics", "Footwork", "Kiri (Cuts)", "Kumitachi"].map((name) => (
                                    <div className="set-card" key={name}>
                                        <div className="set-pill">Set</div>
                                        <div className="set-name">{name}</div>
                                        <p className="set-desc">Short description / notes placeholder.</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Techniques */}
                        <div className="tech-grid">
                            {[
                                { name: "Chudan-no-Kamae → Men", cues: ["Blade line center", "Small step in", "Kiri-oroshi straight"] },
                                { name: "Sayu Men", cues: ["Angle entry", "Hands forward", "Cut through centerline"] },
                                { name: "Kesa Giri", cues: ["45° diagonal", "Hips square", "Tip leads, hands follow"] },
                            ].map((t) => (
                                <article key={t.name} className="tech-card" aria-label={t.name}>
                                    <h3 className="tech-title">{t.name}</h3>
                                    <div className="video-ph" aria-label="video placeholder" />
                                    <ul className="tech-instructions">
                                        {t.cues.map((c) => <li key={c}>{c}</li>)}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
}
