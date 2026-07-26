import LegalLayout from "@/components/legal/LegalLayout";
import MerchantInfoCard from "@/components/legal/MerchantInfoCard";
import es from "@/content/es";

export const metadata = { title: "Términos y condiciones — Sol & Gabriel" };

export default function TerminosYCondicionesPage() {
  return (
    <LegalLayout title="Términos y condiciones">
      <p>Estos términos regulan el uso de la mesa de regalos de Sol &amp; Gabriel y el proceso de pago en línea.</p>

      <h2>Proceso de compra</h2>
      <ul>
        <li>El invitado elige uno o más regalos y completa sus datos para confirmar el pago.</li>
        <li>Los montos se muestran en soles peruanos (S/) antes de iniciar el pago.</li>
        <li>Una vez aprobado el pago, la orden queda registrada para poder identificar y agradecer el regalo.</li>
        <li>Los regalos publicados representan aportes para la nueva etapa de los novios; no existe despacho físico al comprador.</li>
      </ul>

      <h2>Medios de pago</h2>
      <p>El procesamiento de pagos en línea se realiza a través de una pasarela de pago segura. Los datos sensibles de tarjeta no pasan por nuestros servidores. También se acepta transferencia bancaria directa, según se indica en la sección de mesa de regalos.</p>

      <h2>Datos del comercio</h2>
      <MerchantInfoCard merchant={es.merchant} />
    </LegalLayout>
  );
}
