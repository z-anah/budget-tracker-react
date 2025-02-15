import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from 'src/firebase/config';

const Category = () => {
  const { projectId } = useParams();
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categories = [];
        querySnapshot.forEach((doc) => {
          categories.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categories);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch categories');
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategories();
  }, [projectId]);

  const handleAddCategory = async (event) => {
    event.preventDefault();
    const { name, icon } = event.target.elements;
    try {
      const categoriesRef = collection(db, 'categories');
      await addDoc(categoriesRef, {
        name: name.value,
        icon: icon.value || null,
      });
      // Fetch categories again to update the list
      const querySnapshot = await getDocs(categoriesRef);
      const categoriesList = [];
      querySnapshot.forEach((doc) => {
        categoriesList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoriesList);
    } catch (error) {
      console.error(error);
      setError('Failed to add category');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  if (isFetching) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-100'>
        <div className='flex items-center justify-center'>
          <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-500' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-sm p-4'>
          <div className='text-center text-red-500'>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-sm p-4'>
        <h1>Categories</h1>
        <form className='mt-4' onSubmit={handleAddCategory}>
          <input
            className='mb-2 w-full rounded border border-gray-400 p-2'
            type='text'
            name='name'
            placeholder='Category Name'
            onKeyDown={handleKeyDown}
          />
          <input
            className='mb-2 w-full rounded border border-gray-400 p-2'
            type='text'
            name='icon'
            placeholder='Icon'
            onKeyDown={handleKeyDown}
          />
          <button className='w-full rounded bg-blue-500 p-2 text-white' type='submit'>
            Add Category
          </button>
        </form>
        {categories.length === 0 && <p>No categories found</p>}
        <ul className='my-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
          {categories.map((category, index) => (
            <li
              key={index}
              className='w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600'
            >
              <p>
                {category.icon} {category.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
