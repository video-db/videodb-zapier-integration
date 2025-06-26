import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    prompt: bundle.inputData.prompt,
    duration: bundle.inputData.duration,
    audio_type: "music",
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/generate/audio`,
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
  return result.data;
};

export const generateMusic = {
  key: "generate_music",
  noun: "Music",
  display: {
    label: "Generate Music",
    description: "Generates music from a text prompt.",
  },
  operation: {
    inputFields: [
      {
        key: "collection_id",
        required: true,
        type: "string",
        label: "Collection ID",
        dynamic: "get_collections.id.name",
      },
      { key: "prompt", required: true, type: "string", label: "Prompt" },
      {
        key: "duration",
        required: false,
        type: "integer",
        label: "Duration (seconds)",
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
      id: "a-generated-xxxx",
      collection_id: "c-yyyyyyyyy",
      name: "lo-fi hip hop beat, calm and relaxing.mp3",
      length: 60.0,
    },
  },
};
