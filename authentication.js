import { VIDEODB_SERVER_API } from "./core/constants.js";
export const authentication = {
  type: "custom",
  fields: [
    {
      key: "api_key",
      label: "VideoDB API Key",
      required: true,
      type: "string",
      helpText:
        "Log in to the VideoDB Console, open **Access Control ▸ API Keys**, then copy your key. " +
        "[Open the console](https://console.videodb.io).",
    },
  ],
  test: async (z, bundle) => {
    const response = await fetch(`${VIDEODB_SERVER_API}/billing/usage`, {
      headers: {
        "x-access-token": bundle.authData.api_key,
        "Content-Type": "application/json",
        "x-videodb-client": "videodb-python/0.2.15",
      },
    });
    const { data } = await response.json();
    return {
      email: data.email,
      plan_id: data.plan_id,
      credit_balance: data.credit_balance,
    };
  },
  connectionLabel: "{{email}}",
};
