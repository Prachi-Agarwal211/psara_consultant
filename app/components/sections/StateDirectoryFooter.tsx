import Link from "next/link";
import { STATES } from "@/data/states";
import { MapPin } from "lucide-react";

const REGION_GROUPS = [
  {
    name: "Northern States & UTs",
    slugs: ["delhi", "rajasthan", "haryana", "uttar-pradesh", "punjab", "himachal-pradesh", "jammu-and-kashmir", "uttarakhand", "chandigarh", "ladakh"],
  },
  {
    name: "Western & Central States",
    slugs: ["maharashtra", "gujarat", "madhya-pradesh", "chhattisgarh", "goa", "daman-and-diu", "dadra-and-nagar-haveli"],
  },
  {
    name: "Southern States & UTs",
    slugs: ["karnataka", "tamil-nadu", "telangana", "andhra-pradesh", "kerala", "puducherry", "lakshadweep"],
  },
  {
    name: "Eastern & North-Eastern States",
    slugs: ["west-bengal", "odisha", "bihar", "jharkhand", "assam", "meghalaya", "tripura", "manipur", "nagaland", "mizoram", "arunachal-pradesh", "sikkim", "andaman-and-nicobar"],
  },
];

export default function StateDirectoryFooter() {
  return (
    <div className="my-8 rounded-3xl border border-violet-200/15 bg-gradient-to-br from-[#2A1853] via-[#180D36] to-[#100A22] px-4 py-8 text-white shadow-xl sm:px-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#D4AF37]" /> Pan-India Statutory Directory
            </span>
            <h2 className="font-black text-lg sm:text-xl text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
              PSARA License Advisory across 36 States &amp; Union Territories
            </h2>
          </div>
          <Link
            href="/states"
            className="text-xs font-black text-[#D4AF37] hover:text-white transition-colors whitespace-nowrap"
          >
            Full Directory Index &rarr;
          </Link>
        </div>

        {/* Region directory stays readable on phones and resolves into four columns only when there is room. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {REGION_GROUPS.map((group) => {
            const groupStates = STATES.filter((s) => group.slugs.includes(s.slug));

            return (
              <div key={group.name} className="space-y-2">
                <span className="text-xs font-black text-[#D4AF37] block border-b border-white/10 pb-2 uppercase tracking-wider">
                  {group.name}
                </span>
                <ul className="space-y-1 text-xs text-slate-300">
                  {groupStates.map((st) => (
                    <li key={st.slug}>
                      <Link
                        href={`/states/${st.slug}`}
                        className="hover:text-white transition-colors flex items-center justify-between group min-h-[1.75rem] py-0.5"
                      >
                        <span className="font-medium">PSARA {st.name}</span>
                        <span className="text-[11px] text-slate-400 group-hover:text-[#D4AF37] font-mono">
                          {st.capital}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
