import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  return data.data.scene_indexes;
};

export const listRtstreamSceneIndexes = {
  key: "list_rtstream_scene_indexes",
  noun: "Scene Index",
  display: {
    label: "List Real-Time Stream Scene Indexes",
    description: "Lists all scene indexes for the rtstream.",
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
