import axios from 'axios'
const baseURL = 'http://localhost:3003/api'



// Log in 
const login = async (UN, PW) => {
    const credentials = {
        username: UN,
        password: PW
    };

    try {
        const response = await axios.post(`${baseURL}/login`, credentials);
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
        const response = await axios.get(`${baseURL}/blogs`, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error.response?.data || error.message);
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        throw error;
    }
};

// Post new 
const postNewBlog = async (jwt, title, url) => {
    console.log(jwt);
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };
        const blogData = {
            title: title,
            url: url,
        };
        const response = await axios.post(`${baseURL}/blogs`, blogData, config);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error creating blog:', error.response?.data || error.message);
        throw error;
    }
};


// Patch 
const incrementLike = async (blogID) => {
    console.log("Start blog service like adder");
    console.log(blogID);
    const jwt = localStorage.getItem('token');
    console.log(jwt);

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };

        const response = await axios.patch(`${baseURL}/blogs/likes/${blogID}`, {}, config);
        console.log(response.data);
    } catch (error) {
        console.log('Error adding like');
        console.log(error.response?.data || error.message);
    }
};

// Delete 
// Delete Blog 
const deleteBlog = async (blogID) => {
    const jwt = localStorage.getItem('token');
    console.log("Blog ID:", blogID);
    console.log("JWT Token:", jwt);
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };
        const response = await axios.delete(`${baseURL}/blogs/${blogID}`, config);
        console.log("Response Data:", response.data);
    } catch (error) {
        console.log('Error deleting blog');
        console.log(error.response?.data || error.message);
    }
};


export default {
    getAll,
    login,
    postNewBlog,
    incrementLike,
    deleteBlog
}