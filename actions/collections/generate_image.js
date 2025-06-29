import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    prompt: bundle.inputData.prompt,
    aspect_ratio: bundle.inputData.aspect_ratio,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/generate/image`,
    {
      method: "POST",
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

export const generateImage = {
  key: "generate_image",
  noun: "Image",
  display: {
    label: "Generate Image",
    description: "Generates an image from a text prompt.",
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
      { key: "prompt", required: true, type: "string", label: "Prompt" },
      {
        key: "aspect_ratio",
        required: false,
        type: "string",
        label: "Aspect Ratio",
        choices: ["1:1", "9:16", "16:9", "4:3", "3:4"],
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
      },
    ],
    perform,
    sample: {
      id: "img-generated-xxxx",
      collection_id: "c-yyyyyyyyy",
      name: "a photorealistic cat wearing a wizard hat.jpg",
      url: "https://image.videodb.io/img-generated-xxxx/image.jpg",
    },
  },
};
