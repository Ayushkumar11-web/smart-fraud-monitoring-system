import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <div>

            <Navbar />

            <div
                className="d-flex"
                style={{
                    minHeight: "calc(100vh - 56px)"
                }}
            >

                <Sidebar />

                <main
                    className="flex-grow-1 p-4"
                    style={{
                        background: "#f8f9fa",
                        overflowX: "auto"
                    }}
                >
                    {children}
                </main>

            </div>

        </div>

    );

}

export default Layout;