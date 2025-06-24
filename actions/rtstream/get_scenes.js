import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const url = new URL(
    `${VIDEO_DB_API}/${ApiPath.rtstream}/${bundle.inputData.rtstream_id}/index/scene/${bundle.inputData.rtstream_index_id}`
  );

  if (bundle.inputData.page)
    url.searchParams.append("page", bundle.inputData.page);
  if (bundle.inputData.page_size)
    url.searchParams.append("page_size", bundle.inputData.page_size);
  if (bundle.inputData.start)
    url.searchParams.append("start", bundle.inputData.start);
  if (bundle.inputData.end)
    url.searchParams.append("end", bundle.inputData.end);

  const response = await fetch(url.toString(), {
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.14",
    },
  });

  const data = await response.json();
  return data.data.scene_index_records;
};

export const getRtstreamScenes = {
  key: "get_rtstream_scenes",
  noun: "Scene",
  display: {
    label: "Get Scenes From Real-Time Stream Index",
    description:
      "Retrieves scenes from a specific rtstream scene index, with optional filtering and pagination.",
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
      { key: "page", required: false, type: "integer", label: "Page" },
      {
        key: "page_size",
        required: false,
        type: "integer",
        label: "Page Size",
      },
      {
        key: "start",
        required: false,
        type: "integer",
        label: "Start Time (Unix)",
      },
      {
        key: "end",
        required: false,
        type: "integer",
        label: "End Time (Unix)",
      },
    ],
    perform,
    sample: {
      timestamp: 1678886400,
      description: "A presenter is talking on stage.",
    },
  },
};
