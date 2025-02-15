import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from 'src/firebase/config';
import LoadingSpinner from '@components/LoadingSpinner';

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedTransactionId, setHighlightedTransactionId] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          setError('Project not found');
        }
      } catch (error) {
        console.error(error);
        setError('Failed to fetch project');
      } finally {
        setIsFetching(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const transactionsRef = query(collection(db, 'projects', projectId, 'transactions'), orderBy('date', 'desc'));
        const transactionsSnap = await getDocs(transactionsRef);
        const transactionsList = transactionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(transactionsList);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch transactions');
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesSnap = await getDocs(collection(db, 'categories'));
        const categoriesList = categoriesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategories(categoriesList);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch categories');
      }
    };

    const fetchAccounts = async () => {
      try {
        const accountsSnap = await getDocs(collection(db, 'accounts'));
        const accountsList = accountsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAccounts(accountsList);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch accounts');
      }
    };

    fetchProject();
    fetchTransactions();
    fetchCategories();
    fetchAccounts();
  }, [projectId]);

  const handleAddTransaction = async (event) => {
    event.preventDefault();
    const { description, amount, category, account, type, date, linkedTransactionId } = event.target.elements;
    try {
      const transactionsRef = collection(db, 'projects', projectId, 'transactions');
      const transactionAmount = (type.value === 'loan' || type.value === 'expense') ? -parseFloat(amount.value) : parseFloat(amount.value);
      const nowTime = new Date().toISOString().split('T')[1];
      await addDoc(transactionsRef, {
        description: description.value,
        amount: transactionAmount,
        category: category.value,
        account: account.value,
        type: type.value,
        date: date.value + 'T' + nowTime,
        linkedTransactionId: linkedTransactionId.value || null,
        timestamp: new Date().toISOString()
      });
      // Fetch transactions again to update the list
      const transactionsSnap = await getDocs(query(transactionsRef, orderBy('date', 'desc')));
      const transactionsList = transactionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionsList);
    } catch (error) {
      console.error(error);
      setError('Failed to add transaction');
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const transactionRef = doc(db, 'projects', projectId, 'transactions', transactionId);
      await deleteDoc(transactionRef);
      // Fetch transactions again to update the list
      const transactionsRef = query(collection(db, 'projects', projectId, 'transactions'), orderBy('date', 'desc'));
      const transactionsSnap = await getDocs(transactionsRef);
      const transactionsList = transactionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionsList);
    } catch (error) {
      console.error(error);
      setError('Failed to delete transaction');
    }
  };

  const handleCopyTransactionId = (transactionId) => {
    navigator.clipboard.writeText(transactionId).then(() => {
      alert('Transaction ID copied to clipboard');
    }).catch((error) => {
      console.error('Failed to copy transaction ID', error);
    });
  };

  const handleHighlightTransaction = (transactionId) => {
    setHighlightedTransactionId(transactionId);
  };

  if (isFetching) {
    return <LoadingSpinner />;
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
        {/* uppercase */}
        <h2 className='mt-4 text-xl font-bold uppercase'>{project?.name}</h2>
        <p>{project?.description}</p>
        {/* add transaction */}
        <form className='mt-4' onSubmit={handleAddTransaction}>
          <input
            className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl'
            type='text'
            name='description'
            placeholder='Description'
          />
          <select className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl' name='type'>
            <option value='income'>&#8593; Income</option>
            <option value='expense'>&#8595; Expense</option>
            <option value='loan'>&#8593; Loaned By</option>
            <option value='return'>&#8595; Return By</option>
          </select>
          <input
            className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl'
            type='number'
            name='amount'
            placeholder='Amount'
          />
          <select
            className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl'
            name='category'
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          <select className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl' name='account'>
            {accounts.map((account) => (
              <option key={account.id} value={account.name}>
                {account.name}
              </option>
            ))}
          </select>
          <input
            type='date'
            name='date'
            defaultValue={new Date().toISOString().split('T')[0]}
            className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl'
          />
          <input
            className='mb-2 w-full rounded border border-gray-400 p-1 text-2xl'
            type='text'
            name='linkedTransactionId'
            placeholder='Linked Transaction ID (optional)'
          />
          <button className='w-full rounded bg-blue-500 p-2 text-2xl text-white' type='submit'>
            Add Transaction
          </button>
        </form>

        {/* Display transactions */}
        <div className='mt-4'>
          <h2 className='text-lg font-bold'>Transactions</h2>
          <br/>
          <p className='text-xs text-gray-500'>Balance: {transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</p>
          <br/>
          {/* Add this wrapper div for horizontal scrolling */}
          <div className="overflow-x-auto">
            <table className='max-w-sm min-w-full divide-y divide-gray-200 text-xs'>
              <thead>
                <tr>
                  <th className='px-2 py-1 text-left font-medium tracking-wider text-gray-500 uppercase'>
                    Description
                  </th>
                  <th className='px-2 py-1 text-left font-medium tracking-wider text-gray-500 uppercase'>
                    Amount
                  </th>
                  <th className='px-2 py-1 text-left font-medium tracking-wider text-gray-500 uppercase'>
                    Category
                  </th>
                  <th className='px-2 py-1 text-left font-medium tracking-wider text-gray-500 uppercase'>
                    Account
                  </th>
                  <th className='px-2 py-1 text-left font-medium tracking-wider text-gray-500 uppercase'>
                    Date
                  </th>
                  <th className='px-2 py-1 text-left font-medium tracking-wider text-gray-500 uppercase'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className={highlightedTransactionId === transaction.id ? 'bg-yellow-100' : ''}>
                    <td className='px-2 py-1 whitespace-nowrap text-gray-500'>
                      {transaction.description}
                    </td>
                    <td className='px-2 py-1 text-right whitespace-nowrap text-gray-500'>
                      {transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                    </td>
                    <td className='px-2 py-1 whitespace-nowrap text-gray-500'>
                      {transaction.category}
                    </td>
                    <td className='px-2 py-1 whitespace-nowrap text-gray-500'>
                      {transaction.account}
                    </td>
                    <td className='px-2 py-1 text-right whitespace-nowrap text-gray-500'>
                      {new Date(transaction.date).toISOString().split('T')[0]}
                    </td>
                    <td className='px-2 py-1 whitespace-nowrap text-gray-500'>
                      <button
                        className='text-red-500 hover:text-red-700'
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        Delete
                      </button>
                      <button
                        className='ml-2 text-blue-500 hover:text-blue-700'
                        onClick={() => handleCopyTransactionId(transaction.id)}
                      >
                        Link
                      </button>
                      {transaction.linkedTransactionId && (
                        <button
                          className='ml-2 text-green-500 hover:text-green-700'
                          onClick={() => handleHighlightTransaction(transaction.linkedTransactionId)}
                        >
                          Highlight
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
