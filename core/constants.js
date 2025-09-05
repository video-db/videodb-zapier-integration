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
