import { useEffect, useState } from 'react';
import Train from './Train'; 
import {useParams} from 'react-router-dom';


const Trains = () => {
  const { id } = useParams();
  const [waggonsData, setWaggonsData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(0);


  async function fetchGet(id) {    
    try {
      const response = await fetch('http://localhost:8083/waggons-details?id=' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const data = await response.json();
    setWaggonsData(data.waggonsWithPlaces);
    } catch (error) {
      console.error('Ошибка при выполнении GET-запроса:', error);
    }
  }
  
  useEffect(() => {
    fetchGet(id);
  }, [waggonsData.length, id]);

  
  const handleCallback = () => {
    fetchGet(id);
  };
    
    

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {[0, 1, 2, 3].map((buttonIndex) => (
          <button
            key={buttonIndex}
            onClick={() => handleButtonClick(buttonIndex)}
            style={{
              margin: '15px',
              marrginTop: '50px',
              padding: '10px',
              backgroundColor: selectedButton === buttonIndex ? '#00f' : '#ddd',
              color: selectedButton === buttonIndex ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Вагон {buttonIndex + 1}
          </button>
        ))}
      </div>
      
      {selectedButton !== null && waggonsData[selectedButton]?.b && <Train
        waggonData={waggonsData[selectedButton]?.b}
        waggonName={waggonsData[selectedButton]?.a}
        callBack={handleCallback}
      />} 
      
    </div>
  );
};

export default Trains;
