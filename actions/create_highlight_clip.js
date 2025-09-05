import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const raw = bundle.inputData.content_type;
  const contentTypes = Array.isArray(raw)
    ? raw
    : typeof raw === "string" && raw.includes(",")
    ? raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : raw
    ? [String(raw)]
    : ["multimodal"];

  const payload = {
    video_id: bundle.inputData.video_id,
    prompt: bundle.inputData.prompt,
    content_type: contentTypes,
    aspect_ratio: bundle.inputData.aspect_ratio || "landscape",
    add_subtitle: bundle.inputData.add_subtitle || false,
  };

  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/create_highlight_clip`,
    {
      method: "POST",
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
};

export const createHighlightClip = {
  key: "create_highlight_clip",
  noun: "Highlight Clip",
  display: {
    label: "Create Highlight Clip",
    description:
      "Creates a highlight clip from a video based on a prompt using VideoDB service.",
  },
  operation: {
    inputFields: [
      {
        key: "video_id",
        required: true,
        type: "string",
        label: "Video ID",
        dynamic: "get_videos.id.name",
        helpText: "Video ID to generate clip from",
      },
      {
        key: "prompt",
        required: true,
        type: "string",
        label: "Prompt",
        helpText: "Prompt to generate clip",
      },
      {
        key: "content_type",
        required: false,
        type: "string",
        label: "Content Type",
        helpText: "One or more content types based on which clip is generated",
        list: true,
        choices: {
          spoken_content: "Spoken Content",
          visual_content: "Visual Content",
          multimodal: "Multimodal",
        },
        default: "multimodal",
      },
      {
        key: "aspect_ratio",
        required: false,
        type: "string",
        label: "Aspect Ratio",
        helpText: "Output aspect ratio for the generated clip",
        choices: ["landscape", "vertical", "square"],
        default: "landscape",
      },
      {
        key: "add_subtitle",
        required: false,
        type: "boolean",
        label: "Add Subtitle",
        helpText: "Whether to add subtitles to the generated clip",
      },
    ],
    perform,
    sample: {
      job_id: "job-123",
    },
  },
};
