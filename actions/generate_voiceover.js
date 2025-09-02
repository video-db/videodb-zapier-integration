import { VIDEODB_SERVER_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    text: bundle.inputData.text,
    audio_type: "voice",
    voice_name: bundle.inputData.voice_name,
    config: bundle.inputData.config,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEODB_SERVER_API}/${ApiPath.collection}/default/generate/audio`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
};

export const generateVoiceover = {
  key: "generate_voiceover",
  noun: "Voiceover",
  display: {
    label: "Generate Voice-Over",
    description: "Generates voice from text.",
  },
  operation: {
    inputFields: [
      {
        key: "text",
        required: true,
        type: "text",
        label: "Text",
      },
      {
        key: "voice_name",
        required: false,
        type: "string",
        label: "Voice Name",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
      },
    ],
    perform,
    sample: {
      success: true,
      status: "processing",
      data: {
        id: "job-123",
        output_url: "https://api.videodb.io/async-response/job-123",
      },
    },
  },
};
