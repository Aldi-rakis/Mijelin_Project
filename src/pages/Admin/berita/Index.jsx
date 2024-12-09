import React, { useState } from 'react';
import Layoutadmin from '../../../layouts/Admin';
import { Link } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layoutadmin>
      <div className="flex flex-col w-full p-4">
        <div className='flex gap-4'>
        <h1 className="max-w-max bg-slate-600 py-2 px-4 my-2 text-white rounded-md">List Berita</h1>
     <Link to="/admin/beritacreate">
     <button  className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add New
          </button>
     </Link>
       
       
      
        </div>
        
        {/* Container untuk search dan add new button */}
        <div className="flex justify-between mb-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 w-1/3 border border-gray-300 rounded-md"
          />
          
          {/* Add New Button */}
         
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-fixed border border-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="w-1/12 px-4 py-2 text-left text-sm font-medium text-gray-600 border">No</th>
                <th className="w-5/12 px-4 py-2 text-left text-sm font-medium text-gray-600 border">Title</th>
                <th className="w-3/12 px-4 py-2 text-left text-sm font-medium text-gray-600 border">Image</th>
                <th className="w-2/12 px-4 py-2 text-left text-sm font-medium text-gray-600 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-sm text-gray-700 border">1</td>
                <td className="px-4 py-2 text-sm text-gray-700 border break-words">
                  This is a very long title that should wrap onto the next line if it exceeds the width of the column
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Image"
                    className="h-20 w-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 border">
                  <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 mx-1">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layoutadmin>
  );
};

export default Index;
