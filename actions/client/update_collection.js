import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    name: bundle.inputData.name,
    description: bundle.inputData.description,
  };
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}`,
    {
      method: "PATCH",
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

export const updateCollection = {
  key: "update_collection",
  noun: "Collection",
  display: {
    label: "Update Collection",
    description: "Updates a collection's name or description.",
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
      { key: "name", required: false, type: "string", label: "New Name" },
      {
        key: "description",
        required: false,
        type: "string",
        label: "New Description",
      },
    ],
    perform,
    sample: {
      id: "c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      name: "New Name",
      description: "New Description",
      is_public: false,
    },
  },
};
