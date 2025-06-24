import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    text: bundle.inputData.text,
    audio_type: "voice",
    voice_name: bundle.inputData.voice_name,
    config: bundle.inputData.config,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/generate/audio`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result.data;
};

export const generateVoice = {
  key: "generate_voice",
  noun: "Voice",
  display: {
    label: "Generate Voice",
    description: "Generates voice from text.",
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
      { key: "text", required: true, type: "text", label: "Text" },
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
      id: "a-generated-voice-xxxx",
      collection_id: "c-yyyyyyyyy",
      name: "voice-over.mp3",
      length: 5.7,
    },
  },
};
