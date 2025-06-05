import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminBlog from "../Blog/adminBlog";

const JSON_BIN_ID = "684191cb8561e97a501ff2ad"; // Replace with your JSONBin ID
const API_KEY = "$2a$10$M/z2e.cKX1SUsOT62D4pk.gbhiuJhRx0u3VzNAe.DsTPIHHAQE6Zu"; // Replace with your JSONBin API Key
const BASE_URL = `https://api.jsonbin.io/v3/b/${JSON_BIN_ID}`;

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dx90y9zdx/upload`;
const UPLOAD_PRESET = "adorethebrand"; // Replace with your Cloudinary preset

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: "male" | "female" | "unisex";
  sizes: string[];
  onSale?: boolean;
  originalPrice?: number;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    description: "",
    images: [],
    category: "unisex",
    sizes: [],
    onSale: false,
    originalPrice: 0,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: { "X-Master-Key": API_KEY },
      });
      setProducts(response.data.record.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images ? prev.images.filter((_, i) => i !== index) : [],
    }));
  };
  

  const updateProducts = async (updatedProducts: Product[]) => {
    setLoading(true);
    try {
      await axios.put(
        BASE_URL,
        { products: updatedProducts },
        { headers: { "X-Master-Key": API_KEY, "Content-Type": "application/json" } }
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    await updateProducts(updatedProducts);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), response.data.secure_url],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description || formData.images?.length === 0) {
      alert("All fields are required!");
      return;
    }

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name as string,
      price: Number(formData.price),
      description: formData.description as string,
      images: formData.images as string[],
      category: formData.category as "male" | "female" | "unisex",
      sizes: formData.sizes as string[],
      onSale: formData.onSale,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
    };

    const updatedProducts = editingProduct
      ? products.map((p) => (p.id === editingProduct.id ? newProduct : p))
      : [...products, newProduct];

    await updateProducts(updatedProducts);
    setEditingProduct(null);
    setFormData({ name: "", price: 0, description: "", images: [], category: "unisex", sizes: [], onSale: false });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-4">Admin Panel</h2>


      <div className="mt-4 flex justify-center">
                    <Link
                      to={`/shop`}
                      className="px-4 py-2 bg-gray-800 text-white  hover:bg-gray-600 mb-8"
                    >
                      View Shop
                    </Link>
                  </div>

      {loading && <p className="text-center text-red-500">Updating...</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <label htmlFor="" className="font-bold">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <label htmlFor="" className="font-bold ">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <label htmlFor="" className="font-bold">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full p-2 border rounded" />

        <p className="text-red-800 text-[13px] text-center">"Make sure your images displays before adding product and upload one after the other"</p>
        {formData.images && formData.images.length > 0 && (
  <div className="flex space-x-2">
    {formData.images.map((img, index) => (
      <div key={index} className="relative">
        <img src={img} alt="Preview" className="w-16 h-16 object-cover rounded" />
        <button
          type="button"
          onClick={() => handleDeleteImage(index)}
          className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}


{/* 
        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select> */}

        
        <input type="checkbox" name="onSale" checked={formData.onSale} onChange={handleInputChange} /> Out Of Stock?
        <br /> <br /> <button type="submit" className="px-4 py-2 bg-black text-white ">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded bg-gray-100 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(product)} className="px-4 py-2 bg-green-500 text-white rounded">Edit</button>
              <button onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <AdminBlog/>
    </>
  );
};

export default Admin;
