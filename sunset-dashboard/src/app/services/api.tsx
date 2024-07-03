import axios from 'axios';

const API_URL = 'http://172.18.185.228:3000/api';

export const fetchClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch clients');
  }
};

export const createClient = async (client: { name: string; email: string; phone: string }) => {
    try{
    const response = await axios.post(`${API_URL}/clients`, client);
    return response.data;
    } catch( error ) {
        throw new Error('Failed to create clients');
    }
  };

  export const updateClient = async (id: number, client: { name: string; email: string; phone: string }) => {
    try{
    const response = await axios.put(`${API_URL}/clients/${id}`, client);
    return response.data;
    } catch ( error ) {
        throw new Error ('Failed to update clients');
    }
  };
  
  export const deleteClient = async (id: number) => {
    try {

        console.log('aqui bateu delete')
    const response = await axios.delete(`${API_URL}/clients/${id}`);
    return response.data;
    } catch ( error ){
        throw new Error ('Failed to delete clients');
    }
    
  };