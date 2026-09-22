import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/analyze")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const image = formData.get("image");

          if (!(image instanceof File)) {
            return new Response(
              JSON.stringify({
                success: false,
                error: "No image was provided.",
              }),
              {
                status: 400,
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
          }

          console.log(
            `DR-Assist received image: ${image.name} (${image.size} bytes)`,
          );

          return new Response(
            JSON.stringify({
              success: true,
              message: "Fundus image received successfully.",
              filename: image.name,
              size: image.size,
              type: image.type,
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        } catch (error) {
          console.error("Analysis API error:", error);

          return new Response(
            JSON.stringify({
              success: false,
              error: "Unable to process the image.",
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        }
      },
    },
  },
});