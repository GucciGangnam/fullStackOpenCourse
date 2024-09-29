import axios from 'axios'


// Log in 
const login = async (UN, PW) => {
    const credentials = {
        username: UN,
        password: PW
    };

    try {
        const response = await axios.post('http://localhost:3003/api/login', credentials);
        // console.log('Login successful:', response.data);
        return response.data;  // Return the response if needed
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;  // Rethrow the error if you want to handle it elsewhere
    }
};




// Get all

const getAll = async (jwt) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };
        const response = await axios.get('http://localhost:3003/api/blogs', config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error.response?.data || error.message);
        throw error;
    }
};

export default {
    getAll,
    login
}