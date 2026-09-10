import Image from "next/image";
import { CONTACT, type OfficeLocation } from "../../../lib/config";
import Reveal from "../ui/Reveal";

type Props = { placeLabel: string; offices: OfficeLocation[]; isLocalOffice?: boolean };

export default function GbpOfficeSection({ placeLabel, offices, isLocalOffice = true }: Props) {
  if (!offices.length) return null;
  return (
    <section className="bg-white py-14 text-[#0B1E3B]" aria-label={`Office for ${placeLabel}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal variant="scale">
        <div className="card-lift overflow-hidden rounded-3xl border border-[#E8DFC8]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-64">
              <Image src="/assets/images/generated/hero-poster.webp" alt="Jaipur HQ" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              <span className="absolute left-4 top-4 rounded-full bg-[#E76F00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#0B1E3B]">Jaipur HQ · Visit Karo</span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B35400]">{isLocalOffice ? `Office in ${placeLabel}` : `Nearest desk for ${placeLabel}`}</p>
              {offices.map((o) => (
                <div key={o.city}>
                  <h3 className="mt-2 text-2xl font-black">{o.placeName}</h3>
                  <p className="mt-2 text-sm text-[#33465F]">{o.address}, {o.pin}</p>
                  <p className="mt-1 font-black">{o.phone} · {o.hours}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#0B1E3B] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-white hover:bg-[#E76F00]">Google Maps</a>
                    <a href={`tel:${o.phoneRaw}`} className="rounded-lg bg-[#E76F00] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-[#0B1E3B] hover:brightness-110">Call</a>
                    <a href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello, I need PSARA help in ${placeLabel}.`)}`} target="_blank" rel="noopener noreferrer" className="rounded-lg border-2 border-[#046A38] px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-[#046A38] hover:bg-[#046A38] hover:text-white">WhatsApp</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
