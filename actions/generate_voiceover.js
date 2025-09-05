import { ZAPIER_BACKEND_API, ApiPath } from "../core/constants.js";

const perform = async (z, bundle) => {
  const raw = bundle.inputData.target_labels;
  const targetLabels = Array.isArray(raw)
    ? raw
    : typeof raw === "string" && raw.includes(",")
    ? raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : raw
    ? [String(raw)]
    : [];

  const payload = {
    text: bundle.inputData.text,
    voice_name: bundle.inputData.voice_name,
    callback_url: bundle.inputData.callback_url,
    target_labels: targetLabels,
  };

  const response = await fetch(
    `${ZAPIER_BACKEND_API}/${ApiPath.action}/generate_voiceover`,
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

export const generateVoiceover = {
  key: "generate_voiceover",
  noun: "Voiceover",
  display: {
    label: "Generate Voice-Over",
    description: "Generates voice from text.",
  },
  operation: {
    inputFields: [
      {
        key: "text",
        required: true,
        type: "text",
        label: "Text",
      },
      {
        key: "voice_name",
        required: false,
        type: "string",
        label: "Voice Name",
      },
      {
        key: "target_labels",
        required: false,
        type: "string",
        label: "Target Labels",
        helpText: 'Add one or more labels. Use "Add item" to enter more.',
        list: true,
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
      job_id: "job_12345",
    },
  },
};
