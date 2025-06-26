import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    prompt: bundle.inputData.prompt,
    duration: bundle.inputData.duration,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/generate/video`,
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
  return result.data;
};

export const generateVideo = {
  key: "generate_video",
  noun: "Video",
  display: {
    label: "Generate Video",
    description: "Generates a video from a text prompt.",
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
        key: "duration",
        required: false,
        type: "number",
        label: "Duration (seconds)",
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
      id: "m-generated-xxxx",
      collection_id: "c-yyyyyyyyy",
      name: "a cinematic shot of a futuristic city at night, rain falling.mp4",
      length: 7.0,
      stream_url: "https://stream.videodb.io/m-generated-xxxx/stream.m3u8",
      player_url: "https://player.videodb.io/m-generated-xxxx",
    },
  },
};
