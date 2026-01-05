import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  workoutAPI,
  dietAPI,
  membershipAPI,
  contactAPI,
  authAPI,
} from "../utils/api";
import {
  FaDumbbell,
  FaAppleAlt,
  FaCrown,
  FaEnvelope,
  FaUsers,
  FaHome,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/workouts" element={<ManageWorkouts />} />
            <Route path="/diets" element={<ManageDiets />} />
            <Route path="/memberships" element={<ManageMemberships />} />
            <Route path="/contacts" element={<ManageContacts />} />
            <Route path="/users" element={<ManageUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: <FaHome />, label: "Dashboard", exact: true },
    { path: "/admin/workouts", icon: <FaDumbbell />, label: "Workouts" },
    { path: "/admin/diets", icon: <FaAppleAlt />, label: "Diet Plans" },
    { path: "/admin/memberships", icon: <FaCrown />, label: "Memberships" },
    { path: "/admin/contacts", icon: <FaEnvelope />, label: "Messages" },
    { path: "/admin/users", icon: <FaUsers />, label: "Users" },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-sm opacity-90">FitLife Gym</p>
      </div>

      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              isActive(item.path, item.exact)
                ? "bg-primary-500 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

// Overview Component
const AdminOverview = () => {
  const [stats, setStats] = useState({
    workouts: 0,
    diets: 0,
    users: 0,
    contacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [workouts, diets, users, contacts] = await Promise.all([
        workoutAPI.getAll(),
        dietAPI.getAll(),
        authAPI.getUsers(),
        contactAPI.getAll(),
      ]);

      setStats({
        workouts: workouts.data.length,
        diets: diets.data.length,
        users: users.data.length,
        contacts: contacts.data.length,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Workouts",
      value: stats.workouts,
      icon: <FaDumbbell />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Diet Plans",
      value: stats.diets,
      icon: <FaAppleAlt />,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Total Users",
      value: stats.users,
      icon: <FaUsers />,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Messages",
      value: stats.contacts,
      icon: <FaEnvelope />,
      color: "from-orange-500 to-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with FitLife Gym.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`card p-6 bg-gradient-to-br ${stat.color} text-white`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl opacity-80">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
            <p className="text-sm font-medium opacity-90">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/admin/workouts" className="btn-primary text-center">
            <FaPlus className="inline mr-2" />
            Add Workout
          </Link>
          <Link to="/admin/diets" className="btn-secondary text-center">
            <FaPlus className="inline mr-2" />
            Add Diet Plan
          </Link>
          <Link
            to="/admin/memberships"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all text-center"
          >
            <FaPlus className="inline mr-2" />
            Add Membership
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaChartLine className="mr-2 text-primary-600" />
          System Status
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-gray-700">All systems operational</span>
            <span className="text-green-600 font-semibold">✓ Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-gray-700">Database connected</span>
            <span className="text-blue-600 font-semibold">✓ Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Manage Workouts Component
const ManageWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutAPI.getAll();
      setWorkouts(response.data);
    } catch (error) {
      toast.error("Failed to fetch workouts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await workoutAPI.delete(id);
        toast.success("Workout deleted successfully");
        fetchWorkouts();
      } catch (error) {
        toast.error("Failed to delete workout");
      }
    }
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingWorkout(null);
    fetchWorkouts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Workouts</h1>
          <p className="text-gray-600 mt-2">Create and manage workout plans</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Workout
        </button>
      </div>

      {showForm && (
        <WorkoutForm workout={editingWorkout} onClose={handleCloseForm} />
      )}

      {/* Workouts Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Level
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Duration
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workouts.map((workout) => (
              <tr key={workout._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">
                    {workout.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {workout.level}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 capitalize">
                  {workout.category}
                </td>
                <td className="px-6 py-4 text-gray-600 capitalize">
                  {workout.type}
                </td>
                <td className="px-6 py-4 text-gray-600">{workout.duration}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/workouts/${workout._id}`}
                      className="text-blue-600 hover:text-blue-700 p-2"
                      title="View"
                    >
                      <FaEye />
                    </Link>
                    <button
                      onClick={() => handleEdit(workout)}
                      className="text-green-600 hover:text-green-700 p-2"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(workout._id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Workout Form Component (Simplified)
const WorkoutForm = ({ workout, onClose }) => {
  const [formData, setFormData] = useState({
    title: workout?.title || "",
    description: workout?.description || "",
    level: workout?.level || "beginner",
    category: workout?.category || "chest",
    type: workout?.type || "gym",
    duration: workout?.duration || "",
    caloriesBurned: workout?.caloriesBurned || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (workout) {
        await workoutAPI.update(workout._id, formData);
        toast.success("Workout updated successfully");
      } else {
        await workoutAPI.create(formData);
        toast.success("Workout created successfully");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {workout ? "Edit Workout" : "Add New Workout"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="input-field"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="input-field"
              >
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="input-field"
              >
                <option value="gym">Gym</option>
                <option value="home">Home</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="input-field"
                placeholder="e.g., 45 minutes"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Calories Burned
            </label>
            <input
              type="number"
              value={formData.caloriesBurned}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  caloriesBurned: parseInt(e.target.value),
                })
              }
              className="input-field"
              min="0"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : workout
                ? "Update Workout"
                : "Create Workout"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Diets Component
const ManageDiets = () => {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDiet, setEditingDiet] = useState(null);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const response = await dietAPI.getAll();
      setDiets(response.data);
    } catch (error) {
      toast.error("Failed to fetch diets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this diet plan?")) {
      try {
        await dietAPI.delete(id);
        toast.success("Diet plan deleted successfully");
        fetchDiets();
      } catch (error) {
        toast.error("Failed to delete diet plan");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Diet Plans
          </h1>
          <p className="text-gray-600 mt-2">Create and manage diet plans</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Diet Plan
        </button>
      </div>

      {showForm && (
        <DietForm
          diet={editingDiet}
          onClose={() => {
            setShowForm(false);
            setEditingDiet(null);
            fetchDiets();
          }}
        />
      )}

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Goal
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Calories
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Duration
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {diets.map((diet) => (
              <tr key={diet._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {diet.title}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                    {diet.goal.replace("-", " ")}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {diet.targetCalories}
                </td>
                <td className="px-6 py-4 text-gray-600">{diet.duration}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingDiet(diet);
                        setShowForm(true);
                      }}
                      className="text-green-600 hover:text-green-700 p-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(diet._id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Diet Form Component
const DietForm = ({ diet, onClose }) => {
  const [formData, setFormData] = useState({
    title: diet?.title || "",
    description: diet?.description || "",
    goal: diet?.goal || "weight-loss",
    targetCalories: diet?.targetCalories || 2000,
    duration: diet?.duration || "4 weeks",
    totalProtein: diet?.totalProtein || 150,
    totalCarbs: diet?.totalCarbs || 200,
    totalFats: diet?.totalFats || 60,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (diet) {
        await dietAPI.update(diet._id, formData);
        toast.success("Diet plan updated successfully");
      } else {
        await dietAPI.create(formData);
        toast.success("Diet plan created successfully");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save diet plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {diet ? "Edit Diet Plan" : "Add New Diet Plan"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field"
              rows="3"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Goal
              </label>
              <select
                value={formData.goal}
                onChange={(e) =>
                  setFormData({ ...formData, goal: e.target.value })
                }
                className="input-field"
              >
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                <option value="cutting">Cutting</option>
                <option value="bulking">Bulking</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="input-field"
                placeholder="e.g., 4 weeks"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Calories
              </label>
              <input
                type="number"
                value={formData.targetCalories}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetCalories: parseInt(e.target.value),
                  })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Protein (g)
              </label>
              <input
                type="number"
                value={formData.totalProtein}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalProtein: parseInt(e.target.value),
                  })
                }
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carbs (g)
              </label>
              <input
                type="number"
                value={formData.totalCarbs}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalCarbs: parseInt(e.target.value),
                  })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fats (g)
              </label>
              <input
                type="number"
                value={formData.totalFats}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalFats: parseInt(e.target.value),
                  })
                }
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : diet
                ? "Update Diet Plan"
                : "Create Diet Plan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Memberships Component
const ManageMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await membershipAPI.getAll();
      setMemberships(response.data);
    } catch (error) {
      toast.error("Failed to fetch memberships");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this membership plan?")
    ) {
      try {
        await membershipAPI.delete(id);
        toast.success("Membership plan deleted successfully");
        fetchMemberships();
      } catch (error) {
        toast.error("Failed to delete membership plan");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Memberships
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage membership plans
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Membership
        </button>
      </div>

      {showForm && (
        <MembershipForm
          membership={editingMembership}
          onClose={() => {
            setShowForm(false);
            setEditingMembership(null);
            fetchMemberships();
          }}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership) => (
          <div key={membership._id} className="card p-6 relative">
            {membership.isPopular && (
              <div className="absolute -top-3 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {membership.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {membership.description}
            </p>
            <div className="text-3xl font-bold text-primary-600 mb-4">
              ${membership.price}
            </div>
            <p className="text-sm text-gray-500 mb-4 capitalize">
              {membership.duration}
            </p>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => {
                  setEditingMembership(membership);
                  setShowForm(true);
                }}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaEdit className="inline mr-2" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(membership._id)}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTrash className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Membership Form Component
const MembershipForm = ({ membership, onClose }) => {
  const [formData, setFormData] = useState({
    name: membership?.name || "",
    description: membership?.description || "",
    duration: membership?.duration || "monthly",
    durationInDays: membership?.durationInDays || 30,
    price: membership?.price || 0,
    features: membership?.features?.join("\n") || "",
    isPopular: membership?.isPopular || false,
    color: membership?.color || "#3B82F6",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        features: formData.features.split("\n").filter((f) => f.trim()),
      };
      if (membership) {
        await membershipAPI.update(membership._id, dataToSend);
        toast.success("Membership plan updated successfully");
      } else {
        await membershipAPI.create(dataToSend);
        toast.success("Membership plan created successfully");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save membership plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {membership ? "Edit Membership Plan" : "Add New Membership Plan"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plan Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input-field"
              rows="2"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="input-field"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Days
              </label>
              <input
                type="number"
                value={formData.durationInDays}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    durationInDays: parseInt(e.target.value),
                  })
                }
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (Rs.)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseInt(e.target.value) })
                }
                className="input-field"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Features (one per line)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) =>
                setFormData({ ...formData, features: e.target.value })
              }
              className="input-field"
              rows="4"
              placeholder="Access to gym&#10;Personal trainer&#10;Nutrition consultation"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) =>
                  setFormData({ ...formData, isPopular: e.target.checked })
                }
                className="mr-2"
              />
              <span className="text-sm font-semibold text-gray-700">
                Mark as Popular
              </span>
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Color:
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-12 h-10 rounded border"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : membership
                ? "Update Membership"
                : "Create Membership"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Contacts Component
const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await contactAPI.delete(id);
        toast.success("Message deleted successfully");
        fetchContacts();
      } catch (error) {
        toast.error("Failed to delete message");
      }
    }
  };

  const handleViewMessage = async (contact) => {
    setSelectedContact(contact);
    if (contact.status === "new") {
      try {
        await contactAPI.getById(contact._id);
        fetchContacts();
      } catch (error) {
        console.error("Failed to mark as read");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-gray-100 text-gray-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
        <p className="text-gray-600 mt-2">
          View and manage contact form submissions
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="card p-4 max-h-[600px] overflow-y-auto">
            <h2 className="font-bold text-lg mb-4">
              All Messages ({contacts.length})
            </h2>
            <div className="space-y-2">
              {contacts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No messages yet
                </p>
              ) : (
                contacts.map((contact) => (
                  <div
                    key={contact._id}
                    onClick={() => handleViewMessage(contact)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedContact?._id === contact._id
                        ? "bg-primary-50 border-2 border-primary-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800">
                        {contact.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {contact.email}
                    </p>
                    {contact.subject && (
                      <p className="text-sm text-gray-700 font-medium mb-2">
                        {contact.subject}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {contact.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {selectedContact.name}
                  </h2>
                  <p className="text-gray-600">{selectedContact.email}</p>
                  {selectedContact.phone && (
                    <p className="text-gray-600">{selectedContact.phone}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      selectedContact.status
                    )}`}
                  >
                    {selectedContact.status}
                  </span>
                  <button
                    onClick={() => handleDelete(selectedContact._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {selectedContact.subject && (
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-600">
                    Subject:
                  </label>
                  <p className="text-gray-800 font-medium">
                    {selectedContact.subject}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-600 block mb-2">
                  Message:
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="mb-6 text-sm text-gray-500">
                <p>
                  Received:{" "}
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedContact.reply && (
                <div className="mb-6 bg-green-50 p-4 rounded-lg">
                  <label className="text-sm font-semibold text-green-800 block mb-2">
                    Your Reply:
                  </label>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {selectedContact.reply}
                  </p>
                  {selectedContact.repliedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Replied:{" "}
                      {new Date(selectedContact.repliedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {selectedContact.status !== "replied" && (
                <button
                  onClick={() => setShowReplyModal(true)}
                  className="btn-primary"
                >
                  Reply to Message
                </button>
              )}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedContact && (
        <ReplyModal
          contact={selectedContact}
          onClose={() => {
            setShowReplyModal(false);
            fetchContacts();
          }}
        />
      )}
    </div>
  );
};

// Reply Modal Component
const ReplyModal = ({ contact, onClose }) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.reply(contact._id, { reply });
      toast.success("Reply sent successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Reply to {contact.name}
        </h2>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Original Message:</strong>
          </p>
          <p className="text-gray-800">{contact.message}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Reply
            </label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="input-field"
              rows="6"
              placeholder="Type your reply here..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reply"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Users Component
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await authAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await authAPI.deleteUser(id);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const getRoleColor = (role) => {
    return role === "admin"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-blue-100 text-blue-800";
  };

  const getMembershipColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <p className="text-gray-600 mt-2">View and manage registered users</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="text-3xl font-bold">{users.length}</div>
          <p className="text-sm opacity-90">Total Users</p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="text-3xl font-bold">
            {users.filter((u) => u.role === "admin").length}
          </div>
          <p className="text-sm opacity-90">Admins</p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="text-3xl font-bold">
            {users.filter((u) => u.membershipStatus === "active").length}
          </div>
          <p className="text-sm opacity-90">Active Members</p>
        </div>
        <div className="card p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="text-3xl font-bold">
            {
              users.filter(
                (u) =>
                  u.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length
            }
          </div>
          <p className="text-sm opacity-90">New This Month</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Membership
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Joined
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {user.name}
                      </div>
                      {user.phone && (
                        <div className="text-sm text-gray-500">
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(
                      user.role
                    )} capitalize`}
                  >
                    {user.role === "admin" ? "👑 Admin" : "👤 User"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.membershipPlan ? (
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        {user.membershipPlan.name}
                      </div>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${getMembershipColor(
                          user.membershipStatus
                        )} capitalize`}
                      >
                        {user.membershipStatus}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No membership</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                    title="Delete user"
                    disabled={user.role === "admin"}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
