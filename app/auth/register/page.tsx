"use client";
import React, { useState } from "react";
import axios from "axios";
import { api } from "@/lib/api";
import {
  UserIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

interface RegisterForm {
  username: string;
  password: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDownloadPrivateKey = () => {
    if (!privateKey) return;
    const blob = new Blob([privateKey], { type: "application/x-pem-file" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.username}_private_key.pem`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrivateKey(null);

    try {
      const res = await axios.post(api.registerUser, form);
      setPrivateKey(res.data.private_key);
      alert("Đăng ký thành công! Private key sẽ được tải về hoặc hiển thị.");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">
        Đăng ký tài khoản
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-1 font-medium text-gray-700 flex items-center gap-2"
          >
            <UserIcon className="h-5 w-5 text-indigo-500" />
            Tên đăng nhập
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 font-medium text-gray-700 flex items-center gap-2"
          >
            <LockClosedIcon className="h-5 w-5 text-indigo-500" />
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập mật khẩu"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <a
          href="/auth/login"
          className="text-indigo-600 hover:underline font-medium"
        >
          Đăng nhập ngay
        </a>
      </p>

      {/* Error message */}
      {error && (
        <p className="mt-4 text-red-600 flex items-center gap-2 font-medium">
          <ExclamationCircleIcon className="h-5 w-5" />
          {error}
        </p>
      )}

      {/* Private key */}
      {privateKey && (
        <div className="mt-6 p-4 bg-gray-50 border border-indigo-300 rounded-md">
          <h3 className="text-indigo-700 font-semibold mb-2 flex items-center gap-2">
            Private Key của bạn
            <ArrowDownTrayIcon
              className="h-5 w-5 cursor-pointer hover:text-indigo-900"
              onClick={handleDownloadPrivateKey}
            />
          </h3>
          <pre
            className="bg-white p-3 rounded-md text-xs overflow-x-auto whitespace-pre-wrap break-all font-mono text-gray-800"
            style={{ maxHeight: "200px" }}
          >
            {privateKey}
          </pre>
          <p className="mt-2 text-sm text-gray-600">
            Lưu private key này cẩn thận. Nếu mất bạn sẽ không thể ký số hoặc
            đăng nhập bằng chữ ký số.
          </p>
          <button
            onClick={handleDownloadPrivateKey}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Tải private key (.pem)
          </button>
        </div>
      )}
    </div>
  );
}
