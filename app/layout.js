import "../styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lofi">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <body>{children}</body>
    </html>
  );
}
