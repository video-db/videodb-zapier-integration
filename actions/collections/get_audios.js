import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.audio}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  // The API returns an object with a `data` property which is an array of audios.
  // Zapier expects an array of objects to be returned from a search.
  return data.data.audios;
};

export const getAudios = {
  key: "get_audios",
  noun: "Audio",
  display: {
    label: "Find Audios",
    description: "Find all audio assets within a collection.",
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
