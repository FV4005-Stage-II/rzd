import React, { useState } from 'react';

import SearchResultsForAdminPanel from '../Info/SearchResultsForAdminPanel';

const AdminSearchRouteForm = () => {
    const [searchResult, setSearchResult] = useState([]);

    const [routeData, setRouteData] = useState({
        whence: '',
        vhere: '',
        departureDate: '',
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRouteData({ ...routeData, [name]: value });
      };

      const handleSubmit = async (e) => {
        if (!routeData.whence || !routeData.vhere || 
            !routeData.departureDate) {
            alert('Пожалуйста, заполните все поля');
            return; 
          }
        e.preventDefault();
        const baseUrl = 'http://localhost:8083/search-all-routes-day';
        const queryParams = `?whence=${routeData.whence}&vhere=${routeData.vhere}&departureDate=${routeData.departureDate}`;
        try {
          const response = await fetch(baseUrl + queryParams);
          if (response.ok) {
            const responseData = await response.json();
            setSearchResult(responseData);
          
          } else {
            console.error('Ошибка при добавлении маршрута:', response.statusText);
          }
        } catch (error) {
          console.error('Ошибка при выполнении POST-запроса:', error);
        }
      };
    
      return (
        <>
        <div className="add-route-form-container">
              <form className="add-route-form" onSubmit={handleSubmit}>
              <label>
                Откуда:
                <input type="text" name="whence" value={routeData.whence} onChange={handleInputChange} />
              </label>
              <br />
              <label>
                Куда:
                <input type="text" name="vhere" value={routeData.vhere} onChange={handleInputChange} />
              </label>
              <br />
              <label>
                Дата отправления:
                <input
                  type="date"
                  name="departureDate"
                  value={routeData.departureDate}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="submit">Найти маршрут</button>
            </form>
        </div>

        <SearchResultsForAdminPanel searchResult={searchResult} setSearchResult={setSearchResult}/>
        </>
      );
    };
    

export default AdminSearchRouteForm;