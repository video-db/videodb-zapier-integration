import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.image}/${bundle.inputData.image_id}?collection_id=${bundle.inputData.collection_id}`,
    {
      method: "DELETE",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
    }
  );

  return response.json();
};

export const deleteImage = {
  key: "delete_image",
  noun: "Image",
  display: {
    label: "Delete Image From Collection",
    description: "Deletes a specific image by its ID from a collection.",
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
      data: {},
      success: true,
    },
  },
};
