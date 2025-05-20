"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";

type Item = { id: number; title: string; description: string };

export default function ModeratePage() {
  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    axios.get(api.moderateList).then((res) => setList(res.data));
  }, []);

  const approve = async (id: number) => {
    await axios.post(api.approve(id));
    setList((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chờ duyệt</h2>
      <ul className="space-y-3">
        {list.map((item) => (
          <li key={item.id} className="border p-4 rounded">
            <p className="font-semibold">{item.title}</p>
            <p>{item.description}</p>
            <button
              onClick={() => approve(item.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Duyệt
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
