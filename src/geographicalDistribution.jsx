import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cityCoordinates = {
  Oakland: { lat: 37.8049, lng: -122.2711 },
  Philadelphia: { lat: 39.9526, lng: -75.1652 },
  Toledo: { lat: 41.6639, lng: -83.5552 },
  Plano: { lat: 33.0198, lng: -96.6989 },
  Buffalo: { lat: 42.8864, lng: -78.8784 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  Laredo: { lat: 27.5064, lng: -99.5075 },
  Newark: { lat: 40.7357, lng: -74.1724 },
  "Corpus Christi": { lat: 27.8006, lng: -97.3963 },
  Cincinnati: { lat: 39.1031, lng: -84.512 },
  "Chula Vista": { lat: 32.6401, lng: -117.0842 },
  Gilbert: { lat: 33.3528, lng: -111.789 },
  Phoenix: { lat: 33.4484, lng: -112.074 },
  "St. Paul": { lat: 44.9537, lng: -93.09 },
  Arlington: { lat: 32.7357, lng: -97.1081 },
  Portland: { lat: 45.5155, lng: -122.6793 },
  Memphis: { lat: 35.1495, lng: -90.049 },
  Indianapolis: { lat: 39.7684, lng: -86.1581 },
  Nashville: { lat: 36.1627, lng: -86.7816 },
  "Jersey City": { lat: 40.7178, lng: -74.0431 },
  "New York": { lat: 40.7128, lng: -74.006 },
  Riverside: { lat: 33.9806, lng: -117.3755 },
  Lincoln: { lat: 40.8136, lng: -96.7026 },
  Chattanooga: { lat: 35.0456, lng: -85.3097 },
  "San Jose": { lat: 37.3382, lng: -121.8863 },
  Charlotte: { lat: 35.2271, lng: -80.8431 },
  Miami: { lat: 25.7617, lng: -80.1918 },
  Tampa: { lat: 27.9506, lng: -82.4572 },
  Denver: { lat: 39.7392, lng: -104.9903 },
  Wichita: { lat: 37.6872, lng: -97.3301 },
  Baltimore: { lat: 39.2904, lng: -76.6122 },
  Cleveland: { lat: 41.4995, lng: -81.6954 },
  "San Diego": { lat: 32.7157, lng: -117.1611 },
  "San Antonio": { lat: 29.4241, lng: -98.4936 },
  Honolulu: { lat: 21.3069, lng: -157.8583 },
  "Colorado Springs": { lat: 38.8339, lng: -104.8214 },
  Aurora: { lat: 39.7294, lng: -104.8319 },
  Greensboro: { lat: 36.0726, lng: -79.791 },
  Jacksonville: { lat: 30.3322, lng: -81.6557 },
  Lexington: { lat: 38.0406, lng: -84.5037 },
  Stockton: { lat: 37.9577, lng: -121.2908 },
  Tucson: { lat: 32.2226, lng: -110.9747 },
  "St. Louis": { lat: 38.627, lng: -90.1994 },
  Anaheim: { lat: 33.8366, lng: -117.9143 },
  "El Paso": { lat: 31.7619, lng: -106.485 },
  "Las Vegas": { lat: 36.1699, lng: -115.1398 },
  "Santa Ana": { lat: 33.7455, lng: -117.8677 },
  Hialeah: { lat: 25.8576, lng: -80.2785 },
  Austin: { lat: 30.2672, lng: -97.7431 },
  Minneapolis: { lat: 44.9833, lng: -93.262 },
  Bakersfield: { lat: 35.3733, lng: -119.0187 },
  Dallas: { lat: 32.7767, lng: -96.797 },
  Madison: { lat: 43.0731, lng: -89.4012 },
  "Kansas City": { lat: 39.0997, lng: -94.5786 },
  Boston: { lat: 42.3601, lng: -71.0589 },
  Seattle: { lat: 47.6062, lng: -122.3321 },
  Glendale: { lat: 34.1426, lng: -118.2551 },
  "Fort Worth": { lat: 32.7555, lng: -97.3308 },
  Raleigh: { lat: 35.7796, lng: -78.6382 },
  Tulsa: { lat: 36.1539, lng: -95.9928 },
  Chicago: { lat: 41.8781, lng: -87.6298 },
  Atlanta: { lat: 33.4484, lng: -84.3879 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Oklahoma City": { lat: 35.4676, lng: -97.5164 },
  Washington: { lat: 38.9072, lng: -77.0369 },
  Detroit: { lat: 42.3314, lng: -83.0458 },
  "Fort Wayne": { lat: 41.0793, lng: -85.1394 },
  Henderson: { lat: 36.0395, lng: -114.9817 },
  Columbus: { lat: 39.9612, lng: -82.9988 },
  Houston: { lat: 29.7604, lng: -95.3698 },
  "St. Petersburg": { lat: 27.7676, lng: -82.6403 },
  Orlando: { lat: 28.5383, lng: -81.3792 },
  Garland: { lat: 32.9126, lng: -96.6389 },
};

const MapComponent = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shopify-analytics-backend.onrender.com/analytics/data4"
        );
        const enrichedData = response.data.map((item) => {
          const coordinates = cityCoordinates[item.city];
          return {
            ...item,
            lat: coordinates ? coordinates.lat : null,
            lng: coordinates ? coordinates.lng : null,
          };
        });
        setLocations(
          enrichedData.filter((location) => location.lat && location.lng)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">
        Geographical Distribution of Customers
      </h2>
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={4}
        style={{ height: "800px", width: "100%" }} 
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker key={location.city} position={[location.lat, location.lng]}>
            <Popup>
              <div className="text-sm">
                <strong>{location.city}</strong>
                <br />
                {location.customers} customers
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
