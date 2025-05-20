"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import { RecordDetail } from "@/app/types";
export default function RecordDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<RecordDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const id = params?.id;
  useEffect(() => {
    if (!id) return;
    axios
      .get(api.record(+id))
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("Bản ghi không tồn tại.");
        } else {
          setError("Lỗi khi tải dữ liệu.");
        }
      });
  }, [id]);

  if (error) return <p className="text-red-600 text-center p-8">{error}</p>;
  if (!data) return <p className="text-center p-8">Loading...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p>{data.description}</p>
      <p className="mt-2">
        ✅ Trạng thái:{" "}
        <span className={data.approved ? "text-green-600" : "text-yellow-600"}>
          {data.approved ? "Đã duyệt" : "Chờ duyệt"}
        </span>
      </p>
      <p className="mt-2">📦 Chủ sở hữu: {data.owner_address || "Chưa có"}</p>
      <p className="mt-2">🔗 TX Hash: {data.blockchain_tx_hash || "Chưa ghi blockchain"}</p>
    </div>
  );
}
