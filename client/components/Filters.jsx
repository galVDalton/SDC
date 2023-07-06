// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import dotenv from 'dotenv'
// import axios from 'axios'

// //dotenv.config({ path: '../.env' })

// const Filters = () => {
//   const items = [
//     'All', 'Music', 'Lofi', 'Chill-out music', 'Gaming', 'Jazz', 'Medication music', 'Live', 'Soundtracks',
//     'Piano', 'News', 'Computer programming', 'Comedy', 'Apple', 'History', 'Computer Hardware', 'Action Thrillers',
//     'Driving', 'Algebra', 'Pop music', 'Recently uploaded'
//   ];

//   const [activeFilter, setActiveFilter] = useState('All');

//   const handleFilterClick = (filter) => {
//     setActiveFilter(filter);
//     // Perform any additional logic or actions here based on the selected filter
//   };

//   return (
//     <div className="flex items-center px-2 py-3 px-4 space-x-3">
//       {items.map((button, index) => (
//         <span
//         <div class="flex items-center px-2 py-3 px-4 space-x-3">
//         <span class="text-sm bg-gray-700 border border-gray-800 rounded-full px-2 py-1 text-gray-200 shadow-inset">All</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Music</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Lofi</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Chill-out music</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Gaming</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Jazz</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Medication</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">music</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Live</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Soundtracks</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Piano</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">News</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Computer programming</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Comedy</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Apple</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">History</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Computer Hardware</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Action Thrillers</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Driving</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Algebra</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Pop music</span>
//         <span class="text-sm bg-gray-200 border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset">Recently uploaded</span>
//       </div>
//           }`}
//           onClick={() => handleFilterClick(button)}
//           key={index}
//         >
//           {button}
//         </span>
//       ))}
//     </div>
//   );
// };

// export default Filters;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dotenv from 'dotenv'
import axios from 'axios'

const Filters = () => {
  const items = [
    'All', 'Music', 'Lofi', 'Chill-out music', 'Gaming', 'Jazz', 'Medication music', 'Live', 'Soundtracks',
    'Piano', 'News', 'Computer programming', 'Comedy', 'Apple', 'History', 'Computer Hardware', 'Action Thrillers',
    'Driving', 'Algebra', 'Pop music', 'Recently uploaded'
  ];

  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  
  };

  return (
    <div className="flex items-center px-2 py-3 px-4 space-x-3">
      {items.map((button, index) => (
        <span
          className={`text-sm bg-${activeFilter === button ? 'gray-700' : 'gray-200'} border border-gray-300 rounded-full px-2 py-1 text-gray-800 shadow-inset`}
          onClick={() => handleFilterClick(button)}
          key={index}
        >
          {button}
        </span>
      ))}
    </div>
  );
};

export default Filters;
