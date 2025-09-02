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

  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/upload_index`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_name: bundle.inputData.video_name,
        video_url: bundle.inputData.video_url,
        prompt: bundle.inputData.prompt,
        callback_url: bundle.inputData.callback_url,
        target_labels: targetLabels,
      }),
    }
  );

  return response.json();
};

export const uploadIndex = {
  key: "upload_index",
  noun: "Index",
  display: {
    label: "Upload & Index",
    description: "Upload an index to the database (async, same Lambda).",
  },
  operation: {
    inputFields: [
      {
        key: "video_name",
        required: true,
        type: "string",
        label: "Video Name",
        helpText: "The name of the video",
      },
      {
        key: "video_url",
        required: true,
        type: "string",
        label: "Video URL",
        helpText: "The URL of the video to upload",
      },
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "The prompt to use for the index",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
        helpText:
          "The URL to call when the upload and index is done (optional)",
      },

      {
        key: "target_labels",
        required: false,
        type: "string",
        label: "Target Labels",
        helpText: "Add one or more labels. Use “Add item” to enter more.",
        list: true,
      },
    ],
    perform,
    sample: { job_id: "job_12345" },
  },
};
