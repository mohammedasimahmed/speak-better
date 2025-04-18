import config from "@/config/config";

type userCredentials = {
  username: string;
  password: string;
};

const loginUser = async (credentials: userCredentials) => {
  const res = await fetch(config.AUTH_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  const user = await res.json();
  return user;
};

export default loginUser;