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
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/auto_chapter`,
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

export const autoChapter = {
  key: "auto_chapter",
  noun: "Chapter",
  display: {
    label: "Auto-Chapter Video",
    description: "Auto generate chapters for a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to generate chapters for",
      },
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "The prompt to use for chapter generation",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
        helpText:
          "The URL to call when the chapter generation is ready (optional)",
      },
      {
        key: "target_labels",
        required: false,
        type: "string",
        label: "Target Labels",
        helpText: "Add one or more labels.",
        list: true,
      },
    ],
    perform,
    sample: { job_id: "job_12345" },
  },
};
