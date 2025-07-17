import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.audio}/${bundle.inputData.audio_id}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  // A search action should return an array of objects.
  // Since we are fetching a single audio, we return it in an array.
  return [data.data];
};

export const getAudio = {
  key: "get_audio",
  noun: "Audio",
  display: {
    label: "Find Audio",
    description: "Finds a specific audio asset by its ID from a collection.",
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
      id: "a-xxxxxxxxx",
      collection_id: "c-yyyyyyyyy",
      name: "background_music.mp3",
      length: 180.2,
    },
  },
};
