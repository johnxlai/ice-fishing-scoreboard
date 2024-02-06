import React from 'react';
import { useState } from 'react';

//fishing scoreboard will contain a form to add points to a player
//form will contain a select dropdown to select a player and a fish
//form will contain a button to submit the form
//Scoreboard will contain a list of players and their points
//Scoreboard will contain a total points for all players
//Add local storage to store the players and their points
//Add a reset button to reset the players and their points

const Form = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Che',
      points: 0,
    },
    {
      id: 2,
      name: 'Sam',
      points: 0,
    },
    {
      id: 3,
      name: 'John',
      points: 0,
    },
    {
      id: 4,
      name: 'Dre',
      points: 0,
    },
    {
      id: 5,
      name: 'Dennis',
      points: 0,
    },
    {
      id: 6,
      name: 'Jackal',
      points: 0,
    },
  ]);

  const [points, setPoints] = useState(0);
  const [formData, setFormData] = useState({
    selectedName: '',
    selectedOption: '', // default value for the select dropdown
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetField = () => {
    setFormData({
      selectedName: '',
      selectedOption: '',
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form data submitted:', formData);

    const updatePlayers = players.map((p) => {
      if (p.name === formData.selectedName) {
        return {
          ...p,
          points: p.points + parseInt(formData.selectedOption),
        };
      } else {
        return p;
      }
    });

    setPlayers(updatePlayers);
    resetField();
  };

  return (
    <div>
      <ul className='flex gap-3 mt-3'>
        {players
          .sort((a, b) => b.points - a.points)
          .map((player) => (
            <li key={player.id}>
              {player.name} : {player.points}
            </li>
          ))}
      </ul>

      {formData.selectedName && (
        <h5>
          {formData.selectedName}: {formData.selectedOption}
        </h5>
      )}

      <form
        onSubmit={handleSubmit}
        className='max-w-sm mx-auto bg-green-600 p-5 mt-5 rounded-md'
      >
        <label
          htmlFor='playerName'
          className='block my-2 text-sm font-medium text-white'
        >
          Player Name
        </label>
        <select
          name='selectedName'
          value={formData.selectedName}
          onChange={handleChange}
          id='playerName'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3'
        >
          <option value=''>Select player name</option>
          {players.map((player) => {
            return (
              <option key={player.id} value={player.name}>
                {player.name}
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
          value={formData.selectedOption}
          onChange={handleChange}
          id='species'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4'
        >
          <option value=''>Select a fish</option>
          <option value='5'>Walleye</option>
          <option value='3'>Perch</option>
          <option value='4'>Pike</option>
          <option value='-5'>Mud Puppy</option>
          <option value='5'>White Fish</option>
        </select>
        <button
          className='disabled:opacity-80 disabled:bg-gray-500 disabled:border-gray-600 text-white hover:text-white border border-purple-700 bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full uppercase tracking-wider '
          type='submit'
          disabled={!formData.selectedOption || !formData.selectedName}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
