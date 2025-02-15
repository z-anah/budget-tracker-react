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
  const basePath = '/budget-tracker-react';
  
  return (
    <Routes>
      <Route path={basePath} element={<Home />} />
      <Route path={`${basePath}/auth/login`} element={<Login />} />
      <Route path={`${basePath}/auth/signup`} element={<Signup />} />
      <Route path={`${basePath}/project/:projectId`} element={<Project />} />
      <Route path={`${basePath}/project/:projectId/transaction/:transactionId`} element={<Transaction />} />
      <Route path={`${basePath}/project/:projectId/statistics`} element={<Statistics />} />
      <Route path={`${basePath}/categories`} element={<Category />} />
      <Route path={`${basePath}/accounts`} element={<NameAccounts />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to={basePath} />} />
    </Routes>
  );
};

export default App;
