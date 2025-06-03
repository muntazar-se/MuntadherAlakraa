import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    liveLink: "",
    githubLink: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const startEdit = (project) => {
    setEditingProjectId(project._id);
    setFormData({
      name: project.name || "",
      description: project.description || "",
      image: project.image || "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
    });
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      liveLink: "",
      githubLink: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/projects/${editingProjectId}`, formData);
      setProjects((prev) =>
        prev.map((p) => (p._id === editingProjectId ? res.data : p))
      );
      cancelEdit();
      alert("Project updated successfully");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update project");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      if (editingProjectId === id) cancelEdit();
      alert("Project deleted");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="mt-12 p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700 pb-6"
            >
              {editingProjectId === project._id ? (
                // Edit form
                <form
                  onSubmit={handleUpdate}
                  className="flex flex-col md:flex-row md:items-start md:space-x-6 w-full"
                >
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Project Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                    <input
                      type="text"
                      name="image"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                    {/* Image preview */}
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-40 h-24 object-cover rounded mt-1 shadow-md"
                      />
                    )}
                    <input
                      type="text"
                      name="liveLink"
                      placeholder="Live Link URL"
                      value={formData.liveLink}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                    <input
                      type="text"
                      name="githubLink"
                      placeholder="GitHub Link URL"
                      value={formData.githubLink}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded font-semibold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // Display project info
                <>
                  <div className="flex-1 mb-4 md:mb-0">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-40 h-24 object-cover rounded mb-2 shadow-md"
                      />
                    )}
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-1 text-gray-300">{project.description}</p>
                    <div className="flex space-x-4 mt-2 text-blue-400 text-sm">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-blue-600"
                        >
                          Live
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="underline hover:text-blue-600"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(project)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
