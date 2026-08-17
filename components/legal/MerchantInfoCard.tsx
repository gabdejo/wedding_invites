import type { SiteContent } from "@/content/types";

type Props = { merchant: SiteContent["merchant"] };

export default function MerchantInfoCard({ merchant }: Props) {
  const rows: Array<[string, string]> = [
    ["Nombre comercial", merchant.tradeName],
    ["Razón social", merchant.legalName],
    ["RUC", merchant.taxId],
    ["Teléfono", merchant.phone],
    ["Correo", merchant.email],
    ["Dirección", merchant.address],
  ];

  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-sm bg-white p-6 shadow-md ring-1 ring-black/5 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs uppercase tracking-widest text-[#9BAED4]" style={{ fontFamily: "var(--font-body)" }}>
            {label}
          </dt>
          <dd className="text-sm text-[#2c2c2c]" style={{ fontFamily: "var(--font-body)" }}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
