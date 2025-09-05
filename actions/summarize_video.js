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
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/summarize_video`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
        prompt: bundle.inputData.prompt,
        callback_url: bundle.inputData.callback_url,
        target_labels: targetLabels,
      }),
    }
  );

  return response.json();
};

export const summarizeVideo = {
  key: "summarize_video",
  noun: "Summary",
  display: {
    label: "Summarize Video",
    description: "Summarizes a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to summarize",
      },
      {
        key: "prompt",
        required: false,
        type: "string",
        label: "Prompt",
        helpText: "Optional prompt to use for summarization",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
        helpText: "The URL to call when the summarization is ready",
      },
      {
        key: "target_labels",
        required: false,
        type: "string",
        label: "Target Labels",
        helpText: 'Add one or more labels. Use "Add item" to enter more.',
        list: true,
      },
    ],
    perform,
    sample: {
      job_id: "job_12345",
    },
  },
};
