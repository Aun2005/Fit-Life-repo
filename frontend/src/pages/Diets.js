import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { dietAPI } from '../utils/api';
import { FaAppleAlt, FaFire, FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Diets = () => {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    goal: searchParams.get('goal') || '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDiets();
  }, [filters]);

  const fetchDiets = async () => {
    try {
      setLoading(true);
      const response = await dietAPI.getAll(filters);
      setDiets(response.data);
    } catch (error) {
      toast.error('Failed to fetch diet plans');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (value) => {
    const newFilters = { goal: value };
    setFilters(newFilters);
    
    if (value) {
      setSearchParams({ goal: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredDiets = diets.filter(diet =>
    diet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    diet.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGoalColor = (goal) => {
    switch (goal) {
      case 'weight-loss': return 'from-red-400 to-orange-400';
      case 'muscle-gain': return 'from-blue-400 to-purple-400';
      case 'maintenance': return 'from-green-400 to-teal-400';
      case 'cutting': return 'from-yellow-400 to-orange-400';
      case 'bulking': return 'from-indigo-400 to-purple-400';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getGoalIcon = (goal) => {
    switch (goal) {
      case 'weight-loss': return '🔥';
      case 'muscle-gain': return '💪';
      case 'maintenance': return '⚖️';
      case 'cutting': return '✂️';
      case 'bulking': return '🏋️';
      default: return '🍎';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Diet <span className="text-green-600">Plans</span>
          </h1>
          <p className="text-xl text-gray-600">
            Personalized nutrition plans to fuel your fitness journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search diet plans..."
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Goal Filter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by Goal:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleFilterChange('')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.goal === ''
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Plans
              </button>
              <button
                onClick={() => handleFilterChange('weight-loss')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.goal === 'weight-loss'
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔥 Weight Loss
              </button>
              <button
                onClick={() => handleFilterChange('muscle-gain')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.goal === 'muscle-gain'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💪 Muscle Gain
              </button>
              <button
                onClick={() => handleFilterChange('maintenance')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.goal === 'maintenance'
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ⚖️ Maintenance
              </button>
              <button
                onClick={() => handleFilterChange('cutting')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.goal === 'cutting'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✂️ Cutting
              </button>
              <button
                onClick={() => handleFilterChange('bulking')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filters.goal === 'bulking'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏋️ Bulking
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : filteredDiets.length === 0 ? (
          <div className="text-center py-20">
            <FaAppleAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No diet plans found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              Showing {filteredDiets.length} diet plan{filteredDiets.length !== 1 ? 's' : ''}
            </div>

            {/* Diets Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDiets.map((diet) => (
                <Link
                  key={diet._id}
                  to={`/diets/${diet._id}`}
                  className="card card-hover group"
                >
                  {/* Header with gradient */}
                  <div className={`h-48 bg-gradient-to-br ${getGoalColor(diet.goal)} relative overflow-hidden`}>
                    {diet.image && diet.image !== 'default-diet.jpg' ? (
                      <img
                        src={`http://localhost:5000/uploads/${diet.image}`}
                        alt={diet.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-80"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">
                        {getGoalIcon(diet.goal)}
                      </div>
                    )}
                    
                    {/* Goal Badge */}
                    <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800 capitalize">
                      {diet.goal.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {diet.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {diet.description}
                    </p>

                    {/* Nutrition Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center text-red-600 mb-1">
                          <FaFire className="mr-1 text-xs" />
                          <span className="text-xs font-semibold">Calories</span>
                        </div>
                        <p className="font-bold text-lg">{diet.targetCalories}</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-blue-600 mb-1">
                          <span className="text-xs font-semibold">Protein</span>
                        </div>
                        <p className="font-bold text-lg">{diet.totalProtein}g</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <div className="text-yellow-600 mb-1">
                          <span className="text-xs font-semibold">Carbs</span>
                        </div>
                        <p className="font-bold text-lg">{diet.totalCarbs}g</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-green-600 mb-1">
                          <span className="text-xs font-semibold">Fats</span>
                        </div>
                        <p className="font-bold text-lg">{diet.totalFats}g</p>
                      </div>
                    </div>

                    {/* Duration & Meals */}
                    <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <span>Duration: {diet.duration}</span>
                      <span>{diet.meals?.length || 0} meals/day</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Diets;