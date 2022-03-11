import LineGraph from "../Graph/LineGraph";

function SubmissionsPerAaSubstitution({ plotData, countryData }) {
    return (
        <div>
            <h3>SARS-CoV-2 amino acid mutations</h3>
            <p>
                As the pandemic progresses, existing strains of SARS-CoV-2 are
                periodically modified by nucleotide mutations. Some of these
                result in amino acid replacements in viral proteins, while
                others extend or shorten amino acid sequence lengths. The graph
                below presents changes in the observed mix of amino acid
                sequences in samples of SARS-CoV-2 over time. Tracking, and
                understanding these changes could help improve antiviral drug
                and vaccine effectiveness.
            </p>
            <div className="mt-3 mb-8">
                <div className="text-sm font-medium">
                    Figure 2: Distribution of SARS-CoV-2 Amino Acid Mutations in{" "}
                    {countryData.name.common}
                </div>
                <LineGraph data={plotData} />
            </div>
        </div>
    );
}

export default SubmissionsPerAaSubstitution;
