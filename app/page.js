"use client";

import { useState, useEffect } from 'react';
import DataForm from '../components/DataForm';
import DataList from '../components/DataList';

export default function Home() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const handleAdd = async ({ name, value }) => {
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value }),
    });
    const result = await res.json();
    if (res.status === 201) setData([...data, result]);
  };

  const handleUpdate = async ({ name, value }) => {
    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editData.id, name, value }),
    });
    const result = await res.json();
    if (res.status === 200) {
      setData(data.map((item) => (item.id === editData.id ? result : item)));
      setEditData(null);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch('/api/data', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.status === 200) setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Add data</h1>
        <DataForm onSubmit={editData ? handleUpdate : handleAdd} initialData={editData || {}} isEdit={!!editData} />
        <h2 className="text-xl font-semibold text-center mt-8 mb-4 text-black">Data</h2>
        <DataList data={data} onEdit={setEditData} onDelete={handleDelete} />
      </div>
    </div>
  );
}