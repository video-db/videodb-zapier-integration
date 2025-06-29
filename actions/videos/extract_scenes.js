import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    extraction_type: bundle.inputData.extraction_type,
    extraction_config: {},
    force: bundle.inputData.force,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/scenes`,
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

export const extractScenes = {
  key: "extract_scenes",
  noun: "Scene Extraction",
  display: {
    label: "Extract Scenes",
    description:
      "Extracts scenes from a video based on time intervals or shot detection.",
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
        choices: ["shot", "time"],
      },
      {
        key: "force",
        required: false,
        type: "boolean",
        label: "Force Re-extraction",
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
      scene_collection_id: "sc-xxxxxxxxx",
      config: {
        extraction_type: "shot_based",
        threshold: 20,
        frame_count: 1,
      },
      scenes: [
        {
          scene_id: "s-zzzzzzzzz",
          start: 0.0,
          end: 5.5,
          description: null,
          metadata: {},
          frames: [
            {
              frame_id: "f-wwwwwwwww",
              url: "https://image.videodb.io/f-wwwwwwwww/frame.jpg",
              frame_time: 0.0,
              description: null,
            },
          ],
        },
      ],
    },
  },
};
