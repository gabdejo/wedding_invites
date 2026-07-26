import LegalLayout from "@/components/legal/LegalLayout";
import MerchantInfoCard from "@/components/legal/MerchantInfoCard";
import ComplaintsBookForm from "@/components/legal/ComplaintsBookForm";
import es from "@/content/es";

export const metadata = { title: "Libro de reclamaciones — Sol & Gabriel" };

export default function LibroDeReclamacionesPage() {
  return (
    <LegalLayout title="Libro de reclamaciones">
      <p>Registra aquí tu reclamo o queja relacionada con la mesa de regalos. El formulario está integrado en esta web y no depende de servicios externos.</p>
      <MerchantInfoCard merchant={es.merchant} />
      <ComplaintsBookForm />
    </LegalLayout>
  );
}
