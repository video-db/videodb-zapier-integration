import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}?collection_id=${bundle.inputData.collection_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
    }
  );

  const data = await response.json();
  // The API returns an object with a `data` property which is an array of videos.
  // Zapier expects an array of objects to be returned from a search.
  return data.data.videos;
};

export const getVideos = {
  key: "get_videos",
  noun: "Video",
  display: {
    label: "Get Videos From Collection",
    description: "Retrieves a list of all videos within a collection.",
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
