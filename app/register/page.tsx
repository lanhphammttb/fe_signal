"use client";
import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";

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

export default function Register() {
  const [result, setResult] = useState<CopyrightResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Thường nếu input file có name="file" thì không cần append thêm,
    // nhưng nếu bạn giữ riêng file state thì append vẫn ok
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(api.register, formData, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });
      setResult(res.data); // cập nhật kết quả trả về từ API
    } catch (err: any) {
      console.error("Đăng ký thất bại:", err);
      // backend FastAPI trả lỗi trong 'detail' chứ không phải 'message'
      setError(err.response?.data?.detail || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Đăng ký bản quyền</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Tiêu đề"
          className="w-full border p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Mô tả"
          className="w-full border p-2"
          required
        />
        <input
          name="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang gửi..." : "Đăng ký"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-bold">Thông tin bản quyền:</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
