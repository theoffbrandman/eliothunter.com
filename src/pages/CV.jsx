import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function CV() {
    return (
        <div className="page-root">
            <main className="cv-wrap" role="main">
                {/* Sidebar: quick actions + “bubbles” to Projects */}
                <aside className="cv-sidebar" aria-label="Quick links">
                    <div className="cv-card">
                        <h2 className="cv-side-title">Projects</h2>
                        <div className="cv-bubbles">
                            {/* Link to Projects page. Later, you can deep-link to sections like /projects#microgrids */}
                            <Link className="cv-bubble" to="/projects">Microgrids</Link>
                            <Link className="cv-bubble" to="/projects">Thermal Systems</Link>
                            <Link className="cv-bubble" to="/projects">Data Viz / Dash</Link>
                            <Link className="cv-bubble" to="/projects">Excel/VBA Tooling</Link>
                            <Link className="cv-bubble" to="/projects">Automotive</Link>
                        </div>
                    </div>

                    <div className="cv-card">
                        <h2 className="cv-side-title">Contact</h2>
                        <p className="cv-side-text">
                            Prefer email? Head to the <Link to="/contact">contact page</Link>.
                        </p>
                        <a className="cv-button" href="/eliot_hunter_cv.pdf" download>
                            Download PDF
                        </a>
                    </div>
                </aside>

                {/* Main CV content */}
                <section className="cv-main">
                    <header className="cv-header">
                        <h1 className="cv-name">Eliot Hunter</h1>
                        <p className="cv-tagline">Energy systems • Thermal management • Policy + Engineering</p>
                        <ul className="cv-meta">
                            <li>Washington, DC</li>
                            <li><a href="mailto:eliot@example.com">eliot@example.com</a></li>
                            <li><a href="https://eliothunter.com">eliothunter.com</a></li>
                        </ul>
                    </header>

                    {/* Summary */}
                    <section className="cv-section">
                        <h2 className="cv-h2">Summary</h2>
                        <p>
                            Engineer and researcher with experience in microgrids, thermal systems design,
                            and data visualization tooling. Skilled in Python (Dash/Matplotlib), VBA, R,
                            and building automation systems. Passionate about practical, policy-aware energy solutions.
                        </p>
                    </section>

                    {/* Experience */}
                    <section className="cv-section">
                        <h2 className="cv-h2">Experience</h2>

                        <div className="cv-item">
                            <div className="cv-item-head">
                                <h3 className="cv-role">Research Fellow</h3>
                                <span className="cv-dates">Feb 2022 – Present</span>
                            </div>
                            <div className="cv-org">The George Washington University</div>
                            <ul className="cv-points">
                                <li>Developed front/back-end code for renewable-energy data analysis; built GUI for system visualization.</li>
                                <li>Conducted research on urban renewable energy and microgrids; authored proposals and grant materials.</li>
                            </ul>
                        </div>

                        <div className="cv-item">
                            <div className="cv-item-head">
                                <h3 className="cv-role">Energy Engineer Intern</h3>
                                <span className="cv-dates">Jun 2024 – Aug 2024</span>
                            </div>
                            <div className="cv-org">Southland Industries • San Diego, CA</div>
                            <ul className="cv-points">
                                <li>Analyzed facility energy systems and contributed to project scoping for the “Sunnydale” proposal exercise.</li>
                                <li>Supported modeling and recommendations for efficiency upgrades.</li>
                            </ul>
                        </div>

                        <div className="cv-item">
                            <div className="cv-item-head">
                                <h3 className="cv-role">BAS Engineer Intern</h3>
                                <span className="cv-dates">Sep 2023 – Jun 2024</span>
                            </div>
                            <div className="cv-org">Federal Reserve Board • Washington, DC</div>
                            <ul className="cv-points">
                                <li>Created BAS maps and trends; reviewed codes; supported operations through data-driven diagnostics.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Education */}
                    <section className="cv-section">
                        <h2 className="cv-h2">Education</h2>
                        <div className="cv-item">
                            <div className="cv-item-head">
                                <h3 className="cv-role">M.S. Mechanical Engineering (in progress)</h3>
                                <span className="cv-dates">2025 – </span>
                            </div>
                            <div className="cv-org">The George Washington University</div>
                            <ul className="cv-points">
                                <li>Focus: Energy systems, thermal management (jet impingement + microchannels), microgrids.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="cv-section">
                        <h2 className="cv-h2">Skills</h2>
                        <ul className="cv-tags">
                            <li>Python (Dash, Matplotlib)</li><li>R</li><li>SAS</li><li>VBA/Excel</li>
                            <li>Mapbox GL</li><li>GeoJSON</li><li>BAS</li><li>Thermal analysis</li>
                            <li>Conduction/Convection modeling</li><li>Proposal writing</li>
                        </ul>
                    </section>

                    {/* Publications / Talks (optional) */}
                    <section className="cv-section">
                        <h2 className="cv-h2">Publications & Talks</h2>
                        <p>Coming soon.</p>
                    </section>
                </section>
            </main>
        </div>
    );
}