import { ZAPIER_BACKEND_API } from "../core/constants.js";

const subscribeHook = async (z, bundle) => {
  const res = await z.request({
    method: "POST",
    url: `${ZAPIER_BACKEND_API}/trigger/upload_index/subscribe`,
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
    body: {
      target_url: bundle.targetUrl,
    },
  });
  return res.data;
};

const unsubscribeHook = async (z, bundle) => {
  const id = bundle.subscribeData.id;
  await z.request({
    method: "DELETE",
    url: `${ZAPIER_BACKEND_API}/trigger/upload_index/subscriptions/${id}`,
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });
  return {};
};

// Zapier posts the real-time webhook payload to perform
const perform = async (z, bundle) => {
  // Ensure we always return an array
  return [bundle.cleanedRequest];
};

// Used by the editor's "Test trigger"
const performList = async (z, bundle) => {
  const res = await z.request({
    url: `${ZAPIER_BACKEND_API}/trigger/upload_index/sample`,
    headers: {
      "x-access-token": bundle.authData.api_key,
      "Content-Type": "application/json",
      "x-videodb-client": "videodb-python/0.2.15",
    },
  });
  // Must be an array with the SAME SHAPE as perform()
  return res.data;
};

export const uploadIndexCompletedTrigger = {
  key: "new_video_uploaded",
  noun: "Video",
  display: {
    label: "New Video Uploaded & Indexed",
    description: "Triggers when an uploaded video is indexed.",
  },
  operation: {
    type: "hook",
    perform,
    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    performList,
    sample: {
      id: "sample-job-id",
      video_id: "vid_123",
      name: "Sample Video",
      collection_id: "col_123",
      thumbnail_url: "https://example.com/thumb.jpg",
      length: 120.5,
      stream_url: "https://example.com/stream.m3u8",
      download_url: "https://example.com/download.mp4",
      index_id: "idx_123",
      index: [
        {
          end: 5.3,
          start: 0.0,
          metadata: {},
          description: "Lorem ipsum dolor sit amet",
          scene_metadata: {},
        },
        {
          end: 10.3,
          start: 5.3,
          metadata: {},
          description: "consectetur adipiscing elit",
          scene_metadata: {},
        },
      ],
    },
  },
};
