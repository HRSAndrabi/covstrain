import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";

export default function About() {
    return (
        <Container>
            <div className="prose prose-slate mx-auto mb-10">
                <h2>Acknowledgements</h2>
                <h4>SARS-CoV-2 sequencing data</h4>
                <p>
                    All genomic sequenecing data is sourced from the{" "}
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
                    via the GISAID Initiative<sup>1</sup>, on which this
                    research is based.
                </p>
                <div className="not-prose bg-slate-100 font-mono text-sm px-3 py-2">
                    1. Elbe, S., and Buckland-Merrett, G. (2017) Data, disease
                    and diplomacy: GISAID’s innovative contribution to global
                    health. Global Challenges, 1:33-46. DOI:
                    10.1002/gch2.1018PMCID: 31565258
                </div>
                <h4>Country data</h4>
                <p>
                    World country data, including region data, country name
                    translations, flags, and{" "}
                    <a
                        href="https://en.wikipedia.org/wiki/ISO_3166-1"
                        target="_blank"
                        rel="noreferrer"
                    >
                        ISO Standard 3166-1
                    </a>{" "}
                    codes, are sourced from{" "}
                    <a
                        href="https://github.com/mledoze/countries"
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://github.com/mledoze/countries
                    </a>
                    .
                </p>
            </div>
        </Container>
    );
}

About.getLayout = function getLayout(page) {
    return <Layout title="About">{page}</Layout>;
};
