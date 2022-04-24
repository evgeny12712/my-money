import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import TypesManager from './pages/TypesManager'
import AppHeader from './components/AppHeader';
import ExpensesList from './pages/ExpensesList';
function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path='/types_expenses' element={<ExpensesList />} />
          <Route path='/types_manager' element={<TypesManager />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
