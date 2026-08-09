export const MEDIA_BASE_URL = "https://media.eliothunter.com/videos/martial-arts";
export const DOWNLOAD_BASE_URL = "https://download.eliothunter.com/videos/martial-arts";

export const martialArtsVideos = [
  "01166af704d16f93066caa41becfae4ac79bb859c7.mp4",
  "011f8d3bc4bf405305a43f4c7f6f5a49f09ce6fd07.mp4",
  "013757206bdc9ed7bb0ddc53cf1d9e04428d93f99e.mp4",
  "0142454cfdc262c12f28e0c21d0572a5d3c8a15942.mp4",
  "01531ddb08c5db54e7f64205899899683d70080bb9.mp4",
  "0154ef812a49ded20f8105b1aaa733452186ea086c.mp4",
  "0156ccb256ff9e31786ea6d69f0fa88e621f853b3e.mp4",
  "0158dc31453c7bcb637112ed69d303e1ce39e0b0c8.mp4",
  "016af350f60ea353fd9fa885c820d483169c7c3509.mp4",
  "01704800181aef83b1493a5f25e33a12333f7fd838.mp4",
  "0195613c7f576c0decfce3b82f7460f3b3d158b9b2.mp4",
  "01c7b2c0353827815d2a11c5988bae817f8bd3d340.mp4",
  "01dc7595374a34d207e3e8e5fbc0249da2d12cccca.mp4",
  "01dee6baff913f128163c616b284731283a2fb3d94.mp4",
  "01e1622c08274bcebe04ddeec6d2945b2b1a21ec06.mp4",
  "01f7449c28411c523655a8220b9bc1d2464bc96741.mp4",
  "EBH_0011.MOV_Rendered.mp4",
  "EBH_0011.MOV_Rendered_001.mp4",
  "EBH_0011.MOV_Rendered_002.mp4",
  "EBH_0011.MOV_Rendered_003.mp4",
  "EBH_0012.MOV_Rendered.mp4",
  "EBH_0012.MOV_Rendered_001.mp4",
  "EBH_0012.MOV_Rendered_002.mp4",
  "EBH_0013.MOV_Rendered.mp4",
  "EBH_0034.MOV_Rendered.mp4",
  "EBH_0035.MOV_Rendered.mp4",
  "EBH_0036.MOV_Rendered.mp4",
  "EBH_0037.MOV_Rendered.mp4"
].map((file, index) => ({
  id: `video-${String(index + 1).padStart(2, "0")}`,
  title: file.startsWith("EBH_")
    ? file.replace(".MOV_Rendered", "").replace(/_00([1-9])$/, " — Part $1").replace(".mp4", "")
    : `Martial Arts Video ${String(index + 1).padStart(2, "0")}`,
  file,
  description: "",
  date: ""
}));

export function videoUrl(file) {
  return `${MEDIA_BASE_URL}/${encodeURIComponent(file)}`;
}

export function downloadUrl(file) {
  return `${DOWNLOAD_BASE_URL}/${encodeURIComponent(file)}`;
}
