import React, { useState, useEffect } from 'react';

const AddEntity = () => {
    const [name, setName] = useState('');
    const [entities, setEntities] = useState([]);

    // Fetch entities from the server
    const fetchEntities = async () => {
        const response = await fetch('/api/pizza-places');
        const data = await response.json();
        setEntities(data);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/pizza-places', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            setName(''); // Reset the input field
            fetchEntities(); // Refresh the list
        }
    };

    useEffect(() => {
        fetchEntities(); // Fetch entities on component mount
    }, []);

    return (
        <div>
            <h1>Add New Entity</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Entity Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Add Entity</button>
            </form>

            <h2>Added Entities</h2>
            <ul>
                {entities.map((entity) => (
                    <li key={entity.id}>{entity.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AddEntity;