import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { membershipAPI } from '../utils/api';
import { useAuth } from '../context/Authcontext';
import { FaCheck, FaCrown, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const response = await membershipAPI.getAll();
      setMemberships(response.data);
    } catch (error) {
      toast.error('Failed to fetch membership plans');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinPlan = (plan) => {
    if (!isAuthenticated) {
      toast.info('Please login to purchase a membership');
      navigate('/login');
    } else {
      toast.success(`Selected ${plan.name} plan! Payment integration coming soon.`);
    }
  };

  const getDurationLabel = (duration) => {
    switch (duration) {
      case 'monthly': return 'Per Month';
      case 'quarterly': return 'Per Quarter';
      case 'yearly': return 'Per Year';
      default: return duration;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your <span className="text-primary-600">Membership</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to achieve your fitness goals. All plans include access to our facilities and expert trainers.
          </p>
        </div>

        {/* Pricing Cards */}
        {memberships.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No membership plans available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {memberships.map((plan, index) => (
              <div
                key={plan._id}
                className={`card p-8 relative ${
                  plan.isPopular
                    ? 'ring-4 ring-primary-500 transform scale-105 shadow-2xl'
                    : 'card-hover'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full flex items-center shadow-lg">
                      <FaCrown className="mr-2" />
                      <span className="font-bold text-sm">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                {/* Plan Name */}
                <div className="text-center mb-6 mt-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold" style={{ color: plan.color }}>
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 ml-2">
                      / {plan.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{getDurationLabel(plan.duration)}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features && plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: `${plan.color}20` }}
                      >
                        <FaCheck className="text-sm" style={{ color: plan.color }} />
                      </div>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleJoinPlan(plan)}
                  className={`w-full py-4 rounded-lg font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: !plan.isPopular ? plan.color : undefined,
                  }}
                >
                  {plan.isPopular ? 'Get Started Now' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            All Plans Include
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏋️</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">State-of-the-Art Equipment</h3>
              <p className="text-gray-600 text-sm">Access to modern gym equipment and facilities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Expert Trainers</h3>
              <p className="text-gray-600 text-sm">Certified professionals to guide your journey</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Mobile App Access</h3>
              <p className="text-gray-600 text-sm">Track workouts and progress on the go</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Community Support</h3>
              <p className="text-gray-600 text-sm">Join a motivating fitness community</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <FaStar className="mr-2 text-yellow-300" />
                Can I change my plan later?
              </h3>
              <p className="text-primary-50">Yes, you can upgrade or downgrade your plan at any time.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <FaStar className="mr-2 text-yellow-300" />
                Is there a cancellation fee?
              </h3>
              <p className="text-primary-50">No cancellation fees. Cancel anytime with 30 days notice.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <FaStar className="mr-2 text-yellow-300" />
                Do you offer trial periods?
              </h3>
              <p className="text-primary-50">Yes! Get a 7-day free trial with any annual membership.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <FaStar className="mr-2 text-yellow-300" />
                What payment methods accepted?
              </h3>
              <p className="text-primary-50">We accept all major credit cards and online payment methods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;