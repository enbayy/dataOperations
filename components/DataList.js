

export default function DataList({ data, onEdit, onDelete }) {
    return (
        <ul className="space-y-4">
            {data.map((item) => (
                <li key={item.id} className="flex justify-between items-center text-black">
                    <span>{item.name}: {item.value}</span>
                    <div>
                        <button
                            onClick={() => onEdit(item)}
                            className="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}