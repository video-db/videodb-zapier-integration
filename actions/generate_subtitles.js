import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const raw = bundle.inputData.target_labels;

  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/generate_subtitles`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
        animation: bundle.inputData.animation || "supersize",
        alignment: bundle.inputData.alignment || "bottom_center",
        margin_l: Number(bundle.inputData.margin_l) || 40,
        margin_r: Number(bundle.inputData.margin_r) || 40,
        margin_v: Number(bundle.inputData.margin_v) || 120,
        font_size: Number(bundle.inputData.font_size) || 16,
        bold:
          bundle.inputData.bold === "true" || bundle.inputData.bold === true,
      }),
    }
  );

  return response.json();
};

export const generateSubtitles = {
  key: "generate_subtitles",
  noun: "Subtitles",
  display: {
    label: "Generate Subtitles",
    description: "Generates subtitles for a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to generate subtitles for",
      },
      {
        key: "animation",
        required: false,
        type: "string",
        label: "Caption Animation",
        helpText: "Caption animation preset",
        choices: [
          "box_highlight",
          "color_highlight",
          "reveal",
          "karioke",
          "impact",
          "supersize",
        ],
        default: "supersize",
      },
      {
        key: "alignment",
        required: false,
        type: "string",
        label: "Caption Alignment",
        helpText: "Caption alignment preset",
        choices: [
          "top_left",
          "top_center",
          "top_right",
          "middle_left",
          "middle_center",
          "middle_right",
          "bottom_left",
          "bottom_center",
          "bottom_right",
        ],
        default: "bottom_center",
      },
      {
        key: "margin_l",
        required: false,
        type: "integer",
        label: "Left Margin",
        helpText: "Left margin for captions in pixels",
        default: "40",
      },
      {
        key: "margin_r",
        required: false,
        type: "integer",
        label: "Right Margin",
        helpText: "Right margin for captions in pixels",
        default: "40",
      },
      {
        key: "margin_v",
        required: false,
        type: "integer",
        label: "Vertical Margin",
        helpText: "Vertical margin for captions in pixels",
        default: "120",
      },
      {
        key: "font_size",
        required: false,
        type: "integer",
        label: "Font Size",
        helpText: "Caption font size in pixels",
        default: "16",
      },
      {
        key: "bold",
        required: false,
        type: "boolean",
        label: "Bold Font",
        helpText: "Whether caption font is bold",
        default: "false",
      },
    ],
    perform,
    sample: {
      video_id: "vid_123",
      stream_url: "https://stream.videodb.io/video/subtitles.mp4",
      download_url: "https://download.videodb.io/video/subtitles.mp4",
    },
  },
};
