import config from "@/config/config";

type userCredentials = {
  username: string;
  password: string;
};

const loginUser = async (credentials: userCredentials) => {
  const response = await fetch(config.AUTH_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include"
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const result = await response.json();
  return result;
};

export default loginUser;