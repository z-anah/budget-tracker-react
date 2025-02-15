import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import Project from './screens/Project';
import Statistics from './screens/Statistics';
import Transaction from './screens/Transaction';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Category from './screens/Category';
import NameAccounts from './screens/NameAccounts';

const App = () => {
  const BASE_PATH = import.meta.env.BASE_URL;

  
  return (
    <Routes>
      <Route path={BASE_PATH} element={<Home />} />
      <Route path={`${BASE_PATH}/auth/login`} element={<Login />} />
      <Route path={`${BASE_PATH}/auth/signup`} element={<Signup />} />
      <Route path={`${BASE_PATH}/project/:projectId`} element={<Project />} />
      <Route path={`${BASE_PATH}/project/:projectId/transaction/:transactionId`} element={<Transaction />} />
      <Route path={`${BASE_PATH}/project/:projectId/statistics`} element={<Statistics />} />
      <Route path={`${BASE_PATH}/categories`} element={<Category />} />
      <Route path={`${BASE_PATH}/accounts`} element={<NameAccounts />} />
      <Route path="*" element={<Navigate to={BASE_PATH} />} />
    </Routes>
  );
};

export default App;
