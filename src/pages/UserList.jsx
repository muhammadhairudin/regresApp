import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Komponen untuk menampilkan daftar user
 */
const UserList = () => {
  const [users, setUsers] = useState([]); // state untuk menyimpan data user
  const [page, setPage] = useState(1); // state untuk menyimpan halaman saat ini
  const [totalPages, setTotalPages] = useState(0); // state untuk menyimpan jumlah total halaman
  const navigate = useNavigate(); // hook untuk mengarahkan ke halaman lain

  /**
   * Fungsi untuk mengambil data user dari API
   * dengan parameter page yang di-passing
   */
  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  /**
   * Fungsi untuk menghandle klik pada user
   * dengan parameter userId yang di-passing
   */
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  /**
   * UseEffect untuk mengambil data user dari API
   * ketika komponen di-mount dan state page berubah
   */
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">User List</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => handleUserClick(user.id)}
          >
            <img src={user.avatar} alt={user.first_name} className="object-cover w-full h-96" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded-l-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200">{`${page} / ${totalPages}`}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded-r-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
