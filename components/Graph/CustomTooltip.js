import React from "react";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const filteredPayload = payload.filter((element) => element.value > 0);
        const dateRange = payload[0].payload["date_range"];
        return (
            <div className="bg-white px-1 text-xs text-slate-600 rounded-sm font-mono">
                <table>
                    <thead>
                        <tr>
                            <td
                                className="text-center font-semibold"
                                colspan="2"
                            >
                                Sample: {dateRange}
                            </td>
                        </tr>
                        <tr>
                            <td>Variant</td>
                            <td className="text-right">Proportion</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayload.length ? (
                            filteredPayload
                                .sort((a, b) => {
                                    return b.value - a.value;
                                })
                                .map((element, idx) => {
                                    return (
                                        <tr
                                            key={idx}
                                            className="odd:bg-white even:bg-slate-100"
                                        >
                                            <td className="flex gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-sm self-center ml-2"
                                                    style={{
                                                        backgroundColor:
                                                            element.color,
                                                    }}
                                                ></div>
                                                <div className="flex-grow">
                                                    {element.dataKey
                                                        .split(" ")
                                                        .slice(0, 2)
                                                        .join(" ")}
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <div className="mr-2">
                                                    {Math.round(
                                                        element.value * 10000
                                                    ) / 10000}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                        ) : (
                            <tr>
                                <td>No submissions</td>
                            </tr>
                        )}
                    </tbody>
                    <div className="my-1"></div>
                </table>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
