import { VIDEO_DB_API, ApiPath } from "../../core/constants.js";

const perform = async (z, bundle) => {
  const data = {
    index_type: "spoken_word",
    language_code: bundle.inputData.language_code,
    force: bundle.inputData.force,
    callback_url: bundle.inputData.callback_url,
  };

  const response = await fetch(
    `${VIDEO_DB_API}/${ApiPath.video}/${bundle.inputData.video_id}/index`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.14",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const indexSpokenWords = {
  key: "index_spoken_words",
  noun: "Index",
  display: {
    label: "Index Spoken Words",
    description: "Performs semantic indexing on the spoken words in a video.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
      },
      {
        key: "language_code",
        required: false,
        type: "string",
        label: "Language Code",
      },
      {
        key: "force",
        required: false,
        type: "boolean",
        label: "Force Re-indexing",
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
      success: true,
      message: "Indexing for spoken words has started.",
      job_id: "job-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  },
};
