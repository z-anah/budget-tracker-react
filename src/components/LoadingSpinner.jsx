const LoadingSpinner = () => (
  <div className='flex h-screen items-center justify-center bg-gray-100'>
    <div className='flex items-center justify-center'>
      <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-500' />
    </div>
  </div>
);

export default LoadingSpinner;
