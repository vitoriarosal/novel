import localFont from "next/font/local";
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // Certifique-se de ter seu CSS global importado

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layout-container">
          <main className="main-content">
            {children}
          </main>
          <footer className="custom-footer">
            © 2024 Seu Projeto - Todos os direitos reservados
          </footer>
        </div>
      </body>
    </html>
  );
}
