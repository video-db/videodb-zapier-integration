import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/instant_bot_join`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        meeting_link: bundle.inputData.meeting_link,
        bot_name: bundle.inputData.bot_name,
      }),
    }
  );

  return response.json();
};

export const instantBotJoin = {
  key: "instant_bot_join",
  noun: "Meeting",
  display: {
    label: "Instant Bot Join",
    description: "Join a meeting with an instant bot.",
  },
  operation: {
    inputFields: [
      {
        key: "meeting_link",
        required: true,
        type: "string",
        label: "Meeting Link",
        helpText: "URL of the meeting to join",
      },
      {
        key: "bot_name",
        required: false,
        type: "string",
        label: "Bot Name",
        helpText: "Name for the bot joining the meeting",
      },
    ],
    perform,
    sample: {
      meeting_id: "meeting_12345",
      bot_name: "VideoDB Bot",
      meeting_title: "Team Standup",
      meeting_url: "https://meet.google.com/abc-defg-hij",
    },
  },
};
