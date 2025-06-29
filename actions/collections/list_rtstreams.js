import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.rtstream}`, {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });

  return await response.json();
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
