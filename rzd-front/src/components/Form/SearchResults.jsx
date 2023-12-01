import '../../styles/SearchResults.css'; 
import { Link } from 'react-router-dom';

function SearchResults({ searchResult }) {
    const formatDateString = (dateString) => {
        const options = { day: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    return (
      <div className="search-results">
      {searchResult.map((route, index) => (
        <div key={index} className="result-item">
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
          <div className="additional-info">
            <Link to={'/train-page/' + route.route.id} >
              <p>
                Количество мест: {route.numberOfAvailableSeats}
              </p>
              <p>
                Цена билета: {route.minPrice}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
    
      );
    }
    
  
export default SearchResults;