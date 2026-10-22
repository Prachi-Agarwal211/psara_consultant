import Image from "next/image";
import { CONTACT, type OfficeLocation } from "../../../lib/config";
import { Section } from "../../../components/v3/PagePrimitives";

type Props = { placeLabel: string; offices: OfficeLocation[]; isLocalOffice?: boolean };

export default function GbpOfficeSection({ placeLabel, offices, isLocalOffice = true }: Props) {
  if (!offices.length) return null;
  return (
    <Section tone="cream" className="v3-office overflow-hidden rounded-xl text-[#0B1E3B]">
          <div className="grid min-w-0 grid-cols-1">
            <div className="relative min-h-56">
              <Image src="/assets/images/graded/hq.webp" alt="Jaipur HQ" fill className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" />
              <span className="absolute left-4 top-4 rounded-full bg-[#E76F00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#0B1E3B]">Jaipur HQ · Visit Karo</span>
            </div>
            <div className="min-w-0 space-y-7 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B35400]">{isLocalOffice ? `Office in ${placeLabel}` : `Nearest desk for ${placeLabel}`}</p>
              {offices.map((o) => (
                <div key={o.city}>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-normal leading-tight">{o.placeName}</h3>
                  <p className="mt-2 text-sm text-[#33465F]">{o.address}, {o.pin}</p>
                  <p className="mt-2 text-sm font-medium">{o.phone} · {o.hours}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a data-v3-magnetic href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-[#0B1E3B] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#8A4300]">Google Maps</a>
                    <a data-v3-magnetic href={`tel:${o.phoneRaw}`} className="inline-flex min-h-11 items-center rounded-full bg-[#E76F00] px-4 py-2.5 text-xs font-bold text-[#0B1E3B] hover:brightness-110">Call</a>
                    <a data-v3-magnetic href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello, I need PSARA help in ${placeLabel}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-[#046A38] px-4 py-2 text-xs font-bold text-[#046A38] transition-colors hover:bg-[#046A38] hover:text-white">WhatsApp</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </Section>
  );
}
