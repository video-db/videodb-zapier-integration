import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/add_watermark`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
        watermark_url: bundle.inputData.watermark_url,
        position: bundle.inputData.position || "bottom-right",
      }),
    }
  );

  return response.json();
};

export const addWatermark = {
  key: "add_watermark",
  noun: "Watermark",
  display: {
    label: "Add Overlay / Watermark",
    description: "Adds a watermark to a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to add watermark to",
      },
      {
        key: "watermark_url",
        required: true,
        type: "string",
        label: "Watermark URL",
        helpText: "URL of the watermark image to add",
      },
      {
        key: "position",
        required: false,
        type: "string",
        label: "Position",
        default: "bottom-right",
        choices: {
          "top-left": "Top Left",
          "top-right": "Top Right",
          "bottom-left": "Bottom Left",
          "bottom-right": "Bottom Right",
          center: "Center",
        },
        helpText: "Position of the watermark on the video",
      },
    ],
    perform,
    sample: {
      stream_url: "https://stream.videodb.io/video/watermarked_video.mp4",
      download_url: "https://download.videodb.io/video/watermarked_video.mp4",
    },
  },
};
