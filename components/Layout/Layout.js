import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <>
            {!(props.minimal || false) && <Header />}
            <div className="min-h-screen flex flex-col">
                <main
                    className={`${
                        !(props.minimal || false)
                            ? "pt-16"
                            : "flex justify-center items-center"
                    } flex-grow`}
                >
                    {props.children}
                </main>
                {!(props.minimal || false) && <Footer />}
            </div>
        </>
    );
};

export default Layout;
