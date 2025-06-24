import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    action: "disable",
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene/${bundle.inputData.rtstream_index_id}/alert/${bundle.inputData.alert_id}/status`,
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

export const disableRtstreamAlert = {
  key: "disable_rtstream_alert",
  noun: "Alert",
  display: {
    label: "Disable Real-Time Stream Alert",
    description: "Disables a specific alert.",
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
      {
        key: "rtstream_index_id",
        required: true,
        type: "string",
        label: "Real-Time Stream Index ID",
      },
      { key: "alert_id", required: true, type: "string", label: "Alert ID" },
    ],
    perform,
    sample: {
      success: true,
      message: "Alert status updated to 'disabled'",
    },
  },
};
