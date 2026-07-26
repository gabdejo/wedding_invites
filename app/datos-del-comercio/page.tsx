import LegalLayout from "@/components/legal/LegalLayout";
import MerchantInfoCard from "@/components/legal/MerchantInfoCard";
import es from "@/content/es";

export const metadata = { title: "Datos del comercio — Sol & Gabriel" };

export default function DatosDelComercioPage() {
  return (
    <LegalLayout title="Datos del comercio">
      <p>Estos son los datos comerciales asociados a la mesa de regalos y al proceso de pago en línea.</p>
      <MerchantInfoCard merchant={es.merchant} />
    </LegalLayout>
  );
}
