// file: pages/index.tsx

import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries';
import WeatherPage from './weather';
import TrafficPage from './traffic';

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Book Library</h1>
      <TrafficPage></TrafficPage>
      <ul>
        {data.getBooks.map((book: any) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>Published Year: {book.publishedYear}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
