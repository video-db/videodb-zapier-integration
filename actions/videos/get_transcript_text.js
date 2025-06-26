import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/transcription`
  );

  if (bundle.inputData.start)
    url.searchParams.append("start", bundle.inputData.start);
  if (bundle.inputData.end)
    url.searchParams.append("end", bundle.inputData.end);
  if (bundle.inputData.segmenter)
    url.searchParams.append("segmenter", bundle.inputData.segmenter);
  if (bundle.inputData.length)
    url.searchParams.append("length", bundle.inputData.length);
  if (bundle.inputData.force)
    url.searchParams.append("force", bundle.inputData.force);

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });

  const data = await response.json();
  // We expect a plain text response, so we'll join the words.
  const text = data.data.text;
  // A search action must return an array.
  return [{ transcript_text: text }];
};

export const getTranscriptText = {
  key: "get_transcript_text",
  noun: "Transcript Text",
  display: {
    label: "Get Plain Text Transcript",
    description: "Fetches the plain text transcript of a video.",
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
        key: "start",
        required: false,
        type: "integer",
        label: "Start Time (s)",
      },
      { key: "end", required: false, type: "integer", label: "End Time (s)" },
      {
        key: "segmenter",
        required: false,
        type: "string",
        label: "Segmenter",
        choices: ["word", "sentence", "time"],
      },
      {
        key: "length",
        required: false,
        type: "integer",
        label: "Segment Length",
      },
      {
        key: "force",
        required: false,
        type: "boolean",
        label: "Force Refetch",
      },
    ],
    perform,
    sample: {
      transcript_text: "Hello world",
    },
  },
};
