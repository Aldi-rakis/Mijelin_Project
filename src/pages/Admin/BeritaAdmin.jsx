import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import '../Admin/style.css';

const NewsEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value); // Konten yang dimasukkan ke editor
  };

  return (
    <div className="editor-container px-10 mt-5">

      <h2 className="text-2xl font-semibold mb-5">Panel Admin - Berita</h2>

      <div className="flex flex-row gap-8 mx-auto bg-white shadow-xl p-8 rounded-lg">

        {/* Text Editor */}
        <div className="flex-1 h-screen">
          <ReactQuill
            value={content}
            onChange={handleChange}
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
            style={{ height: '500px', maxWidth: '100%' }} // Lebar penuh dan tinggi ditingkatkan
          />
        </div>

        {/* Content Preview */}
        <div className="w-[500px] p-4 bg-slate-100 rounded-lg overflow-auto">
          <h3 className="text-xl font-semibold mb-3">Konten yang Dikirim:</h3>
          <div
            className="content-preview"
            style={{
              maxWidth: '100%',
              wordWrap: 'break-word', // Membuat teks otomatis turun ke bawah
              whiteSpace: 'pre-wrap' // Menjaga spasi dan line-break
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

      </div>
    </div>
  );
};

export default NewsEditor;
