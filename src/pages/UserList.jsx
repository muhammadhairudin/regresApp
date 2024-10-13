import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [page]);

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.avatar} alt={user.first_name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-l-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="bg-gray-200 px-4 py-2">{`${page} / ${totalPages}`}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;