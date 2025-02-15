import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from 'src/firebase/config';

const NameAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'accounts'));
        const accountsList = [];
        querySnapshot.forEach((doc) => {
          accountsList.push({ id: doc.id, ...doc.data() });
        });
        setAccounts(accountsList);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch accounts');
      } finally {
        setIsFetching(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccount = async (event) => {
    event.preventDefault();
    const { name } = event.target.elements;
    try {
      const accountsRef = collection(db, 'accounts');
      await addDoc(accountsRef, {
        name: name.value,
      });
      // Fetch accounts again to update the list
      const querySnapshot = await getDocs(accountsRef);
      const accountsList = [];
      querySnapshot.forEach((doc) => {
        accountsList.push({ id: doc.id, ...doc.data() });
      });
      setAccounts(accountsList);
    } catch (error) {
      console.error(error);
      setError('Failed to add account');
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
        <h1>Accounts</h1>
        <form className='mt-4' onSubmit={handleAddAccount}>
          <input
            className='mb-2 w-full rounded border border-gray-400 p-2'
            type='text'
            name='name'
            placeholder='Account Name'
            onKeyDown={handleKeyDown}
          />
          <button className='w-full rounded bg-blue-500 p-2 text-white' type='submit'>
            Add Account
          </button>
        </form>
        {accounts.length === 0 && <p>No accounts found</p>}
        <ul className='my-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
          {accounts.map((account, index) => (
            <li
              key={index}
              className='w-full border-b border-gray-200 px-4 py-2 dark:border-gray-600'
            >
              <p>{account.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NameAccounts;
