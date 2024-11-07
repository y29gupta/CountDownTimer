
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pause, setPause] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [second, setSecond] = useState(0)
  const [timeRef,setTimeRef]=useState(0)
  const [isPaused,setIsPaused]=useState(false)

  const handlestart = () => {
    if(hours=="" && minutes=="" && second==""){
      alert("please set timer before start")
    }else{

      setPause(true)
    }
  }
  const handleInput = (e) => {
    e.preventDefault()
    const target = e.target.id
    const value = parseInt(e.target.value)
    console.log(target, value)
    if (target == "hours") {
      setHours(value)
    } else if (target == "minutes") {
      setMinutes(value)
    } else {
      setSecond(value)
    }
  }

  const handlereset = () => {
    setPause(false)
    resetTimer()
  }

  const resetTimer=()=>{
    setHours(0)
    setMinutes(0)
    setSecond(0)
    clearInterval(timeRef)
  }
  const pausetimer=()=>{
    setIsPaused(true)
    clearInterval(timeRef)
  }
  const resumeTimer=()=>{
    setIsPaused(false)
    runTimer(second,minutes,hours,timeRef)
  }
  const runTimer=(sec,min,hr,ref)=>{

   
      if(sec>0){
        setSecond((n)=>n-1)
      }
      else if(sec==0  && min>0){
        setMinutes((m)=>m-1)
        setSecond(59)
      }else if(min===0){
        setHours((h)=>h-1)
        setMinutes(59)
        setSecond(59)
      }
      else{
        setHours((h)=>h-1)
        setMinutes(59)
        setSecond(59)
      }

      if(sec===0 && min===0 && hr===0){
       resetTimer()
        alert("time up")
        setPause(false)
      }
  }

  useEffect(() => {
    let ref;
    if (pause) {
      ref = setInterval(() => {
        runTimer(second,minutes,hours,ref)

      }, 1000)
      setTimeRef(ref)
    }
    return ()=>{
      clearInterval(ref)
    }
  }, [ pause,hours,minutes,second])

  return (
    <>
      <h2 className='heading'>count down timer</h2>
      {
        !pause && (
          <div>

            <div className='timer'>
              <input type="text" id="hours" placeholder='HH' onChange={handleInput}  />
              <input type="text" id="minutes" placeholder='MM' onChange={handleInput}  />
              <input type="text" id="seconds" placeholder='SS' onChange={handleInput}/>
            </div>
            <button className='start' onClick={handlestart}>Start</button>
          </div>
        )
      }
      {
        pause && (

          <div>


            <div className='label'>
              <div>{hours}</div>
              <span>:</span>
              <div>{minutes}</div>
              <span>:</span>
              <div>{second}</div>


            </div>
            {
              isPaused?(

                <button className='start' onClick={resumeTimer} >resume</button>
              ):(
                <button className='start' onClick={pausetimer} >pause</button>

              )
            }

            <button className='start' onClick={handlereset}>reset</button>
          </div>
        )
      }

    </>
  )
}

export default App
