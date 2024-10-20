import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



/**
 * Komponen untuk login
 * Menggunakan state untuk menyimpan email dan password
 * Menggunakan useContext untuk mengakses fungsi login dari AuthContext
 * Menggunakan useNavigate untuk mengarahkan ke halaman yang diinginkan setelah login
 */
const Login = () => {
  const [email, setEmail] = useState(''); // state untuk menyimpan email
  const [password, setPassword] = useState(''); // state untuk menyimpan password
  const [error, setError] = useState(''); // state untuk menyimpan error message
  const navigate = useNavigate(); // fungsi untuk mengarahkan ke halaman yang diinginkan
  const { login } = useContext(AuthContext); // fungsi login dari AuthContext

  /**
   * Fungsi untuk handle submit form login
   * Menggunakan axios untuk mengirim request ke API
   * Jika berhasil, maka akan mengarahkan ke halaman yang diinginkan
   * Jika gagal, maka akan menampilkan error message
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      login(response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Try eve.holt@reqres.in with any password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <div className="text-center">
          <Link to="/register" className="text-sm text-gray-600 hover:text-gray-900">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
