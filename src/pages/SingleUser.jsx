import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

/**
 * Component untuk menampilkan detail user
 */
const SingleUser = () => {
  /**
   * State untuk menyimpan data user yang sedang di-load
   * awalnya kosong (null)
   */
  const [user, setUser] = useState(null);

  /**
   * State untuk menampilkan loading atau tidak
   * awalnya true (sedang loading)
   */
  const [loading, setLoading] = useState(true);

  /**
   * State untuk menampilkan error atau tidak
   * awalnya kosong (null)
   */
  const [error, setError] = useState(null);

  /**
   * Mengambil parameter id dari url
   */
  const { id } = useParams();

  /**
   * Menggunakan useNavigate untuk mengarahkan ke halaman lain
   */
  const navigate = useNavigate();

  /**
   * useEffect untuk melakukan fetch data user ketika component di-mount
   * atau ketika parameter id berubah
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        /**
         * Set loading menjadi true
         */
        setLoading(true);

        /**
         * Melakukan fetch data user dari API
         */
        const response = await axios.get(`https://reqres.in/api/users/${id}`);

        /**
         * Jika data user ditemukan, maka simpan ke state user
         */
        if (response.data && response.data.data) {
          setUser(response.data.data);
        } else {
          /**
           * Jika data user tidak ditemukan, maka throw error
           */
          throw new Error('User data not found');
        }
      } catch (error) {
        /**
         * Jika terjadi error, maka simpan ke state error
         */
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data');
      } finally {
        /**
         * Set loading menjadi false
         */
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  /**
   * Jika sedang loading, maka tampilkan teks "Loading..."
   */
  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  /**
   * Jika terjadi error, maka tampilkan teks error dan link kembali ke halaman user
   */
  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <Link to="/UsersList" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to User
        </Link>
      </div>
    );
  }

  /**
   * Jika user tidak ditemukan, maka tampilkan teks "User not found" dan link kembali ke halaman user
   */
  if (!user) {
    return (
      <div className="text-center mt-8">
        <p>User not found</p>
        <Link to="/UserList" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to User
        </Link>
      </div>
    );
  }

  /**
   * Jika user ditemukan, maka tampilkan detail user
   */
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/UserList" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to User
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
        <img src={user.avatar} alt={user.first_name} className="w-full h-96 object-cover" />
        <div className="p-4">
          <p className="text-gray-600">ID: {user.id}</p>
          <h2 className="text-2xl font-semibold mb-2">{`${user.first_name} ${user.last_name}`}</h2>
          <p className="text-gray-600 mb-2">Email: {user.email}</p>
          
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
