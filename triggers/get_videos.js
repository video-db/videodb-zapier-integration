import { ZAPIER_BACKEND_API } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(`${ZAPIER_BACKEND_API}/search/get_videos`, {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.videos;
};

export const getVideosTrigger = {
  key: "get_videos",
  noun: "Video",
  display: {
    label: "Get Videos",
    description: "Retrieves a list of all videos in the collection.",
    hidden: true,
  },
  operation: {
    type: "polling",
    perform,
    sample: {
      id: "m-xxxxxxxxx",
      collection_id: "default",
      stream_url: "https://stream.videodb.io/m-xxxxxxxxx/stream.m3u8",
      player_url: "https://player.videodb.io/m-xxxxxxxxx",
      name: "My First Video",
      description: "A video about something interesting.",
      thumbnail_url: "https://image.videodb.io/m-xxxxxxxxx/thumbnail.jpg",
      length: 120.5,
    },
  },
};
