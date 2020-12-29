import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
