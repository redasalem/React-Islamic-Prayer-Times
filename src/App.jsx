import { useEffect, useState } from "react";
import Prayer from "./component/prayer";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  let [dataapi,setdataApi]=useState({});
  let [Time,setTime]=useState("");
  let [loading, setLoading] = useState(true);
  let [city, setcity] = useState("cairo");


  const cities=[
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria"},
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura"},
    { name: "أسوان", value: "Aswan"},
    { name: "الأقصر", value: "Luxor"},
    { name: "الغربية", value: "tanta"}
  ]

  
  useEffect(()=>{
  
    const reda= async ()=>{
      const fetchApi= await fetch(`https://api.aladhan.com/v1/timingsByCity/03-09-2024?city=${city}&country=Eg`);
      const fetchApijson= await fetchApi.json();
      setdataApi(fetchApijson.data.timings);
      setTime(fetchApijson.data.date.gregorian.date);
      setLoading(false);
    }
    
    reda()
  },[city])
 
  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة </h3>

            <select name="" id="" onChange={(e)=>setcity(e.target.value)} >
              {cities.map((i)=>
                <option key={i.value} value={i.value}>{i.name}</option>
              )}
            </select>
          </div>
          <div className="data">
            <h3>التاريخ</h3>
            <h4>{loading ? <i className="fas fa-spinner fa-spin"></i> : Time}</h4>
          </div>
        </div>

        {loading ? <p> <i className="fas fa-spinner fa-spin"></i> </p> : (
          <>
            <Prayer Name="الفجر" time={dataapi.Fajr}/>
            <Prayer Name="الشروق" time={dataapi.Sunrise}/>
            <Prayer Name="الظهر" time={dataapi.Dhuhr}/>
            <Prayer Name="العصر" time={dataapi.Asr}/>
            <Prayer Name="الغروب" time={dataapi.Sunset}/>
            <Prayer Name="المغرب" time={dataapi.Maghrib}/>
            <Prayer Name="العشاء" time={dataapi.Isha}/>
            <Prayer Name="الامساك" time={dataapi.Imsak}/>
          </>
        )}
      </div>
    </section>
  )
}

export default App
