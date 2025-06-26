import { VIDEO_DB_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.image}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  return data.data.images;
};

export const getImagesTrigger = {
  key: "get_images",
  noun: "Image",
  display: {
    label: "Get Images from Collection",
    description: "Retrieves a list of all images within a collection.",
    hidden: true,
  },
  operation: {
    type: "polling",
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
      id: "img-xxxxxxxxx",
      collection_id: "c-yyyyyyyyy",
      name: "my_cat.jpg",
      url: "https://image.videodb.io/img-xxxxxxxxx/image.jpg",
    },
  },
};
