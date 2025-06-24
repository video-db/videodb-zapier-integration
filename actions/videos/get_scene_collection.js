import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/scenes/${bundle.inputData.scene_collection_id}`
  );
  url.searchParams.append("collection_id", bundle.inputData.collection_id);

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
  });

  const data = await response.json();
  // A search action must return an array.
  return [data.data.scene_collection];
};

export const getSceneCollection = {
  key: "get_scene_collection",
  noun: "Scene Collection",
  display: {
    label: "Get Scene Collection",
    description: "Retrieves a specific collection of scenes from a video.",
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
        key: "scene_collection_id",
        required: true,
        type: "string",
        label: "Scene Collection ID",
      },
      {
        key: "collection_id",
        required: true,
        type: "string",
        label: "Parent Collection ID",
        dynamic: "get_collections.id.name",
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
