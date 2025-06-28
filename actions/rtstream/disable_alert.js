import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    action: "disable",
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/${ApiPath.index}/${bundle.inputData.rtstream_index_id}/${ApiPath.alert}/${bundle.inputData.alert_id}/${ApiPath.status}`,
    {
      method: "PATCH",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
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
        dynamic: "list_rtstream_scene_indexes.id.name",
      },
      {
        key: "alert_id",
        required: true,
        type: "string",
        label: "Alert ID",
        dynamic: "list_rtstream_alerts_trigger.alert_id.label",
      },
    ],
    perform,
    sample: {
      success: true,
      message: "Alert status updated to 'disabled'",
    },
  },
};
