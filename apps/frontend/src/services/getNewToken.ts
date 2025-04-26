import config from "@/config/config";

const getNewToken = async () => {
  const response = await fetch(config.AUTH_REFRESH_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  return response;
};

export default getNewToken;