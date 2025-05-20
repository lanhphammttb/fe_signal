"use client";
import { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";

export default function PurchasePage({ params }: { params: { id: string } }) {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const purchase = async () => {
    try {
      const res = await axios.post(api.purchase(+params.id), { buyer_address: address });
      setMessage(res.data.message || "Đã mua bản quyền");
    } catch {
      setMessage("Lỗi mua bản quyền");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Mua quyền sử dụng</h2>
      <input
        placeholder="Địa chỉ ví của bạn"
        className="w-full border p-2 mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={purchase}>
        Mua bản quyền
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
