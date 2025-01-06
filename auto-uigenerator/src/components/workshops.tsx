import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cleanArray } from '../store/elementsSlice';
import axios from 'axios';
interface Workshop {
  id: number;
  name: string;
  userId: number;
}
const Workshops: React.FC = () => {
  // Sample sidebar items
  const domain = import.meta.env.VITE_APP_DOMAIN;
  const dispatch=useDispatch();
  dispatch(cleanArray())
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    const workshopList=async()=>{
      const response= await axios.post(`${domain}/api/v1/code/getworkshops`,{},{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      console.log(response);
      if(response.data){
        setWorkshops(response.data);
      }
    }
    workshopList();
  },[])
  const navigate=useNavigate();
  const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData=e.currentTarget // it was done as after post operation the e.currentTarget was null and we can;t reset it then but if saved in other variable we can reset it
      const response = await axios.post(`${domain}/api/v1/code/createworkshop`, {name:String((formData.elements.namedItem('workshop') as HTMLInputElement).value)},{
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
    console.log(response);
    if(response.data){
      setWorkshops([...workshops, response.data]);
    }
    // Reset the form
    formData.reset();
  };
  console.log(workshops);
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[35%] bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Sidebar</h2>
        <ul className="space-y-4">
          {workshops.length === 0 ? "No workshops yet":workshops.map((item, index) => (
            <li key={index}>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded" onClick={() => navigate(`/dashboard/?id=${item.id}&userid=${item.userId}&name=${item.name}`, {state:{workshopId:item}})}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-[65%] flex items-center justify-center bg-gray-100 p-8">
        <form
          onSubmit={handleCreate}
          className="w-full max-w-md bg-white p-6 rounded shadow"
        >
          <div className="mb-4">
            <input
              type="text"
              name="workshop"
              placeholder="Create a new workshop"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Create
          </button>
        </form>
      </main>
    </div>
  );
};

export default Workshops;
