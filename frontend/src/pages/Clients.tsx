import React, { useState, useEffect } from 'react';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);

    useEffect(() => {
        // Fetch clients from API
        fetchClients();
    }, []);

    const fetchClients = async () => {
        // Assume we have an API that fetches clients
        const response = await fetch('/api/clients');
        const data = await response.json();
        setClients(data);
    };

    const addClient = async (client) => {
        // Add client API call
        await fetch('/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client),
        });
        fetchClients();  // Refresh client list
    };

    const updateClient = async (client) => {
        // Update client API call
        await fetch(`/api/clients/${client.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(client),
        });
        fetchClients();  // Refresh client list
    };

    const deleteClient = async (id) => {
        // Delete client API call
        await fetch(`/api/clients/${id}`, {
            method: 'DELETE',
        });
        fetchClients();  // Refresh client list
    };

    const handleEdit = (client) => {
        setCurrentClient(client);
        setIsEditing(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            updateClient(currentClient);
        } else {
            addClient(currentClient);
        }
        setCurrentClient(null);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Clients</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={currentClient ? currentClient.name : ''} 
                    onChange={(e) => setCurrentClient({ ...currentClient, name: e.target.value })} 
                    placeholder="Client Name" 
                    required 
                />
                <button type="submit">{isEditing ? 'Update' : 'Add'} Client</button>
            </form>
            <ul>
                {clients.map((client) => (
                    <li key={client.id}>
                        {client.name}
                        <button onClick={() => handleEdit(client)}>Edit</button>
                        <button onClick={() => deleteClient(client.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Clients;