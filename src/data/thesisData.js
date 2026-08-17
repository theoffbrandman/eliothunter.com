export const thesis = {
  title: "Parametric Evaluation of Hybrid Single-Phase Cooling Strategies for High-Heat-Flux Electronics",
  author: "Eliot Hunter",
  degree: "Master of Science in Mechanical Engineering",
  university: "The George Washington University",
  school: "School of Engineering and Applied Science",
  date: "August 31, 2026",
  advisor: "Saniya LeBlanc",
  coAdvisor: "Cole Davis",
  pdfUrl: "/thesis/eliot-hunter-ms-thesis-2026.pdf",
  coverUrl: "/thesis/assets/cover.webp",
  geometryImage: "/thesis/assets/geometry.webp",
  resultsImage: "/thesis/assets/selected-results.webp",
  searchIndexUrl: "/thesis/search-index.json",
  officialUrl: "", // Add the permanent GW ETD / ProQuest URL after publication.
  abstract: `Modern high-performance electronic systems increasingly rely on three-dimensional integration, chiplet-based packaging, and high-power artificial-intelligence accelerators, which concentrate heat generation within smaller volumes while lengthening the thermal path from interior active layers to conventional package-level cooling surfaces. This thesis develops and evaluates a three-dimensional conjugate heat-transfer model of a hybrid single-phase cooling architecture that combines embedded microchannels with a distributed jet-impingement array. Water is used as the baseline coolant, and the model is intentionally operated at an extreme 700 W stacked-chip load to investigate the thermal-hydraulic limits of near-junction liquid cooling.`,
  abstract2: `A parameterized COMSOL Multiphysics model evaluates microchannel mass flow rate, channel count, channel open fraction, microchannel edge margin, and jet pitch ratio/array density. The selected configuration uses 27 microchannels per cooling layer at an open fraction of 0.80, 25 g/s microchannel flow, a 0.10 mm edge margin, and a 4 × 4 array of 300 µm jets supplied by 4 g/s total jet flow. The model predicts a maximum chip temperature of approximately 374 K (101 °C), a maximum thermal resistance of 0.115 K/W, and an ideal total hydraulic power of 8.38 W.`,
  keywords: [
    "high-heat-flux electronics",
    "microchannel cooling",
    "jet impingement",
    "conjugate heat transfer",
    "3D integrated electronics",
    "COMSOL Multiphysics",
  ],
  stats: [
    { value: "700 W", label: "Stacked-chip heat load" },
    { value: "374 K", label: "Selected maximum chip temperature" },
    { value: "0.115 K/W", label: "Maximum thermal resistance" },
    { value: "56%", label: "Thermal-resistance reduction vs. baseline" },
    { value: "333 kPa", label: "Selected microchannel pressure drop" },
    { value: "8.38 W", label: "Ideal total hydraulic power" },
  ],
};

export const thesisOutline = [
  { label: "Title page", page: 1 },
  { label: "Acknowledgments", page: 2 },
  { label: "Abstract of Thesis", page: 3 },
  { label: "Table of Contents", page: 5 },
  { label: "List of Figures", page: 9 },
  { label: "List of Tables", page: 11 },
  { label: "List of Symbols / Nomenclature", page: 13 },
  {
    label: "1 Introduction", page: 15,
    children: [],
  },
  {
    label: "2 Literature Review", page: 18,
    children: [
      { label: "2.1 Thermal Challenges in High-Heat-Flux Electronic Systems", page: 18 },
      { label: "2.2 Microchannel Heat Sinks", page: 19 },
      { label: "2.3 Jet Impingement Cooling", page: 19 },
      { label: "2.4 Hybrid Jet-Microchannel Architectures", page: 20 },
      { label: "2.5 Adaptive and Flow-Regulated Cooling", page: 20 },
      { label: "2.6 Synthesis and Research Gap", page: 21 },
    ],
  },
  {
    label: "3 Computational Model and Methodology", page: 23,
    children: [
      {
        label: "3.1 Modeling Progression and Validation Hierarchy", page: 23,
        children: [
          { label: "3.1.1 Reduced-Order Through-Thickness Framework", page: 23 },
          { label: "3.1.2 Preliminary Cooling-Architecture Models", page: 25 },
          { label: "3.1.3 Intermediate H100-Inspired Package Model", page: 29 },
          { label: "3.1.4 Transition to the Final Three-Dimensional Hybrid Model", page: 35 },
        ],
      },
      { label: "3.2 Final 3D Model Geometry and Heat Load", page: 35 },
      { label: "3.3 Governing Equations and Performance Metrics", page: 37 },
      { label: "3.4 Materials and Thermophysical Properties", page: 39 },
      { label: "3.5 Physics Interfaces and Flow Model", page: 40 },
      { label: "3.6 Boundary and Initial Conditions", page: 41 },
      { label: "3.7 Baseline and Selected Geometric Configurations", page: 44 },
      { label: "3.8 Parameter Studies", page: 46 },
      { label: "3.9 Mesh, Solver, and Numerical Implementation", page: 48 },
      { label: "3.10 Model Assumptions and Limitations", page: 50 },
      {
        label: "3.11 Analytical and Numerical Validation Methods", page: 52,
        children: [
          { label: "3.11.1 Mass and Energy Conservation", page: 52 },
          { label: "3.11.2 Microchannel Pressure-Drop Estimate", page: 53 },
          { label: "3.11.3 Representative One-Dimensional Thermal-Resistance Model", page: 55 },
          { label: "3.11.4 Mesh Sensitivity", page: 57 },
          { label: "3.11.5 Single-Phase Consistency Check", page: 58 },
          { label: "3.11.6 Comparison with Published Hybrid-Cooling Performance", page: 58 },
        ],
      },
    ],
  },
  {
    label: "4 Results and Discussion", page: 59,
    children: [
      { label: "4.1 Baseline Performance", page: 59 },
      { label: "4.2 Effect of Microchannel Mass Flow Rate", page: 61 },
      { label: "4.3 Effect of Channel Count", page: 63 },
      { label: "4.4 Effect of Microchannel Edge Margin", page: 65 },
      { label: "4.5 Effect of Channel Open Fraction", page: 66 },
      { label: "4.6 Effect of Jet Pitch Ratio and Array Density", page: 69 },
      { label: "4.7 Selected Hybrid Configuration", page: 71 },
      {
        label: "4.8 Selected-Configuration Validation", page: 73,
        children: [
          { label: "4.8.1 Mass and Energy Conservation", page: 73 },
          { label: "4.8.2 Single-Phase Coolant Consistency", page: 74 },
          { label: "4.8.3 Analytical Microchannel Pressure-Drop Comparison", page: 75 },
          { label: "4.8.4 Representative One-Dimensional Thermal-Resistance Model", page: 76 },
          { label: "4.8.5 Mesh Sensitivity", page: 79 },
          { label: "4.8.6 Flow-Model Sensitivity", page: 80 },
        ],
      },
      {
        label: "4.9 Thermal-Hydraulic Design Implications", page: 82,
        children: [
          { label: "4.9.1 Design Rules Emerging From the Parametric Studies", page: 83 },
        ],
      },
      { label: "4.10 Comparison With Published Literature", page: 85 },
      { label: "4.11 Validation Summary", page: 86 },
    ],
  },
  { label: "5 Conclusions", page: 89 },
  {
    label: "6 Future Work", page: 92,
    children: [
      { label: "6.1 Manifold and Flow-Distribution Design", page: 92 },
      { label: "6.2 Transient and Adaptive Cooling", page: 93 },
      { label: "6.3 Package Interfaces and Thermomechanical Reliability", page: 93 },
      { label: "6.4 Alternative Working Fluids and Two-Phase Cooling", page: 94 },
      { label: "6.5 Expanded Geometric and Multi-Objective Optimization", page: 95 },
      { label: "6.6 Experimental Demonstration and Validation", page: 95 },
      { label: "6.7 Chip-to-System Thermal Co-Design", page: 96 },
    ],
  },
  { label: "References", page: 97 },
  { label: "Appendix A: Computational Model, Data, and Reproducibility Archive", page: 99 },
  { label: "Appendix B: Additional Figures", page: 101 },
];

export const thesisFigures = [
  { label: "Figure 1.1 — Representative 3D-integrated package", page: 16 },
  { label: "Figure 2.1 — Comparison of single-phase microfluidic cooling architectures", page: 22 },
  { label: "Figure 3.1 — Reduced-order thermal-resistance framework", page: 25 },
  { label: "Figure 3.2 — Preliminary single-chip cooling architectures", page: 29 },
  { label: "Figure 3.3 — Final three-dimensional hybrid cooling model", page: 37 },
  { label: "Figure 3.4 — Normal mesh used for selected configuration", page: 49 },
  { label: "Figure 4.1 — Baseline thermal and coolant-flow fields", page: 60 },
  { label: "Figure 4.2 — Temperature metrics vs. microchannel mass flow", page: 61 },
  { label: "Figure 4.3 — Pressure drop vs. microchannel mass flow", page: 62 },
  { label: "Figure 4.4 — Microchannel thermal-hydraulic tradeoff", page: 63 },
  { label: "Figure 4.5 — Temperature metrics vs. microchannel count", page: 64 },
  { label: "Figure 4.6 — Pressure drop vs. microchannel count", page: 64 },
  { label: "Figure 4.7 — Interchannel wall thickness vs. channel count", page: 65 },
  { label: "Figure 4.8 — Edge margin and perimeter-hotspot formation", page: 66 },
  { label: "Figure 4.9 — Temperature metrics vs. open fraction", page: 67 },
  { label: "Figure 4.10 — Pressure drop vs. open fraction", page: 68 },
  { label: "Figure 4.11 — Wall thickness vs. open fraction", page: 68 },
  { label: "Figure 4.12 — Temperature metrics for JPR/array-density study", page: 70 },
  { label: "Figure 4.13 — Jet total-pressure loss vs. JPR", page: 70 },
  { label: "Figure 4.14 — Jet-array thermal-hydraulic tradeoff", page: 71 },
  { label: "Figure 4.15 — Selected hybrid thermal and coolant-flow fields", page: 73 },
  { label: "Figure B.1 — Mesh-sensitivity results", page: 101 },
];

export const thesisTables = [
  { label: "Table 2.1 — Synthesis of cooling approaches", page: 21 },
  { label: "Table 3.1 — Preliminary conventional-cooling results", page: 26 },
  { label: "Table 3.2 — Preliminary direct-jet-impingement results", page: 27 },
  { label: "Table 3.3 — Intermediate H100-inspired heat-source allocation", page: 31 },
  { label: "Table 3.4 — External-cooling response", page: 31 },
  { label: "Table 3.5 — Jet-velocity sweep", page: 32 },
  { label: "Table 3.6 — Intermediate package-level cooling results", page: 34 },
  { label: "Table 3.7 — Thermophysical properties", page: 40 },
  { label: "Table 3.8 — Boundary and initial conditions", page: 43 },
  { label: "Table 3.9 — Baseline configuration", page: 44 },
  { label: "Table 3.10 — Selected configuration", page: 45 },
  { label: "Table 3.11 — Parameter studies and fixed conditions", page: 46 },
  { label: "Table 3.12 — Mesh levels", page: 48 },
  { label: "Table 4.1 — Baseline and selected screening metrics", page: 60 },
  { label: "Table 4.2 — Microchannel mass-flow sweep", page: 61 },
  { label: "Table 4.3 — Channel-count sweep", page: 63 },
  { label: "Table 4.4 — Open-fraction sweep", page: 67 },
  { label: "Table 4.5 — JPR/array-density sweep", page: 69 },
  { label: "Table 4.6 — Baseline vs. selected configuration", page: 72 },
  { label: "Table 4.7 — Mesh sensitivity", page: 79 },
  { label: "Table 4.8 — Laminar-SST sensitivity", page: 81 },
  { label: "Table 4.9 — Design rules", page: 84 },
  { label: "Table 4.10 — Validation summary", page: 86 },
  { label: "Table A.1 — Reproducibility archive contents", page: 100 },
];

const archiveBase = (import.meta.env.VITE_THESIS_ARCHIVE_BASE_URL || "").replace(/\/$/, "");

export const thesisArchiveFiles = [
  {
    name: "thesis_results_plots.ipynb",
    type: "Jupyter Notebook",
    description: "Primary reproducible plotting notebook for the thesis parameter studies and numerical audit.",
    path: "postprocessing/thesis_results_plots.ipynb",
    available: false,
    contents: ["thesis_results_plots.ipynb"],
  },
  {
    name: "COMSOL model archive",
    type: "COMSOL Multiphysics",
    description: "Baseline, parameter sweeps, selected configuration, mesh-sensitivity, and exploratory flow-model files.",
    path: "comsol/comsol-models.zip",
    available: false,
    contents: [
      "Baseline configuration model",
      "Parameter-sweep models",
      "Selected hybrid configuration model",
      "Coarse / normal / fine mesh-sensitivity models",
      "Exploratory SST flow-model sensitivity model",
    ],
  },
  {
    name: "Parameter-study CSV exports",
    type: "Data archive",
    description: "Original COMSOL CSV exports used for the mass-flow, channel-count, edge-margin, open-fraction, JPR, baseline, selected, and mesh studies.",
    path: "data/parameter-study-csvs.zip",
    available: false,
    contents: [
      "3D_Channel_mdot_sweep.csv",
      "3D_Channel_N_sweep.csv",
      "3D_Channel_edgemargin_sweep.csv",
      "3D_Open_area_sweep.csv",
      "3D_JPR_sweep.csv",
      "3D_Parametrized_Coarse.csv",
      "3D_Parametrized_Normal.csv",
      "3D_Parametrized_Fine.csv",
      "3D_Basic.csv",
      "3D_Hybrid_final.csv",
    ],
  },
  {
    name: "Figure source archive",
    type: "Figures / source data",
    description: "Notebook-generated PNGs, COMSOL image exports, and source materials used for thesis figures.",
    path: "figures/thesis-figure-sources.zip",
    available: false,
    contents: [
      "Notebook-generated 300-dpi PNG files",
      "COMSOL temperature / velocity / pressure exports",
      "Geometry and mesh images",
      "Composite figure source files",
    ],
  },
];

export function archiveUrl(path) {
  if (!archiveBase) return null;
  return `${archiveBase}/${path.replace(/^\//, "")}`;
}

export function pdfPageLabel(page) {
  if (page === 1) return "Title page";
  if (page >= 15) return `Thesis p. ${page - 14}`;
  const romans = ["", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv"];
  return `Front matter p. ${romans[page] || page}`;
}
