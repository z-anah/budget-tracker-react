const Transaction = () => {
  const { projectId, transactionId } = useParams();
  const { data: transaction, isLoading } = useTransaction(projectId, transactionId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-gray-700'>Transaction: {transaction.name}</h1>
      <p className='mt-4 text-gray-600'>{transaction.description}</p>
    </div>
  );
};

export default Transaction;
