import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import axios from 'axios';
import '../Admin/style.css';

const NewsEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [date, setDate] = useState('');

  const handleContentChange = (value) => {
    setContent(value); // Konten yang dimasukkan ke editor
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('date', date);
    formData.append('content', content);

    try {
      const response = await axios.post('http://localhost:8000/api/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Berita berhasil dikirim!');
      console.log(response.data);
    } catch (error) {
      console.error('Error mengirim berita:', error);
      alert('Terjadi kesalahan saat mengirim berita.');
    }
  };

  return (
    <div className="editor-container px-10 mt-5">
      <h2 className="text-2xl font-semibold mb-5">Panel Admin - Berita</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white shadow-xl p-8 rounded-lg">

        {/* Input untuk Judul Berita */}
        <label className="block">
          <span className="text-gray-700">Judul Berita</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Input untuk Tanggal */}
        <label className="block">
          <span className="text-gray-700">Tanggal</span>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        {/* Input untuk Gambar */}
        <label className="block">
          <span className="text-gray-700">Gambar</span>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={handleImageChange}
            required
          />
        </label>

        {/* Editor Konten */}
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline'],
              [{ 'align': [] }],
              ['link', 'image'],
              ['blockquote', 'code-block'],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              ['clean'] // Tombol untuk menghapus format
            ]
          }}
          style={{ height: '400px', maxWidth: '100%' }}
        />

        {/* Tombol Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Kirim Berita
        </button>
      </form>
    </div>
  );
};

export default NewsEditor;
