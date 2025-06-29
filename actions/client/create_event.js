import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    event_prompt: bundle.inputData.event_prompt,
    label: bundle.inputData.label,
  };
  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.rtstream}/event`, {
    method: "POST",
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const createEvent = {
  key: "create_event",
  noun: "Event",
  display: {
    label: "Create Event",
    description: "Creates a new event for RTStream.",
  },
  operation: {
    inputFields: [
      {
        key: "event_prompt",
        required: true,
        type: "string",
        label: "Event Prompt",
      },
      { key: "label", required: true, type: "string", label: "Label" },
    ],
    perform,
    sample: {
      event_id: "evt-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  },
};
