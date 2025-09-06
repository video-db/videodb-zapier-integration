import { ZAPIER_BACKEND_API } from "../core/constants.js";

const subscribeHook = async (z, bundle) => {
  const res = await z.request({
    method: "POST",
    url: `${ZAPIER_BACKEND_API}/trigger/generate_video/subscribe`,
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: {
      target_url: bundle.targetUrl,
      target_label: bundle.inputData.target_label,
    },
  });
  return res.data;
};

const unsubscribeHook = async (z, bundle) => {
  const id = bundle.subscribeData.id;
  await z.request({
    method: "DELETE",
    url: `${ZAPIER_BACKEND_API}/trigger/generate_video/subscriptions/${id}`,
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });
  return {};
};

const perform = async (z, bundle) => {
  return [bundle.cleanedRequest];
};

// Used by the editor's "Test trigger"
const performList = async (z, bundle) => {
  const res = await z.request({
    url: `${ZAPIER_BACKEND_API}/trigger/generate_video/sample`,
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });
  // Must be an array with the SAME SHAPE as perform()
  return res.data;
};

export const generateVideoCompletedTrigger = {
  key: "generate_video_completed",
  noun: "Generated Video",
  display: {
    label: "AI-Generated Video Created",
    description: "Triggers when an AI-generated video job completes.",
  },
  operation: {
    type: "hook",
    inputFields: [
      {
        key: "target_label",
        required: false,
        type: "string",
        label: "Target Label",
        helpText:
          "Only fire for generate_video jobs whose target_labels include this label.",
      },
    ],
    perform,
    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    performList,
    sample: {
      id: "sample-job-id",
      collection_id: "col_123",
      stream_url: "https://example.com/stream.m3u8",
      player_url:
        "https://console.videodb.io/player?url=https://example.com/stream.m3u8",
      download_url: "https://example.com/download.mp4",
      name: "Sample Generated Video",
      length: "120.5",
      target_labels: ["example-label-a", "example-label-b"],
      scenes: [
        {
          scene_number: 1,
          description: "A beautiful sunset over the ocean",
          duration: 8,
          start_time: 0.0,
          end_time: 8.0,
          video_id: "vid_123",
          stream_url: "https://example.com/scene1.m3u8",
          player_url:
            "https://console.videodb.io/player?url=https://example.com/scene1.m3u8",
          download_url: "https://example.com/scene1.mp4",
          prompt: "A beautiful sunset over the ocean",
        },
        {
          scene_number: 2,
          description: "Waves crashing on the shore",
          duration: 8,
          start_time: 8.0,
          end_time: 16.0,
          video_id: "vid_124",
          stream_url: "https://example.com/scene2.m3u8",
          player_url:
            "https://console.videodb.io/player?url=https://example.com/scene2.m3u8",
          download_url: "https://example.com/scene2.mp4",
          prompt: "Waves crashing on the shore",
        },
      ],
      total_scenes: 2,
      is_multi_scene: true,
    },
  },
};
