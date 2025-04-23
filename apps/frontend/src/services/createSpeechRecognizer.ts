export default function createSpeechRecognizer() {
  const SpeechRecognition = (window as Window).SpeechRecognition || (window as Window).webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  return recognition;
}