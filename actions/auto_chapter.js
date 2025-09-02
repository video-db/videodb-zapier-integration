import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
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
        helpText: "Prompt to guide chapter generation",
      },
    ],
    perform,
    sample: {
      chapters: [
        {
          title: "Introduction",
          description: "Overview of the topic",
          start_time: 0,
          end_time: 120,
        },
        {
          title: "Main Content",
          description: "Detailed explanation of concepts",
          start_time: 120,
          end_time: 480,
        },
        {
          title: "Conclusion",
          description: "Summary and closing remarks",
          start_time: 480,
          end_time: 600,
        },
      ],
    },
  },
};
