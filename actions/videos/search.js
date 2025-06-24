import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    query: bundle.inputData.query,
    search_type: bundle.inputData.search_type,
    index_type: bundle.inputData.index_type,
    result_threshold: bundle.inputData.result_threshold,
    score_threshold: bundle.inputData.score_threshold,
    dynamic_score_percentage: bundle.inputData.dynamic_score_percentage,
    filter: bundle.inputData.filter,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/search`,
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

  const results = await response.json();
  return results.data.results;
};

export const searchVideo = {
  key: "search_video",
  noun: "Search Result",
  display: {
    label: "Search Video",
    description: "Performs a search query within a specific video.",
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
      { key: "query", required: true, type: "string", label: "Query" },
      {
        key: "search_type",
        required: true,
        type: "string",
        label: "Search Type",
        choices: ["semantic", "keyword", "scene", "llm"],
      },
      {
        key: "index_type",
        required: false,
        type: "string",
        label: "Index Type",
        choices: ["spoken_word", "scene"],
      },
      {
        key: "result_threshold",
        required: false,
        type: "integer",
        label: "Result Threshold",
      },
      {
        key: "score_threshold",
        required: false,
        type: "number",
        label: "Score Threshold",
      },
      {
        key: "dynamic_score_percentage",
        required: false,
        type: "number",
        label: "Dynamic Score Percentage",
      },
    ],
    perform,
    sample: {
      video_id: "m-xxxxxxxxx",
      collection_id: "c-yyyyyyyyy",
      length: 120.5,
      title: "My First Video",
      docs: [
        {
          start: 10.5,
          end: 15.2,
          text: "we are talking about the latest in technology",
          score: 0.89,
        },
        {
          start: 25.1,
          end: 30.8,
          text: "this new technology will change the world",
          score: 0.85,
        },
      ],
    },
  },
};
