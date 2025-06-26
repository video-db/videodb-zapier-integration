import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.audio}/${bundle.inputData.audio_id}`,
    {
      method: "DELETE",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  return response.json();
};

export const deleteAudio = {
  key: "delete_audio_action",
  noun: "Audio",
  display: {
    label: "Delete Audio",
    description: "Permanently deletes an audio file.",
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
      success: true,
      data: {},
    },
  },
};
