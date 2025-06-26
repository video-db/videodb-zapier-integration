import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/stream`
  );
  url.searchParams.append("start", bundle.inputData.start);
  url.searchParams.append("end", bundle.inputData.end);

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });

  const data = await response.json();
  // It's a search, so return an array
  return data.data;
};

export const generateRtstreamStream = {
  key: "generate_rtstream_stream",
  noun: "Stream",
  display: {
    label: "Generate Stream From Real-Time Stream",
    description:
      "Generates a playable stream from the rtstream for a given time range.",
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
        key: "start",
        required: true,
        type: "integer",
        label: "Start Time (Unix Timestamp)",
      },
      {
        key: "end",
        required: true,
        type: "integer",
        label: "End Time (Unix Timestamp)",
      },
    ],
    perform,
    sample: {
      stream_url: "https://stream.videodb.io/rts-xxxxxxxx/stream.m3u8",
    },
  },
};
