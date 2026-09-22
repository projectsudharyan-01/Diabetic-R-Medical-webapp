import type { PatientRecord, ScreeningRecord } from "./types";

export const screenings: ScreeningRecord[] = [
  { id: "SCR-DEMO-1048", patientId: "PT-DEMO-284", date: "22 Sep 2026", time: "14:42", eye: "Left", severity: "Moderate", referable: true, reviewStatus: "Pending review", imageQuality: "Good" },
  { id: "SCR-DEMO-1047", patientId: "PT-DEMO-119", date: "22 Sep 2026", time: "13:18", eye: "Right", severity: "No DR", referable: false, reviewStatus: "Reviewed", imageQuality: "Good" },
  { id: "SCR-DEMO-1046", patientId: "PT-DEMO-502", date: "22 Sep 2026", time: "11:05", eye: "Left", severity: "Pending", referable: null, reviewStatus: "Manual review", imageQuality: "Insufficient" },
  { id: "SCR-DEMO-1045", patientId: "PT-DEMO-337", date: "21 Sep 2026", time: "16:24", eye: "Right", severity: "Mild", referable: false, reviewStatus: "Reviewed", imageQuality: "Acceptable" },
  { id: "SCR-DEMO-1044", patientId: "PT-DEMO-071", date: "21 Sep 2026", time: "10:51", eye: "Left", severity: "Severe", referable: true, reviewStatus: "Manual review", imageQuality: "Acceptable" },
];

export const patients: PatientRecord[] = screenings.map((item, index) => ({
  ...item,
  age: [58, 46, 63, 51, 69][index] ?? 50,
  sex: (["Female", "Male", "Female", "Other", "Male"] as const)[index] ?? "Other",
}));

export const trendData = [
  { day: "Mon", screenings: 14 }, { day: "Tue", screenings: 18 }, { day: "Wed", screenings: 16 },
  { day: "Thu", screenings: 24 }, { day: "Fri", screenings: 21 }, { day: "Sat", screenings: 12 }, { day: "Sun", screenings: 19 },
];
export const severityData = [
  { name: "No DR", value: 52 }, { name: "Mild", value: 21 }, { name: "Moderate", value: 14 },
  { name: "Severe", value: 8 }, { name: "Proliferative", value: 5 },
];
export const qualityData = [
  { name: "Good", value: 68 }, { name: "Acceptable", value: 24 }, { name: "Insufficient", value: 8 },
];
