import { GEN_AI, MODEL_NAME, GENERATION_CONFIG, SAFETY_SETTINGS } from './model';
import { CORE_PROMPTS } from './prompts';
import { INTENT_HANDLES, handleMiscellaneous } from './intentHandlers';

export const sendMessage = async (messages, context = {}) => {
    // console.log(messages, "messg");

    try {
        const model = GEN_AI.getGenerativeModel({ model: MODEL_NAME });

        // Flatten core prompts to extract text
        const promptMessages = Object.values(CORE_PROMPTS).flatMap((prompt) =>
            prompt.map((message) => ({ role: 'model', parts: [message] }))
        );

        // Filter user messages
        const userMessages = messages.filter((message) => message.role === 'user');

        // Start a new chat with prompt messages
        const chat = model.startChat({
            promptMessages, 
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
        });

        // console.log(JSON.stringify(chat, null, 2), "chat");

        // Get the most recent user message
        const recentMessage = userMessages[userMessages.length - 1].parts;

        const result = await chat.sendMessage(recentMessage);
        const response = result.response;

        let reply = await response?.text();
        // console.log(reply, "raw response");

        let replyMessageText;
        try {
            // Check if the reply is in valid JSON format
            if (reply.startsWith("{") && reply.endsWith("}")) {
                const parsedJSON = JSON.parse(reply);
                console.log(parsedJSON, "parsedJSON");
                
                if (parsedJSON && parsedJSON.intent && INTENT_HANDLES[parsedJSON.intent]) {
                    replyMessageText = await INTENT_HANDLES[parsedJSON.intent](recentMessage, parsedJSON.params);
                } else {
                  
                    replyMessageText = await handleMiscellaneous();
                }
            } else {
                // Handle non-JSON response gracefully
                // console.warn("Received non-JSON response:", reply);
                replyMessageText = `Here is the information you requested:\n\n${reply}`;
            }
        } catch (error) {
            // console.error("Error parsing JSON:", error);
            // console.log("Raw reply that caused the error:", reply);
            replyMessageText = await handleMiscellaneous(); 
        }

        // Construct the reply message
        const replyMessage = {
            role: 'model',
            parts: replyMessageText
        };

        return { data: { choices: [{ message: replyMessageText }] } };
    } catch (error) {
        console.error('Error in sendMessage:', error);
        return {
            data: {
                choices: [{ message: 'An unexpected error occurred. Please rephrase your request.' }]
            }
        };
    }
};
