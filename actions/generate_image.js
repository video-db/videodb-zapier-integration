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
    aspect_ratio: bundle.inputData.aspect_ratio || "16:9",
    callback_url: bundle.inputData.callback_url,
    target_labels: targetLabels,
  };

  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/generate_image`,
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

export const generateImage = {
  key: "generate_image",
  noun: "Image",
  display: {
    label: "Generate Image",
    description: "Generates an image from a text prompt.",
  },
  operation: {
    inputFields: [
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
      },
      {
        key: "aspect_ratio",
        required: false,
        type: "string",
        label: "Aspect Ratio",
        choices: ["1:1", "9:16", "16:9", "4:3", "3:4"],
        default: "16:9",
      },
      {
        key: "target_labels",
        required: false,
        type: "string",
        label: "Target Labels",
        helpText: 'Add one or more labels. Use "Add item" to enter more.',
        list: true,
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
      },
    ],
    perform,
    sample: {
      job_id: "job_12345",
    },
  },
};
