import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    language: bundle.inputData.language,
    additional_notes: bundle.inputData.additional_notes,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.collection}/${bundle.inputData.collection_id}/video/${bundle.inputData.video_id}/translate`,
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

export const translateTranscript = {
  key: "translate_transcript",
  noun: "Transcript",
  display: {
    label: "Translate Transcript",
    description: "Translates a video's transcript to a specified language.",
  },
  operation: {
    inputFields: [
      {
        key: "collection_id",
        required: true,
        type: "string",
        label: "Collection ID",
        dynamic: "get_collections.id.name",
      },
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
      },
      {
        key: "language",
        required: true,
        type: "string",
        label: "Target Language",
      },
      {
        key: "additional_notes",
        required: false,
        type: "text",
        label: "Additional Notes",
      },
      {
        key: "callback_url",
        required: false,
        type: "string",
        label: "Callback URL",
      },
    ],
    perform,
    sample: {
      start: 0.5,
      end: 0.9,
      text: "Hola",
    },
  },
};
