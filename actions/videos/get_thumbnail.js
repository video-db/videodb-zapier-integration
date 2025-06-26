import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/thumbnail`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  // A search action should return an array of objects.
  return [data.data];
};

export const getThumbnail = {
  key: "get_thumbnail",
  noun: "Thumbnail",
  display: {
    label: "Get Default Thumbnail",
    description: "Gets the default thumbnail URL for a video.",
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
      thumbnail_url:
        "https://image.videodb.io/m-xxxxxxxxx/default_thumbnail.jpg",
    },
  },
};
