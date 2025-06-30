import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const extraction_config = {
    frame_count:
      bundle.inputData.frame_count !== undefined
        ? Number(bundle.inputData.frame_count)
        : 4,
    threshold:
      bundle.inputData.threshold !== undefined
        ? Number(bundle.inputData.threshold)
        : 20,
  };
  const data = {
    extraction_type: bundle.inputData.extraction_type,
    extraction_config: extraction_config,
    prompt: bundle.inputData.prompt,
    name: bundle.inputData.name,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/${ApiPath.index}/${ApiPath.scene}`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
};

export const indexScenesShotBased = {
  key: "index_scenes_shot_based",
  noun: "Scene Index (Shot based)",
  display: {
    label: "Index Scenes (Shot Based)",
    description: "Indexes the scenes of a video (shot based).",
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
        key: "extraction_type",
        required: false,
        type: "string",
        label: "Extraction Type",
        choices: ["shot"],
      },
      { key: "prompt", required: false, type: "string", label: "Prompt" },
      { key: "name", required: false, type: "string", label: "Index Name" },
      {
        key: "frame_count",
        required: false,
        type: "integer",
        label: "Frame Count",
        helpText: "Number of frames per scene (default: 2)",
      },
      {
        key: "threshold",
        required: false,
        type: "integer",
        label: "Threshold",
        helpText: "Threshold for scene extraction (default: 20)",
      },
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
