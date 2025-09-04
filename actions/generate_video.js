import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const raw = bundle.inputData.target_labels;
  const targetLabels = Array.isArray(raw)
    ? raw
    : typeof raw === "string" && raw.includes(",")
    ? raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : raw
    ? [String(raw)]
    : [];

  const payload = {
    prompt: bundle.inputData.prompt,
    duration: bundle.inputData.duration,
    target_labels: targetLabels,
    aspect_ratio: bundle.inputData.aspect_ratio || "landscape",
  };

  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/generate_video`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};

export const generateVideo = {
  key: "generate_video",
  noun: "Video",
  display: {
    label: "Generate Video",
    description: "Generates a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "Prompt to generate the video",
      },
      {
        key: "duration",
        required: true,
        type: "integer",
        label: "Duration",
        helpText: "Duration of the video in seconds",
      },
      {
        key: "target_labels",
        required: false,
        type: "string",
        label: "Target Labels",
        helpText: "Add one or more labels. Use “Add item” to enter more.",
        list: true,
      },
      {
        key: "aspect_ratio",
        required: false,
        type: "string",
        label: "Aspect Ratio",
        helpText: "Output aspect ratio for the generated video",
        choices: ["landscape", "square", "vertical"],
        default: "landscape",
      },
    ],
    perform,
    sample: {
      job_id: "job_12345",
    },
  },
};
