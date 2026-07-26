import LegalLayout from "@/components/legal/LegalLayout";
import MerchantInfoCard from "@/components/legal/MerchantInfoCard";
import es from "@/content/es";

export const metadata = { title: "Cambios y devoluciones — Sol & Gabriel" };

export default function PoliticaCambiosDevolucionesPage() {
  return (
    <LegalLayout title="Política de cambios y devoluciones">
      <p>La mesa de regalos permite realizar aportes monetarios asociados a regalos simbólicos para Sol &amp; Gabriel.</p>

      <h2>Cambios</h2>
      <p>Al tratarse de aportes para una mesa de regalos, no se realizan cambios de producto físico. Si deseas corregir tu selección antes de pagar, puedes hacerlo antes de confirmar el pago.</p>

      <h2>Devoluciones</h2>
      <ul>
        <li>Si hubo un cargo duplicado, un error en el monto o un pago no reconocido, contáctanos para revisar el caso.</li>
        <li>Las solicitudes se reciben por correo o teléfono indicando nombre, correo usado en el pago, fecha aproximada, monto y número de transacción si lo tienes.</li>
        <li>Cuando corresponda una devolución, se gestionará por el mismo medio de pago, sujeto a los plazos operativos de la pasarela de pago, la marca de tarjeta o la entidad financiera.</li>
      </ul>

      <h2>Contacto</h2>
      <MerchantInfoCard merchant={es.merchant} />
    </LegalLayout>
  );
}
