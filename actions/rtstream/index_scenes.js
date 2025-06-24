import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    extraction_type: bundle.inputData.extraction_type,
    extraction_config: bundle.inputData.extraction_config,
    prompt: bundle.inputData.prompt,
    model_name: bundle.inputData.model_name,
    model_config: bundle.inputData.model_config,
    name: bundle.inputData.name,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  return result.data;
};

export const indexRtstreamScenes = {
  key: "index_rtstream_scenes",
  noun: "Scene Index",
  display: {
    label: "Index Real-Time Stream Scenes",
    description:
      "Indexes scenes from the rtstream based on specified configurations.",
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
        key: "extraction_type",
        required: false,
        type: "string",
        label: "Extraction Type",
        choices: ["time"],
      },
      { key: "prompt", required: false, type: "string", label: "Prompt" },
      {
        key: "model_name",
        required: false,
        type: "string",
        label: "Model Name",
      },
      { key: "name", required: false, type: "string", label: "Index Name" },
    ],
    perform,
    sample: {
      rtstream_index_id: "rtsi-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      extraction_type: "time_based",
      extraction_config: { time: 2, frame_count: 5 },
      prompt: "Describe the scene",
      name: "My RTStream Scene Index",
      status: "pending",
    },
  },
};
