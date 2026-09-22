export type ServiceState<T> = { status: "not-connected"; data: null; message: string } | { status: "ready"; data: T; message: string };
export type UploadedImage = { file: File; previewUrl: string; width?: number; height?: number };
export type QualityAssessment = { quality: "Good" | "Acceptable" | "Insufficient"; notes: string[] };
export type DrPrediction = { severity: string; referable: boolean; confidence: number };
export type LesionEvidence = { label: string; maskUrl: string }[];
export type ExplainabilityResult = { gradCamUrl: string; summary: string };
export type GeneratedReport = { fileName: string; downloadUrl: string };

const unavailable = <T>(service: string): ServiceState<T> => ({ status: "not-connected", data: null, message: `${service} is not connected in Phase 1.` });

export interface ScreeningServices {
  uploadImage(file: File): Promise<ServiceState<UploadedImage>>;
  assessImageQuality(image: UploadedImage): Promise<ServiceState<QualityAssessment>>;
  predictDr(image: UploadedImage): Promise<ServiceState<DrPrediction>>;
  detectLesions(image: UploadedImage): Promise<ServiceState<LesionEvidence>>;
  generateGradCam(image: UploadedImage): Promise<ServiceState<ExplainabilityResult>>;
  generateReport(screeningId: string): Promise<ServiceState<GeneratedReport>>;
}

export const screeningServices: ScreeningServices = {
  async uploadImage() { return unavailable("Image upload service"); },
  async assessImageQuality() { return unavailable("Image quality model"); },
  async predictDr() { return unavailable("DR classifier"); },
  async detectLesions() { return unavailable("Lesion detection model"); },
  async generateGradCam() { return unavailable("Explainability engine"); },
  async generateReport() { return unavailable("Report generation service"); },
};
