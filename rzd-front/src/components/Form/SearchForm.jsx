import { useState } from 'react';
import '../../styles/search-form.css';
import SearchResults from './SearchResults';

function SearchForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = () => {
  if (!from || !to || !date) {
    alert('Пожалуйста, заполните все поля');
    return; 
  }
  const baseUrl = 'http://localhost:8083/search-all-routes-day';
  const queryParams = `?whence=${from}&vhere=${to}&departureDate=${date}`;
  
  fetch(baseUrl + queryParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      setSearchResult(data);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
  };

  return (
    <>
    <div className="search-form">
      <input
        type="text"
        placeholder="Откуда"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Куда"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="input"
      />
      <input
        type="date"
        placeholder="Дата"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-input"
      />
      <button onClick={handleSearch} className="button">Найти</button>
    </div>
    
    <SearchResults  searchResult={searchResult} />
    </>
  );
}

export default SearchForm;
