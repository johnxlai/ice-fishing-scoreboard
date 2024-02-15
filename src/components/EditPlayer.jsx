import React, { useState } from 'react';
import { db } from '../lib/init-firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditPlayer = () => {
  // const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [points, setPoints] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const docRef = doc(db, 'players', id);
    updateDoc(docRef, { points })
      .then((res) => {
        console.log(res);
        //clear input fields
        // setName('');
        setId('');
        setPoints('');
      })
      .catch((err) => console.error('Error updating document: ', err.message));
  }

  return (
    <div className='w-full'>
      <form
        className='max-w-sm mx-auto bg-green-600 p-5 mt-5 rounded-md w-full'
        onSubmit={handleSubmit}
      >
        <label htmlFor='id'>Player Id</label>
        <select
          name='selectedName'
          value={id}
          onChange={(e) => setId(e.target.value)}
          id='id'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3'
        >
          <option value=''>Select player Id</option>
          <option key={1} value={1}>
            Sam
          </option>
          <option key={5} value={5}>
            Jackal
          </option>
        </select>

        {/* <label htmlFor='name'>Player Name</label>
        <input
          id='name'
          className='text-green-600'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}

        <label
          htmlFor='species'
          className='block my-2 text-sm font-medium text-white'
        >
          Fish Caught
        </label>
        <select
          name='selectedOption'
          value={points}
          onChange={(e) => {
            console.log(e.target.value);
            setPoints(e.target.value);
          }}
          id='species'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4'
        >
          <option value=''>Select a fish</option>
          <option value={5}>Walleye</option>
          <option value={6}>Perch</option>
          <option value={4}>Pike</option>
          <option value={-5}>Mud Puppy</option>
          <option value={2}>White Fish</option>
        </select>

        <button
          className='disabled:cursor-not-allowed disabled:opacity-80 disabled:bg-gray-500 disabled:border-gray-600 text-white hover:text-white border border-purple-700 bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full uppercase tracking-wider '
          type='submit'
          disabled={!id || !points}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default EditPlayer;
