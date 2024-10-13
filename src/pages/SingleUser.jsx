import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const SingleUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        if (response.data && response.data.data) {
          setUser(response.data.data);
        } else {
          throw new Error('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

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