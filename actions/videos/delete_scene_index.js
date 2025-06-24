import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/index/scene/${bundle.inputData.scene_index_id}`,
    {
      method: "DELETE",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
    }
  );

  return response.json();
};

export const deleteSceneIndex = {
  key: "delete_scene_index",
  noun: "Scene Index",
  display: {
    label: "Delete Scene Index",
    description: "Deletes a specific scene index.",
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
    ],
    perform,
    sample: {
      success: true,
      message:
        "Scene index si-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx deleted successfully",
    },
  },
};
