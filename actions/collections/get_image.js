import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.image}/${bundle.inputData.image_id}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
    }
  );

  const data = await response.json();
  // A search action should return an array of objects.
  // Since we are fetching a single image, we return it in an array.
  return [data.data];
};

export const getImage = {
  key: "get_image",
  noun: "Image",
  display: {
    label: "Get Image",
    description: "Retrieves a specific image by its ID from a collection.",
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
        key: "image_id",
        required: true,
        type: "string",
        label: "Image ID",
        dynamic: "get_images.id.name",
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
