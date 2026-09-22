import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BrainCircuit, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/features/screening/image-upload";
import {
  NotConnected,
  PageHeader,
  SectionHeading,
} from "@/components/dr-assist/ui";

export const Route = createFileRoute("/screening/new")({
  head: () => ({
    meta: [
      { title: "New Screening — DR-Assist" },
      {
        name: "description",
        content:
          "Create a temporary retinal screening record in the DR-Assist prototype.",
      },
      { property: "og:title", content: "New Screening — DR-Assist" },
      {
        property: "og:description",
        content: "Prototype retinal screening intake workflow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewScreening,
});

const label = "mb-2 block text-xs font-medium text-muted-foreground";

function NewScreening() {
  const nav = useNavigate();

  const [patient, setPatient] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);



  useEffect(() => {
  if (!imageFile) {
    sessionStorage.removeItem("dr-assist-uploaded-image");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result === "string") {
      sessionStorage.setItem(
        "dr-assist-uploaded-image",
        reader.result
      );
    }
  };

  reader.readAsDataURL(imageFile);
}, [imageFile]);

  const ready = imageFile !== null && patient.trim() !== "";

  return (
    <>
      <PageHeader
        eyebrow="Screening workflow · Step 1 of 2"
        title="New screening"
        description="Create a temporary screening record and prepare a fundus image for the future AI pipeline."
      />

      <NotConnected />

      <div className="mt-6 grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        {/* PATIENT INFORMATION */}
        <Card className="clinical-card">
          <CardContent className="p-5">
            <SectionHeading
              title="Patient information"
              description="Required fields are used only in this browser session."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={label}>Patient ID</span>
                <Input
                  required
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  placeholder="e.g. PHC-0001"
                />
              </label>

              <label>
                <span className={label}>Age</span>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Years"
                />
              </label>

              <label>
                <span className={label}>Sex</span>
                <select className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">Select</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                <span className={label}>Diabetes duration</span>
                <Input
                  type="number"
                  min="0"
                  placeholder="Years"
                />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className={label}>Eye selection</legend>

              <div className="grid grid-cols-2 gap-2">
                {["Left", "Right"].map((x) => (
                  <label
                    key={x}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <input type="radio" name="eye" value={x} />
                    {x} eye
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block">
              <span className={label}>Optional notes</span>

              <textarea
                rows={5}
                placeholder="Relevant screening notes"
                className="w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-hidden focus:ring-1 focus:ring-ring"
              />
            </label>
          </CardContent>
        </Card>

        {/* FUNDUS IMAGE */}
        <Card className="clinical-card">
          <CardContent className="p-5">
            <SectionHeading
              title="Fundus image"
              description="Upload a retinal/fundus photograph for quality assessment."
            />

            <ImageUpload
              file={imageFile}
              onFileChange={setImageFile}
            />
          </CardContent>
        </Card>
      </div>

      {/* ANALYZE BUTTON */}
      <div className="mt-6 flex flex-col items-end gap-2">
        <Button
          size="lg"
          disabled={!ready}
        onClick={async () => {
  if (!imageFile) return;

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    console.log("DR-Assist API result:", result);

    if (!response.ok) {
      alert(result.error || "Image analysis failed.");
      return;
    }

    nav({
      to: "/analysis/$screeningId",
      params: { screeningId: "SCR-PREVIEW" },
    });
  } catch (error) {
    console.error(error);
    alert("Could not connect to the analysis service.");
  }
}}
        >
          <BrainCircuit />
          Analyze Image
          <ChevronRight />
        </Button>

        <p className="text-[11px] text-muted-foreground">
          Opens a clearly labeled demonstration result; no AI request is made.
        </p>
      </div>
    </>
  );
}