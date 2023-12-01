import React from 'react';

const ColorInfo = () => {
  const colorStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '25%',
    marginRight: '10px',
    border: '2px solid',
    display: 'inline-block',
    
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '25px', }}>
      <div style={{ ...colorStyle, backgroundColor: '#81bfff'}}></div>
      <span>Свободно</span>

      <div style={{ ...colorStyle, backgroundColor: '#394a58', marginLeft: '20px',  }}></div>
      <span>Выбрано</span>

      <div style={{ ...colorStyle, backgroundColor: '#e2e4e7', marginLeft: '20px' }}></div>
      <span>Занято</span>
    </div>
  );
};

export default ColorInfo;
