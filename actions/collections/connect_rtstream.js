import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    collection_id: bundle.inputData.collection_id,
    url: bundle.inputData.url,
    name: bundle.inputData.name,
    sample_rate: bundle.inputData.sample_rate,
  };

  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.rtstream}`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result.data;
};

export const connectRtstream = {
  key: "connect_rtstream",
  noun: "RTStream",
  display: {
    label: "Connect Real-Time Stream",
    description:
      "Connects to a new real-time stream (rtstream) and adds it to the collection.",
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
      { key: "url", required: true, type: "string", label: "Stream URL" },
      { key: "name", required: true, type: "string", label: "Stream Name" },
      {
        key: "sample_rate",
        required: false,
        type: "integer",
        label: "Sample Rate",
      },
    ],
    perform,
    sample: {
      id: "rts-zzzzzzzzz",
      name: "My Live Gaming Stream",
      collection_id: "c-yyyyyyyyy",
      created_at: "2023-10-27T10:00:00Z",
      sample_rate: 44100,
      status: "pending",
    },
  },
};
