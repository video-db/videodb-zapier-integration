import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}?collection_id=${bundle.inputData.collection_id}`,
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
  // Since we are fetching a single video, we return it in an array.
  return [data.data];
};

export const getVideo = {
  key: "get_video",
  noun: "Video",
  display: {
    label: "Get Video",
    description: "Retrieves a specific video by its ID from a collection.",
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
    ],
    perform,
    sample: {
      id: "m-xxxxxxxxx",
      collection_id: "c-yyyyyyyyy",
      stream_url: "https://stream.videodb.io/m-xxxxxxxxx/stream.m3u8",
      player_url: "https://player.videodb.io/m-xxxxxxxxx",
      name: "My First Video",
      description: "A video about something interesting.",
      thumbnail_url: "https://image.videodb.io/m-xxxxxxxxx/thumbnail.jpg",
      length: 120.5,
    },
  },
};
