import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from 'src/firebase/config';
import LoadingSpinner from '@components/LoadingSpinner';
import ErrorMessage from '@components/ErrorMessage';

const CategoryForm = ({ onSubmit }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1]?.focus();
      event.preventDefault();
    }
  };

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <input
        className="mb-2 w-full rounded border border-gray-400 p-2"
        type="text"
        name="name"
        placeholder="Category Name"
        onKeyDown={handleKeyDown}
        required
      />
      <input
        className="mb-2 w-full rounded border border-gray-400 p-2"
        type="text"
        name="icon"
        placeholder="Icon"
        onKeyDown={handleKeyDown}
      />
      <button 
        className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600" 
        type="submit"
      >
        Add Category
      </button>
    </form>
  );
};

const CategoryList = ({ categories }) => {
  if (categories.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No categories found</p>;
  }

  return (
    <ul className="my-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
      {categories.map((category) => (
        <li
          key={category.id}
          className="w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600"
        >
          <p>
            {category.icon} {category.name}
          </p>
        </li>
      ))}
    </ul>
  );
};

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

  if (isFetching) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className='flex items-center justify-center bg-gray-100'>
      <div className='w-full max-w-sm p-4'>
        <h1>Categories</h1>
        <CategoryForm onSubmit={handleAddCategory} />
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default Category;
