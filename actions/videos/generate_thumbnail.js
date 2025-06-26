import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    time: bundle.inputData.time,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/thumbnail`,
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

export const generateThumbnail = {
  key: "generate_thumbnail",
  noun: "Thumbnail",
  display: {
    label: "Generate Thumbnail",
    description: "Generates a thumbnail for a video at a specific time.",
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
        key: "time",
        required: true,
        type: "number",
        label: "Time (in seconds)",
      },
    ],
    perform,
    sample: {
      id: "img-zzzzzzzzz",
      collection_id: "c-yyyyyyyyy",
      name: "thumbnail_at_15s.jpg",
      url: "https://image.videodb.io/img-zzzzzzzzz/image.jpg",
    },
  },
};
