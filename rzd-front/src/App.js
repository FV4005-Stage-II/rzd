
import './App.css';
import TrainPage from './pages/TrainPage.jsx';
import { SearchFormPage } from './pages/SearchFormPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanelPage from './pages/AdminPanelPage.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SearchFormPage />} />
        <Route path="/train-page/:id" exact element={<TrainPage />} />
        <Route path="/" exact element={<SearchFormPage />} />
        <Route path='/Admin-panel' exact element={<AdminPanelPage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
