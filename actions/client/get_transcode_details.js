import { VIDEO_DB_API } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${VIDEO_DB_API}/transcode/${bundle.inputData.job_id}`,
    {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    }
  );
  const result = await response.json();
  return result.data;
};

export const getTranscodeDetails = {
  key: "get_transcode_details",
  noun: "Transcode Job",
  display: {
    label: "Get Transcode Job Details",
    description: "Fetches details for a specific transcode job.",
  },
  operation: {
    inputFields: [
      { key: "job_id", required: true, type: "string", label: "Job ID" },
    ],
    perform,
    sample: {
      job_id: "job-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      status: "completed",
      output_url:
        "https://storage.googleapis.com/videodb-prod-assets/transcoded/job-xxxx/output.mp4",
    },
  },
};
