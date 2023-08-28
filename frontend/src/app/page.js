"use client"

import dynamic from 'next/dynamic';
import PointsList from "@/components/PointsList";
import {useState, useEffect} from "react";

const DynamicMap = dynamic(() => import('../components/Map'), {
  ssr: false
});

const defaultMapCenter = [51.505, -0.09];

export default function Home() {
  const apiUrl = process.env.API_URL;
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [points, setPoints] = useState([])
  const [center, setCenterMap] = useState(defaultMapCenter);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/points/getAll`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setPoints(data); // Update points state with fetched data
        } else {
          console.error('Error fetching points:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchData();
  }, []);

  const addPoint = async () => {
    try {
      const response = await fetch(`${apiUrl}/points/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: center.lat,
          lng: center.lng,
          dateTime: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const newPoint = await response.json();
        setPoints([...points, newPoint]); // Add the new point to the points state
        console.log(newPoint);
      } else {
        console.error('Error adding point:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding point:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between w-full">
      <h1 className="text-6xl font-bold text-center">Map-Point</h1>
      <p className="text-xl text-center">This is a sample project</p>
          <DynamicMap points={points} selectedPoint={selectedPoint} center={center} setCenterMap={setCenterMap}/>
        <div className="w-1/2">
          <PointsList points={points} onSelectedPoint={setSelectedPoint}/>
        </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
              onClick={addPoint}>
        Noktayı Ekle
      </button>
    </main>
  )
}
