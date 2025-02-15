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
    <Route path="/budget-tracker-react" element={<Home />} />
    <Route path="/budget-tracker-react/project/:projectId" element={<Project />} />
    <Route path="/budget-tracker-react/project/:projectId/transaction/:transactionId" element={<Transaction />} />
    <Route path="/budget-tracker-react/project/:projectId/statistics" element={<Statistics />} />
    <Route path="/budget-tracker-react/auth/login" element={<Login />} />
    <Route path="/budget-tracker-react/auth/signup" element={<Signup />} />
    <Route path="/budget-tracker-react/categories" element={<Category />} />
    <Route path="/budget-tracker-react/accounts" element={<NameAccounts />} />
  </Routes>
);

export default App;
