import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/generate_video`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        prompt: bundle.inputData.prompt,
        duration: bundle.inputData.duration,
      }),
    }
  );

  return response.json();
};

export const generateVideo = {
  key: "generate_video",
  noun: "Video",
  display: {
    label: "Generate Video",
    description: "Generates a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "Prompt to generate the video",
      },
      {
        key: "duration",
        required: true,
        type: "integer",
        label: "Duration",
        helpText: "Duration of the video in seconds",
      },
    ],
    perform,
    sample: {
      job_id: "job_12345",
    },
  },
};
