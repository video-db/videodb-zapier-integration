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
  try {
    const response = await fetch(
      `${ZAPIER_BACKEND_API}/${ApiPath.search}/find_video_moment`,
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
          content_type: bundle.inputData.content_type,
          callback_url: bundle.inputData.callback_url,
          target_labels: targetLabels,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const findVideoMoment = {
  key: "find_video_moment",
  noun: "Video Moment",
  display: {
    label: "Find Video Moment",
    description:
      "Finds relevant video moments based on a user prompt using AI-powered content analysis.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to search for moments",
      },
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "The prompt to use for finding relevant moments",
      },
      {
        key: "content_type",
        required: false,
        type: "string",
        label: "Content Type",
        helpText:
          "Type of content analysis to use. spoken_content: based on transcript, visual_content: based on visual description, multimodal: based on both transcript and visual description",
        choices: {
          spoken_content: "Spoken Content",
          visual_content: "Visual Content",
          multimodal: "Multimodal",
        },
        default: "spoken_content",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
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
    sample: {
      job_id: "job_12345",
    },
  },
};
