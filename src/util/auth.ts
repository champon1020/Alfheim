import Cookie from "js-cookie";

export const bearerAuthHeader = () => {
  return { Authorization: `Bearer ${Cookie.get("alfheim_id_token")}` };
};
