import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  FileOutput,
  Printer,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DemoLabel,
  NotConnected,
  PageHeader,
  ReviewBadge,
  SeverityBadge,
} from "@/components/dr-assist/ui";
import { Toaster } from "@/components/ui/sonner";

const rows = [
  ["Patient ID", "PT-DEMO-284"],
  ["Age / Sex", "58 / Female"],
  ["Eye", "Left"],
  ["Date & time", "22 Sep 2026 · 14:42"],
  ["Screening ID", "SCR-DEMO-1048"],
  ["Image quality", "Good (demo)"],
];

export const Route = createFileRoute("/reports/$screeningId")({
  head: ({ params }) => ({
    meta: [
      {
        title: `Report ${params.screeningId} — DR-Assist`,
      },
      {
        name: "description",
        content: "Prototype diabetic retinopathy screening report.",
      },
    ],
  }),

  component: Report,
});

function Report() {
  const { screeningId } = Route.useParams();

  const placeholder = () =>
    toast.info(
      "Prototype only — report file generation is not connected.",
    );

  return (
    <>
      <Toaster />

      <div className="no-print">
        <PageHeader
          eyebrow="Clinical documentation"
          title="Screening report"
          description={`Report preview for ${screeningId}. All findings are fictional demonstration values.`}
          action={
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="ghost">
                <Link to="/reports">
                  <ArrowLeft />
                  History
                </Link>
              </Button>

              <Button variant="outline" onClick={placeholder}>
                <FileOutput />
                Generate Report
              </Button>

              <Button
                variant="outline"
                onClick={() => window.print()}
              >
                <Printer />
                Print
              </Button>

              <Button onClick={placeholder}>
                <Download />
                Download PDF
              </Button>
            </div>
          }
        />

        <NotConnected />
      </div>

      <Card className="clinical-card mx-auto mt-6 max-w-5xl print:border-0 print:bg-transparent print:shadow-none">
        <CardContent className="p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row">
            <div>
              <p className="text-xl font-bold">DR-Assist</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Explainable AI for Diabetic Retinopathy Screening
              </p>
            </div>

            <div className="text-left sm:text-right">
              <DemoLabel />

              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {screeningId}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="text-sm font-semibold">
                Patient & screening information
              </h2>

              <dl className="mt-4 divide-y divide-border rounded-md border border-border">
                {rows.map(([key, value]) => (
                  <div
                    className="flex justify-between gap-6 p-3 text-xs"
                    key={key}
                  >
                    <dt className="text-muted-foreground">
                      {key}
                    </dt>

                    <dd className="text-right font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 className="text-sm font-semibold">
                Screening support summary
              </h2>

              <div className="mt-4 space-y-4 rounded-md border border-border p-4">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    DR severity
                  </span>

                  <SeverityBadge value="Moderate" />
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Referable status
                  </span>

                  <span className="text-xs font-semibold text-warning">
                    Referable (demo)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    AI confidence
                  </span>

                  <span className="text-xs font-semibold text-info">
                    87% interface sample
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    Reviewer status
                  </span>

                  <ReviewBadge value="Pending review" />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section>
              <h2 className="text-sm font-semibold">
                Detected evidence
              </h2>

              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                No actual lesion detection has been performed.
                Future microaneurysm, hemorrhage, exudate, and
                vessel findings will appear here.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-semibold">
                Explainability summary
              </h2>

              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                Grad-CAM and lesion-mask services are not connected.
                Visual evidence will be summarized here after
                integration and reviewer assessment.
              </p>
            </section>
          </div>

          <div className="mt-9 flex items-start gap-3 border-t border-border pt-6">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-warning" />

            <div>
              <p className="text-sm font-bold">
                AI screening support — not a definitive diagnosis.
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                This prototype report contains fictional
                demonstration values and must not be used for
                clinical decision-making.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}