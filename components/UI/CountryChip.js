import Link from "next/link";

export default function CountryChip({ country, disabled }) {
    return (
        <Link
            key={country.cca3}
            href={`/country/${country.cca3.toLowerCase()}`}
            passhref
        >
            <a
                className={`flex flex-grow gap-2 items-center rounded-lg p-3 cursor-pointer 
				font-mono text-sm hover:ring-slate-300 focus:outline-none 
				focus:ring-2 focus:ring-sky-500
				${
                    disabled
                        ? "bg-slate-100 text-slate-500 hover:text-slate-800"
                        : "bg-white text-slate-900 hover:text-sky-500"
                } 
				`}
            >
                {/* <Image
                    src={`https://countryflagsapi.com/png/${country.cca3}`}
                    alt="logo"
                    layout="intrinsic"
                    height="25"
                    width="30"
                /> */}
                {!disabled && <div className="text-2xl">{country.flag}</div>}
                <div>{country.name.common}</div>
            </a>
        </Link>
    );
}
