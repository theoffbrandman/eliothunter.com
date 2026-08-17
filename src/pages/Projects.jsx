import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import "../thesis.css";

export default function Projects() {
    const { hash } = useLocation();

    // Scroll to hash on load and when it changes (supports /projects#microgrids from CV page)
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
            <main className="projects-wrap" role="main">
                {/* Sidebar (sticky) */}
                <aside className="projects-sidebar" aria-label="Projects quick nav">
                    <div className="cv-card">
                        <h2 className="cv-side-title">Projects</h2>
                        <nav className="proj-toc">
                            <Link to="/thesis">Master's Thesis</Link>
                            <a href="#microgrids">Microgrids</a>
                            <a href="#thermal">Thermal Systems</a>
                            <a href="#dash">Data Viz / Dash</a>
                            <a href="#excel">Excel / VBA Tooling</a>
                            <a href="#auto">Automotive</a>
                        </nav>
                    </div>

                    <div className="cv-card">
                        <h2 className="cv-side-title">Back to CV</h2>
                        <a className="cv-button" href="/cv">View CV</a>
                    </div>
                </aside>

                {/* Main stream */}
                <section className="projects-main">
                    <header className="projects-header">
                        <h1 className="projects-title">Projects</h1>
                        <p className="projects-sub">A living stream of selected work, notes, and build logs.</p>
                    </header>

                    {/* ========== Microgrids ========== */}
                    <article id="microgrids" className="proj-article" aria-labelledby="microgrids-title">
                        <h2 id="microgrids-title" className="proj-title">Microgrids</h2>
                        <p className="proj-meta">Energy systems • In progress</p>

                        <div className="proj-gallery">
                            <div className="ph-img" aria-hidden="true" />
                            <div className="ph-img" aria-hidden="true" />
                            <div className="ph-img" aria-hidden="true" />
                        </div>

                        <div className="proj-body">
                            <p>
                                Planning tools and control strategies for resilient microgrids, including data pipelines,
                                dispatch heuristics, and visualization layers for stakeholders.
                            </p>
                            <p>
                                This section will eventually include architecture diagrams, dashboards, and validation results.
                            </p>
                        </div>

                        <hr className="proj-sep" />
                    </article>

                    {/* ========== Thermal Systems ========== */}
                    <article id="thermal" className="proj-article" aria-labelledby="thermal-title">
                        <h2 id="thermal-title" className="proj-title">Thermal Systems</h2>
                        <p className="proj-meta">Jet impingement • Microchannels</p>

                        <div className="thesis-project-feature">
                            <img
                                src="/thesis/assets/selected-results.webp"
                                alt="Selected hybrid cooling configuration thermal and fluid fields"
                            />
                            <div className="thesis-project-feature-copy">
                                <span className="feature-kicker">Featured · M.S. Thesis · 2026</span>
                                <h3>Parametric Evaluation of Hybrid Single-Phase Cooling Strategies for High-Heat-Flux Electronics</h3>
                                <p>
                                    A 3D COMSOL conjugate heat-transfer study combining embedded microchannels and distributed
                                    jet impingement for extreme stacked-chip heat loads. Includes a searchable interactive thesis
                                    reader, turnable book view, figures/tables navigation, and a reproducibility archive.
                                </p>
                                <Link to="/thesis">Explore the thesis →</Link>
                            </div>
                        </div>

                        <div className="proj-body">
                            <p>
                                The thesis is the primary work in this section. Additional thermal-system modeling projects will become available after further formatting.
                            </p>
                        </div>

                        <hr className="proj-sep" />
                    </article>

                    {/* ========== Data Viz / Dash ========== */}
                    <article id="dash" className="proj-article" aria-labelledby="dash-title">
                        <h2 id="dash-title" className="proj-title">Data Viz / Dash</h2>
                        <p className="proj-meta">Python • Matplotlib • CSV visualizer</p>

                        <div className="proj-gallery">
                            <div className="ph-img" aria-hidden="true" />
                            <div className="ph-img" aria-hidden="true" />
                            <div className="ph-img" aria-hidden="true" />
                        </div>

                        <div className="proj-body">
                            <p>
                                A desktop-style Dash app for plotting multiple CSV streams, toggling axis modes, and exporting figures.
                                Features min/max, auto-ranges, and soon: axis range controls.
                            </p>
                        </div>

                        <hr className="proj-sep" />
                    </article>

                    {/* ========== Excel/VBA Tooling ========== */}
                    <article id="excel" className="proj-article" aria-labelledby="excel-title">
                        <h2 id="excel-title" className="proj-title">Excel / VBA Tooling</h2>
                        <p className="proj-meta">Campus heatmap • Shape overlays</p>

                        <div className="proj-gallery">
                            <div className="ph-img" aria-hidden="true" />
                        </div>

                        <div className="proj-body">
                            <p>
                                High-resolution campus heatmap with auto-sized image blocks, conditional overlays, and macros
                                to keep shapes aligned and responsive to data changes.
                            </p>
                        </div>

                        <hr className="proj-sep" />
                    </article>

                    {/* ========== Automotive ========== */}
                    <article id="auto" className="proj-article" aria-labelledby="auto-title">
                        <h2 id="auto-title" className="proj-title">Automotive</h2>
                        <p className="proj-meta">1993 Subaru • 1984 Corvette</p>

                        <div className="proj-gallery">
                            <div className="ph-img" aria-hidden="true" />
                            <div className="ph-img" aria-hidden="true" />
                        </div>

                        <div className="proj-body">
                            <p>
                                Incremental performance and reliability upgrades, emissions/inspection research across states,
                                and ECU/intake modernization paths for older platforms.
                            </p>
                        </div>

                        {/* End of stream – no separator after last section */}
                    </article>
                </section>
            </main>
        </div>
    );
}
