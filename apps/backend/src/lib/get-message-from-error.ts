const getMessageFromError = (error: unknown): string => {
  if (
    typeof error === "object" &&
        error !== null &&
        "code" in error &&
        "message" in error &&
        typeof (error as Record<string, unknown>).code === "number" &&
        typeof (error as Record<string, unknown>).message === "string"
  ) {
    const originalMessage = (error as { message: string }).message;
    const parts = originalMessage.split(":");
    const cleaned = parts[parts.length - 1].trim();
    console.log(originalMessage);
    return cleaned || originalMessage;
  }

  return "Unknown error";
};

export default getMessageFromError;