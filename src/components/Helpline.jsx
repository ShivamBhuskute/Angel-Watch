import { useState } from 'react';
import Navbar from './Navbar';

const helplines = [
  { name: 'NATIONAL EMERGENCY NUMBER', number: '112' },
  { name: 'POLICE', number: '100' },
  { name: 'FIRE', number: '101' },
  { name: 'AMBULANCE', number: '102' },
  { name: 'Disaster Management Services', number: '108' },
  { name: 'Women Helpline', number: '1091' },
  { name: 'Women Helpline - Domestic Abuse', number: '181' },
  { name: 'Air Ambulance', number: '9540161344' },
  { name: 'Aids Helpline', number: '1097' },
  { name: 'Anti Poison New Delhi', number: '1066 or 011-1066' },
  { name: 'Disaster Management N.D.M.A', number: '011-26701728-1078' },
  { name: 'EARTHQUAKE / FLOOD / DISASTER N.D.R.F', number: '011-24363260' },
  { name: 'Deputy Commissioner Of Police - Missing Child And Women', number: '1094' },
  { name: 'Railway Enquiry', number: '139' },
  { name: 'Senior Citizen Helpline', number: '1091/1291' },
  { name: 'Medical Helpline in Multiple States', number: '108' },
  { name: 'Railway Accident Emergency Service', number: '1072' },
  { name: 'Road Accident Emergency Service', number: '1073' },
  { name: 'Road Accident Emergency Service On National Highway For Private Operators', number: '1033' },
  { name: 'ORBO Centre, AIIMS (For Donation Of Organ) Delhi', number: '1060' },
  { name: 'Call Centre', number: '1551' },
  { name: 'Relief Commissioner For Natural Calamities', number: '1070' },
  { name: 'Children In Difficult Situation', number: '1098' },
  { name: 'Central Vigilance Commission', number: '1964' },
  { name: 'Tourist Helpline', number: '1363 or 1800111363' },
  { name: 'LPG Leak Helpline', number: '1906' },
];

const Helpline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHelplines, setFilteredHelplines] = useState(helplines);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredHelplines(
      helplines.filter((helpline) =>
        helpline.name.toLowerCase().includes(term) ||
        helpline.number.includes(term)
      )
    );
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`);
  };

  return (
    <div>
      <div>
          <Navbar />
      </div>
      <div className="mt-20 p-4 bg-gray-100 min-h-screen">


        {/* Emergency Helpline Numbers */}
        <h2 className="text-3xl font-semibold text-center mb-6">Emergency Helpline Numbers</h2>


        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for a helpline..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display filtered results */}
        {searchTerm && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Search Results:</h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHelplines.map((helpline, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{helpline.name}</h3>
                    <p className="text-sm text-gray-600">{helpline.number}</p>
                  </div>
                  <button
                    onClick={() => handleCall(helpline.number)}
                    className="text-red-500 text-3xl p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                  >
                    📞
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHelplines.length === 0 ? (
            <p className="text-center text-gray-500 col-span-3">No helplines found</p>
          ) : (
            filteredHelplines.map((helpline, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center space-x-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{helpline.name}</h3>
                  <p className="text-sm text-gray-600">{helpline.number}</p>
                </div>
                <button
                  onClick={() => handleCall(helpline.number)}
                  className="text-red-500 text-3xl p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                >
                  📞
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>

  );
};

export default Helpline;