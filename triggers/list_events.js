import { VIDEO_DB_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(`${VIDEO_DB_API}/${ApiPath.rtstream}/event`, {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });
  const result = await response.json();
  return result.data.events;
};

export const listEventsTrigger = {
  key: "list_events_trigger",
  noun: "Event",
  display: {
    label: "List Events",
    description: "Lists all RTStream events.",
    hidden: true,
  },
  operation: {
    type: "polling",
    inputFields: [],
    perform,
    sample: {
      event_id: "evt-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      event_prompt: "Detect applause",
      label: "applause",
    },
  },
};
