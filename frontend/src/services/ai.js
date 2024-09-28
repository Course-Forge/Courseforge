import axios from 'axios';

const GEMINI_API_URL = xxx;
const API_KEY =xxx;

export const generateProjectIdeas = (courseId) => {
    return axios.post(
        `${GEMINI_API_URL}generate-ideas`,
        { topic: courseTopic},
        { headers: {'Authorization': `Bearer ${API_KEY}` }}
    );
};

