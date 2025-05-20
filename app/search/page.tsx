"use client";

import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";

type RecordDetail = {
  id: number;
  title: string;
  description: string;
  approved: boolean;
  owner_address: string;
  blockchain_tx_hash: string | null;
};

export default function HomePage() {
  const [id, setId] = useState("");
  const [record, setRecord] = useState<RecordDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchRecord(searchId: string) {
    setLoading(true);
    setError(null);
    setRecord(null);

    try {
      const res = await axios.get(api.record(+searchId));
      setRecord(res.data);
    } catch {
      setError("Không tìm thấy bản quyền");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = id.trim();
    if (!trimmed || !/^\d+$/.test(trimmed)) {
      setError("Vui lòng nhập số ID hợp lệ");
      setRecord(null);
      return;
    }

    fetchRecord(trimmed);
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="flex mb-6">
        <input
          type="text"
          placeholder="Nhập ID bản quyền"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 rounded-r hover:bg-blue-700 transition"
        >
          Tìm
        </button>
      </form>

      {loading && <p>Đang tải dữ liệu...</p>}

      {error && <p className="text-red-600">{error}</p>}

      {record && (
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{record.title}</h2>
          <p>{record.description}</p>
          <p className="mt-2">
            Trạng thái:{" "}
            <span className={record.approved ? "text-green-600" : "text-yellow-600"}>
              {record.approved ? "Đã duyệt" : "Chờ duyệt"}
            </span>
          </p>
          <p>Chủ sở hữu: {record.owner_address || "Chưa có"}</p>
          <p>TX Hash: {record.blockchain_tx_hash || "Chưa ghi blockchain"}</p>
        </div>
      )}
    </div>
  );
}
