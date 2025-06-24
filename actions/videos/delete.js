import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}`,
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

export const deleteVideo = {
  key: "delete_video_from_video_action",
  noun: "Video",
  display: {
    label: "Delete Video",
    description: "Deletes a video.",
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
    ],
    perform,
    sample: {
      success: true,
      message:
        "Video m-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx deleted successfully",
    },
  },
};
