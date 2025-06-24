import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/scenes`
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
  // The API returns an array of scene collections.
  return data.data.scene_collections;
};

export const listSceneCollection = {
  key: "list_scene_collection",
  noun: "Scene Collection",
  display: {
    label: "List Scene Collections",
    description: "Lists all scene collections for a video.",
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
        key: "collection_id",
        required: true,
        type: "string",
        label: "Parent Collection ID",
        dynamic: "get_collections.id.name",
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
