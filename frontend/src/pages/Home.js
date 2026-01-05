import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaAppleAlt, FaUsers, FaStar, FaArrowRight, FaFire, FaTrophy, FaHeart } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaDumbbell className="text-4xl text-primary-500" />,
      title: 'Expert Training',
      description: 'Work with certified trainers who create personalized workout plans tailored to your goals.',
    },
    {
      icon: <FaAppleAlt className="text-4xl text-green-500" />,
      title: 'Nutrition Plans',
      description: 'Get customized diet plans designed by nutritionists to fuel your fitness journey.',
    },
    {
      icon: <FaUsers className="text-4xl text-purple-500" />,
      title: 'Community Support',
      description: 'Join a vibrant community of fitness enthusiasts who motivate and inspire each other.',
    },
    {
      icon: <FaTrophy className="text-4xl text-yellow-500" />,
      title: 'Track Progress',
      description: 'Monitor your achievements and celebrate milestones with our progress tracking tools.',
    },
  ];

  const stats = [
    { number: '5000+', label: 'Happy Members', icon: <FaUsers /> },
    { number: '200+', label: 'Workout Plans', icon: <FaDumbbell /> },
    { number: '50+', label: 'Expert Trainers', icon: <FaStar /> },
    { number: '15+', label: 'Years Experience', icon: <FaTrophy /> },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Weight Loss Journey',
      image: '👩',
      text: 'Lost 30 pounds in 6 months! The personalized diet plans and supportive trainers made all the difference.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Muscle Building',
      image: '👨',
      text: 'Gained 15 pounds of muscle with their structured programs. Best gym experience ever!',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Fitness Enthusiast',
      image: '👩‍🦰',
      text: 'The variety of workouts keeps me motivated. I look forward to every session!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCwyIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wLTMwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00IDItNC00LTR2LTJ6bS0yMCAwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00IDItNC00LTR2LTJ6TTAgMTZjMC0yIDItNCA0LTRzNCwyIDQgNHYyYzAgMi0yIDQtNCA0cy00LTItNC00di0yem0wIDIwYzAtMiAyLTQgNC00czQgMiA0IDR2MmMwIDItMiA0LTQgNC00IDItNC00LTR2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Transform Your Body,
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Transform Your Life
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto animate-slide-up">
              Join thousands of members who've achieved their fitness goals with our expert guidance, personalized plans, and state-of-the-art facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/signup"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                Start Your Journey <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/workouts"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 flex items-center justify-center"
              >
                Explore Workouts
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2 flex justify-center text-yellow-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm text-gray-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-primary-600">FitLife Gym?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to achieve your fitness goals in a supportive and motivating environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover p-8 text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaFire className="text-6xl mx-auto mb-6 animate-bounce-slow" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get access to personalized workout plans, expert nutrition guidance, and a supportive community.
          </p>
          <Link
            to="/membership"
            className="inline-block bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
          >
            View Membership Plans
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our members who've transformed their lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-center mb-4">
                  <div className="text-5xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card p-12 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
            <FaHeart className="text-5xl text-red-500 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Your Journey Starts Today
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Join our community and take the first step towards a healthier, stronger you.
            </p>
            <Link
              to="/signup"
              className="btn-primary inline-block"
            >
              Join FitLife Gym Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;