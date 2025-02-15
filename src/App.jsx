import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Project from './screens/Project';
import Statistics from './screens/Statistics';
import Transaction from './screens/Transaction';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Category from './screens/Category';
import NameAccounts from './screens/NameAccounts';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/project/:projectId' element={<Project />} />
    <Route path='/project/:projectId/transaction/:transactionId' element={<Transaction />} />
    <Route path='/project/:projectId/statistics' element={<Statistics />} />
    <Route path='/auth/login' element={<Login />} />
    <Route path='/auth/signup' element={<Signup />} />
    <Route path='/categories' element={<Category />} />
    <Route path='/accounts' element={<NameAccounts />} />
  </Routes>
);

export default App;
