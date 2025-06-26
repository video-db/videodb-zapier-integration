import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const videoResponse = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const video = await videoResponse.json();

  const length = Number(video.data.length) || 0.0;

  const data = {
    length,
    timeline: JSON.parse(bundle.inputData.timeline),
  };
  const streamResponse = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/${ApiPath.stream}`,
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

  const result = await streamResponse.json();
  return result.data;
};

export const generateVideoStream = {
  key: "generate_video_stream",
  noun: "Stream",
  display: {
    label: "Generate Video Stream",
    description: "Generates a streaming link for selected video timestamps.",
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
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
      },
      {
        key: "timeline",
        required: true,
        type: "string",
        label: "Timeline JSON",
        helpText: "Provide timestamps as a JSON string like [[0,10],[120,140]]",
      },
    ],
    perform,
    sample: {
      stream_url: "https://stream.videodb.io/m-xxxxxxxx/compiled-stream.m3u8",
      player_url: "https://player.videodb.io/m-xxxxxxxx/compiled-stream",
    },
  },
};
