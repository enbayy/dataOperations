import { useState } from 'react';

export default function DataForm({ onSubmit, initialData = {}, isEdit = false }) {
    const [name, setName] = useState(initialData.name || '');
    const [value, setValue] = useState(initialData.value || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, value });
        setName('');
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Value"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
                type="submit"
                className={`w-full py-2 ${isEdit ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-md hover:${isEdit ? 'bg-green-600' : 'bg-blue-600'}`}
            >
                {isEdit ? 'Update' : 'Add'}
            </button>
        </form>
    );
}