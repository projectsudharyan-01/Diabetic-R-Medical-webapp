import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Upload, X, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

type QualityStatus = "checking" | "good" | "warning" | "ungradable";

type Props = {
  file: File | null;
  onFileChange: (file: File | null) => void;
};

type QualityResult = {
  status: QualityStatus;
  width: number;
  height: number;
  brightness: number;
  sharpness: number;
  messages: string[];
};

export function ImageUpload({ file, onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<QualityResult | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      setQuality(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(500 / img.width, 500 / img.height, 1);

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const data = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

      let brightness = 0;

      for (let i = 0; i < data.length; i += 4) {
        brightness +=
          0.299 * data[i] +
          0.587 * data[i + 1] +
          0.114 * data[i + 2];
      }

      brightness /= data.length / 4;

      const messages: string[] = [];

      if (img.width < 800 || img.height < 600) {
        messages.push("Image resolution is relatively low.");
      }

      if (brightness < 35) {
        messages.push("Image appears too dark.");
      }

      if (brightness > 220) {
        messages.push("Image appears too bright.");
      }

      const status: QualityStatus =
        messages.length >= 2
          ? "ungradable"
          : messages.length === 1
            ? "warning"
            : "good";

      setQuality({
        status,
        width: img.width,
        height: img.height,
        brightness: Math.round(brightness),
        sharpness: 0,
        messages,
      });
    };

    img.src = url;

    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    onFileChange(selected);
  }

  function removeImage() {
    onFileChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">

      {!file && (
        <label
          htmlFor="fundus-upload"
          className="flex min-h-[270px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-input bg-background/40 p-8 text-center transition hover:border-cyan-500 hover:bg-cyan-500/5"
        >
          <div className="mb-4 rounded-full bg-cyan-500/10 p-4">
            <Upload className="h-8 w-8 text-cyan-400" />
          </div>

          <p className="text-base font-medium">
            Upload fundus image
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Click here or drag and drop an image
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            JPG, JPEG or PNG
          </p>

          <input
            ref={inputRef}
            id="fundus-upload"
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {file && preview && (
        <>
          <div className="relative overflow-hidden rounded-xl border border-input">
            <img
              src={preview}
              alt="Uploaded fundus image"
              className="max-h-[400px] w-full object-contain bg-black"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white hover:bg-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {quality && (
            <Card className="p-4">
              <div className="flex items-center gap-2">
                {quality.status === "good" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                )}

                <span className="font-medium">
                  {quality.status === "good"
                    ? "Image quality acceptable"
                    : quality.status === "warning"
                      ? "Image quality warning"
                      : "Image may be ungradable"}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Resolution</p>
                  <p>
                    {quality.width} × {quality.height}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Brightness</p>
                  <p>{quality.brightness}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">File</p>
                  <p className="truncate">{file.name}</p>
                </div>
              </div>

              {quality.messages.length > 0 && (
                <div className="mt-3 text-sm text-yellow-400">
                  {quality.messages.map((message) => (
                    <p key={message}>• {message}</p>
                  ))}
                </div>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );
}