import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.search}/get_video_metadata`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
      }),
    }
  );

  return response.json();
};

export const getVideoMetadata = {
  key: "get_video_metadata",
  noun: "Video Metadata",
  display: {
    label: "Get Video Metadata",
    description: "Get metadata for a video.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to get metadata for",
      },
    ],
    perform,
    sample: {
      id: "m-xxxxxxxxx",
      collection_id: "default",
      name: "My First Video",
      length: 120.5,
      thumbnail_url: "https://image.videodb.io/m-xxxxxxxxx/thumbnail.jpg",
      stream_url: "https://stream.videodb.io/m-xxxxxxxxx/stream.m3u8",
      download_url: "https://download.videodb.io/m-xxxxxxxxx/video.mp4",
    },
  },
};
