
export type AspectRatio = "16:9" | "9:16" | "4:3" | "3:4" | "1:1";

export interface GenerationParams {
  script: string;
  scenes: string;
  niche: string;
  styleKeywords: string;
  aspectRatio: AspectRatio;
  styleImage: {
    base64: string;
    mimeType: string;
  } | null;
}
