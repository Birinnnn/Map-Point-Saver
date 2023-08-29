"use client"

import dynamic from 'next/dynamic';
import PointsList from "@/components/PointsList";
import {useEffect, useState} from "react";
import {saveAs} from "file-saver";

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

  const handleDeletePoint = async (pointId) => {
    try {
      const response = await fetch(`${apiUrl}/points/delete/${pointId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted point from the points array
        const updatedPoints = points.filter((point) => point.id !== pointId);
        setPoints(updatedPoints);
      } else {
        console.error('Error deleting point:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting point:', error);
    }
  };

  const handleSelectedPoint = (point) => {
  setSelectedPoint(point); // Update the selectedPoint state
  setCenterMap([point.lat, point.lng]); // Update the center state with the selected point's coordinates
  };

  const convertToJSON = () => {
    // Convert the 'points' array to JSON with formatting
    return JSON.stringify(points, null, 2);
  };

  const handleDownloadJSON = () => {
    const json = convertToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'points.json'); // Trigger the download with the 'saveAs' function
  };

  return (
    <main className="flex flex-col items-center justify-between w-full">
      <h1 className="text-6xl font-bold text-center">Map-Point</h1>
      <div className="flex w-full border-line">
        <div className="flex w-2/3">
          <DynamicMap points={points} selectedPoint={selectedPoint} center={center} setCenterMap={setCenterMap}/>
        </div>
        <div className="flex w-1/3 overflow-y-auto max-h-96">
          <PointsList points={points} onSelectedPoint={handleSelectedPoint} onDeletePoint={handleDeletePoint}/>
        </div>
      </div>
      <div className="flex flex-row w-full">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
              onClick={addPoint}>
        Noktayı Ekle
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
        onClick={handleDownloadJSON}
      >
      İndir
      </button>
      </div>
    </main>
  )
}
