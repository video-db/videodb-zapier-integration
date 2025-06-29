import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.image}/${bundle.inputData.image_id}/generate_url?collection_id=${bundle.inputData.collection_id}`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const result = await response.json();
  return result;
};

export const generateImageUrl = {
  key: "generate_image_url",
  noun: "Image",
  display: {
    label: "Generate Image URL",
    description: "Generates a temporary, signed URL to access the image file.",
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
      signed_url:
        "https://storage.googleapis.com/videodb-prod-assets/img-xxxxxxxxx/image.jpg?Expires=1678886400&Signature=...",
    },
  },
};
