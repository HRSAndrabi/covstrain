export default function LineageChip({ lineage, disabled, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-grow gap-2 items-center rounded-lg p-3 cursor-pointer 
				font-mono text-sm hover:ring-slate-300 focus:outline-none 
				focus:ring-2 focus:ring-sky-500 no-underline
				${
                    disabled
                        ? "bg-slate-100 text-slate-500 hover:text-slate-800"
                        : "bg-white text-slate-900 hover:text-sky-500"
                } 
				`}
        >
            <div>{lineage}</div>
        </button>
    );
}
