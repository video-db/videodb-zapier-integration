import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    event_id: bundle.inputData.event_id,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/${bundle.inputData.rtstream_index_id}/alert`,
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
  return result;
};

export const createRtstreamAlert = {
  key: "create_rtstream_alert",
  noun: "Alert",
  display: {
    label: "Create Real-Time Stream Alert",
    description:
      "Creates an alert for a specific event within the rtstream scene index.",
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
        dynamic: "list_rtstream_scene_indexes.id.name",
      },
      {
        key: "event_id",
        required: true,
        type: "string",
        label: "Event ID",
        dynamic: "list_events_trigger.event_id.label",
      },
      {
        key: "callback_url",
        required: true,
        type: "string",
        label: "Callback URL",
      },
    ],
    perform,
    sample: {
      alert_id: "rtsa-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  },
};
