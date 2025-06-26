import { VIDEO_DB_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.collection}`, {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });
  const result = await response.json();
  return result.data.collections;
};

export const getCollectionsTrigger = {
  key: "get_collections",
  noun: "Collection",
  display: {
    label: "Get Collections",
    description: "Fetches all collections for the user.",
    hidden: true,
  },
  operation: {
    type: "polling",
    inputFields: [],
    perform,
    sample: {
      id: "c-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      name: "Collection Name",
      description: "Description",
      is_public: false,
    },
  },
};
