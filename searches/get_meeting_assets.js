import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.search}/get_meeting_assets`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        meeting_id: bundle.inputData.meeting_id,
      }),
    }
  );

  return response.json();
};

export const getMeetingAssets = {
  key: "get_meeting_assets",
  noun: "Meeting Assets",
  display: {
    label: "Get Meeting Assets",
    description: "Get meeting data including transcript and summary.",
  },
  operation: {
    inputFields: [
      {
        key: "meeting_id",
        required: true,
        type: "string",
        label: "Meeting ID",
        helpText: "The ID of the meeting to get data for",
      },
    ],
    perform,
    sample: {
      id: "meeting_12345",
      collection_id: "default",
      bot_name: "VideoDB Bot",
      meeting_title: "Team Standup",
      meeting_url: "https://meet.google.com/abc-defg-hij",
      status: "completed",
      time_zone: "America/New_York",
      video_id: "m-xxxxxxxxx",
      summary: "The team discussed project progress and upcoming milestones.",
      transcript:
        "John: Good morning everyone. Let's start with project updates...",
    },
  },
};
