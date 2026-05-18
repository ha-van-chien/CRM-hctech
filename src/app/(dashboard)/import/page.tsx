"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';

export default function ImportPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert("Tải lên thành công! Dữ liệu đã được nhập.");
      router.push('/customers');
    }, 2000);
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
          <Icons.arrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Nhập dữ liệu khách hàng</h1>
          <p className="text-sm text-slate-500 mt-1">Nhập danh sách từ file CSV để thêm hàng loạt khách hàng.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 p-8">
        {!file ? (
          <div 
            className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-colors ${
              isDragging ? 'border-accent bg-amber-50' : 'border-slate-300 bg-slate-50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-slate-400 mb-4">
              <Icons.upload size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700">Kéo thả file CSV vào đây</h3>
            <p className="text-slate-500 mt-2 text-sm">hoặc click để chọn file từ máy tính</p>
            <input 
              type="file" 
              accept=".csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files) setFile(e.target.files[0]);
              }}
            />
          </div>
        ) : (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center animate-pop-in">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.fileText size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">{file.name}</h3>
            <p className="text-slate-500 mt-1 text-sm">Kích thước: {(file.size / 1024).toFixed(1)} KB</p>

            {uploading ? (
              <div className="mt-8">
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div className="bg-accent h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm font-semibold text-accent">Đang xử lý dữ liệu...</p>
              </div>
            ) : (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={() => setFile(null)} className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
                  Chọn file khác
                </button>
                <button onClick={handleUpload} className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-md">
                  Tiến hành nhập
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <Icons.alertCircle size={18} /> Lưu ý định dạng file
          </h4>
          <ul className="list-disc pl-5 text-sm text-blue-800 space-y-1">
            <li>File phải có định dạng .csv.</li>
            <li>Dòng đầu tiên phải là dòng tiêu đề (Header).</li>
            <li>Các cột bắt buộc: Tên khách hàng, Số điện thoại.</li>
            <li>Tải xuống <a href="#" className="font-bold underline text-blue-900">File mẫu tại đây</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
