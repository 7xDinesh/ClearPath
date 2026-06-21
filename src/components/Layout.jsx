import Header from './Header';
import Footer from './Footer';

/**
 * App shell layout wrapping all pages.
 */
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
