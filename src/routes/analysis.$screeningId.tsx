import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Expand,
  FileText,
  Focus,
  Layers3,
  Minus,
  Plus,
  ScanEye,
} from "lucide-react";
import { useEffect, useState } from "react";
import demoFundus from "@/assets/demo-fundus.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DemoLabel,
  NotConnected,
  PageHeader,
  SectionHeading,
} from "@/components/dr-assist/ui";

export const Route = createFileRoute("/analysis/$screeningId")({
  head: ({ params }) => ({
    meta: [
      {
        title: `Analysis ${params.screeningId} — DR-Assist`,
      },
      {
        name: "description",
        content: "Prototype retinal analysis and explainability workspace.",
      },
      {
        property: "og:title",
        content: "Analysis — DR-Assist",
      },
      {
        property: "og:description",
        content: "Demo retinal analysis and explainability interface.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),
  component: Analysis,
});

const demo = [
  {
    label: "Image quality",
    value: "Good (demo)",
    tone: "text-success",
  },
  {
    label: "DR severity",
    value: "Moderate (demo)",
    tone: "text-warning",
  },
  {
    label: "Referable status",
    value: "Referable (demo)",
    tone: "text-warning",
  },
  {
    label: "Confidence",
    value: "87% interface sample",
    tone: "text-info",
  },
  {
    label: "Analysis status",
    value: "Demo result only",
    tone: "text-destructive",
  },
];

function Analysis() {
  const { screeningId } = Route.useParams();

  const [zoom, setZoom] = useState(1);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

useEffect(() => {
  const image = sessionStorage.getItem("dr-assist-uploaded-image");

  if (image) {
    setUploadedImage(image);
  }
}, []);

  const views = [
    {
      name: "Original image",
      mode: "",
    },
    {
      name: "Enhanced image",
      mode: "contrast-125 saturate-125",
    },
    {
      name: "Grad-CAM attention map",
      mode: "hue-rotate-90 saturate-200 opacity-80",
    },
    {
      name: "Lesion evidence overlay",
      mode: "contrast-150 saturate-150",
    },
    {
      name: "Vessel / structure overlay",
      mode: "grayscale contrast-200",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Screening workflow · Step 2 of 2"
        title="Analysis workspace"
        description={`Screening ${screeningId} · all visible results are prototype placeholders.`}
        action={
          <Button asChild variant="outline">
            <Link
              to="/reports/$screeningId"
              params={{ screeningId }}
            >
              <FileText />
              Open report
            </Link>
          </Button>
        }
      />

      <NotConnected />

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="clinical-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <SectionHeading
              title="Original fundus image"
              description="Synthetic image for UI demonstration"
              aside={<DemoLabel />}
            />

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Zoom out"
                onClick={() =>
                  setZoom((value) => Math.max(0.7, value - 0.1))
                }
              >
                <Minus />
              </Button>

              <span className="grid min-w-12 place-items-center text-sm">
                {Math.round(zoom * 100)}%
              </span>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Zoom in"
                onClick={() =>
                  setZoom((value) => Math.min(1.8, value + 0.1))
                }
              >
                <Plus />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center overflow-auto bg-black/5 p-6 dark:bg-white/5">
           <img
  src={uploadedImage || demoFundus}
  alt="Fundus photograph"
  className="max-h-[620px] w-full object-contain transition-transform"
  style={{ transform: `scale(${zoom})` }}
/>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="clinical-card">
            <CardContent className="p-5">
              <SectionHeading
                title="Screening summary"
                description="Prototype values only"
              />

              <div className="mt-5 space-y-4">
                {demo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>

                    <span className={`text-sm font-semibold ${item.tone}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="clinical-card">
            <CardContent className="p-5">
              <SectionHeading
                title="Explainability"
                description="Future AI outputs will appear here"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border p-4">
                  <Focus className="mb-3 h-5 w-5" />
                  <p className="font-medium">Grad-CAM</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Attention map for model reasoning.
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <ScanEye className="mb-3 h-5 w-5" />
                  <p className="font-medium">Lesion evidence</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Lesion-level visual evidence.
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <Layers3 className="mb-3 h-5 w-5" />
                  <p className="font-medium">Structure map</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Retinal vessel and structure analysis.
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <Expand className="mb-3 h-5 w-5" />
                  <p className="font-medium">Confidence</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Calibrated confidence will be connected later.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="clinical-card mt-6">
        <CardContent className="p-5">
          <SectionHeading
            title="Analysis views"
            description="Visual layers prepared for future AI integration"
          />

          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {views.map((view) => (
              <div
                key={view.name}
                className="rounded-lg border border-border p-4"
              >
                <div className="mb-3 aspect-video overflow-hidden rounded-md bg-muted">
                  <img
                    src={uploadedImage || demoFundus}
                    alt={view.name}
                    className={`h-full w-full object-cover ${view.mode}`}
                  />
                </div>

                <p className="text-sm font-medium">{view.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}