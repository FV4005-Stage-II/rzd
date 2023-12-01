import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../styles/color-theme-rzd.css'
import {useParams} from 'react-router-dom';


const Train = ({waggonData, waggonName, callBack}) => {
    const [selected, setSelected] = useState(false);
    const [seats, setSeats] = useState({});
    const [price, setPrice] = useState(0);
    const handleSeatClick = (index) => {
      const clickedSeat = waggonData.length > 0 && waggonData[index];
  
      if (!clickedSeat.occupied) {
        setSeats((prevSeats) => {
          const prevSeatsForWaggon = prevSeats[waggonName] || [];
          const seatIsSelected = prevSeatsForWaggon.includes(index);
  
          if (seatIsSelected) {
  
            const updatedSeatsForWaggon = prevSeatsForWaggon.filter((selectedSeat) => selectedSeat !== index);
            setPrice((prevPrice) => prevPrice - parseInt(waggonData[index].price))
            if(price - parseInt(waggonData[index].price) === 0)
                setSelected(false)
        
            return {
              ...prevSeats,
              [waggonName]: updatedSeatsForWaggon,
            };
          } else {
            setSelected(true)
            setPrice((prevPrice) => prevPrice + parseInt(waggonData[index].price))
            const updatedSeatsForWaggon = [...prevSeatsForWaggon, index];
            return {
              ...prevSeats,
              [waggonName]: updatedSeatsForWaggon,
            };
          }
        });
      }
    };
const { id } = useParams();

const handleReservation = async () => {
    if (selected)
        try {
        const waggonsArray = Object.keys(seats).map((waggonName) => ({
            waggonName,
            selectedSeats: seats[waggonName],
        }));

        const requestData = {
            route_id: id,
            reservationSeatsDtos: waggonsArray,
        };
        const response = await fetch('http://localhost:8083/reserve-seats', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });      
        if (response.ok) {
            var waggonsArrayString = waggonsArray.map(waggon => {
                const seatsString = waggon.selectedSeats.map(seat => seat + 1).join(', ');
                return `${waggon.waggonName} вагон места ${seatsString}`;
            }).join('\n')
            waggonsArrayString += (`\nЦена: ${price}`)
            alert(waggonsArrayString)
            callBack();
            setSeats({});
            setPrice(0)
        } else {
            console.error('Ошибка при бронировании:', response.statusText);
        }
        } catch (error) {
            console.error('Ошибка при выполнении POST-запроса:', error);
        }
    setSelected(false)
  };
  

  useEffect(() => {

  }, [waggonName])

 waggonData.sort((a, b) => {
        const numberPlaceA = parseInt(a.number_place, 10);
        const numberPlaceB = parseInt(b.number_place, 10);
        return numberPlaceA - numberPlaceB;
    });

    if (waggonData.length <= 0) return (<div>empty</div>)
    return (
        <div className='train'>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 2420 336">
                            <style type="text/css">
                                {`
                                .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
                                .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#A9AEBA;}
                                .st2{fill-rule:evenodd;clip-rule:evenodd;fill:#E2E4E7;stroke:#D2D7DB;stroke-miterlimit:22.9256;}
                                .st3{opacity:0.25;filter:url(#AI_Тень_1_справа);}
                                .st4{fill-rule:evenodd;clip-rule:evenodd;fill:#E2E4E7;}
                                .st5{fill:none;stroke:#D2D7DB;stroke-miterlimit:22.9256;}
                                .st6{opacity:0.25;filter:url(#AI_Тень_1_слева);}
                                .st7{opacity:0.25;filter:url(#AI_Тень_1_сверху);}
                                .st8{fill:#FFFFFF;}
                                .st9{font-family:'Roboto','Helvetica Neue',sans-serif;}
                                .st10{font-size:20px;}
                                .st11{fill-rule:evenodd;clip-rule:evenodd;fill:#CBCED3;}
                                .st12{fill-rule:evenodd;clip-rule:evenodd;fill:#868D98;}
                                .st13{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#BBDDFF;stroke-width:4;stroke-miterlimit:22.9256;}
                                // .st2:hover {
                                //     fill: yellow;
                                //     cursor: pointer;
                                //   }
                                //   .seat--available:hover {
                                //     fill: green;
                                //     cursor: pointer;
                                //   }
                                // svg .seat--available {
                                //     cursor: pointer;
                                //     stroke: var(--svg-seat-stroke-available)!important;
                                //     fill: var(--svg-seat-fill-available)!important;
                                // }
                                /* Стиль для свободного места */
.st2.seat--available {
  fill: var(--svg-seat-fill-available); /* Используйте переменную для цвета свободного места */
  stroke: #000; /* Цвет обводки для видимости свободного места */
}

/* Стиль для занятого места */
.st2.seat--occupied {
  fill: e2e4e7; /* Используйте переменную для цвета занятого места */
  stroke: #000; /* Цвет обводки для видимости занятого места */
}

/* Стиль для выбранного места */
.st2.seat--selected {
  fill: var(--svg-seat-fill-selected); /* Используйте переменную для цвета выбранного места */
  stroke: #000; /* Цвет обводки для видимости выбранного места */
}
                                `}
                            </style>
            <filter id="AI_Тень_1_справа" filterUnits="objectBoundingBox">
                <feGaussianBlur stdDeviation="2" in="SourceAlpha" result="blur"></feGaussianBlur>
                <feOffset dy="4" dx="2" in="blur" result="offsetBlurredAlpha"></feOffset>
                <feMerge>
                    <feMergeNode in="offsetBlurredAlpha"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
            <filter id="AI_Тень_1_слева" filterUnits="objectBoundingBox">
                <feGaussianBlur stdDeviation="2" in="SourceAlpha" result="blur"></feGaussianBlur>
                <feOffset dy="4" dx="-2" in="blur" result="offsetBlurredAlpha"></feOffset>
                <feMerge>
                    <feMergeNode in="offsetBlurredAlpha"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
            <filter id="AI_Тень_1_сверху" filterUnits="objectBoundingBox">
                <feGaussianBlur stdDeviation="2" in="SourceAlpha" result="blur"></feGaussianBlur>
                <feOffset dy="-2" dx="4" in="blur" result="offsetBlurredAlpha"></feOffset>
                <feMerge>
                    <feMergeNode in="offsetBlurredAlpha"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
            <g id="Fon">
                <path className="st0" d="M12.3,328c-1.523,0-2.546-0.795-3.02-1.269C8.795,326.247,8,325.225,8,323.704V12.296   c0-1.521,0.795-2.542,1.268-3.017C9.753,8.796,10.777,8,12.3,8h2395.401c1.521,0,2.545,0.795,3.021,1.269   c0.483,0.484,1.278,1.506,1.278,3.027v311.408c0,1.486-0.76,2.497-1.236,2.985l-0.044,0.043c-0.474,0.474-1.496,1.268-3.019,1.268   H12.3z"></path>
            </g>
            <g id="Railway_carriage">
                <path className="st1" d="M2416.374,3.61c-2.258-2.14-5.298-3.61-8.674-3.61H12.301C8.78,0,5.997,1.346,3.61,3.624   C1.223,5.903,0,8.922,0,12.297v311.408c0,3.152,1.361,6.482,3.627,8.687C5.892,334.596,8.924,336,12.301,336H2407.7   c3.466,0,6.33-1.347,8.691-3.624c2.361-2.278,3.609-5.297,3.609-8.671V12.297C2420,9.265,2418.632,5.75,2416.374,3.61   L2416.374,3.61z M2412,323.705L2412,323.705c0,1.205-0.38,2.158-1.163,2.912c-1.26,1.215-2.252,1.383-3.136,1.383H12.301   c-1.419,0-2.466-0.73-3.095-1.342c-0.699-0.679-1.206-1.921-1.206-2.953V12.297c0-1.617,0.646-2.421,1.133-2.885   c1.231-1.175,2.125-1.411,3.167-1.411H2407.7c1.46,0,2.612,0.887,3.17,1.415c0.533,0.506,1.13,1.845,1.13,2.882V323.705z"></path>
                <path className="st1" d="M2416.391,3.625l-0.016-0.016c-2.228-2.225-5.298-3.608-8.674-3.608H12.3C8.924,0,5.854,1.384,3.626,3.609   L3.61,3.625C1.384,5.852,0,8.922,0,12.296v311.408c0,3.375,1.384,6.444,3.609,8.671l0.016,0.016C5.854,334.617,8.924,336,12.3,336   h2395.401c3.375,0,6.446-1.383,8.674-3.608l0.016-0.016c2.225-2.227,3.609-5.297,3.609-8.671V12.296   C2420,8.922,2418.616,5.852,2416.391,3.625z M2412,323.704c0,1.486-0.76,2.497-1.236,2.985l-0.044,0.043   c-0.474,0.474-1.496,1.268-3.019,1.268H12.3c-1.523,0-2.546-0.795-3.02-1.269C8.795,326.247,8,325.225,8,323.704V12.296   c0-1.521,0.795-2.542,1.268-3.017C9.753,8.796,10.777,8,12.3,8h2395.401c1.521,0,2.545,0.795,3.021,1.269   c0.483,0.484,1.278,1.506,1.278,3.027V323.704z"></path>
            </g>
            <g id="Compartment">
                <path className="st1" d="M2188,264h8v64h-8V264L2188,264z M2312,327.999L2312,327.999h8v-53.995h-8V327.999L2312,327.999z    M186.458,214.843L186.458,214.843l0,0.001L186.458,214.843H108v-6.839h-8v119.995h8V222.844h77.227L332,269.121v58.879h8v-64.745   L186.458,214.843L186.458,214.843z M532,328L532,328h8v-70h-8V328L532,328z M2312,8L2312,8v171h-31v8h31v11h8V8H2312L2312,8z    M716,210L716,210h8v-202h-8V210L716,210z M716,328L716,328h8v-64h-8V328L716,328z M900,210L900,210h8v-202h-8V210L900,210z    M900,328L900,328h8v-64h-8V328L900,328z M1084,210L1084,210h8v-202h-8V210L1084,210z M1084,328L1084,328h8v-64h-8V328L1084,328z    M1268,210L1268,210h8v-202h-8V210L1268,210z M1268,328L1268,328h8v-64h-8V328L1268,328z M1452,210L1452,210h8v-202h-8V210   L1452,210z M1452,328L1452,328h8v-64h-8V328L1452,328z M1636,210L1636,210h8v-202h-8V210L1636,210z M1636,328L1636,328h8v-64h-8   V328L1636,328z M1820,210L1820,210h8v-202h-8V210L1820,210z M1820,328L1820,328h8v-64h-8V328L1820,328z M2004,210h8v-202h-8V210   L2004,210z M2004,328h8v-64h-8V328L2004,328z M123.069,122L123.069,122H108v-114h-8v124h8v-2h15.069V122L123.069,122z    M281.991,160.129L281.991,160.129l-2.406,7.63L232,152.755h0h-11.203v0L188.812,130h-11.743v-8H232V8h8v138.889L281.991,160.129   L281.991,160.129z M232,144.755L232,144.755V130h-29.389l20.741,14.755H232L232,144.755z M413,8L413,8h-8v183h-25.1l-46.409-14.633   l-2.406,7.629l47.584,15.004v0h40.198v-8H413V8L413,8z M532,8L532,8v183h-59.131v8H532v5h8V8H532L532,8z M2227,178.999h-31V8h-8   v202h8v-23h31V178.999z"></path>
            </g>
            <g id="Seats">
                <path onClick={() => handleSeatClick(0)}  id="Seat1" 
                // className={`st2 ${seat.occupied ? 'seat--occupied' : selectedSeats.includes(index) ? 'seat--selected' : 'seat--available'}`}
               className={`st2 ${waggonData[0].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(0) ?'seat--selected' : 'seat--available'} `} 
                d="M540,82h41.452C589.454,82,596,90.659,596,101.243v81.516c0,10.583-6.547,19.242-14.548,19.242H540   V82z"></path>
                <g id="Shadow2" className="st3">
                    <path className="st4" d="M540,13h41.452C589.454,13,596,21.659,596,32.242v81.515c0,10.584-6.547,19.242-14.548,19.242H540V13z"></path>
                    <path className="st5" d="M540,13h41.452C589.454,13,596,21.659,596,32.242v81.515c0,10.584-6.547,19.242-14.548,19.242H540V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(1)}  id="Seat2" 
                className={`st2 ${waggonData[1].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(1) ?'seat--selected' : 'seat--available'} `} 
                d="M540,13h41.452C589.454,13,596,21.659,596,32.242v81.515c0,10.584-6.547,19.242-14.548,19.242H540   V13z"></path>
                <path onClick={() => handleSeatClick(2)}  id="Seat3" 
                className={`st2 ${waggonData[2].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(2) ?'seat--selected' : 'seat--available'} `} 
                d="M716,82h-41.452C666.547,82,660,90.659,660,101.243v81.516c0,10.583,6.547,19.242,14.548,19.242   H716V82z"></path>
                <g id="Shadow4" className="st6">
                    <path className="st4" d="M716,13h-41.452C666.547,13,660,21.659,660,32.242v81.515c0,10.584,6.547,19.242,14.548,19.242H716V13z"></path>
                    <path className="st5" d="M716,13h-41.452C666.547,13,660,21.659,660,32.242v81.515c0,10.584,6.547,19.242,14.548,19.242H716V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(3)}  id="Seat4" 
                className={`st2 ${waggonData[3].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(3) ?'seat--selected' : 'seat--available'} `} 
                d="M716,13h-41.452C666.547,13,660,21.659,660,32.242v81.515c0,10.584,6.547,19.242,14.548,19.242H716   V13z"></path>
                <path onClick={() => handleSeatClick(4)}  id="Seat5" 
                className={`st2 ${waggonData[4].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(4) ?'seat--selected' : 'seat--available'} `} 
                d="M724,82h41.451C773.453,82,780,90.659,780,101.243v81.516c0,10.583-6.547,19.242-14.549,19.242H724   V82z"></path>
                <g id="Shadow6" className="st3">
                    <path className="st4" d="M724,13h41.451C773.453,13,780,21.659,780,32.242v81.515c0,10.584-6.547,19.242-14.549,19.242H724V13z"></path>
                    <path className="st5" d="M724,13h41.451C773.453,13,780,21.659,780,32.242v81.515c0,10.584-6.547,19.242-14.549,19.242H724V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(5)}  id="Seat6" className={`st2 ${waggonData[5].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(5) ?'seat--selected' : 'seat--available'} `} d="M724,13h41.451C773.453,13,780,21.659,780,32.242v81.515c0,10.584-6.547,19.242-14.549,19.242H724   V13z"></path>
                <path onClick={() => handleSeatClick(6)}  id="Seat7" className={`st2 ${waggonData[6].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(6) ?'seat--selected' : 'seat--available'} `} d="M900,82h-41.452C850.547,82,844,90.659,844,101.243v81.516c0,10.583,6.547,19.242,14.548,19.242   H900V82z"></path>
                <g id="Shadow8" className="st6">
                    <path className="st4" d="M900,13h-41.452C850.547,13,844,21.659,844,32.242v81.515c0,10.584,6.547,19.242,14.548,19.242H900V13z"></path>
                    <path className="st5" d="M900,13h-41.452C850.547,13,844,21.659,844,32.242v81.515c0,10.584,6.547,19.242,14.548,19.242H900V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(7)}  id="Seat8" className={`st2 ${waggonData[7].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(7) ?'seat--selected' : 'seat--available'} `} d="M900,13h-41.452C850.547,13,844,21.659,844,32.242v81.515c0,10.584,6.547,19.242,14.548,19.242H900   V13z"></path>
                <path onClick={() => handleSeatClick(8)}  id="Seat9" className={`st2 ${waggonData[8].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(8) ?'seat--selected' : 'seat--available'} `} d="M908,82h41.452C957.453,82,964,90.659,964,101.243v81.516c0,10.583-6.547,19.242-14.549,19.242H908   V82z"></path>
                <g id="Shadow10" className="st3">
                    <path className="st4" d="M908,13h41.452C957.453,13,964,21.659,964,32.242v81.515c0,10.584-6.547,19.242-14.549,19.242H908V13z"></path>
                    <path className="st5" d="M908,13h41.452C957.453,13,964,21.659,964,32.242v81.515c0,10.584-6.547,19.242-14.549,19.242H908V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(9)}  id="Seat10" className={`st2 ${waggonData[9].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(9) ?'seat--selected' : 'seat--available'} `} d="M908,13h41.452C957.453,13,964,21.659,964,32.242v81.515c0,10.584-6.547,19.242-14.549,19.242H908   V13z"></path>
                <path onClick={() => handleSeatClick(10)}  id="Seat11" className={`st2 ${waggonData[10].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(10) ?'seat--selected' : 'seat--available'} `} d="M1084,82h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.516   c0,10.583,6.547,19.242,14.549,19.242H1084V82z"></path>
                <g id="Shadow12" className="st6">
                    <path className="st4" d="M1084,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H1084V13z"></path>
                    <path className="st5" d="M1084,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H1084V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(11)}  id="Seat12" className={`st2 ${waggonData[11].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(11) ?'seat--selected' : 'seat--available'} `} d="M1084,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515   c0,10.584,6.547,19.242,14.549,19.242H1084V13z"></path>
                <path onClick={() => handleSeatClick(12)}  id="Seat13" className={`st2 ${waggonData[12].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(12) ?'seat--selected' : 'seat--available'} `} d="M1092.107,82h41.373c7.986,0,14.521,8.659,14.521,19.243v81.516   c0,10.583-6.534,19.242-14.521,19.242h-41.373V82z"></path>
                <g id="Shadow14" className="st3">
                    <path className="st4" d="M1092,13h41.373c7.986,0,14.52,8.659,14.52,19.243v81.515c0,10.584-6.534,19.242-14.52,19.242H1092V13z"></path>
                    <path className="st5" d="M1092,13h41.373c7.986,0,14.52,8.659,14.52,19.243v81.515c0,10.584-6.534,19.242-14.52,19.242H1092V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(13)}  id="Seat14" className={`st2 ${waggonData[13].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(13) ?'seat--selected' : 'seat--available'} `} d="M1092,13h41.373c7.986,0,14.52,8.659,14.52,19.243v81.515c0,10.584-6.534,19.242-14.52,19.242   H1092V13z"></path>
                <path onClick={() => handleSeatClick(14)}  id="Seat15" className={`st2 ${waggonData[14].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(14) ?'seat--selected' : 'seat--available'} `} d="M1268,82h-41.452c-8.002,0-14.548,8.659-14.548,19.243v81.516   c0,10.583,6.547,19.242,14.548,19.242H1268V82z"></path>
                <g id="Shadow16" className="st6">
                    <path className="st4" d="M1268,13h-41.452c-8.002,0-14.548,8.659-14.548,19.243v81.515c0,10.584,6.547,19.242,14.548,19.242H1268V13z"></path>
                    <path className="st5" d="M1268,13h-41.452c-8.002,0-14.548,8.659-14.548,19.243v81.515c0,10.584,6.547,19.242,14.548,19.242H1268V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(15)}  id="Seat16" className={`st2 ${waggonData[15].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(15) ?'seat--selected' : 'seat--available'} `} d="M1268,13h-41.452c-8.002,0-14.548,8.659-14.548,19.243v81.515   c0,10.584,6.547,19.242,14.548,19.242H1268V13z"></path>
                <path onClick={() => handleSeatClick(16)}  id="Seat17" className={`st2 ${waggonData[16].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(16) ?'seat--selected' : 'seat--available'} `} d="M1276,82h41.452c8.002,0,14.548,8.659,14.548,19.243v81.516c0,10.583-6.547,19.242-14.548,19.242   H1276V82z"></path>
                <g id="Shadow18" className="st3">
                    <path className="st4" d="M1276,13h41.452c8.002,0,14.548,8.659,14.548,19.243v81.515c0,10.584-6.547,19.242-14.548,19.242H1276V13z"></path>
                    <path className="st5" d="M1276,13h41.452c8.002,0,14.548,8.659,14.548,19.243v81.515c0,10.584-6.547,19.242-14.548,19.242H1276V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(17)}  id="Seat18" className={`st2 ${waggonData[17].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(17) ?'seat--selected' : 'seat--available'} `} d="M1276,13h41.452c8.002,0,14.548,8.659,14.548,19.243v81.515c0,10.584-6.547,19.242-14.548,19.242   H1276V13z"></path>
                <path onClick={() => handleSeatClick(18)}  id="Seat19" className={`st2 ${waggonData[18].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(18) ?'seat--selected' : 'seat--available'} `} d="M1452,82h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.516   c0,10.583,6.547,19.242,14.548,19.242H1452V82z"></path>
                <g id="Shadow20" className="st6">
                    <path className="st4" d="M1452,13h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.515c0,10.584,6.547,19.242,14.548,19.242H1452V13z"></path>
                    <path className="st5" d="M1452,13h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.515c0,10.584,6.547,19.242,14.548,19.242H1452V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(19)}  id="Seat20" className={`st2 ${waggonData[19].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(19) ?'seat--selected' : 'seat--available'} `} d="M1452,13h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.515   c0,10.584,6.547,19.242,14.548,19.242H1452V13z"></path>
                <path onClick={() => handleSeatClick(20)}  id="Seat21" className={`st2 ${waggonData[20].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(20) ?'seat--selected' : 'seat--available'} `} d="M1460,82h41.451c8.002,0,14.549,8.659,14.549,19.243v81.516c0,10.583-6.547,19.242-14.549,19.242   H1460V82z"></path>
                <g id="Shadow22" className="st3">
                    <path className="st4" d="M1460,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H1460V13z"></path>
                    <path className="st5" d="M1460,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H1460V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(21)}  id="Seat22" className={`st2 ${waggonData[21].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(21) ?'seat--selected' : 'seat--available'} `} d="M1460,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242   H1460V13z"></path>
                <path onClick={() => handleSeatClick(22)}  id="Seat23" className={`st2 ${waggonData[22].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(22) ?'seat--selected' : 'seat--available'} `} d="M1636,82h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.516   c0,10.583,6.547,19.242,14.549,19.242H1636V82z"></path>
                <g id="Shadow24" className="st6">
                    <path className="st4" d="M1636,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H1636V13z"></path>
                    <path className="st5" d="M1636,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H1636V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(23)}  id="Seat24" className={`st2 ${waggonData[23].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(23) ?'seat--selected' : 'seat--available'} `} d="M1636,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515   c0,10.584,6.547,19.242,14.549,19.242H1636V13z"></path>
                <path onClick={() => handleSeatClick(24)}  id="Seat25" className={`st2 ${waggonData[24].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(24) ?'seat--selected' : 'seat--available'} `} d="M1644,82h41.452c8.002,0,14.549,8.659,14.549,19.243v81.516c0,10.583-6.547,19.242-14.549,19.242   H1644V82z"></path>
                <g id="Shadow26" className="st3">
                    <path className="st4" d="M1644,13h41.452c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H1644V13z"></path>
                    <path className="st5" d="M1644,13h41.452c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H1644V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(25)}  id="Seat26" className={`st2 ${waggonData[25].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(25) ?'seat--selected' : 'seat--available'} `} d="M1644,13h41.452c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242   H1644V13z"></path>
                <path onClick={() => handleSeatClick(26)}  id="Seat27" className={`st2 ${waggonData[26].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(26) ?'seat--selected' : 'seat--available'} `} d="M1820,82h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.516   c0,10.583,6.547,19.242,14.549,19.242H1820V82z"></path>
                <g id="Shadow28" className="st6">
                    <path className="st4" d="M1820,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H1820V13z"></path>
                    <path className="st5" d="M1820,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H1820V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(27)}  id="Seat28" className={`st2 ${waggonData[27].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(27) ?'seat--selected' : 'seat--available'} `} d="M1820,13h-41.452c-8.002,0-14.549,8.659-14.549,19.243v81.515   c0,10.584,6.547,19.242,14.549,19.242H1820V13z"></path>
                <path onClick={() => handleSeatClick(28)}  id="Seat29" className={`st2 ${waggonData[28].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(28) ?'seat--selected' : 'seat--available'} `} d="M1828,82h41.451c8.002,0,14.549,8.659,14.549,19.243v81.516c0,10.583-6.547,19.242-14.549,19.242   H1828V82z"></path>
                <g id="Shadow30" className="st3">
                    <path className="st4" d="M1828,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H1828V13z"></path>
                    <path className="st5" d="M1828,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H1828V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(29)}  id="Seat30" className={`st2 ${waggonData[29].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(29) ?'seat--selected' : 'seat--available'} `} d="M1828,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242   H1828V13z"></path>
                <path onClick={() => handleSeatClick(30)}  id="Seat31" className={`st2 ${waggonData[30].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(30) ?'seat--selected' : 'seat--available'} `} d="M2004,82h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.516   c0,10.583,6.547,19.242,14.548,19.242H2004V82z"></path>
                <g id="Shadow32" className="st6">
                    <path className="st4" d="M2004,13h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.515c0,10.584,6.547,19.242,14.548,19.242H2004V13z"></path>
                    <path className="st5" d="M2004,13h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.515c0,10.584,6.547,19.242,14.548,19.242H2004V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(31)}  id="Seat32" className={`st2 ${waggonData[31].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(31) ?'seat--selected' : 'seat--available'} `} d="M2004,13h-41.452c-8.001,0-14.548,8.659-14.548,19.243v81.515   c0,10.584,6.547,19.242,14.548,19.242H2004V13z"></path>
                <path onClick={() => handleSeatClick(32)}  id="Seat33" className={`st2 ${waggonData[32].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(32) ?'seat--selected' : 'seat--available'} `} d="M2012,82h41.451c8.002,0,14.549,8.659,14.549,19.243v81.516c0,10.583-6.547,19.242-14.549,19.242   H2012V82z"></path>
                <g id="Shadow34" className="st3">
                    <path className="st4" d="M2012,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H2012V13z"></path>
                    <path className="st5" d="M2012,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242H2012V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(33)}  id="Seat34" className={`st2 ${waggonData[33].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(33) ?'seat--selected' : 'seat--available'} `} d="M2012,13h41.451c8.002,0,14.549,8.659,14.549,19.243v81.515c0,10.584-6.547,19.242-14.549,19.242   H2012V13z"></path>
                <path onClick={() => handleSeatClick(34)}  id="Seat35" className={`st2 ${waggonData[34].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(34) ?'seat--selected' : 'seat--available'} `} d="M2188,82h-41.451c-8.002,0-14.549,8.659-14.549,19.243v81.516   c0,10.583,6.547,19.242,14.549,19.242H2188V82z"></path>
                <g id="Shadow36" className="st6">
                    <path className="st4" d="M2188,13h-41.451c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H2188V13z"></path>
                    <path className="st5" d="M2188,13h-41.451c-8.002,0-14.549,8.659-14.549,19.243v81.515c0,10.584,6.547,19.242,14.549,19.242H2188V13z"></path>
                </g>
                <path onClick={() => handleSeatClick(35)}  id="Seat36" className={`st2 ${waggonData[35].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(35) ?'seat--selected' : 'seat--available'} `} d="M2188,13h-41.451c-8.002,0-14.549,8.659-14.549,19.243v81.515   c0,10.584,6.547,19.242,14.549,19.242H2188V13z"></path>
                <path onClick={() => handleSeatClick(36)}  id="Seat37" className={`st2 ${waggonData[36].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(36) ?'seat--selected' : 'seat--available'} `} d="M2076,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.96,6.547,17.96,14.548   V323H2076z"></path>
                <g id="Shadow38" className="st7">
                    <path className="st4" d="M2012,323v-41.452c0-8.002,6.76-14.548,15.021-14.548h81.958c8.261,0,15.021,6.547,15.021,14.548V323H2012z"></path>
                    <path className="st5" d="M2012,323v-41.452c0-8.002,6.76-14.548,15.021-14.548h81.958c8.261,0,15.021,6.547,15.021,14.548V323H2012z"></path>
                </g>
                <path onClick={() => handleSeatClick(37)}  id="Seat38" className={`st2 ${waggonData[37].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(37) ?'seat--selected' : 'seat--available'} `} d="M2012,323v-41.452c0-8.002,6.76-14.548,15.021-14.548h81.958c8.261,0,15.021,6.547,15.021,14.548   V323H2012z"></path>
                <path onClick={() => handleSeatClick(38)}  id="Seat39" className={`st2 ${waggonData[38].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(38) ?'seat--selected' : 'seat--available'} `} d="M1892,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1892z"></path>
                <g id="Shadow40" className="st7">
                    <path className="st4" d="M1828,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1828z"></path>
                    <path className="st5" d="M1828,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1828z"></path>
                </g>
                <path onClick={() => handleSeatClick(39)}  id="Seat40" className={`st2 ${waggonData[39].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(39) ?'seat--selected' : 'seat--available'} `} d="M1828,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1828z"></path>
                <path onClick={() => handleSeatClick(40)}  id="Seat41" className={`st2 ${waggonData[40].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(40) ?'seat--selected' : 'seat--available'} `} d="M1708,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1708z"></path>
                <g id="Shadow42" className="st7">
                    <path className="st4" d="M1644,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1644z"></path>
                    <path className="st5" d="M1644,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1644z"></path>
                </g>
                <path onClick={() => handleSeatClick(41)}  id="Seat42" className={`st2 ${waggonData[41].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(41) ?'seat--selected' : 'seat--available'} `} d="M1644,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1644z"></path>
                <path onClick={() => handleSeatClick(42)}  id="Seat43" className={`st2 ${waggonData[42].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(42) ?'seat--selected' : 'seat--available'} `} d="M1524,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.96,6.547,17.96,14.548   V323H1524z"></path>
                <g id="Shadow44" className="st7">
                    <path className="st4" d="M1460,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1460z"></path>
                    <path className="st5" d="M1460,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1460z"></path>
                </g>
                <path onClick={() => handleSeatClick(43)}  id="Seat44" className={`st2 ${waggonData[43].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(43) ?'seat--selected' : 'seat--available'} `} d="M1460,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1460z"></path>
                <path onClick={() => handleSeatClick(44)}  id="Seat45" className={`st2 ${waggonData[44].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(44) ?'seat--selected' : 'seat--available'} `} d="M1340,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.96,6.547,17.96,14.548   V323H1340z"></path>
                <g id="Shadow46" className="st7">
                    <path className="st4" d="M1276,323v-41.452c0-8.002,8.081-14.548,17.959-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1276z"></path>
                    <path className="st5" d="M1276,323v-41.452c0-8.002,8.081-14.548,17.959-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1276z"></path>
                </g>
                <path onClick={() => handleSeatClick(45)}  id="Seat46" className={`st2 ${waggonData[45].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(45) ?'seat--selected' : 'seat--available'} `} d="M1276,323v-41.452c0-8.002,8.081-14.548,17.959-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1276z"></path>
                <path onClick={() => handleSeatClick(46)}  id="Seat47" className={`st2 ${waggonData[46].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(46) ?'seat--selected' : 'seat--available'} `} d="M1156,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1156z"></path>
                <g id="Shadow48" className="st7">
                    <path className="st4" d="M1092,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1092z"></path>
                    <path className="st5" d="M1092,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H1092z"></path>
                </g>
                <path onClick={() => handleSeatClick(47)}  id="Seat48" className={`st2 ${waggonData[47].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(47) ?'seat--selected' : 'seat--available'} `} d="M1092,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H1092z"></path>
                <path onClick={() => handleSeatClick(48)}  id="Seat49" className={`st2 ${waggonData[48].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(48) ?'seat--selected' : 'seat--available'} `} d="M972,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H972z"></path>
                <g id="Shadow50" className="st7">
                    <path className="st4" d="M908,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H908z"></path>
                    <path className="st5" d="M908,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H908z"></path>
                </g>
                <path onClick={() => handleSeatClick(49)}  id="Seat50" className={`st2 ${waggonData[49].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(49) ?'seat--selected' : 'seat--available'} `} d="M908,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H908z"></path>
                <path onClick={() => handleSeatClick(50)}  id="Seat51" className={`st2 ${waggonData[50].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(50) ?'seat--selected' : 'seat--available'} `} d="M788,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H788z"></path>
                <g id="Shadow52" className="st7">
                    <path className="st4" d="M724,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H724z"></path>
                    <path className="st5" d="M724,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H724z"></path>
                </g>
                <path onClick={() => handleSeatClick(51)}  id="Seat52" className={`st2 ${waggonData[51].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(51) ?'seat--selected' : 'seat--available'} `} d="M724,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H724z"></path>
                <path onClick={() => handleSeatClick(52)}  id="Seat53" className={`st2 ${waggonData[52].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(52) ?'seat--selected' : 'seat--available'} `} d="M604,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H604z"></path>
                <g id="Shadow54" className="st7">
                    <path className="st4" d="M540,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H540z"></path>
                    <path className="st5" d="M540,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548V323H540z"></path>
                </g>
                <path onClick={() => handleSeatClick(53)}  id="Seat54" className={`st2 ${waggonData[53].occupied ? 'seat--occupied' : seats[waggonName] && seats[waggonName].includes(53) ?'seat--selected' : 'seat--available'} `} d="M540,323v-41.452c0-8.002,8.082-14.548,17.96-14.548h76.081c9.878,0,17.959,6.547,17.959,14.548   V323H540z"></path>
            </g>
            <g id="Numbers" pointerEvents="none">
                <text transform="matrix(1.0003 0 0 1 564.1094 171.5798)" className="st8 st9 st10">1</text>
                <text transform="matrix(1.0003 0 0 1 562.7974 80.5803)" className="st8 st9 st10">2</text>
                <text transform="matrix(1.0003 0 0 1 683.0753 171.5798)" className="st8 st9 st10">3</text>
                <text transform="matrix(1.0003 0 0 1 682.8506 80.4802)" className="st8 st9 st10">4</text>
                <text transform="matrix(1.0003 0 0 1 746.7169 80.3801)" className="st8 st9 st10">6</text>
                <text transform="matrix(1.0003 0 0 1 746.5274 171.5798)" className="st8 st9 st10">5</text>
                <text transform="matrix(1.0003 0 0 1 866.942 171.5798)" className="st8 st9 st10">7</text>
                <text transform="matrix(1.0003 0 0 1 866.8839 80.4802)" className="st8 st9 st10">8</text>
                <text transform="matrix(1.0003 0 0 1 931.0489 171.5798)" className="st8 st9 st10">9</text>
                <text transform="matrix(1.0003 0 0 1 925.003 80.4802)" className="st8 st9 st10">10</text>
                <text transform="matrix(1.0003 0 0 1 1046.4912 171.5798)" className="st8 st9 st10">11</text>
                <text transform="matrix(1.0003 0 0 1 1044.8027 80.5803)" className="st8 st9 st10">12</text>
                <text transform="matrix(1.0003 0 0 1 1109.0332 171.5798)" className="st8 st9 st10">13</text>
                <text transform="matrix(1.0003 0 0 1 1108.6079 80.5105)" className="st8 st9 st10">14</text>
                <text transform="matrix(1.0003 0 0 1 1228.8311 171.5798)" className="st8 st9 st10">15</text>
                <text transform="matrix(1.0003 0 0 1 1228.915 80.4104)" className="st8 st9 st10">16</text>
                <text transform="matrix(1.0003 0 0 1 1292.8721 171.5798)" className="st8 st9 st10">17</text>
                <text transform="matrix(1.0003 0 0 1 1292.9834 80.4802)" className="st8 st9 st10">18</text>
                <text transform="matrix(1.0003 0 0 1 1413.0898 171.5798)" className="st8 st9 st10">19</text>
                <text transform="matrix(1.0003 0 0 1 1413.3799 80.4802)" className="st8 st9 st10">20</text>
                <text transform="matrix(1.0003 0 0 1 1478.8691 171.5798)" className="st8 st9 st10">21</text>
                <text transform="matrix(1.0003 0 0 1 1477.1797 80.5803)" className="st8 st9 st10">22</text>
                <text transform="matrix(1.0003 0 0 1 1597.4639 171.5798)" className="st8 st9 st10">23</text>
                <text transform="matrix(1.0003 0 0 1 1597.0381 80.5803)" className="st8 st9 st10">24</text>
                <text transform="matrix(1.0003 0 0 1 1661.208 171.5798)" className="st8 st9 st10">25</text>
                <text transform="matrix(1.0003 0 0 1 1661.292 80.4802)" className="st8 st9 st10">26</text>
                <text transform="matrix(1.0003 0 0 1 1781.248 171.5798)" className="st8 st9 st10">27</text>
                <text transform="matrix(1.0003 0 0 1 1781.3604 80.4802)" className="st8 st9 st10">28</text>
                <text transform="matrix(1.0003 0 0 1 1845.4668 171.5798)" className="st8 st9 st10">29</text>
                <text transform="matrix(1.0003 0 0 1 1845.375 80.4802)" className="st8 st9 st10">30</text>
                <text transform="matrix(1.0003 0 0 1 1966.8633 171.5798)" className="st8 st9 st10">31</text>
                <text transform="matrix(1.0003 0 0 1 1965.1748 80.4802)" className="st8 st9 st10">32</text>
                <text transform="matrix(1.0003 0 0 1 2029.458 171.5798)" className="st8 st9 st10">33</text>
                <text transform="matrix(1.0003 0 0 1 2029.0332 80.4802)" className="st8 st9 st10">34</text>
                <text transform="matrix(1.0003 0 0 1 2149.2031 171.5798)" className="st8 st9 st10">35</text>
                <text transform="matrix(1.0003 0 0 1 2149.2861 80.4802)" className="st8 st9 st10">36</text>
                <text transform="matrix(1 0 0 1 2145.2461 303.5798)" className="st8 st9 st10">37</text>
                <text transform="matrix(1 0 0 1 2057.3574 303.5798)" className="st8 st9 st10">38</text>
                <text transform="matrix(1 0 0 1 1961.4648 303.5798)" className="st8 st9 st10">39</text>
                <text transform="matrix(1.0003 0 0 1 1873.5742 303.5798)" className="st8 st9 st10">40</text>
                <text transform="matrix(1.0003 0 0 1 1779.0635 303.5798)" className="st8 st9 st10">41</text>
                <text transform="matrix(1.0003 0 0 1 1689.374 303.5798)" className="st8 st9 st10">42</text>
                <text transform="matrix(1.0003 0 0 1 1593.6582 303.5798)" className="st8 st9 st10">43</text>
                <text transform="matrix(1.0003 0 0 1 1505.2334 303.5798)" className="st8 st9 st10">44</text>
                <text transform="matrix(1 0 0 1 1409.4063 303.5798)" className="st8 st9 st10">45</text>
                <text transform="matrix(1 0 0 1 1321.4893 303.5798)" className="st8 st9 st10">46</text>
                <text transform="matrix(1.0003 0 0 1 1225.4434 303.5798)" className="st8 st9 st10">47</text>
                <text transform="matrix(1.0003 0 0 1 1137.5547 303.5798)" className="st8 st9 st10">48</text>
                <text transform="matrix(1.0003 0 0 1 1041.6611 303.5798)" className="st8 st9 st10">49</text>
                <text transform="matrix(1.0003 0 0 1 953.0811 303.5798)" className="st8 st9 st10">50</text>
                <text transform="matrix(1.0003 0 0 1 858.5704 303.5798)" className="st8 st9 st10">51</text>
                <text transform="matrix(1.0003 0 0 1 768.8814 303.5798)" className="st8 st9 st10">52</text>
                <text transform="matrix(1.0003 0 0 1 673.1651 303.5798)" className="st8 st9 st10">53</text>
                <text transform="matrix(1.0003 0 0 1 584.7398 303.5798)" className="st8 st9 st10">54</text>
            </g>
            <g id="Tables">
                <path className="st11" d="M603,13h50v54.88c0,2.815-1.495,5.119-3.323,5.119h-43.353C604.496,73,603,70.696,603,67.88V13z"></path>
                <path className="st11" d="M787,13h50v54.88c0,2.815-1.495,5.119-3.323,5.119h-43.353C788.496,73,787,70.696,787,67.88V13z"></path>
                <path className="st11" d="M971,13h50v54.88c0,2.815-1.496,5.119-3.324,5.119h-43.353C972.496,73,971,70.696,971,67.88V13z"></path>
                <path className="st11" d="M1155,13h50v54.88c0,2.815-1.495,5.119-3.323,5.119h-43.353c-1.828,0-3.324-2.304-3.324-5.119V13z"></path>
                <path className="st11" d="M1339,13h50v54.88c0,2.815-1.495,5.119-3.323,5.119h-43.353c-1.828,0-3.324-2.304-3.324-5.119V13z"></path>
                <path className="st11" d="M1523,13h50v54.88c0,2.815-1.496,5.119-3.324,5.119h-43.353c-1.828,0-3.323-2.304-3.323-5.119V13z"></path>
                <path className="st11" d="M1707,13h50v54.88c0,2.815-1.496,5.119-3.323,5.119h-43.353c-1.828,0-3.324-2.304-3.324-5.119V13z"></path>
                <path className="st11" d="M1891,13h50v54.88c0,2.815-1.496,5.119-3.323,5.119h-43.353c-1.828,0-3.324-2.304-3.324-5.119V13z"></path>
                <path className="st11" d="M2075,13h50v54.88c0,2.815-1.496,5.119-3.323,5.119h-43.353c-1.828,0-3.324-2.304-3.324-5.119V13z"></path>
            </g>
            <g id="Cup_for_table">
                <path className="st12" d="M638.008,50.925c0,1.148-0.928,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H638.008   L638.008,50.925z M633.684,46.094L633.684,46.094c0,0,0.214-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L633.684,46.094z M623.91,50.052L623.91,50.052c-0.979,0-1.771-0.795-1.771-1.775   v-7.923h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H623.91L623.91,50.052z M625.314,37.407L625.314,37.407c0,0.458-0.186,0.826-0.557,1.103   c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.166-0.027,0.238-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.213-1.023-0.634-1.48c-0.423-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.634,1.533   C625.102,36.678,625.314,37.075,625.314,37.407L625.314,37.407z M628.11,37.407L628.11,37.407c0,0.458-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.633,1.533   C627.899,36.678,628.11,37.075,628.11,37.407L628.11,37.407z M630.906,37.407L630.906,37.407c0,0.458-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392c0.087,0,0.167-0.027,0.238-0.083   c0.576-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48c-0.422-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.212,1.072,0.634,1.533   C630.695,36.678,630.906,37.075,630.906,37.407z"></path>
                <path className="st12" d="M822.009,50.925c0,1.148-0.928,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H822.009   L822.009,50.925z M817.684,46.094L817.684,46.094c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L817.684,46.094z M807.91,50.052L807.91,50.052c-0.98,0-1.771-0.795-1.771-1.775   v-7.923h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H807.91L807.91,50.052z M809.314,37.407L809.314,37.407c0,0.458-0.186,0.826-0.557,1.103   c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.423-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284c0-0.261-0.131-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.633,1.533   C809.103,36.678,809.314,37.075,809.314,37.407L809.314,37.407z M812.11,37.407L812.11,37.407c0,0.458-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.633,1.533   C811.9,36.678,812.11,37.075,812.11,37.407L812.11,37.407z M814.906,37.407L814.906,37.407c0,0.458-0.185,0.826-0.557,1.103   c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392c0.087,0,0.167-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.422-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.212,1.072,0.634,1.533   C814.695,36.678,814.906,37.075,814.906,37.407z"></path>
                <path className="st12" d="M1006.009,50.925c0,1.148-0.928,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1006.009   L1006.009,50.925z M1001.684,46.094L1001.684,46.094c0,0,0.214-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L1001.684,46.094z M991.91,50.052L991.91,50.052c-0.98,0-1.771-0.795-1.771-1.775   v-7.923h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H991.91L991.91,50.052z M993.315,37.407L993.315,37.407c0,0.458-0.187,0.826-0.557,1.103   c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.13,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.423-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.146-0.731,0.439-1.008c0.079-0.078,0.119-0.174,0.119-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.194,0.035-0.273,0.107c-0.451,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.634,1.533   C993.102,36.678,993.315,37.075,993.315,37.407L993.315,37.407z M996.11,37.407L996.11,37.407c0,0.458-0.186,0.826-0.557,1.103   c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392c0.088,0,0.166-0.027,0.237-0.083   c0.578-0.434,0.865-1.011,0.865-1.73c0-0.528-0.211-1.023-0.634-1.48c-0.422-0.458-0.633-0.872-0.633-1.244   c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576c0,0.561,0.211,1.072,0.634,1.533   C995.9,36.678,996.11,37.075,996.11,37.407L996.11,37.407z M998.906,37.407L998.906,37.407c0,0.458-0.185,0.826-0.557,1.103   c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.422-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.147-0.731,0.439-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.103,0-0.194,0.035-0.273,0.107c-0.449,0.426-0.675,0.952-0.675,1.576c0,0.561,0.212,1.072,0.634,1.533   C998.695,36.678,998.906,37.075,998.906,37.407z"></path>
                <path className="st12" d="M1190.009,50.925c0,1.148-0.929,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1190.009   L1190.009,50.925z M1185.684,46.094L1185.684,46.094c0,0,0.214-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L1185.684,46.094z M1175.91,50.052L1175.91,50.052c-0.98,0-1.771-0.795-1.771-1.775   v-7.923h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H1175.91L1175.91,50.052z M1177.314,37.407L1177.314,37.407c0,0.458-0.186,0.826-0.557,1.103   c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.13,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.213-1.023-0.634-1.48c-0.423-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284c0-0.261-0.13-0.391-0.391-0.391   c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.634,1.533   C1177.102,36.678,1177.314,37.075,1177.314,37.407L1177.314,37.407z M1180.11,37.407L1180.11,37.407   c0,0.458-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.634,1.533C1179.899,36.678,1180.11,37.075,1180.11,37.407L1180.11,37.407z M1182.906,37.407   L1182.906,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.132,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.238-0.083c0.576-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.212,1.072,0.634,1.533C1182.695,36.678,1182.906,37.075,1182.906,37.407z"></path>
                <path className="st12" d="M1374.008,50.925c0,1.148-0.929,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1374.008   L1374.008,50.925z M1369.684,46.094L1369.684,46.094c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L1369.684,46.094z M1359.91,50.052L1359.91,50.052c-0.98,0-1.771-0.795-1.771-1.775   v-7.923h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366c0,0.209-0.002,0.653-0.002,0.77   c0,0.979-0.795,1.775-1.775,1.775H1359.91L1359.91,50.052z M1361.314,37.407L1361.314,37.407c0,0.458-0.187,0.826-0.557,1.103   c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.13,0.392,0.391,0.392c0.087,0,0.166-0.027,0.237-0.083   c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48c-0.423-0.458-0.634-0.872-0.634-1.244   c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284c0-0.261-0.131-0.391-0.391-0.391   c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.675,0.952-0.675,1.576c0,0.561,0.211,1.072,0.634,1.533   C1361.102,36.678,1361.314,37.075,1361.314,37.407L1361.314,37.407z M1364.11,37.407L1364.11,37.407   c0,0.458-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.634,1.533C1363.899,36.678,1364.11,37.075,1364.11,37.407L1364.11,37.407z M1366.906,37.407   L1366.906,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.103,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.237-0.083c0.577-0.434,0.865-1.011,0.865-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.212,1.072,0.634,1.533C1366.695,36.678,1366.906,37.075,1366.906,37.407z"></path>
                <path className="st12" d="M1558.008,50.925c0,1.148-0.929,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1558.008   L1558.008,50.925z M1553.684,46.094L1553.684,46.094c0,0,0.213-0.003,0.366-0.003c1.193,0,2.159-0.965,2.159-2.159   c0-1.192-0.966-2.157-2.159-2.157h-0.366V46.094L1553.684,46.094z M1543.909,50.052L1543.909,50.052   c-0.979,0-1.77-0.795-1.77-1.775v-7.923h11.903c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.6,3.575-3.575,3.575h-0.366   c0,0.209-0.002,0.653-0.002,0.77c0,0.979-0.795,1.775-1.775,1.775H1543.909L1543.909,50.052z M1545.314,37.407L1545.314,37.407   c0,0.458-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.086,0,0.166-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.635-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C1545.102,36.678,1545.314,37.075,1545.314,37.407L1545.314,37.407z M1548.109,37.407   L1548.109,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C1547.899,36.678,1548.109,37.075,1548.109,37.407L1548.109,37.407z M1550.905,37.407   L1550.905,37.407c0,0.458-0.185,0.826-0.556,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.086,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.451,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.634,1.533C1550.694,36.678,1550.905,37.075,1550.905,37.407z"></path>
                <path className="st12" d="M1742.008,50.925c0,1.148-0.929,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H1742.008   L1742.008,50.925z M1737.684,46.094L1737.684,46.094c0,0,0.213-0.003,0.366-0.003c1.193,0,2.159-0.965,2.159-2.159   c0-1.192-0.966-2.157-2.159-2.157h-0.366V46.094L1737.684,46.094z M1727.909,50.052L1727.909,50.052   c-0.979,0-1.77-0.795-1.77-1.775v-7.923h11.903c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366   c0,0.209-0.002,0.653-0.002,0.77c0,0.979-0.795,1.775-1.775,1.775H1727.909L1727.909,50.052z M1729.314,37.407L1729.314,37.407   c0,0.458-0.186,0.826-0.558,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.634-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C1729.102,36.678,1729.314,37.075,1729.314,37.407L1729.314,37.407z M1732.109,37.407   L1732.109,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.145-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.634,1.533C1731.899,36.678,1732.109,37.075,1732.109,37.407L1732.109,37.407z M1734.905,37.407   L1734.905,37.407c0,0.458-0.185,0.826-0.556,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.212,1.072,0.634,1.533C1734.694,36.678,1734.905,37.075,1734.905,37.407z"></path>
                <path className="st12" d="M1926.008,50.925c0,1.148-0.928,2.075-2.079,2.075h-15.861c-1.15,0-2.078-0.927-2.078-2.075H1926.008   L1926.008,50.925z M1921.684,46.094L1921.684,46.094c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L1921.684,46.094z M1911.909,50.052L1911.909,50.052   c-0.979,0-1.771-0.795-1.771-1.775v-7.923h11.904c1.975,0,3.582,1.604,3.582,3.577c0,1.976-1.6,3.575-3.575,3.575h-0.366   c0,0.209-0.002,0.653-0.002,0.77c0,0.979-0.795,1.775-1.775,1.775H1911.909L1911.909,50.052z M1913.314,37.407L1913.314,37.407   c0,0.458-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.166-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.635-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.731,0.438-1.008c0.078-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.102,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C1913.102,36.678,1913.314,37.075,1913.314,37.407L1913.314,37.407z M1916.109,37.407   L1916.109,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.238-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.145-0.731,0.437-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C1915.899,36.678,1916.109,37.075,1916.109,37.407L1916.109,37.407z M1918.905,37.407   L1918.905,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.087,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.634-0.872-0.634-1.244c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.211,1.072,0.633,1.533C1918.694,36.678,1918.905,37.075,1918.905,37.407z"></path>
                <path className="st12" d="M2110.008,50.925c0,1.148-0.928,2.075-2.079,2.075h-15.86c-1.15,0-2.078-0.927-2.078-2.075H2110.008   L2110.008,50.925z M2105.684,46.094L2105.684,46.094c0,0,0.213-0.003,0.366-0.003c1.193,0,2.16-0.965,2.16-2.159   c0-1.192-0.967-2.157-2.16-2.157h-0.366V46.094L2105.684,46.094z M2095.909,50.052L2095.909,50.052   c-0.979,0-1.771-0.795-1.771-1.775v-7.923h11.904c1.975,0,3.583,1.604,3.583,3.577c0,1.976-1.599,3.575-3.575,3.575h-0.366   c0,0.209-0.003,0.653-0.003,0.77c0,0.979-0.794,1.775-1.775,1.775H2095.909L2095.909,50.052z M2097.313,37.407L2097.313,37.407   c0,0.458-0.186,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.086,0,0.165-0.027,0.237-0.083c0.576-0.434,0.865-1.011,0.865-1.73c0-0.528-0.212-1.023-0.635-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.119-0.174,0.119-0.284   c0-0.261-0.131-0.391-0.391-0.391c-0.103,0-0.194,0.035-0.273,0.107c-0.45,0.426-0.674,0.952-0.674,1.576   c0,0.561,0.211,1.072,0.633,1.533C2097.102,36.678,2097.313,37.075,2097.313,37.407L2097.313,37.407z M2100.109,37.407   L2100.109,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.101,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.088,0,0.166-0.027,0.238-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.633-1.48   c-0.423-0.458-0.634-0.872-0.634-1.244c0-0.396,0.146-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.129-0.391-0.391-0.391c-0.102,0-0.193,0.035-0.271,0.107c-0.45,0.426-0.676,0.952-0.676,1.576   c0,0.561,0.211,1.072,0.633,1.533C2099.898,36.678,2100.109,37.075,2100.109,37.407L2100.109,37.407z M2102.905,37.407   L2102.905,37.407c0,0.458-0.185,0.826-0.557,1.103c-0.102,0.078-0.154,0.185-0.154,0.318c0,0.262,0.131,0.392,0.391,0.392   c0.086,0,0.167-0.027,0.237-0.083c0.577-0.434,0.864-1.011,0.864-1.73c0-0.528-0.211-1.023-0.634-1.48   c-0.422-0.458-0.633-0.872-0.633-1.244c0-0.396,0.147-0.731,0.438-1.008c0.079-0.078,0.118-0.174,0.118-0.284   c0-0.261-0.13-0.391-0.391-0.391c-0.103,0-0.193,0.035-0.272,0.107c-0.45,0.426-0.675,0.952-0.675,1.576   c0,0.561,0.212,1.072,0.633,1.533C2102.694,36.678,2102.905,37.075,2102.905,37.407z"></path>
            </g>
            <g id="Window">
                <line className="st13" x1="578" y1="4" x2="678" y2="4"></line>
                <line className="st13" x1="762" y1="4" x2="862" y2="4"></line>
                <line className="st13" x1="946" y1="4" x2="1046" y2="4"></line>
                <line className="st13" x1="1130" y1="4" x2="1230" y2="4"></line>
                <line className="st13" x1="1314" y1="4" x2="1414" y2="4"></line>
                <line className="st13" x1="1498" y1="4" x2="1598" y2="4"></line>
                <line className="st13" x1="1682" y1="4" x2="1782" y2="4"></line>
                <line className="st13" x1="1866" y1="4" x2="1966" y2="4"></line>
                <line className="st13" x1="2050" y1="4" x2="2150" y2="4"></line>
                <line className="st13" x1="120" y1="4" x2="220" y2="4"></line>
                <line className="st13" x1="272.5" y1="4" x2="372.5" y2="4"></line>
                <line className="st13" x1="22" y1="4" x2="86" y2="4"></line>
                <line className="st13" x1="2303.404" y1="4" x2="2203.404" y2="4"></line>
                <line className="st13" x1="2398" y1="4" x2="2334" y2="4"></line>
                <line className="st13" x1="418.869" y1="4" x2="518.869" y2="4"></line>
                <line className="st13" x1="578" y1="331.999" x2="678" y2="331.999"></line>
                <line className="st13" x1="762" y1="331.999" x2="862" y2="331.999"></line>
                <line className="st13" x1="946" y1="331.999" x2="1046" y2="331.999"></line>
                <line className="st13" x1="1130" y1="331.999" x2="1230" y2="331.999"></line>
                <line className="st13" x1="1314" y1="331.999" x2="1414" y2="331.999"></line>
                <line className="st13" x1="1498" y1="331.999" x2="1598" y2="331.999"></line>
                <line className="st13" x1="1682" y1="331.999" x2="1782" y2="331.999"></line>
                <line className="st13" x1="1866" y1="331.999" x2="1966" y2="331.999"></line>
                <line className="st13" x1="2050" y1="331.999" x2="2150" y2="331.999"></line>
                <line className="st13" x1="22" y1="331.999" x2="86" y2="331.999"></line>
                <line className="st13" x1="2303.404" y1="331.999" x2="2203.404" y2="331.999"></line>
                <line className="st13" x1="2398" y1="331.999" x2="2334" y2="331.999"></line>
                <line className="st13" x1="390.069" y1="331.999" x2="490.069" y2="331.999"></line>
            </g>
            <g id="Icons">
                <path id="Exit" className="st12" d="M59.233,22.861v19.712L67.962,48V18.308L59.233,22.861L59.233,22.861z M48.848,22.656   L48.848,22.656c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274c-1.283,0.031-2.301,1.097-2.27,2.385   C46.496,21.67,47.563,22.687,48.848,22.656L48.848,22.656z M42.454,26.804L42.454,26.804l-2.235,5.53   c-0.406,0.922-0.14,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886   l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303c0.254,0.49,1.285,1.222,1.285,1.222l4.686-6.262l1.108-6.596   c0.063-0.004,0.127-0.008,0.195-0.014l-0.01,0.009l3.272,11.575c0,0,0.123,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408   l1.404-0.211L50.888,33.41c0-1.499,0.009-4.972,0.009-6.506c0-2.055-0.54-3.172-3.09-3.39   C47.205,23.468,44.084,22.866,42.454,26.804L42.454,26.804z M55.7,33.234L55.7,33.234l0.147-0.296l-3.995-2.758l-0.103,2.58   l1.995,1.184C54.579,34.328,55.214,34.214,55.7,33.234z"></path>
                <path id="Exit_1_" className="st12" d="M59.233,292.861v19.712l8.73,5.427v-29.692L59.233,292.861L59.233,292.861z M48.848,292.655   L48.848,292.655c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274c-1.283,0.031-2.301,1.097-2.27,2.385   C46.496,291.67,47.563,292.686,48.848,292.655L48.848,292.655z M42.454,296.803L42.454,296.803l-2.235,5.53   c-0.406,0.922-0.14,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886   l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303c0.254,0.49,1.285,1.222,1.285,1.222l4.686-6.262l1.108-6.596   c0.063-0.004,0.127-0.008,0.195-0.014l-0.01,0.009l3.272,11.575c0,0,0.123,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408   l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506c0-2.055-0.54-3.172-3.09-3.39   C47.205,293.468,44.084,292.866,42.454,296.803L42.454,296.803z M55.7,303.233L55.7,303.233l0.147-0.296l-3.995-2.758l-0.103,2.58   l1.995,1.184C54.579,304.327,55.214,304.213,55.7,303.233z"></path>
                <path id="Exit_2_" className="st12" d="M2371.232,292.861v19.712l8.729,5.427v-29.692L2371.232,292.861L2371.232,292.861z    M2360.847,292.655L2360.847,292.655c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274   c-1.283,0.031-2.301,1.097-2.27,2.385C2358.496,291.67,2359.563,292.686,2360.847,292.655L2360.847,292.655z M2354.453,296.803   L2354.453,296.803l-2.235,5.53c-0.406,0.922-0.139,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003   c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303   c0.254,0.49,1.284,1.222,1.284,1.222l4.686-6.262l1.108-6.596c0.063-0.004,0.127-0.008,0.195-0.014l-0.01,0.009l3.272,11.575   c0,0,0.124,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506   c0-2.055-0.54-3.172-3.09-3.39C2359.205,293.468,2356.084,292.866,2354.453,296.803L2354.453,296.803z M2367.699,303.233   L2367.699,303.233l0.146-0.296l-3.995-2.758l-0.103,2.58l1.995,1.184C2366.579,304.327,2367.214,304.213,2367.699,303.233z"></path>
                <path id="Exit_3_" className="st12" d="M2371.232,22.861v19.712l8.729,5.427V18.308L2371.232,22.861L2371.232,22.861z M2360.847,22.656   L2360.847,22.656c1.282-0.031,2.302-1.097,2.271-2.381c-0.032-1.288-1.101-2.304-2.384-2.274c-1.283,0.031-2.301,1.097-2.27,2.385   C2358.496,21.67,2359.563,22.687,2360.847,22.656L2360.847,22.656z M2354.453,26.804L2354.453,26.804l-2.235,5.53   c-0.406,0.922-0.139,1.841,0.948,2.185l0.586,0.129l2.66-6.449h0.003c0.237-0.496,0.614-0.908,1.068-1.232l-0.495,6.886   l-0.007,0.003l-1.016,7.028l-3.026,4.293c0,0-0.374,0.587-0.004,1.303c0.254,0.49,1.284,1.222,1.284,1.222l4.686-6.262l1.108-6.596   c0.063-0.004,0.127-0.008,0.195-0.014l-0.01,0.009l3.272,11.575c0,0,0.124,0.728,0.508,1.071c0.435,0.397,1.082,0.408,1.082,0.408   l1.404-0.211l-3.576-14.272c0-1.499,0.009-4.972,0.009-6.506c0-2.055-0.54-3.172-3.09-3.39   C2359.205,23.468,2356.084,22.866,2354.453,26.804L2354.453,26.804z M2367.699,33.234L2367.699,33.234l0.146-0.296l-3.995-2.758   l-0.103,2.58l1.995,1.184C2366.579,34.328,2367.214,34.214,2367.699,33.234z"></path>
                <path id="WC" className="st12" d="M155,58.596h3.478l1.647,9.844h0.037l1.721-9.844h4.32l1.794,9.844h0.036l1.666-9.844h3.313   l-2.856,12.809h-4.375l-1.812-9.844h-0.036l-1.684,9.844h-4.411L155,58.596L155,58.596z M185,71.111   c-0.683,0.183-1.3,0.314-1.849,0.393c-0.549,0.079-1.135,0.119-1.757,0.119c-1.306,0-2.431-0.168-3.377-0.503   c-0.946-0.335-1.724-0.802-2.334-1.4c-0.61-0.598-1.065-1.296-1.364-2.095c-0.299-0.799-0.448-1.668-0.448-2.607   c0-1.135,0.201-2.132,0.604-2.992c0.403-0.86,0.921-1.558,1.556-2.095c0.622-0.512,1.376-0.9,2.261-1.162   c0.885-0.262,1.852-0.393,2.901-0.393c0.354,0,0.848,0.037,1.483,0.11c0.635,0.073,1.403,0.256,2.306,0.549l-0.274,2.763   c-0.391-0.208-0.876-0.409-1.455-0.604c-0.58-0.195-1.199-0.293-1.858-0.293c-0.683,0-1.26,0.113-1.73,0.338   c-0.47,0.226-0.845,0.479-1.126,0.759c-0.329,0.329-0.604,0.756-0.824,1.281c-0.219,0.525-0.329,1.116-0.329,1.775   c0,0.622,0.104,1.189,0.311,1.702c0.207,0.512,0.488,0.933,0.842,1.262c0.366,0.354,0.827,0.622,1.382,0.805   c0.555,0.183,1.132,0.274,1.73,0.274c0.476,0,0.995-0.058,1.556-0.174c0.561-0.116,1.104-0.277,1.629-0.485L185,71.111z"></path>
                <path id="WC_1_" className="st12" d="M2239,87.095h3.478l1.647,9.844h0.037l1.721-9.844h4.32l1.794,9.844h0.036l1.666-9.844h3.313   l-2.856,12.809h-4.375l-1.812-9.844h-0.037l-1.684,9.844h-4.411L2239,87.095L2239,87.095z M2269,99.611   c-0.683,0.183-1.3,0.314-1.849,0.393c-0.549,0.079-1.135,0.119-1.757,0.119c-1.306,0-2.431-0.168-3.377-0.503   c-0.946-0.335-1.723-0.802-2.334-1.4c-0.61-0.598-1.064-1.296-1.364-2.095c-0.299-0.799-0.448-1.668-0.448-2.607   c0-1.135,0.201-2.132,0.604-2.992c0.403-0.86,0.921-1.558,1.556-2.095c0.622-0.512,1.376-0.9,2.26-1.162   c0.885-0.262,1.852-0.393,2.901-0.393c0.354,0,0.848,0.037,1.483,0.11c0.635,0.073,1.403,0.256,2.306,0.549l-0.274,2.763   c-0.391-0.208-0.876-0.409-1.455-0.604c-0.58-0.195-1.199-0.293-1.858-0.293c-0.683,0-1.26,0.113-1.729,0.338   c-0.47,0.226-0.845,0.479-1.126,0.759c-0.329,0.329-0.604,0.756-0.824,1.281c-0.219,0.525-0.329,1.116-0.329,1.775   c0,0.622,0.104,1.189,0.311,1.702c0.207,0.512,0.488,0.933,0.842,1.262c0.366,0.354,0.827,0.622,1.382,0.805   c0.555,0.183,1.132,0.274,1.73,0.274c0.476,0,0.995-0.058,1.556-0.174c0.561-0.116,1.104-0.277,1.629-0.485L2269,99.611z"></path>
                <path id="Steward" className="st12" d="M336.047,111.03c-0.907-0.445-3.205-0.862-5.354-1.479c0.007-0.007-1.169-0.366-1.169-0.366   c-0.231-0.079-0.457-0.162-0.674-0.248c-0.296-0.118-0.524-0.218-0.74-0.322c-0.134-0.066-0.222-0.112-0.308-0.157   c-0.147-0.08-0.23-0.129-0.311-0.177c-0.13-0.08-0.22-0.139-0.305-0.201c-0.081-0.058-0.156-0.117-0.227-0.177   c-0.106-0.091-0.158-0.14-0.207-0.189c-0.103-0.106-0.152-0.163-0.198-0.221c-0.072-0.093-0.117-0.162-0.157-0.231   c-0.054-0.102-0.08-0.157-0.102-0.212c-0.043-0.123-0.058-0.176-0.069-0.23c-0.028-0.145-0.036-0.222-0.036-0.3v-1.358   c1.369-1.088,2.372-2.762,2.758-4.709c0.727,0.009,1.298-1.176,1.353-2.64c0.054-1.463-0.428-2.649-1.078-2.649   c-0.033,0-0.065,0.005-0.097,0.011v-0.957h0.229l0.591-3.293c0-1.562-0.897-2.166-3.192-2.718   c-2.296-0.552-4.749-1.117-8.009-1.429c-3.26-0.312-3.69-0.462-3.69,2.261l0.576,5.179h0.257v0.957   c-0.032-0.006-0.065-0.011-0.097-0.011c-0.651,0-1.132,1.186-1.078,2.649c0.055,1.464,0.626,2.649,1.277,2.649   c0.462,1.938,1.465,3.614,2.834,4.7v1.357c0,0.079-0.008,0.155-0.021,0.232c-0.026,0.122-0.041,0.175-0.058,0.227   c-0.047,0.126-0.073,0.18-0.101,0.232c-0.067,0.121-0.111,0.189-0.161,0.256c-0.071,0.088-0.118,0.142-0.168,0.196   c-0.103,0.103-0.152,0.148-0.204,0.193c-0.125,0.106-0.194,0.16-0.266,0.211c-0.104,0.076-0.191,0.133-0.281,0.189   c-0.129,0.078-0.204,0.122-0.282,0.164c-0.026,0.015-0.052,0.029-0.079,0.043c-0.078,0.042-0.156,0.082-0.238,0.122   c-0.279,0.135-0.501,0.233-0.733,0.325c-0.028,0.011-0.057,0.023-0.084,0.034c-0.05,0.019-0.1,0.039-0.15,0.058l-1.678,0.551   c-2.149,0.618-4.447,1.035-5.354,1.48c-0.6,0.293-1.11,0.721-1.464,1.356c0.001,0.001,30,0.002,30,0.002   C337.147,111.756,336.644,111.324,336.047,111.03L336.047,111.03z M318.477,92.08c-0.695,0-1.259-0.751-1.259-1.677   c0-0.927,0.564-1.678,1.259-1.678c0.695,0,1.259,0.751,1.259,1.678C319.736,91.329,319.172,92.08,318.477,92.08L318.477,92.08z"></path>
                <path id="HotWater" className="st12" d="M311.143,307.714c0,1.579-1.279,2.857-2.857,2.857c-1.579,0-2.857-1.279-2.857-2.857   c0-1.9,2.857-5,2.857-5S311.143,305.814,311.143,307.714z M284,282h11.429v7.143h5.714v-2.857L298.286,287v-3.571l2.857,0.714H304   l2.857-0.714V287L304,286.285v2.857h4.286c1.579,0,2.857,1.279,2.857,2.857v5.714c0.789,0,1.429,0.64,1.429,1.429   s-0.64,1.429-1.429,1.429h-5.714c-0.789,0-1.429-0.64-1.429-1.429s0.64-1.429,1.429-1.429v-2.857h-10V312H284V282z"></path>
                <path id="RoomService" className="st12" d="M483.648,100.955c0.06-0.48,0.105-0.96,0.105-1.455c0-0.495-0.045-0.99-0.105-1.5   l3.165-2.445c0.285-0.225,0.36-0.63,0.18-0.96l-3-5.19c-0.18-0.33-0.585-0.465-0.915-0.33l-3.735,1.5   c-0.78-0.585-1.59-1.095-2.535-1.47l-0.555-3.975c-0.06-0.36-0.375-0.63-0.75-0.63h-6c-0.375,0-0.69,0.27-0.75,0.63l-0.555,3.975   c-0.945,0.375-1.755,0.885-2.535,1.47l-3.735-1.5c-0.33-0.135-0.735,0-0.915,0.33l-3,5.19c-0.195,0.33-0.105,0.735,0.18,0.96   L461.358,98c-0.06,0.51-0.105,1.005-0.105,1.5c0,0.495,0.045,0.975,0.105,1.455l-3.165,2.49c-0.285,0.225-0.375,0.63-0.18,0.96   l3,5.19c0.18,0.33,0.585,0.45,0.915,0.33l3.735-1.515c0.78,0.6,1.59,1.11,2.535,1.485l0.555,3.975c0.06,0.36,0.375,0.63,0.75,0.63   h6c0.375,0,0.69-0.27,0.75-0.63l0.555-3.975c0.945-0.39,1.755-0.885,2.535-1.485l3.735,1.515c0.33,0.12,0.735,0,0.915-0.33l3-5.19   c0.18-0.33,0.105-0.735-0.18-0.96L483.648,100.955z M472.503,104.75c-2.899,0-5.25-2.351-5.25-5.25s2.351-5.25,5.25-5.25   s5.25,2.351,5.25,5.25S475.403,104.75,472.503,104.75z"></path>
            </g>
            </svg>
            <p className='price'>{price} рублей</p>
            <button className="button-reserve" onClick={handleReservation}>
                Забронировать
            </button>
        </div>
        
    );
};

export default Train;