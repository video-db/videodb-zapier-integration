export const ApiPath = {
  action: "action",
  search: "search",
  trigger: "trigger",
  collection: "collection",
};

export const ZAPIER_BACKEND_API =
  (process.env.ENVFLAG === "dev"
    ? process.env.DEV_BACKEND_API
    : process.env.PROD_BACKEND_API) || "";

export const VIDEODB_SERVER_API =
  (process.env.ENVFLAG === "dev"
    ? process.env.VIDEODB_DEV_SERVER_API
    : process.env.VIDEODB_PROD_SERVER_API) || "";
