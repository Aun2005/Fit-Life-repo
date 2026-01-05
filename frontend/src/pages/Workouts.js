import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { workoutAPI } from '../utils/api';
import { FaDumbbell, FaClock, FaFire, FaFilter, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    level: searchParams.get('level') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, [filters]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await workoutAPI.getAll(filters);
      setWorkouts(response.data);
    } catch (error) {
      toast.error('Failed to fetch workouts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key]) params.set(key, newFilters[key]);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ level: '', category: '', type: '' });
    setSearchParams({});
  };

  const filteredWorkouts = workouts.filter(workout =>
    workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    return '💪'; // You can customize icons per category
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Workout <span className="text-primary-600">Plans</span>
          </h1>
          <p className="text-xl text-gray-600">
            Choose from our expertly designed workout programs
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
                placeholder="Search workouts..."
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-gray-600" />
            <span className="font-semibold text-gray-700">Filters:</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="input-field"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="">All Categories</option>
                <option value="chest">Chest</option>
                <option value="back">Back</option>
                <option value="legs">Legs</option>
                <option value="shoulders">Shoulders</option>
                <option value="arms">Arms</option>
                <option value="abs">Abs</option>
                <option value="full-body">Full Body</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="input-field"
              >
                <option value="">All Types</option>
                <option value="gym">Gym</option>
                <option value="home">Home</option>
              </select>
            </div>
          </div>

          {(filters.level || filters.category || filters.type) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="text-center py-20">
            <FaDumbbell className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No workouts found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              Showing {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''}
            </div>

            {/* Workouts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((workout) => (
                <Link
                  key={workout._id}
                  to={`/workouts/${workout._id}`}
                  className="card card-hover group"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 relative overflow-hidden">
                    {workout.image && workout.image !== 'default-workout.jpg' ? (
                      <img
                        src={`http://localhost:5000/uploads/${workout.image}`}
                        alt={workout.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        {getCategoryIcon(workout.category)}
                      </div>
                    )}
                    
                    {/* Level Badge */}
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(workout.level)}`}>
                      {workout.level}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {workout.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {workout.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        {workout.duration}
                      </div>
                      {workout.caloriesBurned > 0 && (
                        <div className="flex items-center">
                          <FaFire className="mr-1 text-orange-500" />
                          {workout.caloriesBurned} cal
                        </div>
                      )}
                    </div>

                    {/* Category & Type Tags */}
                    <div className="flex gap-2 mt-4">
                      <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                        {workout.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {workout.type}
                      </span>
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

export default Workouts;