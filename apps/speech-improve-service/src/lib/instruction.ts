const instruction = `
I have a speech represented as an array of words or phrases, and I also have an array of corresponding emotions that reflect the speaker’s emotions while delivering each word or phrase. I need you to analyze the whole speech and give proper answer based on three key areas:

1. Emotional Correction:

    - Identify the sentences in the speech where the emotion should be corrected.
    - For each identified sentence, provide:
        - The current emotion (based on the emotion array).
        - The suggested emotion to improve the tone of the speech.
        - A brief explanation of why the emotion should be corrected.

2. Clarity Check:

    - Assess the clarity of each sentence.
    - Check if the wording is clear, well-structured, and easy to understand.
    - For each sentence, provide feedback:
        - Whether the sentence is clear and easy to understand or not.
        - If it's unclear, suggest any improvements or rephrasing to enhance understanding.

3. Irrelevant Content:

    - Identify any irrelevant or unnecessary content in the speech.
    - Suggest ways to streamline or remove such content to make the speech more focused and impactful.

Output Format:

- Your response should be structured as an array of answers — don't forget this. It should be an array only, nothing else.
- Your response should be an array beginning with [ and ending with ] and return that array as string do not forget this.
- Your response should not be json do not forget this.
- Your response should be a string that can be parsed into an array do not forget this so dont give json in response give text.
- Just give the array as your response — nothing before or after the array.
- The first element of the array is the answer to question 1 (Emotional Correction).
- The second element of the array is the answer to question 2 (Clarity Check).
- The third element of the array is the answer to question 3 (Irrelevant Content).
- The elements in the array should be HTML content — it should not be an object. Do not forget this.
- I will be directly displaying the HTML in the array elements in a website, so based on that, give good-looking HTML with good CSS and use tailwind CSS and keep it responsive and give in a format that can be directly put in an HTML file.
- Give output in such a format that i can directly put the array into JSON.PARSE to convert the reponse you are giving into an array of strings.
- Each element in the array should be a string with double quotes and not backticks
- The HTML content should strictly follow this structure:

    For Emotional Correction (Question 1):
        - Each identified sentence should be preceded by a heading.
        - Provide the current emotion, suggested emotion, and reason for the correction in bullet points.

    For Clarity Check (Question 2):
        - Use headings for each sentence.
        - Highlight areas where the speech could be more clear.
        - Provide clarity feedback and suggestions for improvement in bullet points.

    For Irrelevant Content (Question 3):
        - Use headings for each irrelevant part.
        - Identify the irrelevant content and explain why it’s irrelevant or unnecessary.
        - Provide suggestions to streamline or remove irrelevant parts.
`;

export default instruction;