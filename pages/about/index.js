import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";

export default function About() {
    return (
        <Container prose={true}>
            <h2>About</h2>
            <p className="flex flex-col gap-3">
                <div>
                    CoVstrain uses{" "}
                    <a
                        href="https://www.gisaid.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        global genomic sequencing data
                    </a>{" "}
                    on SARS-CoV-2 mutations of interest to visualise mutation
                    distribution and life cycles over time, and around the
                    world.
                </div>
                <div>
                    CoVstrain is built and maintained by{" "}
                    <a
                        href="https://twitter.com/hrs_andrabi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Hassan Andrabi
                    </a>
                    , as part of an open-source initiative by the{" "}
                    <a
                        href="https://populationinterventions.science.unimelb.edu.au/#welcome"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Population Interventions Unit
                    </a>
                    , University of Melbourne, School of Population and Global
                    Health. CoVstrain is accepting contributions via{" "}
                    <a
                        href="https://github.com/HRSAndrabi/covstrain"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    .
                </div>
                <div>
                    If you want to get in touch about this work, you can{" "}
                    <a href="mailto:hassan.andrabi@unimelb.edu.au">email us</a>{" "}
                    or reach out via{" "}
                    <a
                        href="https://twitter.com/hrs_andrabi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Twitter
                    </a>
                    .
                </div>
            </p>

            <h4>You may cite this work as:</h4>
            <div className="not-prose bg-slate-100 font-mono text-sm px-3 py-2">
                Hassan R. S. Andrabi. 2022. &quot;CoVstrain: Sequencing
                Distributions of SARS-CoV-2 Mutations of Interest.&quot;
                https://covstrain.com/
            </div>
        </Container>
    );
}

About.getLayout = function getLayout(page) {
    return <Layout title="About">{page}</Layout>;
};
