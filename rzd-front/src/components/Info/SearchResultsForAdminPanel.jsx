import '../../styles/SearchResults.css'; 
import '../../styles/admin-add-route-form.css';

const SearchResultsForAdminPanel = ({ searchResult, setSearchResult }) => {
  const formatDateString = (dateString) => {
    const options = { day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const handleDeleteRoute = async (id) => {
    try {
      const response = await fetch(`http://localhost:8083/delete-route?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Маршрут успешно удален!');
    
        setSearchResult(prevState => prevState.filter(route => route.route.id !== id));
      } else {
        console.error('Ошибка при удалении маршрута:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выполнении DELETE-запроса:', error);
    }
  };

  return (
    <div className="search-results">
      {searchResult.map((route, index) => (
        <div style={{ width: '90%' }} key={index} className="result-item">
          <div className="departure-info">
            <p className="city">{route.route.whence}</p>
            <p className="time-info">{route.route.departureTime.slice(0, 5)}</p>
            <p className="info">{formatDateString(route.route.departureDate)}</p>
          </div>
          <div className="arrival-info">
            <p className="city">{route.route.vhere}</p>
            <p className="time-info">{route.route.arrivalTime.slice(0, 5)}</p>
            <p className="info">{formatDateString(route.route.arrivalDate)}</p>
          </div>
          <button
            className='button-delete'
            type="button"
            onClick={() => handleDeleteRoute(route.route.id)}
          >
            Удалить маршрут
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchResultsForAdminPanel;
