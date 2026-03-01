"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Building2Icon } from 'lucide-react'

function SetView({ center }: { center: [number, number] }) {
    const map = useMap()

    useEffect(() => {
        map.setView(center, 13)
    }, [center, map])

    return null
}
interface MapProps {
    lat: number,
    lan: number
}

export default function Map({ lat, lan }: MapProps) {
    const position: [number, number] = [lat, lan]
    useEffect(() => { console.log(lan) })
    const doctorIcon = L.icon({
        iconUrl: '/doctor-pin.png', // your custom image
        iconSize: [32, 32],         // size of the icon
        iconAnchor: [16, 32],       // point of the icon which corresponds to marker's location
        popupAnchor: [0, -32],      // where the popup opens relative to icon
    })
    return (
        <MapContainer
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SetView center={position} />
            <Marker position={position} >
                <Popup>Doctor</Popup>
            </Marker>
        </MapContainer>
    )
}