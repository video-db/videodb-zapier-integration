import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/${bundle.inputData.index_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  return [data.data];
};

export const getRtstreamSceneIndex = {
  key: "get_rtstream_scene_index",
  noun: "Scene Index",
  display: {
    label: "Get Real-Time Stream Scene Index",
    description: "Retrieves a specific scene index by its ID.",
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
        key: "index_id",
        required: true,
        type: "string",
        label: "Scene Index ID",
        dynamic: "list_rtstream_scene_indexes.rtstream_index_id.name",
      },
    ],
    perform,
    sample: {
      rtstream_index_id: "rtsi-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      extraction_type: "time_based",
      extraction_config: { time: 2, frame_count: 5 },
      prompt: "Describe the scene",
      name: "My RTStream Scene Index",
      status: "connected",
    },
  },
};
