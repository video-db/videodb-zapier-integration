import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}`,
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

export const deleteCollection = {
  key: "delete_collection",
  noun: "Collection",
  display: {
    label: "Delete Collection",
    description: "Deletes a collection and all its assets.",
    hidden: false,
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
      data: {},
      success: true,
    },
  },
};
