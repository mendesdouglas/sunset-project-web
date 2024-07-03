'use client'
import { useEffect, useState, useCallback} from 'react';
import { fetchClients, createClient, updateClient, deleteClient } from '../services/api';

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addClient = useCallback(async (client: Omit<Client, 'id'>) => {
    try {
      const newClient = await createClient(client);
      setClients((prevClients) => [...prevClients, newClient]);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  }, []);

  const editClient = useCallback(async (id: number, updatedClient: Omit<Client, 'id'>) => {
    try {
      const editedClient = await updateClient(id, updatedClient);
      setClients((prevClients) =>
        prevClients.map((client) => (client.id === id ? editedClient : client))
      );
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
    }
  }, []);

  const removeClient = useCallback(async (id: number) => {
    try {
      await deleteClient(id);
      setClients((prevClients) => prevClients.filter((client) => client.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  }, []);

  return { clients, loading, error, addClient, editClient, removeClient };
};