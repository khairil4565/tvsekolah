import "./globals.css";

export const metadata = {
  title: "TV Sekolah Dashboard",
  description: "Paparan dashboard TV sekolah untuk pengumuman dan waktu solat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}
