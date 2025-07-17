import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  const data = await response.json();
  // A search action should return an array of objects.
  // Since we are fetching a single stream, we return it in an array.
  if (data?.data) {
    return [data.data];
  } else {
    return [];
  }
};

export const getRtstream = {
  key: "get_rtstream",
  noun: "RTStream",
  display: {
    label: "Find Real-Time Stream",
    description: "Finds a specific real-time stream by its ID.",
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
    ],
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
