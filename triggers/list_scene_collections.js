import { VIDEO_DB_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/scenes`
  );

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });

  const data = await response.json();
  return (data.data.scene_collections || []).map((item) => ({
    ...item,
    id: item.scene_collection_id,
    name: item.scene_collection_id,
  }));
};

export const listSceneCollectionsTrigger = {
  key: "list_scene_collections",
  noun: "Scene Collection",
  display: {
    label: "List Scene Collections",
    description: "Lists all scene collections for a video.",
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
      id: "sc-xxxxxxxxx",
      name: "Default Shot-Based Scenes",
      config: { extraction_type: "shot_based" },
    },
  },
};
