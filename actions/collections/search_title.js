import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    query: bundle.inputData.query,
    search_type: "llm",
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/search/title`,
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

  const results = await response.json();
  // The API returns an array of search results, which is what Zapier expects.
  return results.data.map((result) => result.video);
};

export const searchTitle = {
  key: "search_title",
  noun: "Video",
  display: {
    label: "Search Video Titles",
    description:
      "Searches for a query within the titles of videos in the collection.",
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
    ],
    perform,
    sample: {
      id: "m-zzzzzzzzz",
      collection_id: "c-yyyyyyyyy",
      stream_url: "https://stream.videodb.io/m-zzzzzzzzz/stream.m3u8",
      player_url: "https://player.videodb.io/m-zzzzzzzzz",
      name: "My Hilarious Cat Antics",
      description: null,
      thumbnail_url: "https://image.videodb.io/m-zzzzzzzzz/thumbnail.jpg",
      length: 45.0,
    },
  },
};
