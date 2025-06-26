import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    query: bundle.inputData.query,
    result_threshold: bundle.inputData.result_threshold,
    platform: bundle.inputData.platform,
    duration: bundle.inputData.duration,
  };
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/search/web`,
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
  return result.data.results;
};

export const youtubeSearch = {
  key: "youtube_search",
  noun: "YouTube Search",
  display: {
    label: "YouTube Search in Collection",
    description: "Performs a YouTube search within a collection.",
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
      { key: "query", required: true, type: "string", label: "Query" },
      {
        key: "result_threshold",
        required: false,
        type: "integer",
        label: "Result Threshold",
      },
      {
        key: "platform",
        required: false,
        type: "string",
        label: "Platform",
        choices: ["youtube"],
      },
      {
        key: "duration",
        required: false,
        type: "string",
        label: "Duration",
        choices: ["short", "medium", "long"],
      },
    ],
    perform,
    sample: {
      title: "Funny Cat Compilation",
      url: "https://youtube.com/watch?v=xxxxxx",
      duration: 120,
    },
  },
};
