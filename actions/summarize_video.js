import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/summarize_video`,
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

export const summarizeVideo = {
  key: "summarize_video",
  noun: "Summary",
  display: {
    label: "Summarize Video",
    description: "Summarizes a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to summarize",
      },
      {
        key: "prompt",
        required: false,
        type: "string",
        label: "Prompt",
        helpText: "Optional prompt to use for summarization",
      },
    ],
    perform,
    sample: {
      text: "This video discusses the fundamentals of machine learning, covering topics such as supervised learning, unsupervised learning, and neural networks. The presenter explains key concepts with practical examples and demonstrates how to implement basic algorithms.",
    },
  },
};
