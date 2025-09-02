import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.search}/jobs/${bundle.inputData.job_id}`,
    {
      method: "GET",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );

  return response.json();
};

export const checkJobStatus = {
  key: "check_job_status",
  noun: "Job",
  display: {
    label: "Check Job Status",
    description: "Check job status and results.",
  },
  operation: {
    inputFields: [
      {
        key: "job_id",
        required: true,
        type: "string",
        label: "Job ID",
        helpText: "The ID of the job to read",
      },
    ],
    perform,
    sample: {
      id: "job_12345",
      status: "completed",
      output: {
        name: "Video Name",
        index: [{ end: 10.0, start: 0.0, metadata: {}, description: "" }],
        length: 500,
        index_id: "index_id",
        video_id: "m-z-id",
        stream_url: "https://stream_url.com",
        download_url: "https://download_url.com",
        collection_id: "c-default",
        thumbnail_url: null,
      },
      error: null,
    },
  },
};
