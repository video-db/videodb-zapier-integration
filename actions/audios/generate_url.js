import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.audio}/${bundle.inputData.audio_id}/generate_url?collection_id=${bundle.inputData.collection_id}`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const result = await response.json();
  return result.data;
};

export const generateAudioUrl = {
  key: "generate_audio_url",
  noun: "Audio",
  display: {
    label: "Generate Audio URL",
    description: "Generates a temporary, signed URL to access the audio file.",
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
      {
        key: "audio_id",
        required: true,
        type: "string",
        label: "Audio ID",
        dynamic: "get_audios.id.name",
      },
    ],
    perform,
    sample: {
      signed_url:
        "https://storage.googleapis.com/videodb-prod-assets/a-xxxxxxxxx/audio.mp3?Expires=1678886400&Signature=...",
    },
  },
};
