import React, { useEffect, useState } from 'react';
import { doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/init-firebase';
import { playersCollectionRef } from '../lib/firestore.collections';

const ListPlayers = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  function getMovies() {
    getDocs(playersCollectionRef)
      .then((res) => {
        console.log(res);

        const moviesData = res.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        setMovies(moviesData);
      })
      .catch((error) => console.error(error.message));
  }

  // function deleteMovie(id) {
  //   const docRef = doc(db, 'players', id);
  //   deleteDoc(docRef)
  //     .then(() => {
  //       console.log('Document successfully deleted!');
  //       // getMovies();
  //     })
  //     .catch((error) => {
  //       console.error('Error removing document: ', error.message);
  //     });
  // }
  return (
    <div>
      <h4>ListPlayers</h4>
      <button onClick={() => getMovies()}>Refresh Movies</button>
    </div>
  );
};

export default ListPlayers;