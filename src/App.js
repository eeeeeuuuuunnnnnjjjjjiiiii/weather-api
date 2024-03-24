
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect,useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';


//1.앱이 실행되자마자 현재위치기반의 날씨가 보인다
//2.날씨정보에는 도시, 섭씨 화씨 날씨 상태정보가 들어감
//3.5개의 버튼이 있다(1개는 현재위치, 4개는 다른도시)
//4.도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5.현재위치버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6.데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {
  const [weather,setWeather]= useState(null);
  const [city,setCity]=useState("");
  const cities=['paris','new york','tokyo','seoul'];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat,lon);
    });
  };

  const getWeatherByCurrentLocation = async(lat,lon) =>{
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de14f99f543bf8277bafbe0fb88518cd&units=metric';
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  const getWeatherByCity = async () => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={de14f99f543bf8277bafbe0fb88518cd&units=metric}';
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  useEffect(()=>{
    if(city == ""){
    getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city]);


  return (
    <div className='background'>
      <div className='container'>
        <WeatherBox weather={weather}/>
        <WeatherButton cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city} />
     </div>
    </div>
  );
}

export default App;

// const cities = ["hanoi", "paris", "new york", "seoul"];
// const API_KEY = process.env.REACT_APP_API_KEY;

// const App = () => {
//   const [loading, setLoading] = useState(false);
//   const [city, setCity] = useState(null);
//   const [weather, setWeather] = useState(null);
//   const [apiError, setAPIError] = useState("");

//   const getWeatherByCurrentLocation = async (lat, lon) => {
//     try {
//       let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//       const res = await fetch(url);
//       const data = await res.json();

//       setWeather(data);
//       setLoading(false);
//     } catch (err) {
//       setAPIError(err.message);
//       setLoading(false);
//     }
//   };

//   const getCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       getWeatherByCurrentLocation(latitude, longitude);
//     });
//   };

//   const getWeatherByCity = async () => {
//     try {
//       let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
//       const res = await fetch(url);
//       const data = await res.json();

//       setWeather(data);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setAPIError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (city == null) {
//       setLoading(true);
//       getCurrentLocation();
//     } else {
//       setLoading(true);
//       getWeatherByCity();
//     }
//   }, [city]);

//   const handleCityChange = (city) => {
//     if (city === "current") {
//       setCity(null);
//     } else {
//       setCity(city);
//     }
//   };

//   return (
//     <>
//       <Container className="vh-100">
//         {loading ? (
//           <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
//             <ClipLoader color="#f86c6b" size={150} loading={loading} />
//           </div>
//         ) : !apiError ? (
//           <div class="main-container">
//             <WeatherBox weather={weather} />
//             <WeatherButton
//               cities={cities}
//               handleCityChange={handleCityChange}
//               selectedCity={city}
//             />
//           </div>
//         ) : (
//           apiError
//         )}
//       </Container>
//     </>
//   );
// };
// export default App;