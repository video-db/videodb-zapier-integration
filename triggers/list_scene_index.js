import { VIDEO_DB_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/index/scene`
  );
  url.searchParams.append("collection_id", bundle.inputData.collection_id);

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });

  const data = await response.json();
  return (data.data.scene_indexes || []).map((item) => ({
    ...item,
    id: item.scene_index_id,
    name: item.name,
  }));
};

export const listSceneIndexTrigger = {
  key: "list_scene_index",
  noun: "Scene Index",
  display: {
    label: "List Scene Indexes",
    description: "Lists all the scene indexes for a video.",
    hidden: true,
  },
  operation: {
    type: "polling",
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
      id: "si-xxxxxxxxx",
      name: "My Custom Scene Index",
    },
  },
};
