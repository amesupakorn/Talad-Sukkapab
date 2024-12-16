import React, { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null; // URL ของภาพ (อาจเป็น null ถ้าไม่มีภาพ)
}

interface FormDataState {
  name: string;
  description: string;
  image: File | null; // ไฟล์ที่อัปโหลด
}

const CategoryManage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // ประเภทข้อมูลที่ชัดเจน
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

  const API_URL = "http://localhost:5001"; // แก้ไขให้ตรงกับ backend ของคุณ

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        await axios.put(`${API_URL}/category/${currentCategoryId}`, formDataToSend);
        alert("Category updated successfully");
      } else {
        // Create new category
        await axios.post(`${API_URL}/category`, formDataToSend);
        alert("Category created successfully");
      }
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Failed to submit category:", error);
      alert("Failed to save category");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", image: null });
    setEditMode(false);
    setCurrentCategoryId(null);
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: null, // Reset image field as it won't be re-uploaded
    });
    setEditMode(true);
    setCurrentCategoryId(category.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_URL}/category/${id}`);
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
          <button type="button" onClick={resetForm}>
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
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {category.image ? (
                  <img
                    src={`${API_URL}${category.image}`}
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