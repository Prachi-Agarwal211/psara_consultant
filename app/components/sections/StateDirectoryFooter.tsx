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
    <div className="border-t border-white/10 bg-[var(--void-2)] py-12 px-[var(--gutter)] text-white">
      <div className="max-w-[var(--page-max)] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold-bright)] flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Pan-India Statutory Directory
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mt-1">
              PSARA License Advisory across 36 States &amp; Union Territories
            </h3>
          </div>
          <Link
            href="/security-services"
            className="text-xs font-bold text-[var(--gold-bright)] hover:underline whitespace-nowrap"
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
                <span className="text-xs font-bold text-white block border-b border-white/10 pb-2">
                  {group.name}
                </span>
                <ul className="space-y-1.5 text-xs text-[var(--white-70)]">
                  {groupStates.map((st) => (
                    <li key={st.slug}>
                      <Link
                        href={`/states/${st.slug}`}
                        className="hover:text-[var(--gold-bright)] transition-colors flex items-center justify-between group min-h-[2rem] py-1"
                      >
                        <span>PSARA {st.name}</span>
                        <span className="text-xs text-[var(--white-55)] group-hover:text-[var(--gold-bright)] font-mono">
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
