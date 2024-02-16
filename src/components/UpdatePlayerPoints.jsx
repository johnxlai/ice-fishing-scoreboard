import React, { useState } from 'react';
import { db } from '../lib/init-firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditPlayer = ({ players }) => {
  const [id, setId] = useState('');
  const [newPoints, setNewPoints] = useState('');
  const [currentPoints, setCurrentPoints] = useState('');
  const [currentPlayerId, setCurrentPlayerId] = useState();

  //add correct fish to player object
  function findFish(fish) {
    if (fish === '1') {
      console.log('1 perch');
      currentPlayerId.data.perch += 1;
      console.log(currentPlayerId.data, 'perch');
    }
  }

  //find current player point
  function findCurrentPoints(id) {
    const player = players.find((player) => player.id === id);
    setCurrentPlayerId(player);
    setCurrentPoints(player.data.points);
    // console.log(player.data.points, 'current points');
  }

  function handleSubmit(e) {
    e.preventDefault();

    const docRef = doc(db, 'players', id);
    updateDoc(docRef, {
      points: parseInt(currentPoints) + parseInt(newPoints),
      perch: currentPlayerId.data.perch++,
      whitefish: currentPlayerId.data.whitefish++,
      walleye: currentPlayerId.data.walleye++,
      perch: currentPlayerId.data.perch++,
    })
      .then((res) => {
        // console.log(res);
        //clear input fields
        setId('');
        setNewPoints('');
      })
      .catch((err) => console.error('Error updating document: ', err.message));
  }

  return (
    <div className='w-full'>
      <form
        className='mx-auto bg-purple-800 p-5 mt-5 rounded-md w-full'
        onSubmit={handleSubmit}
      >
        <label htmlFor='id'>Player Name</label>
        <select
          name='selectedName'
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            findCurrentPoints(e.target.value);
          }}
          id='id'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3'
        >
          <option value=''>Select player Id</option>
          {players.map((player) => {
            return (
              <option key={player.id} value={player.id}>
                {player.data.name}
              </option>
            );
          })}
        </select>

        <label
          htmlFor='species'
          className='block my-2 text-sm font-medium text-white'
        >
          Fish Caught
        </label>
        <select
          name='selectedOption'
          value={newPoints}
          onChange={(e) => {
            setNewPoints(e.target.value);
            findFish(e.target.value);
          }}
          id='species'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4'
        >
          <option value=''>Select a fish</option>
          <option value={1}>1 Perch/Panfish</option>
          <option value={2}>2 Whitefish/Cisco</option>
          <option value={3}>3 Walleye 43 cm</option>
          <option value={4}>4 Walleye 43-60 cm</option>
          <option value={5}>5 Walleye 60+ cm</option>
          <option value={6}>6 Pike/Bass</option>
          <option value={7}>7 Ling/Drum/Burbot</option>
          <option value={8}>8 Trout/Muskie</option>
          <option value={-5}>-5 Mudpuppy</option>
        </select>

        <button
          className='disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-gray-500 disabled:border-gray-600 text-white hover:text-white border border-green-500 bg-green-500 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full uppercase tracking-wider '
          type='submit'
          disabled={!id || !newPoints}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default EditPlayer;
