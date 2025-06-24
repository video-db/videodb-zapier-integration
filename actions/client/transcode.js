import { VIDEO_DB_API } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    source: bundle.inputData.source,
    callback_url: bundle.inputData.callback_url,
    mode: bundle.inputData.mode,
    video_config: bundle.inputData.video_config,
    audio_config: bundle.inputData.audio_config,
  };
  const response = await fetch(`${VIDEO_DB_API}/transcode`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result.data;
};

export const transcode = {
  key: "transcode",
  noun: "Transcode",
  display: {
    label: "Request Transcode Job",
    description: "Requests a transcode job for a given source video.",
  },
  operation: {
    inputFields: [
      {
        key: "source",
        required: true,
        type: "string",
        label: "Source Video URL",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
      },
      {
        key: "mode",
        required: false,
        type: "string",
        label: "Mode",
        choices: ["economy", "high_quality"],
      },
      {
        key: "video_config",
        required: false,
        type: "string",
        label: "Video Config (JSON)",
      },
      {
        key: "audio_config",
        required: false,
        type: "string",
        label: "Audio Config (JSON)",
      },
    ],
    perform,
    sample: {
      job_id: "job-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  },
};
