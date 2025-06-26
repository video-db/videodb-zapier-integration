import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/thumbnails`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  // The API returns an object with a `data` property which is an array of strings (URLs).
  // We need to map this to an array of objects for Zapier.
  return data.data;
};

export const getThumbnails = {
  key: "get_thumbnails",
  noun: "Thumbnail",
  display: {
    label: "Get All Thumbnails",
    description: "Retrieves all the thumbnails associated with a video.",
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
      id: "img-zzzzzzzzz",
      collection_id: "c-yyyyyyyyy",
      name: "thumbnail_1.jpg",
      url: "https://image.videodb.io/img-zzzzzzzzz/image.jpg",
    },
  },
};
