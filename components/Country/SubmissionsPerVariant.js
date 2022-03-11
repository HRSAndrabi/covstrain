import AreaGraph from "../Graph/AreaGraph";

function SubmissionsPerVariant({ plotData, countryData }) {
    return (
        <div>
            <h3>SARS-CoV-2 variant sequences</h3>
            <p>
                The graph below presents the distribution of SARS-CoV-2 variant
                sequences over time, disaggregated by variants of concern (VOC),
                and variants of interest (VOI). Untracked variants are
                classified under the &apos;Other&apos; category.
            </p>
            <div className="mt-3 mb-8">
                <div className="text-sm font-medium">
                    Figure 1: Distribution of SARS-CoV-2 Variant Sequences in{" "}
                    {countryData.name.common}
                </div>
                <AreaGraph data={plotData} />
            </div>
        </div>
    );
}

export default SubmissionsPerVariant;
