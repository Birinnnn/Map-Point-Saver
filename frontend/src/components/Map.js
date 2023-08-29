"use client"

import L from 'leaflet'
import MarkerIcon from 'node_modules/leaflet/dist/images/marker-icon.png'
import MarkerShadow from 'node_modules/leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import {useState, useEffect, useCallback} from "react";


function CoordsComponent({setCenterMap, selectedPoint}) {
  const map = useMap();

  const onMove = useCallback(() => {
    setCenterMap(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    if (selectedPoint) {
      map.setView([selectedPoint.lat, selectedPoint.lng]);
    }
  }, [selectedPoint, map]);
}

const Map = ({points, selectedPoint, setCenterMap, center }) => {

  return (
    <div>
      <MapContainer style={{
        height: '60vh',
        width: '100vh'
      }} center={center} zoom={13} scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { points && points.map((point) => (
          <Marker key={point.id} icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          } position={[point.lat, point.lng]} />
          ))
        }
        <CoordsComponent setCenterMap={setCenterMap} selectedPoint={selectedPoint} />
      </MapContainer>
    </div>
  )
}

export default Map