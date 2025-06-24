import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/index`
  );
  url.searchParams.append("index_type", "scene");

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
  });

  const data = await response.json();
  // The API returns an array of scenes.
  return data;
};

export const getScenes = {
  key: "get_scenes",
  noun: "Scene",
  display: {
    label: "Get Scenes (Deprecated)",
    description: "Retrieves the scenes of a video. [DEPRECATED]",
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
      start: 0.0,
      end: 5.5,
      shot: 1,
    },
  },
};
