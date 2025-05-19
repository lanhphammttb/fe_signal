"use client";
import { useState } from "react";
import axios from "axios";

type CopyrightResult = {
  id: string;
  title: string;
  description: string;
  file_hash: string;
  signature: string;
  file_path: string;
  blockchain_tx_hash: string | null;
  created_at: string;
};

export default function Home() {
  const [result, setResult] = useState<CopyrightResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:8000/register", formData);
      setResult(res.data); // FIX
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      setError("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Đăng ký bản quyền</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Tiêu đề" className="w-full border p-2" required />
        <textarea name="description" placeholder="Mô tả" className="w-full border p-2" required />
        <input name="file" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Đang gửi..." : "Đăng ký"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-bold">Thông tin bản quyền:</h2>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
