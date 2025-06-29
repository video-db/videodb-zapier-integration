import { VIDEO_DB_API } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const video_config = {
    resolution: bundle.inputData.resolution || undefined,
    quality:
      bundle.inputData.quality !== undefined &&
      bundle.inputData.quality !== null
        ? bundle.inputData.quality
        : 23,
    framerate: bundle.inputData.framerate || undefined,
    resize_mode: bundle.inputData.resize_mode || "crop",
  };
  const audio_config = {
    mute:
      bundle.inputData.mute !== undefined && bundle.inputData.mute !== null
        ? bundle.inputData.mute
        : false,
  };
  const data = {
    source: bundle.inputData.source,
    callback_url: bundle.inputData.callback_url,
    mode: bundle.inputData.mode,
    video_config,
    audio_config,
  };
  const response = await fetch(`${VIDEO_DB_API}/transcode`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
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
        required: true,
        type: "string",
        label: "Callback URL",
      },
      {
        key: "mode",
        required: false,
        type: "string",
        label: "Mode",
        choices: ["lightning", "economy"],
      },
      // Video Config fields
      {
        key: "resolution",
        required: false,
        type: "integer",
        label: "Resolution",
        helpText: "e.g., 1080 for 1080p, 720 for 720p, etc.",
      },
      {
        key: "quality",
        required: false,
        type: "integer",
        label: "Quality",
        helpText: "Lower is better quality. Default is 23.",
      },
      {
        key: "framerate",
        required: false,
        type: "integer",
        label: "Framerate",
        helpText: "Frames per second (fps)",
      },
      {
        key: "resize_mode",
        required: false,
        type: "string",
        label: "Resize Mode",
        choices: ["crop", "fit", "pad"],
      },
      // Audio Config fields
      {
        key: "mute",
        required: false,
        type: "boolean",
        label: "Mute Audio",
        helpText: "Mute the audio track (default: false)",
      },
    ],
    perform,
    sample: {
      job_id: "job-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  },
};
