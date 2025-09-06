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
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/auto_dub`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
        language_code: bundle.inputData.language_code,
        callback_url: bundle.inputData.callback_url,
        target_labels: targetLabels,
      }),
    }
  );

  return response.json();
};

export const autoDub = {
  key: "auto_dub",
  noun: "Dubbed Video",
  display: {
    label: "Auto-Dub Video",
    description: "Dubs a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to dub",
      },
      {
        key: "language_code",
        required: false,
        type: "string",
        label: "Language Code",
        helpText: 'The language code for dubbing (defaults to "en")',
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
        helpText: "The URL to call when the dubbing is ready (optional)",
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
