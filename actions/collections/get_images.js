import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.image}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
    }
  );

  const data = await response.json();
  // The API returns an object with a `data` property which is an array of images.
  // Zapier expects an array of objects to be returned from a search.
  return data.data.images;
};

export const getImages = {
  key: "get_images",
  noun: "Image",
  display: {
    label: "Get Images",
    description: "Retrieves a list of all images within a collection.",
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
      id: "img-xxxxxxxxx",
      collection_id: "c-yyyyyyyyy",
      name: "my_cat.jpg",
      url: "https://image.videodb.io/img-xxxxxxxxx/image.jpg",
    },
  },
};
