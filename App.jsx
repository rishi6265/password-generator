import { useState ,useCallback,useEffect,useRef} from 'react'


import './App.css'

function App() {
  let [length,setlength]=useState(6);
  let [password,setpassword]=useState("h");
  let [character,ischarallowed]=useState(false);
  let [number,isnumberallowed]=useState(false);
 
    const passwordgenerator=useCallback(()=>{
            let pass="";
           
            let string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstwxyz";
            let char="*@$#^?/<>:;";
            let numbers="0123456789";
            if(number){
              string+=numbers;
            }
            if(character){
              string+=char;
            }

           for(let i=1;i<=length;i++){
            let c=Math.floor(Math.random()*(string.length-1)+1);
            pass+=string.charAt(c);
           }
           setpassword(pass);

    },[length,character,number,setpassword]);

const passwordref=useRef(null);
function copypassword(){
  passwordref.current.select();
  passwordref.current.setSelectionRange(0,3);
  window.navigator.clipboard.writeText(password);
}

useEffect(()=>{

  passwordgenerator()
}
  ,[length,character,number]
)

  return (
    <>
     <div className='w-full max-w-md mx-auto px-4 my-6   rounded-md shadow-md  bg-gray-800 text-white'>
             <h1 >Password Generator</h1>
            <div className='flex mb-4 shadow-md overflow-hidden'>
                  <input type="text"
                  readOnly
                  className='rounded-md w-full px-3 py-1 outline-none text-orange-700'
                  value={password}
                  ref={passwordref}
                   />
                  <button onClick={copypassword}  className='bg-blue-400 shrink-0 text-white px-3 py-0.5 '>
                  copy
                  </button>



            </div>
            <div className='flex gap-4 mb-4'>
              <input type="range" className="cursor-pointer" min={6} max={100}  value={length} onChange={(e)=>{
                setlength(e.target.value);
              }}/>
            <label >length:{length}</label>
               
              <input type="checkbox" defaultChecked={number} onChange={()=>{
                isnumberallowed(prev=>!prev)
              }} />
              <label >Number</label>
              <input type="checkbox" defaultChecked={character} onChange={()=>{
                ischarallowed(prev=>!prev) }}/>
              <label >Character</label>
            </div>





     </div>
    </>
  )
}

export default App
