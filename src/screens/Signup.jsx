import { auth } from 'src/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('User registered successfully!');
        setTimeout(() => {
            navigate('/auth/login');
        }, 3000);
    } catch (error) {
      console.error(error);
    }
  };
  // zulmianah@gmail.com
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <ToastContainer />
      <div className='w-full max-w-sm p-4'>
        <h1 className='mb-4 text-2xl font-bold'>Signup</h1>
        <form onSubmit={onSubmit} className='space-y-4'>
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
