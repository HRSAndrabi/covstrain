import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";

export default function About() {
    return (
        <Container>
            <div className="prose prose-slate mx-auto mb-10">
                <h2>About</h2>
                <p>
                    Hello 👋 I&apos;m{" "}
                    <a href="https://twitter.com/hrs_andrabi" target="blank">
                        Hassan
                    </a>
                    . I built and maintain CoVstrain using data from the{" "}
                    <a
                        href="https://www.gisaid.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GISAID Initiative
                    </a>
                    . CoVstrain uses global genomic sequencing data on
                    SARS-CoV-2 mutations of interest to visualise mutation
                    distribution and life cycles over time, and around the
                    world.
                </p>
                <p>
                    If you want to get in touch about this work, you can contact
                    me on{" "}
                    <a
                        href="https://twitter.com/hrs_andrabi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                    , or reach out via{" "}
                    <a href="mailto:hassan.andrabi@unimelb.edu.au">email</a>.
                    CoVstrain is open-source, and accepting contributions via{" "}
                    <a
                        href="https://github.com/HRSAndrabi/covstrain"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </p>
                <h4>You may cite this work as:</h4>
                <div className="not-prose bg-slate-100 font-mono text-sm px-3 py-2">
                    Hassan R. S. Andrabi. 2022. &quot;CoVstrain: Sequencing
                    Distributions of SARS-CoV-2 Mutations of Interest.&quot;
                    https://covstrain.com/
                </div>
            </div>
        </Container>
    );
}

About.getLayout = function getLayout(page) {
    return <Layout title="About">{page}</Layout>;
};
