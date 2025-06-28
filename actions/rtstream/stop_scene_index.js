import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    action: "stop",
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene/${bundle.inputData.rtstream_index_id}/status`,
    {
      method: "PATCH",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const stopRtstreamSceneIndex = {
  key: "stop_rtstream_scene_index",
  noun: "Scene Index",
  display: {
    label: "Stop Real-Time Stream Scene Index",
    description: `Stops the scene index, changing its status to "stopped".`,
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
        dynamic: "list_rtstream_scene_indexes.id.name",
      },
    ],
    perform,
    sample: {
      success: true,
      message: "RTStream Scene Index status updated to 'stopped'",
    },
  },
};
