import config from "@/config/config";

const logoutUser = async () => {
  const response = await fetch(config.AUTH_LOGOUT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include"
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Logout failed");
  }

  if(sessionStorage.getItem("accessToken"))
  {
    sessionStorage.removeItem("accessToken");
  }

  const result = await response.json();
  console.log(result.message);
};

export default logoutUser;