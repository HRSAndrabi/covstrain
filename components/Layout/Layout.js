import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout(props) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <title>Covstrain{props.title ? ` - ${props.title}` : ""}</title>
                <meta
                    name="title"
                    content={`Covstrain${
                        props.title ? ` - ${props.title}` : ""
                    }`}
                />
                <meta
                    name="description"
                    content="An interactive tool using global SARS-CoV-2 genomic sequencing data to visualise mutations of interest around the world."
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.covstrain.com/" />
                <meta
                    property="og:title"
                    content={`Covstrain${
                        props.title ? ` - ${props.title}` : ""
                    }`}
                />
                <meta
                    property="og:description"
                    content="An interactive tool using global SARS-CoV-2 genomic sequencing data to visualise mutations of interest around the world."
                />
                <meta
                    property="og:image"
                    content="https://www.covstrain.com/og-image-3.png"
                />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://metatags.io/" />
                <meta
                    property="twitter:title"
                    content={`Covstrain${
                        props.title ? ` - ${props.title}` : ""
                    }`}
                />
                <meta
                    property="twitter:description"
                    content="An interactive tool using global SARS-CoV-2 genomic sequencing data to visualise mutations of interest around the world."
                />
                <meta
                    property="twitter:image"
                    content="https://www.covstrain.com/og-image-3.png"
                />
            </Head>
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
}
