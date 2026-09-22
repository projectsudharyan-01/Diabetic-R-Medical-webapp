export type Severity = "No DR" | "Mild" | "Moderate" | "Severe" | "Proliferative" | "Pending";
export type ReviewStatus = "Reviewed" | "Pending review" | "Manual review";
export type ScreeningRecord = {
  id: string;
  patientId: string;
  date: string;
  time: string;
  eye: "Left" | "Right";
  severity: Severity;
  referable: boolean | null;
  reviewStatus: ReviewStatus;
  imageQuality: "Good" | "Acceptable" | "Insufficient" | "Pending";
};
export type PatientRecord = ScreeningRecord & { age: number; sex: "Female" | "Male" | "Other" };
