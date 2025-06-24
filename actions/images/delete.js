import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.image}/${bundle.inputData.image_id}`,
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
  key: "delete_image_action",
  noun: "Image",
  display: {
    label: "Delete Image",
    description: "Permanently deletes an image file.",
  },
  operation: {
    inputFields: [
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
      success: true,
      data: {},
    },
  },
};
