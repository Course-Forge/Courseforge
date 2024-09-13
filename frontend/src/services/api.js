// api.js
import axios from 'axios';

export const getChatbotResponse = async (message) => {
    try {
        const response = await axios.post('/api/chatbot-response/', { message: userMessage });
        return response.data;
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return { error: 'Failed to fetch response from the server' };
    }
};
