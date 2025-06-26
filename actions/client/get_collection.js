import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );
  const result = await response.json();
  return [result.data];
};

export const getCollection = {
  key: "get_collection",
  noun: "Collection",
  display: {
    label: "Get Collection",
    description: "Fetches a single collection by its ID.",
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
      id: "c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      name: "Collection Name",
      description: "Description",
      is_public: false,
    },
  },
};
