import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";
import Link from "next/link";

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
                    . I&apos;m a university student living in Melbourne,
                    Australia. I built and maintain this website using data from
                    the{" "}
                    <a
                        href="https://www.gisaid.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GISAID Initiative
                    </a>
                    .
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
                    Covstrain is open-source, and accepting contributions via{" "}
                    <a
                        href="https://github.com/HRSAndrabi/covstrain"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    .
                </p>
                <h4>Acknowledgements</h4>
                <p>
                    This work is enabled by data from the{" "}
                    <a
                        href="https://www.gisaid.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GISAID Initiative
                    </a>
                    . We gratefully acknowledge all data contributors, i.e. the
                    Authors and their Originating laboratories responsible for
                    obtaining the specimens, and their Submitting laboratories
                    for generating the genetic sequence and metadata and sharing
                    via the GISAID Initiative, on which this research is based.
                </p>
                <h4>You may cite this work as:</h4>
                <div className="not-prose bg-slate-100 font-mono text-sm px-3 py-2">
                    Hassan R. S. Andrabi. 2022. &quot;Covstrain: Sequencing
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
