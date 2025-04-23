import config from "@/config/config";

type WordEmotionPair = {
    word: string,
    emotion: string
}

const improveSpeech = async (wordEmotionPairs: WordEmotionPair[]) => {
  const wordsArray: string[] = [];
  const emotionArray: string[] = [];

  wordEmotionPairs.forEach(pair => {
    wordsArray.push(pair.word);
    emotionArray.push(pair.emotion);
  });

  const payload = {
    speech: wordsArray,
    emotion: emotionArray,
  };

  const res = await fetch(config.SPEECH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "An error occurred");
  }

  const resp = await res.json();
  return resp;
};

export default improveSpeech;
