import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    action: "start",
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/status`,
    {
      method: "PATCH",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const startRtstream = {
  key: "start_rtstream",
  noun: "RTStream",
  display: {
    label: "Start Real-Time Stream",
    description: `Connects to the rtstream, changing its status to "connected".`,
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
      success: true,
      message: "RTStream status updated to 'connected'",
    },
  },
};
