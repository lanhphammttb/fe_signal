import Link from "next/link";
import { ArrowRightIcon, CheckBadgeIcon, DocumentTextIcon, CheckCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const cards = [
    {
      title: "Đăng ký bản quyền mới",
      description: "Tạo mới bản quyền kỹ thuật số của bạn",
      href: "/register",
      icon: DocumentTextIcon,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Danh sách bản quyền",
      description: "Xem các bản quyền",
      href: "/explore",
      icon: CheckBadgeIcon,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Tra cứu bản quyền",
      description: "Tìm kiếm và kiểm tra trạng thái bản quyền",
      href: "/search",
      icon: CheckCircleIcon,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Admin - Duyệt bản quyền",
      description: "Quản lý và duyệt các bản quyền chờ xét duyệt",
      href: "/moderate",
      icon: UserGroupIcon,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-900 text-center max-w-3xl">
        Hệ thống Quản lý Bản quyền Kỹ thuật số
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {cards.map(({ title, description, href, icon: Icon, color }) => (
          <Link
            key={title}
            href={href}
            className="group block rounded-xl p-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`inline-flex p-3 rounded-lg ${color} mb-4`}>
              <Icon className="h-8 w-8" />
            </div>
            <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <span className="inline-flex items-center text-blue-600 group-hover:underline font-medium">
              Xem thêm <ArrowRightIcon className="h-5 w-5 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
