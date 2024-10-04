
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Traffic.module.css';

interface TrafficIncident {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[][];
  };
  properties: {
    iconCategory: number;
    magnitudeOfDelay: number;
    events: { description: string }[];
    startTime: string;
    endTime: string;
  };
}

const TrafficPage: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficIncident[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTraffic = async () => {
    try {
      const response = await axios.get('/api/traffic', {
        params: {
          bbox: '1.9090,47.9025,2.3522,48.8566', // Long min, Lat min, Long max, Lat max 
        },
      });
      setTrafficData(response.data.incidents || []);
      console.log(response.data.incidents);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de trafic:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraffic();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Incidents de Trafic</h1>
      {trafficData.length > 0 ? (
        <ul className={styles.incidentList}>
          {trafficData.map((incident) => (
            <li key={incident.id} className={styles.incidentItem}>
            <div className={styles.incidentHeader}>
              <h2>Type d'incident : {incident.properties.events?.[0]?.description || 'N/A'}</h2>
              <p>Début : {incident.properties.startTime ? new Date(incident.properties.startTime).toLocaleString() : 'N/A'}</p>
              <p>Fin : {incident.properties.endTime ? new Date(incident.properties.endTime).toLocaleString() : 'N/A'}</p>
            </div>
            <div className={styles.incidentDetails}>
              <p>Délai estimé : {incident.properties.magnitudeOfDelay ? `${incident.properties.magnitudeOfDelay} minutes` : 'N/A'}</p>
              <p>Coordonnées :</p>
              <ul>
                {incident.geometry?.coordinates?.map((coordinate, index) => (
                  <li key={index}>
                    Latitude : {coordinate[1]}, Longitude : {coordinate[0]}
                  </li>
                )) || <li>Aucune coordonnée disponible</li>}
              </ul>
            </div>
          </li>
          
          ))}
        </ul>
      ) : (
        <p>Aucun incident de trafic à afficher pour cette zone.</p>
      )}
    </div>
  );
};

export default TrafficPage;
