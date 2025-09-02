import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
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
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return [];
    }

    return data.result_timestamps || [];
  } catch (error) {
    return [];
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
    ],
    perform,
    sample: {
      stream_url: "https://stream.example.com/clip1",
      download_url: "https://download.example.com/clip1.mp4",
      start: 10.5,
      end: 25.3,
      text: "This is the text content of the first moment",
    },
  },
};
