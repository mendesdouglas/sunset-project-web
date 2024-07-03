"use client"
import { useClients } from '../../../hooks/useClients';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClientList() {
  const { clients, loading, error, removeClient } = useClients();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (confirm('Você tem certeza que deseja deletar este cliente?')) {
      await removeClient(id);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-black-100 p-4">
      <div className="max-w-7xl mx-auto bg-gray p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lista de Clientes</h1>
          <Link href="/clientes/registrar">Adicionar</Link>
          
        </div>
        <table className="min-w-full bg-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nome</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="py-2 px-4 border-b">{client.name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.phone}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => router.push(`/clientes/editar/${client.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(client.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}