import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    name: bundle.inputData.name,
    description: bundle.inputData.description,
    is_public: bundle.inputData.is_public,
  };
  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.collection}`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const createCollection = {
  key: "create_collection",
  noun: "Collection",
  display: {
    label: "Create Collection",
    description: "Creates a new collection.",
  },
  operation: {
    inputFields: [
      { key: "name", required: true, type: "string", label: "Collection Name" },
      {
        key: "description",
        required: false,
        type: "string",
        label: "Description",
      },
      {
        key: "is_public",
        required: false,
        type: "boolean",
        label: "Is Public",
      },
    ],
    perform,
    sample: {
      id: "c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      name: "Collection Name",
      description: "Description",
      is_public: false,
    },
  },
};
