import axios from 'axios';

export const createCourse = async (course) => {
  try {
    const response = await axios.post('/api/courses/', course, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Failed to create course:', error);
    // throw error; // Re-throw error for handling in calling function
    const response = await axios.post('/api/courses/', course, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return response.data
  }
};
