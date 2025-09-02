import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.search}/video_qna`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
        question: bundle.inputData.question,
      }),
    }
  );

  return response.json();
};

export const videoQna = {
  key: "video_qna",
  noun: "Video Q&A",
  display: {
    label: "Ask Video (Q&A)",
    description: "Get the Q&A for a video.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to get the Q&A for",
      },
      {
        key: "question",
        required: true,
        type: "string",
        label: "Question",
        helpText: "The question to ask the video",
      },
    ],
    perform,
    sample: {
      answer:
        "The video discusses machine learning fundamentals including supervised learning, unsupervised learning, and neural networks. The presenter explains that supervised learning uses labeled data to train models, while unsupervised learning finds patterns in unlabeled data.",
      highlight_clips: [
        {
          stream_url: "https://stream.videodb.io/m-xxxxxxxxx/stream.m3u8",
          download_url: "https://download.videodb.io/m-xxxxxxxxx/clip.mp4",
          start_time: 30.0,
          end_time: 45.0,
          description: "Explanation of supervised learning concepts",
        },
      ],
    },
  },
};
