import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/scenes/${bundle.inputData.scene_collection_id}`,
    {
      method: "DELETE",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  return response.json();
};

export const deleteSceneCollection = {
  key: "delete_scene_collection",
  noun: "Scene Collection",
  display: {
    label: "Delete Scene Collection",
    description: "Deletes a specific scene collection from a video.",
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
        key: "scene_collection_id",
        required: true,
        type: "string",
        label: "Scene Collection ID",
        dynamic: "list_scene_collections.id.name",
      },
    ],
    perform,
    sample: {
      success: true,
      message:
        "Scene collection sc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx deleted successfully",
    },
  },
};
