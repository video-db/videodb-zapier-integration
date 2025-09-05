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
      status: "done",
      output: { video_id: "vid_123" },
      error: null,
    },
  },
};
