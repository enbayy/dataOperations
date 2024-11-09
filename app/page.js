"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value }),
    });

    const result = await res.json();
    if (res.status === 201) {
      setData([...data, result]);
      setName('');
      setValue('');
    } else {
      console.error(result);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editId, name: editName, value: editValue }),
    });

    const result = await res.json();
    if (res.status === 200) {
      setData(data.map((item) => (item.id === editId ? result : item)));
      setEditId(null);
      setEditName('');
      setEditValue('');
    } else {
      console.error(result);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch('/api/data', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await res.json();
    if (res.status === 200) {
      setData(data.filter((item) => item.id !== id));
    } else {
      console.error(result);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditValue(item.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Veri Ekle</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ad"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Değer"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Ekle
          </button>
        </form>

        {editId && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-4">Veri Güncelle</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Yeni Ad"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Yeni Değer"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Güncelle
              </button>
            </form>
          </div>
        )}

        <h2 className="text-xl font-semibold text-center mt-8 mb-4">Veriler</h2>
        <ul className="space-y-4">
          {data.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name}: {item.value}</span>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}