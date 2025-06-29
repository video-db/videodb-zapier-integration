import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    type: "add_subtitles",
    subtitle_style: bundle.inputData.subtitle_style,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/workflow`,
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

export const addSubtitle = {
  key: "add_subtitle",
  noun: "Subtitle",
  display: {
    label: "Add Subtitle to Video",
    description: "Adds subtitles to a video with customizable styling.",
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
      stream_url: "https://stream.videodb.io/m-xxxxxxxx/subtitled-stream.m3u8",
    },
  },
};
