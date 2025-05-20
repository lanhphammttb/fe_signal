"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import Link from "next/link";

type PublicRecord = {
  id: number;
  title: string;
  description: string;
  approved: boolean;
};

export default function ExplorePage() {
  const [records, setRecords] = useState<PublicRecord[]>([]);

  useEffect(() => {
    axios.get(api.publicRecords).then((res) => {
      setRecords(res.data);
    });
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Bản quyền</h2>
      <ul className="space-y-3">
        {records.map((r) => (
          <li key={r.id}>
            <Link href={`/record/${r.id}`}>
              <div className="border p-4 rounded hover:bg-gray-100 cursor-pointer transition">
                <p className="font-semibold">{r.title}</p>
                <p>{r.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
