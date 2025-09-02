import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/auto_dub`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify({
        video_id: bundle.inputData.video_id,
        language_code: bundle.inputData.language_code,
      }),
    }
  );

  return response.json();
};

export const autoDub = {
  key: "auto_dub",
  noun: "Dubbed Video",
  display: {
    label: "Auto-Dub Video",
    description: "Dubs a video using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "The ID of the video to dub",
      },
      {
        key: "language_code",
        required: true,
        type: "string",
        label: "Language Code",
        helpText:
          'Language code for dubbing (e.g., "es" for Spanish, "fr" for French)',
      },
    ],
    perform,
    sample: {
      id: "dub_12345",
      collection_id: "default",
      stream_url: "https://stream.videodb.io/video/dubbed_video.mp4",
      download_url: "https://download.videodb.io/video/dubbed_video.mp4",
      name: "Dubbed Video",
      length: "00:05:30",
    },
  },
};
