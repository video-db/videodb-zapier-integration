import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.rtstream}`, {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
  });

  const data = await response.json();
  // The API returns an object with a `data` property which is an array of streams.
  // Zapier expects an array of objects to be returned from a search.
  return data.data.results;
};

export const listRtstreams = {
  key: "list_rtstreams",
  noun: "RTStream",
  display: {
    label: "List Real-Time Streams",
    description: "Lists all real-time streams associated with your account.",
  },
  operation: {
    perform,
    sample: {
      id: "rts-zzzzzzzzz",
      name: "My Live Gaming Stream",
      collection_id: "c-yyyyyyyyy",
      created_at: "2023-10-27T10:00:00Z",
      sample_rate: 44100,
      status: "connected",
    },
  },
};
