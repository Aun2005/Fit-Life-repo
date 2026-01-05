import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workoutAPI } from '../utils/api';
import { FaClock, FaFire, FaArrowLeft, FaDumbbell, FaListUl, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      setLoading(true);
      const response = await workoutAPI.getById(id);
      setWorkout(response.data);
    } catch (error) {
      toast.error('Failed to fetch workout details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Workout not found</p>
          <button onClick={() => navigate('/workouts')} className="btn-primary mt-4">
            Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/workouts')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Back to Workouts
        </button>

        {/* Hero Image */}
        <div className="card overflow-hidden mb-8">
          <div className="h-80 bg-gradient-to-br from-primary-400 to-secondary-400 relative">
            {workout.image && workout.image !== 'default-workout.jpg' ? (
              <img
                src={`http://localhost:5000/uploads/${workout.image}`}
                alt={workout.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl">
                💪
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 border-2 ${getLevelColor(workout.level)}`}>
                {workout.level.toUpperCase()}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{workout.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  {workout.duration}
                </div>
                {workout.caloriesBurned > 0 && (
                  <div className="flex items-center">
                    <FaFire className="mr-2 text-orange-400" />
                    {workout.caloriesBurned} calories
                  </div>
                )}
                <div className="px-3 py-1 bg-white/20 rounded-full">
                  {workout.category}
                </div>
                <div className="px-3 py-1 bg-white/20 rounded-full">
                  {workout.type} workout
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Workout</h2>
              <p className="text-gray-700 leading-relaxed">{workout.description}</p>
            </div>

            {/* Exercises */}
            {workout.exercises && workout.exercises.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center mb-6">
                  <FaListUl className="text-primary-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Exercises</h2>
                </div>
                <div className="space-y-4">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 rounded">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">
                            {index + 1}. {exercise.name}
                          </h3>
                          {exercise.instructions && (
                            <p className="text-sm text-gray-600 mt-1">{exercise.instructions}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Sets: <span className="text-primary-600">{exercise.sets}</span></span>
                        <span className="font-semibold">Reps: <span className="text-primary-600">{exercise.reps}</span></span>
                        <span className="font-semibold">Rest: <span className="text-primary-600">{exercise.rest}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {workout.tips && workout.tips.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center mb-6">
                  <FaLightbulb className="text-yellow-500 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Pro Tips</h2>
                </div>
                <ul className="space-y-3">
                  {workout.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Equipment */}
            {workout.equipment && workout.equipment.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                  <FaDumbbell className="mr-2 text-primary-600" />
                  Equipment Needed
                </h3>
                <ul className="space-y-2">
                  {workout.equipment.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Stats */}
            <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-semibold text-gray-800 capitalize">{workout.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold text-gray-800 capitalize">{workout.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-800 capitalize">{workout.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-800">{workout.duration}</span>
                </div>
                {workout.caloriesBurned > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-semibold text-gray-800">{workout.caloriesBurned}</span>
                  </div>
                )}
                {workout.exercises && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exercises:</span>
                    <span className="font-semibold text-gray-800">{workout.exercises.length}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Video Link */}
            {workout.videoUrl && (
              <div className="card p-6 bg-gradient-to-br from-red-50 to-orange-50">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Video Tutorial</h3>
                <a
                  href={workout.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center"
                >
                  Watch Video
                </a>
              </div>
            )}

            {/* CTA */}
            <div className="card p-6 bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-center">
              <h3 className="font-bold text-xl mb-2">Ready to Start?</h3>
              <p className="text-sm mb-4 opacity-90">Join FitLife and get access to all workouts</p>
              <button
                onClick={() => navigate('/membership')}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all w-full"
              >
                View Membership Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;