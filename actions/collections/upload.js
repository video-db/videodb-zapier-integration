import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  // This action will upload a media file from a URL.
  // The 'file_path' option is not suitable for a web-based platform like Zapier.
  const data = {
    url: bundle.inputData.url,
    media_type: bundle.inputData.media_type,
    name: bundle.inputData.name,
    description: bundle.inputData.description,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.upload_url}`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const upload = {
  key: "upload",
  noun: "Media",
  display: {
    label: "Upload Media From URL",
    description: "Uploads a media file (video, audio, or image) from a URL.",
  },
  operation: {
    inputFields: [
      { key: "url", required: true, type: "string", label: "File URL" },
      {
        key: "media_type",
        required: false,
        type: "string",
        label: "Media Type",
        choices: ["video", "audio", "image"],
      },
      { key: "name", required: false, type: "string", label: "Name" },
      {
        key: "description",
        required: false,
        type: "text",
        label: "Description",
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
      id: "m-uploaded-xxxx",
      collection_id: "c-yyyyyyyyy",
      stream_url: "https://stream.videodb.io/m-uploaded-xxxx/stream.m3u8",
      player_url: "https://player.videodb.io/m-uploaded-xxxx",
      name: "A video from my disk",
      description: "Uploaded via SDK",
      thumbnail_url: "https://image.videodb.io/m-uploaded-xxxx/thumbnail.jpg",
      length: 120.5,
    },
  },
};
