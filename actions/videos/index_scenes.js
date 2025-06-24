import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    extraction_type: bundle.inputData.extraction_type,
    extraction_config: bundle.inputData.extraction_config,
    prompt: bundle.inputData.prompt,
    metadata: bundle.inputData.metadata,
    model_name: bundle.inputData.model_name,
    model_config: bundle.inputData.model_config,
    name: bundle.inputData.name,
    scenes: bundle.inputData.scenes,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/index/scene`,
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

export const indexScenes = {
  key: "index_scenes",
  noun: "Scene Index",
  display: {
    label: "Index Scenes",
    description: "Indexes the scenes of a video.",
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
        key: "extraction_type",
        required: false,
        type: "string",
        label: "Extraction Type",
        choices: ["shot", "time"],
      },
      { key: "prompt", required: false, type: "string", label: "Prompt" },
      {
        key: "model_name",
        required: false,
        type: "string",
        label: "Model Name",
      },
      { key: "name", required: false, type: "string", label: "Index Name" },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
      },
    ],
    perform,
    sample: {
      scene_index_id: "si-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  },
};
