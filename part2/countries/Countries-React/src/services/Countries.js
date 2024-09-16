import axios from "axios"



const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

export const getAll = () => {
    return axios.get(`${baseURL}/api/all`)
        .then(response => {
            return response.data; // Return the data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Optionally re-throw the error to handle it in the calling function
        });
};