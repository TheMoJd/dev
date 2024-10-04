// src/pages/api/weather.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const WEATHER_API_KEY = '0b63e5c3e873422aad794400240310'; 
const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { location } = req.query;

    const response = await axios.get(WEATHER_API_URL, {
      params: {
        key: WEATHER_API_KEY,
        q: location || 'Orléans',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données météo.' });
  }
}
