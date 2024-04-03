import "../styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lofi">
      <body>{children}</body>
    </html>
  );
}
