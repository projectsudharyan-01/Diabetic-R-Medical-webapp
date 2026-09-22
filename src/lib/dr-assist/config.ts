import { Activity, BarChart3, FileText, LayoutDashboard, Settings2, UserRound, WandSparkles } from "lucide-react";

export const APP_NAME = "DR-Assist";
export const APP_SUBTITLE = "Explainable AI for DR Screening";
export const prototypeLabels = {
  mode: "PROTOTYPE MODE",
  ai: "AI ENGINE NOT CONNECTED",
  data: "DEMO DATA",
} as const;

export const navigation = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "New Screening", to: "/screening/new", icon: WandSparkles },
  { label: "Patients", to: "/patients", icon: UserRound },
  { label: "Reports", to: "/reports", icon: FileText },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "System", to: "/system", icon: Settings2 },
] as const;

export const integrations = [
  { label: "AI engine", detail: "Inference endpoint awaiting configuration", icon: Activity },
  { label: "Dataset", detail: "No retinal image dataset connected", icon: FileText },
  { label: "Image quality model", detail: "Quality assessment service unavailable", icon: Activity },
  { label: "DR classifier", detail: "Severity classifier unavailable", icon: Activity },
  { label: "Explainability engine", detail: "Grad-CAM and lesion services unavailable", icon: Activity },
] as const;
