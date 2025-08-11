import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill stylesheet
import axios from "axios";
import "../berita/style.css";
import Layoutadmin from '../../../layouts/Admin';
import { Link } from "react-router-dom";



const Create = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [date, setDate] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Untuk preview gambar

  const handleContentChange = (value) => setContent(value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("date", date);
    formData.append("content", content);

    try {
      const response = await axios.post(
        "https://api-mijelin.rakis.my.id/api/news",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Berita berhasil dikirim!");
      console.log(response.data);
    } catch (error) {
      console.error("Error mengirim berita:", error);
      alert("Terjadi kesalahan saat mengirim berita.");
    }
  };

  return (
      <div className="flex md:flex-row flex-col w-full h-full overflow-hidden">
        {/* Editor Section */}
        <div className="w-full max-md:w-2/3 h-[550px] overflow-auto p-4 bg-gray-50">
  <h2 className="text-xl font-semibold mb-2">Panel Admin - Berita</h2>
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 bg-white shadow-md p-4 rounded-lg"
  >
    <label>
      <span className="text-gray-700 font-medium">Judul Berita</span>
      <input
        type="text"
        className="block w-full rounded-md border-gray-300 shadow-sm break-words"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </label>
    <label>
      <span className="text-gray-700 font-medium">Tanggal</span>
      <input
        type="date"
        className="block w-full rounded-md border-gray-300 shadow-sm"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
    </label>
    <label>
      <span className="text-gray-700 font-medium">Gambar</span>
      <input
        type="file"
        accept="image/*"
        className="block w-full"
        onChange={handleImageChange}
        required
      />
    </label>
    <label>
      <span className="text-gray-700 font-medium">Konten</span>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ align: [] }],
            ["link", "image"],
            ["blockquote", "code-block"],
            [{ indent: "-1" }, { indent: "+1" }],
            ["clean"],
          ],
        }}
        style={{
          height: "300px",
          width: "100%",
          marginBottom: "30px",
          wordWrap: "break-word",
        }}
      />
    </label>
    <button
      type="submit"
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
    >
      Kirim Berita
    </button>
  </form>
</div>


        {/* Preview Section */}
        <div className="content-preview w-full md:w-1/3 h-full max-w-[400px] overflow-auto bg-green-50 mt-2 mx-4 p-4 shadow-inner">
  <h3 className="text-lg font-semibold mb-4">Preview Berita</h3>
  <div className="mb-4">
    <h4 className="text-lg font-bold">{title || "Judul Berita"}</h4>
    <p className="text-sm text-gray-500">{date || "Tanggal"}</p>
  </div>
  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className="w-full h-40 object-cover rounded-lg mb-4"
    />
  )}
  <div
    className="prose max-w-none overflow-hidden text-ellipsis break-words"
    dangerouslySetInnerHTML={{ __html: content || "Konten berita..." }}
  />
</div>

      </div>
  );
};

export default Create;
