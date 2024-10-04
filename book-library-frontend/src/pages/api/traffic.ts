import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TRAFFIC_API_KEY = '2j9XhzGPJ2uTCihKndAiLaSza4Ic0lG4';
const TRAFFIC_API_URL = 'https://api.tomtom.com/traffic/services/5/incidentDetails';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { bbox } = req.query;

    if (!bbox) {
        return res.status(400).json({ error: 'Veuillez fournir une valeur pour le paramètre "bbox" (format: longitudeMin,latitudeMin,longitudeMax,latitudeMax).' });
    }

    const response = await axios.get(TRAFFIC_API_URL, {
      params: {
        bbox: bbox,
        fields: '{incidents{type,geometry{type,coordinates},properties{iconCategory}}}',
        language: 'en-GB',
        categoryFilter: '0,1,2,3,4,5,6,7,8,9,10,11,14',
        timeValidityFilter: 'present',
        key: TRAFFIC_API_KEY,
      },
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données météo.' });
  }
}
