import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    action: "start",
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene/${bundle.inputData.rtstream_index_id}/status`,
    {
      method: "PATCH",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const startRtstreamSceneIndex = {
  key: "start_rtstream_scene_index",
  noun: "Scene Index",
  display: {
    label: "Start Real-Time Stream Scene Index",
    description: `Starts the scene index, changing its status to "connected".`,
  },
  operation: {
    inputFields: [
      {
        key: "rtstream_id",
        required: true,
        type: "string",
        label: "Real-Time Stream ID",
        dynamic: "list_rtstreams.id.name",
      },
      {
        key: "rtstream_index_id",
        required: true,
        type: "string",
        label: "Real-Time Stream Index ID",
      },
    ],
    perform,
    sample: {
      success: true,
      message: "RTStream Scene Index status updated to 'connected'",
    },
  },
};
