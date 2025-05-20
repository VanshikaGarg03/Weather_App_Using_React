import logo from './logo.svg';
import './App.css';
import { use, useEffect, useState } from 'react';

function App() {
  let [city,setCity]=useState('');
  let [wDetails,setWdetails]=useState();
  let [isLoading,setIsLoading]=useState(false);
  let getData=(event)=>{
    setIsLoading(true);
    const apiKey = "240d64636a1c46eb885182517251905";
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      console.log(finalRes)
      if(finalRes.error){
        setWdetails(undefined)
      }else{ 
        setWdetails(finalRes);
      }
      setIsLoading(false);
    })
    setCity('');
    event.preventDefault();
  }
  return (
    <div className='w-[100%] h-[100vh] bg-[#4aacb1]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white pl-[80px]'>Simple Weather App</h1>
        <form className="flex gap-3 pl-[80px]" onSubmit={getData}>
          <input className='w-[300px] h-[40px] pl-3 rounded-md outline-none' placeholder='City Name' type="text" value={city} onChange={(e)=>setCity(e.target.value)}/> 
          <button className='bg-blue-900 text-white px-4 py-2 rounded-md'>Submit</button>
        </form>
        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
          <img src='https://i.gifer.com/ZKZg.gif' width={100} className={`absolute left-[40%] ${isLoading?'':'hidden'}`}/>
        {wDetails!==undefined
          ?
          <>
            <h3 className='font-bold text-[30px]'>{wDetails.location.name} <span className='bg-[yellow]'>{wDetails.location.country}</span></h3>
            <h2 className='font-bold text-[40px]'>
              {wDetails.current.temp_c}
            </h2>
            <img src={wDetails.current.condition.icon} />
            <p>{wDetails.current.condition.text}</p>
          </>
          :
          "No Data"
        }
        </div>
      </div>
    </div>
  );
}

export default App;
