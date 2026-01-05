import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dietAPI } from '../utils/api';
import { FaArrowLeft, FaFire, FaAppleAlt, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DietDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiet();
  }, [id]);

  const fetchDiet = async () => {
    try {
      setLoading(true);
      const response = await dietAPI.getById(id);
      setDiet(response.data);
    } catch (error) {
      toast.error('Failed to fetch diet details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '🌞';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!diet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Diet plan not found</p>
          <button onClick={() => navigate('/diets')} className="btn-primary mt-4">
            Back to Diet Plans
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
          onClick={() => navigate('/diets')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Back to Diet Plans
        </button>

        {/* Hero Section */}
        <div className="card overflow-hidden mb-8">
          <div className={`h-80 bg-gradient-to-br ${getGoalColor(diet.goal)} relative`}>
            {diet.image && diet.image !== 'default-diet.jpg' ? (
              <img
                src={`http://localhost:5000/uploads/${diet.image}`}
                alt={diet.title}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-9xl">
                🍎
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-4 capitalize">
                {diet.goal.replace('-', ' ')}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{diet.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  {diet.duration}
                </div>
                <div className="flex items-center">
                  <FaFire className="mr-2 text-orange-400" />
                  {diet.targetCalories} calories/day
                </div>
                <div className="flex items-center">
                  <FaAppleAlt className="mr-2" />
                  {diet.meals?.length || 0} meals/day
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Plan</h2>
              <p className="text-gray-700 leading-relaxed">{diet.description}</p>
            </div>

            {/* Meals */}
            {diet.meals && diet.meals.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Meal Plan</h2>
                <div className="space-y-6">
                  {diet.meals.map((meal, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">{getMealIcon(meal.mealType)}</span>
                        <div>
                          <h3 className="font-bold text-xl text-gray-800 capitalize">{meal.mealType}</h3>
                          <p className="text-sm text-gray-600">{meal.name}</p>
                          {meal.time && <p className="text-xs text-gray-500 mt-1">⏰ {meal.time}</p>}
                        </div>
                      </div>

                      {/* Foods */}
                      {meal.foods && meal.foods.length > 0 && (
                        <div className="mb-4">
                          <p className="font-semibold text-sm text-gray-700 mb-2">Ingredients:</p>
                          <ul className="space-y-1">
                            {meal.foods.map((food, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{food.item} - {food.quantity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Macros */}
                      <div className="grid grid-cols-4 gap-3">
                        <div className="bg-red-50 p-2 rounded text-center">
                          <p className="text-xs text-red-600 font-semibold">Calories</p>
                          <p className="font-bold text-red-700">{meal.calories}</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded text-center">
                          <p className="text-xs text-blue-600 font-semibold">Protein</p>
                          <p className="font-bold text-blue-700">{meal.protein}g</p>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded text-center">
                          <p className="text-xs text-yellow-600 font-semibold">Carbs</p>
                          <p className="font-bold text-yellow-700">{meal.carbs}g</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded text-center">
                          <p className="text-xs text-green-600 font-semibold">Fats</p>
                          <p className="font-bold text-green-700">{meal.fats}g</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guidelines */}
            {diet.guidelines && diet.guidelines.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Guidelines</h2>
                <ul className="space-y-3">
                  {diet.guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                        ✓
                      </span>
                      <span className="text-gray-700">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Restrictions */}
            {diet.restrictions && diet.restrictions.length > 0 && (
              <div className="card p-6 bg-red-50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Restrictions</h2>
                <ul className="space-y-2">
                  {diet.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="text-red-500 mr-2">⚠️</span>
                      {restriction}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Supplements */}
            {diet.supplements && diet.supplements.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Supplements</h2>
                <div className="space-y-3">
                  {diet.supplements.map((supplement, index) => (
                    <div key={index} className="flex items-start bg-purple-50 p-4 rounded-lg">
                      <span className="text-2xl mr-3">💊</span>
                      <div>
                        <p className="font-bold text-gray-800">{supplement.name}</p>
                        <p className="text-sm text-gray-600">Dosage: {supplement.dosage}</p>
                        <p className="text-sm text-gray-600">Timing: {supplement.timing}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Summary */}
            <div className="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Daily Nutrition</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Total Calories</span>
                    <span className="font-bold text-2xl text-red-600">{diet.targetCalories}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Protein</span>
                    <span className="font-bold text-blue-600">{diet.totalProtein}g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Carbs</span>
                    <span className="font-bold text-yellow-600">{diet.totalCarbs}g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Fats</span>
                    <span className="font-bold text-green-600">{diet.totalFats}g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="card p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Plan Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Goal:</span>
                  <span className="font-semibold text-gray-800 capitalize">{diet.goal.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-800">{diet.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Meals/Day:</span>
                  <span className="font-semibold text-gray-800">{diet.meals?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="card p-6 bg-gradient-to-br from-green-500 to-teal-500 text-white text-center">
              <h3 className="font-bold text-xl mb-2">Start This Plan</h3>
              <p className="text-sm mb-4 opacity-90">Join FitLife and follow this diet plan</p>
              <button
                onClick={() => navigate('/membership')}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietDetail;