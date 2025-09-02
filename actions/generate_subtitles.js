import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
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
    ],
    perform,
    sample: {
      subtitle_text:
        "1\n00:00:00,000 --> 00:00:03,000\nHello, welcome to this video.\n\n2\n00:00:03,000 --> 00:00:06,000\nToday we will discuss important topics.",
    },
  },
};
