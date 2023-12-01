import React, { useState } from 'react';
import '../../styles/admin-add-route-form.css'
const AdminAddRouteForm = () => {
  const [routeData, setRouteData] = useState({
    price: 0,
    whence: '',
    vhere: '',
    departureTime: '00:00:00',
    departureDate: '2023-11-22',
    arrivalTime: '00:00:00',
    arrivalDate: '2023-11-22',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (!routeData.whence || !routeData.vhere || 
        !routeData.arrivalDate || !routeData.arrivalTime || 
        !routeData.departureDate || !routeData.departureTime || 
        !routeData.price) {
        alert('Пожалуйста, заполните все поля');
        return; 
      }
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8083/add-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
      });

      if (response.ok) {
        alert('Маршрут успешно добавлен!');
      } else {
        console.error('Ошибка при добавлении маршрута:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выполнении POST-запроса:', error);
    }
  };

  return (
<div className="add-route-form-container">
      <form className="add-route-form" onSubmit={handleSubmit}>
      <label>
        Цена билета:
        <input type="number" name="price" value={routeData.price} onChange={handleInputChange} />
      </label>
      <br />
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
        Время отправления:
        <input
          type="time"
          name="departureTime"
          value={routeData.departureTime}
          onChange={handleInputChange}
        />
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
      <label>
        Время прибытия:
        <input
          type="time"
          name="arrivalTime"
          value={routeData.arrivalTime}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Дата прибытия:
        <input
          type="date"
          name="arrivalDate"
          value={routeData.arrivalDate}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Добавить маршрут</button>
    </form>
    </div>
  );
};

export default AdminAddRouteForm;
