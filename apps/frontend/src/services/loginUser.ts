export type userCredentials = {
    username: string;
    password: string;
};

export const loginUser = async (credentials: userCredentials) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      throw new Error("Login failed");
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
