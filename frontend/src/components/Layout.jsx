import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ title, children }) {
  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Navbar title={title} />

        {children}
      </div>
    </>
  );
}

export default Layout;