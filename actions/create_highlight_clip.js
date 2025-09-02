import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/create_highlight_clip`,
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
        content_type: bundle.inputData.content_type || "spoken_content",
      }),
    }
  );

  return response.json();
};

export const createHighlightClip = {
  key: "create_highlight_clip",
  noun: "Highlight Clip",
  display: {
    label: "Create Highlight Clip",
    description:
      "Creates a highlight clip from a video based on a prompt using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "Video ID to generate clip from",
      },
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "Prompt to generate clip",
      },
      {
        key: "content_type",
        required: false,
        type: "string",
        label: "Content Type",
        default: "spoken_content",
        choices: {
          spoken_content: "Spoken Content",
          visual_content: "Visual Content",
          multimodal: "Multimodal",
        },
        helpText: "Type of content based on which clip is to be generated",
      },
    ],
    perform,
    sample: {
      stream_url: "https://stream.videodb.io/video/highlight_clip.mp4",
      download_url: "https://download.videodb.io/video/highlight_clip.mp4",
    },
  },
};
