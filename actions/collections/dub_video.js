import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    video_id: bundle.inputData.video_id,
    language_code: bundle.inputData.language_code,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/generate/video/dub`,
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

export const dubVideo = {
  key: "dub_video",
  noun: "Video",
  display: {
    label: "Dub Video",
    description: "Dubs a video into a different language.",
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
        key: "language_code",
        required: true,
        type: "string",
        label: "Language Code",
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
      id: "m-dubbed-xxxx",
      collection_id: "c-yyyyyyyyy",
      name: "My First Video (es).mp4",
      length: 120.5,
      stream_url: "https://stream.videodb.io/m-dubbed-xxxx/stream.m3u8",
      player_url: "https://player.videodb.io/m-dubbed-xxxx",
    },
  },
};
