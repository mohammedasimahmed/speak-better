import config from "@/config/config";

type userCredentials = {
  username: string;
  email: string;
  password: string;
};

const registerUser = async (credentials: userCredentials) => {
  const res = await fetch(config.AUTH_REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed");
  }

  const user = await res.json();
  return user;
};

export default registerUser;