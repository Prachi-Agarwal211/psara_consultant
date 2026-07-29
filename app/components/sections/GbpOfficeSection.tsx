import { CONTACT, type OfficeLocation } from "../../../lib/config";

type Props = {
  placeLabel: string;
  offices: OfficeLocation[];
  isLocalOffice?: boolean;
};

export default function GbpOfficeSection({ placeLabel, offices, isLocalOffice = true }: Props) {
  if (!offices.length) return null;

  return (
    <section
      className="mt-10 border border-[var(--line-gold)] p-5"
      aria-label={`PSARA Consultant office for ${placeLabel}`}
    >
      <p className="label-meta font-bold text-[var(--gold)]">
        {isLocalOffice
          ? `PSARA Consultant India — Office in ${placeLabel}`
          : `PSARA Consultant India — Nearest desk for ${placeLabel}`}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--cream-dim)]">
        {isLocalOffice
          ? `Visit our office in ${placeLabel} for PSARA consultation.`
          : `We serve ${placeLabel} from our nearest desk. Visit us or call for PSARA guidance.`}
      </p>

      {offices.map((office) => (
        <div key={office.city} className="mt-4">
          <div className="aspect-video w-full overflow-hidden border border-[var(--line)]">
            <iframe
              title={office.placeName}
              src={office.mapEmbed}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-3">
            <p className="font-bold text-[var(--cream)]">{office.placeName}</p>
            <p className="text-sm font-semibold text-[var(--cream-dim)]">
              {office.address}, {office.pin}
            </p>
            <p className="text-sm font-bold text-[var(--cream)]">{office.phone}</p>
            <p className="text-xs font-medium text-[var(--cream-dim)]">{office.hours}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[var(--gold-soft)] underline"
              >
                Open in Google Maps
              </a>
              <a
                href={`tel:${office.phoneRaw}`}
                className="text-xs font-bold text-[var(--gold-soft)] underline"
              >
                Call {office.phone}
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(`Hello PSARA Consultant India, I need PSARA help in ${placeLabel}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[var(--gold-soft)] underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
