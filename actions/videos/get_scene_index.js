import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/index/scene/${bundle.inputData.scene_index_id}`
  );
  url.searchParams.append("collection_id", bundle.inputData.collection_id);

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
  });

  const data = await response.json();
  return data.data.scene_index_records;
};

export const getSceneIndex = {
  key: "get_scene_index",
  noun: "Scene Index",
  display: {
    label: "Get Scene Index",
    description: "Retrieves a specific scene index.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
      },
      {
        key: "scene_index_id",
        required: true,
        type: "string",
        label: "Scene Index ID",
      },
      {
        key: "collection_id",
        required: true,
        type: "string",
        label: "Parent Collection ID",
        dynamic: "get_collections.id.name",
      },
    ],
    perform,
    sample: {
      start: 0.0,
      end: 5.5,
      description: "A person walking on the beach at sunset.",
    },
  },
};
