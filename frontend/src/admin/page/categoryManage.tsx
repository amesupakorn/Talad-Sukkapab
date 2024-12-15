/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]); // สำหรับเก็บรายการ Category
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false); // ใช้ตรวจสอบว่ากำลังแก้ไขหรือสร้างใหม่
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      if (editMode && currentCategoryId) {
        // Update existing category
        await axios.put(`/api/categories/${currentCategoryId}`, formDataToSend);
        alert("Category updated successfully");
      } else {
        // Create new category
        await axios.post("/api/categories", formDataToSend);
        alert("Category created successfully");
      }
      setFormData({ name: "", description: "", image: null });
      setEditMode(false);
      setCurrentCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to submit category:", error);
      alert("Failed to save category");
    }
  };

  const handleEdit = (category: any) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: null,
    });
    setEditMode(true);
    setCurrentCategoryId(category.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/api/categories/${id}`);
        alert("Category deleted successfully");
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category:", error);
        alert("Failed to delete category");
      }
    }
  };

  return (
    <div>
      <h1>Category Management</h1>
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit">{editMode ? "Update Category" : "Create Category"}</button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setFormData({ name: "", description: "", image: null });
              setEditMode(false);
              setCurrentCategoryId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Category List */}
      <h2>Category List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {categories.map((category: any) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(category)}>Edit</button>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManage;