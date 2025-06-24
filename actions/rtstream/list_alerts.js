import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene/${bundle.inputData.rtstream_index_id}/alert`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
    }
  );

  const data = await response.json();
  return data.data.alerts;
};

export const listRtstreamAlerts = {
  key: "list_rtstream_alerts",
  noun: "Alert",
  display: {
    label: "List Real-Time Stream Alerts",
    description: "Lists all alerts for the rtstream scene index.",
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
    ],
    perform,
    sample: {
      alert_id: "rtsa-xxxxxxxx",
      event_id: "evt-yyyyyyyy",
      callback_url: "https://example.com/alert",
      status: "enabled",
    },
  },
};
