import "../styles/globals.css";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const tagManagerArgs = {
        gtmId: "G-Q69JNTWRR3",
    };

    const getLayout = Component.getLayout || ((page) => page);

    useEffect(() => {
        TagManager.initialize(tagManagerArgs);
    }, []);

    return getLayout(<Component {...pageProps} />);
}

export default MyApp;
