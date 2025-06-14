import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsManager from "../components/ProjectsManager";
import UploadCV from "../components/UploadCV";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Set auth header globally
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Fetch all data
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        getProfile(),
        getProjects()
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${apiURL}/profile`);
      if (response) {
        console.log("Profile data loaded:", response.data);
        setProfile(response.data);
      }
    } catch (error) {
      console.log("from admindashboard Error fetching profile: ", error);
      if (error.response?.status === 401) {
        // Invalid or expired token
        localStorage.removeItem("token");
        navigate("/login");
      }
      setError("Failed to load profile data");
      throw error;
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios.get(`${apiURL}/projects`);
      if (response) {
        console.log("Projects data loaded:", response.data);
        setProjects(response.data);
      }
    } catch (error) {
      console.log("from admindashboard Error fetching projects: ", error);
      throw error;
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${apiURL}/profile`, profile);
      setProfile(res.data);
      alert("✅ Profile updated");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile");
    }
  };

  // Show loading component while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-light text-white mb-4">Loading Dashboard</h2>
          <p className="text-gray-400">Please wait...</p>
        </div>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-light text-white mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchAllData}
            className="px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-white rounded-lg hover:opacity-80 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold flex justify-center text-lime-500">
        Admin Dashboard
      </h1>

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-lime-400">Profile Status</h3>
          <p className="text-gray-300">
            {profile ? "✅ Profile loaded" : "❌ Profile not loaded"}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-lime-400">Projects Status</h3>
          <p className="text-gray-300">
            {projects.length > 0 ? `✅ ${projects.length} projects loaded` : "❌ No projects found"}
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">General Information</h2>

        {profile ? (
          <form
            onSubmit={handleProfileUpdate}
            className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-200 mb-1">Title:</p>
                <input
                  className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded"
                  value={profile.title}
                  onChange={(e) =>
                    setProfile({ ...profile, title: e.target.value })
                  }
                  placeholder="e.g. Full Stack Developer"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-200 mb-1">Email:</p>
                <input
                  className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  placeholder="e.g. your@email.com"
                />
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-200 mb-1">
                  CV Link:
                </p>
                <input
                  className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded"
                  value={profile.cvLink}
                  onChange={(e) =>
                    setProfile({ ...profile, cvLink: e.target.value })
                  }
                  placeholder="Paste your CV link or leave it empty"
                />
              </div>

              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-200 mb-1">Bio:</p>
                <textarea
                  className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Write a short bio about yourself"
                  rows="4"
                />
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-200">
                Social Media Links:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(profile.socialMedia || {}).map(
                  ([platform, url]) => (
                    <div key={platform}>
                      <p className="text-xs text-gray-400 mb-1 capitalize">
                        {platform}:
                      </p>
                      <input
                        className="w-full border border-gray-700 bg-gray-700 text-white p-2 rounded"
                        value={url}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialMedia: {
                              ...profile.socialMedia,
                              [platform]: e.target.value,
                            },
                          })
                        }
                        placeholder={`Enter your ${platform} link`}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded transition"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p className="text-red-400">Loading profile...</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upload CV</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <UploadCV />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <ProjectsManager />
        </div>
      </section>
    </div>
  );
}
