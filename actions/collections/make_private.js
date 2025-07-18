import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    is_public: false,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}`,
    {
      method: "PATCH",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  return result;
};

export const makePrivate = {
  key: "make_private",
  noun: "Collection",
  display: {
    label: "Make Collection Private",
    description: "Makes a collection private.",
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
      id: "c-8ef029d5-a926-4859-9cc1-818549b3cb16",
      name: "None's collection",
      description: "A test collection",
      is_public: false,
      owner: "u-a977def6-57a4-40ba-a5de-a2d7cc6be38e",
    },
  },
};
