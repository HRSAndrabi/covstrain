import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";

export default function faq() {
    const faqList = [
        {
            question: <>How do I acknowledge this work?</>,
            answer: (
                <>
                    If you use screenshots of this work please credit CoVStrain
                    with a link back to the website. If you use the data or code
                    provided by this work, please include citations to CoVStrain
                    and GISAID. The recommended citation for CoVstrain is
                    provided below:
                    <div className="not-prose bg-slate-100 font-mono text-sm px-3 py-2 mt-5">
                        Hassan R. S. Andrabi. 2022. &quot;CoVstrain: Sequencing
                        Distributions of SARS-CoV-2 Mutations of Interest.&quot;
                        https://covstrain.com/
                    </div>
                </>
            ),
        },
        {
            question: <>How do I use this work?</>,
            answer: (
                <>
                    CoVStrain code and data is licensed under the{" "}
                    <a
                        href="https://www.gnu.org/licenses/gpl-3.0.en.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GNU General Public License
                    </a>
                    . Under this license, CoVStrain provides open access to all
                    data and code in the hope that it will be useful for
                    research, and enable the creation of new tools. Users are
                    free to use data and code in compliance with the terms set
                    out in the GNU General Public License.
                </>
            ),
        },
        {
            question: <>Where does the data come from?</>,
            answer: (
                <>
                    The data used to generate sequence visualisations are
                    sourced from{" "}
                    <a
                        href="https://www.gisaid.org/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GISAID
                    </a>
                    . We do not share raw GISAID data as per the GISAID{" "}
                    <a
                        href="https://www.gisaid.org/registration/terms-of-use/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        terms of use
                    </a>
                    , however the derived sequence proportions used to generate
                    the plots are available on{" "}
                    <a
                        href="https://github.com/HRSAndrabi/covstrain/tree/main/data/gisaid"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                </>
            ),
        },
        {
            question: <>How often is the website updated?</>,
            answer: (
                <>
                    The website is updated on a weekly basis with the latest
                    lineage assignments, using all available sequencing data on
                    GISAID at the point of retrieval.
                </>
            ),
        },
        {
            question: <>I&apos;ve found a bug, what should I do?</>,
            answer: (
                <>
                    You can try and fix it on your own by submitting a{" "}
                    <a
                        href="https://github.com/HRSAndrabi/covstrain/pulls"
                        target="_blank"
                        rel="noreferrer"
                    >
                        pull request
                    </a>
                    , or raise an{" "}
                    <a
                        href="https://github.com/HRSAndrabi/covstrain/issues"
                        target="_blank"
                        rel="noreferrer"
                    >
                        issue
                    </a>{" "}
                    pull and we will sort out as soon as possible.
                </>
            ),
        },
    ];

    return (
        <Container prose={true}>
            <h2>Frequently asked questions</h2>
            <p>
                The following are a list of FAQs related to CoVStrain data and
                software. If you can&apos;t find what you&apos;re looking for,{" "}
                <a href="mailto:hassan.andrabi@unimelb.edu.au">
                    send us an email
                </a>
                .
            </p>
            <ol>
                {faqList.map((element, idx) => {
                    return (
                        <li key={idx}>
                            <strong>{element.question}</strong>
                            <p>{element.answer}</p>
                        </li>
                    );
                })}
            </ol>
        </Container>
    );
}

faq.getLayout = function getLayout(page) {
    return <Layout title="FAQ">{page}</Layout>;
};
