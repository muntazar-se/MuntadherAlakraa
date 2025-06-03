import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectsManager from "../components/ProjectsManager";
import UploadCV from "../components/UploadCV";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [techs, setTechs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Set auth header globally
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      if (response && response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.log("Error fetching profile:", error);
      if (error.response?.status === 401) {
        // Invalid or expired token
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/profile", profile);
      setProfile(res.data);
      alert("✅ Profile updated");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 space-y-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold flex justify-center text-lime-500">
        Admin Dashboard
      </h1>

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
