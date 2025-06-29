import { VIDEO_DB_API } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    stream_link: bundle.inputData.stream_link,
    name: bundle.inputData.name,
  };
  const response = await fetch(`${VIDEO_DB_API}/download`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const download = {
  key: "download",
  noun: "Download",
  display: {
    label: "Request Download URL",
    description: "Requests a download URL for a given stream link.",
  },
  operation: {
    inputFields: [
      {
        key: "stream_link",
        required: true,
        type: "string",
        label: "Stream Link",
      },
      { key: "name", required: true, type: "string", label: "File Name" },
    ],
    perform,
    sample: {
      download_url:
        "https://storage.googleapis.com/videodb-prod-assets/downloads/my_video.mp4?Expires=...",
    },
  },
};
