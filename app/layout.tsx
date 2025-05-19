import "./globals.css";

export const metadata = {
  title: 'Hệ Thống Bản Quyền Số',
  description: 'Quản lý đăng ký, kiểm duyệt, mua bán bản quyền số',
};

export default function RootLayout({ children  }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
        <header style={{ backgroundColor: '#222', padding: 20, color: 'white' }}>
          <h1>Hệ Thống Bản Quyền Số</h1>
        </header>
        <main style={{ maxWidth: 800, margin: '20px auto' }}>{children}</main>
        <footer style={{ padding: 10, textAlign: 'center', color: '#888' }}>
          © 2025 Bản Quyền Số
        </footer>
      </body>
    </html>
  );
}

