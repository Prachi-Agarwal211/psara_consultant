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
    <div className="border-t-2 border-[#C89B3C]/30 bg-gradient-to-b from-[#0A233F] via-[#0F3C65] to-[#07192C] py-12 px-[var(--gutter)] text-white rounded-3xl my-8 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/15 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FFF2BA] flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#C89B3C]" /> Pan-India Statutory Directory
            </span>
            <h2 className="font-black text-xl text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
              PSARA License Advisory across 36 States &amp; Union Territories
            </h2>
          </div>
          <Link
            href="/security-services"
            className="text-xs font-black text-[#FFF2BA] hover:text-white transition-colors whitespace-nowrap"
          >
            Full Directory Index &rarr;
          </Link>
        </div>

        {/* 4 Region Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {REGION_GROUPS.map((group) => {
            const groupStates = STATES.filter((s) => group.slugs.includes(s.slug));

            return (
              <div key={group.name} className="space-y-3">
                <span className="text-xs font-black text-[#FFF2BA] block border-b border-white/15 pb-2 uppercase tracking-wider">
                  {group.name}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {groupStates.map((st) => (
                    <li key={st.slug}>
                      <Link
                        href={`/states/${st.slug}`}
                        className="hover:text-[#FFF2BA] transition-colors flex items-center justify-between group min-h-[2rem] py-1"
                      >
                        <span className="font-medium">PSARA {st.name}</span>
                        <span className="text-xs text-slate-400 group-hover:text-[#FFF2BA] font-mono">
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
