import { auth } from 'src/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      return;
    }
    setIsFetching(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('authToken', userCredential._tokenResponse.idToken);
      localStorage.setItem('userId', userCredential.user.uid);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Failed to login');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <ToastContainer />
      <div className='w-full max-w-sm p-4'>
        <h1 className='mb-4 text-2xl font-bold'>Login</h1>
        {isFetching ? (
            <div className='flex items-center justify-center'>
              <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-500' />
            </div>
        ) : (
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full rounded border border-gray-300 p-2'
                required
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full rounded border border-gray-300 p-2'
                required
              />
            </div>
            <button type='submit' className='my-2 w-full rounded bg-blue-500 p-2 text-white'>
              Login
            </button>
          </form>
        )}
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
