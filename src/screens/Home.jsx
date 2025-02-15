import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from 'src/firebase/config';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

const BASE_PATH = '/budget-tracker-react';

const Home = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuthenticated(false);
      setIsFetching(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        getProjects();
      } else {
        setIsAuthenticated(false);
        setIsFetching(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function getProjects() {
    try {
      const projects = [];
      const querySnapshot = await getDocs(collection(db, 'projects'));
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projects);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch projects');
    } finally {
      setIsFetching(false);
    }
  }

  async function handleAddProject(e) {
    setIsFetching(true);
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    try {
      await addDoc(collection(db, 'projects'), {
        name,
        description,
        createdAt: new Date(),
        userId: localStorage.getItem('userId'),
      });
      await getProjects(); 
    } catch (error) {
      console.error(error);
      setError('Failed to add project');
    } finally {
      setIsFetching(false);
    }
  }

  if (isFetching) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-100'>
        <div className='flex items-center justify-center'>
          <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-500' />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className='w-full max-w-sm p-4'>
        <p>You are not authenticated</p>
      </div>
    );
  }

  const menuItems = [
    { href: `${BASE_PATH}/categories`, label: 'Categories' },
    { href: `${BASE_PATH}/accounts`, label: 'Accounts' },
  ];

  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-sm p-4'>
        <h1 className='mb-4 text-2xl font-bold'>Home</h1>
        <form className='space-y-4' onSubmit={handleAddProject}>
          <div>
            <label htmlFor='Name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              className='w-full rounded border border-gray-300 p-2'
              required
            />
          </div>
          <div>
            <label htmlFor='Description'>Description</label>
            <input
              type='text'
              id='description'
              name='description'
              className='w-full rounded border border-gray-300 p-2'
              required
            />
          </div>
          <button type='submit' className='my-2 w-full rounded bg-blue-500 p-2 text-white'>
            Add Project
          </button>
        </form>
        {error && <p className='text-red-500'>{error}</p>}

        <h2 className='mt-4 text-xl font-bold'>Projects</h2>
        <ul className='my-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
          {projects.map((project) => (
            <Link 
              to={`${BASE_PATH}/project/${project.id}`} 
              key={project.id}
              relative="path"
            >
              <li className='w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600'>
                {project.name}
              </li>
            </Link>
          ))}
        </ul>
        <h2 className='mt-4 text-xl font-bold'>Menu</h2>
        <ul className='my-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
          {menuItems.map((item, index) => (
            <Link to={item.href} key={index}>
              <li className='w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600'>
                {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
