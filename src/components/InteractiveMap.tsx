'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const pinIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 30px; height: 30px; background: #C8A84E; border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg); border: 3px solid #fff;
    box-shadow: 0 3px 12px rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
  "><div style="transform: rotate(45deg); width: 10px; height: 10px; background: #fff; border-radius: 50%;"></div></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
})

interface SearchResult {
  lat: number
  lng: number
  label: string
}

interface Props {
  searchResult?: SearchResult | null
  onMapClick?: (address: string) => void
}

function MapContent({ searchResult, onMapClick }: { searchResult?: SearchResult | null; onMapClick?: (address: string) => void }) {
  const [clickPos, setClickPos] = useState<[number, number] | null>(null)
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null)

  const map = useMap()

  useEffect(() => {
    if (searchResult) {
      map.flyTo([searchResult.lat, searchResult.lng], 16, { duration: 1 })
      setMarkerPos([searchResult.lat, searchResult.lng])
      setClickPos(null)
    }
  }, [searchResult, map])

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng
      setClickPos([lat, lng])
      setMarkerPos([lat, lng])

      try {
        const resp = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`,
          { headers: { 'Accept-Language': 'en' } }
        )
        const data = await resp.json()
        onMapClick?.(data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`)
      } catch {
        onMapClick?.(`${lat.toFixed(5)}, ${lng.toFixed(5)}`)
      }
    },
  })

  return markerPos ? <Marker position={markerPos} icon={pinIcon} /> : null
}

export default function InteractiveMap({ searchResult, onMapClick }: Props) {
  return (
    <>
      <MapContainer
        center={[39.1031, -84.5120]}
        zoom={11}
        zoomControl={true}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <MapContent searchResult={searchResult} onMapClick={onMapClick} />
      </MapContainer>

      <style>{`
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
        }
        .leaflet-control-zoom a {
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 16px !important;
          color: #6B5744 !important;
          background: rgba(255,255,255,0.95) !important;
          border: 1px solid #EAE2D6 !important;
          border-radius: 6px !important;
          margin-bottom: 2px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #C8A84E !important;
          color: #fff !important;
          border-color: #C8A84E !important;
        }
        .leaflet-control-zoom-in {
          border-radius: 6px 6px 0 0 !important;
        }
        .leaflet-control-zoom-out {
          border-radius: 0 0 6px 6px !important;
        }
      `}</style>
    </>
  )
}
