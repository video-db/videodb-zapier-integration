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
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });

  const data = await response.json();
  // The API returns an array of scene collections.
  return data?.data?.scene_collections ?? [];
};

export const listSceneCollection = {
  key: "list_scene_collection",
  noun: "Scene Collection",
  display: {
    label: "Find Scene Collections",
    description: "Find all scene collections for a video.",
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
      id: "sc-xxxxxxxxx",
      name: "Default Shot-Based Scenes",
      config: { extraction_type: "shot_based" },
    },
  },
};
