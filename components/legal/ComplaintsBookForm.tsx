"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

// text-base (16px) on mobile prevents iOS Safari's auto-zoom-on-focus; text-sm from sm: up.
const inputClass =
  "w-full border-b border-[#AEBDCF] bg-transparent py-3 text-base text-[#2c2c2c] placeholder-[#9BAED4] outline-none transition-colors focus:border-[#5D7B9F] sm:text-sm";
const inputStyle = { fontFamily: "var(--font-body)" } as const;

export default function ComplaintsBookForm() {
  const [fullName, setFullName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState<"reclamo" | "queja">("reclamo");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    const { error } = await supabase.from("complaints").insert({
      full_name: fullName,
      document_id: documentId,
      email,
      phone,
      address,
      type,
      product,
      amount,
      detail,
      request,
    });
    if (error) setError(true);
    else setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-sm bg-white p-6 text-sm text-[#2c2c2c] shadow-md ring-1 ring-black/5" style={inputStyle}>
        Gracias, hemos recibido tu {type}. Te contactaremos a la brevedad al correo o teléfono registrado.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-sm bg-white p-6 text-left shadow-md ring-1 ring-black/5">
      <input className={inputClass} style={inputStyle} placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input className={inputClass} style={inputStyle} placeholder="Documento de identidad" value={documentId} onChange={(e) => setDocumentId(e.target.value)} required />
      <input className={inputClass} style={inputStyle} placeholder="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className={inputClass} style={inputStyle} placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input className={inputClass} style={inputStyle} placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} required />

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#7A96B0]" style={inputStyle}>Tipo</p>
        <div className="flex gap-3">
          {(
            [
              { label: "Reclamo", value: "reclamo" as const },
              { label: "Queja", value: "queja" as const },
            ]
          ).map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setType(value)}
              className={`flex-1 border py-3 text-xs uppercase tracking-[0.15em] transition-colors ${
                type === value
                  ? "border-[#9BAED4] bg-[#9BAED4] text-white"
                  : "border-[#AEBDCF] text-[#666666] hover:border-[#9BAED4] hover:text-[#9BAED4]"
              }`}
              style={inputStyle}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <input className={inputClass} style={inputStyle} placeholder="Producto o servicio" value={product} onChange={(e) => setProduct(e.target.value)} required />
      <input className={inputClass} style={inputStyle} placeholder="Monto relacionado (opcional)" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <textarea className={`${inputClass} resize-none`} style={inputStyle} placeholder="Detalle del reclamo o queja" rows={4} value={detail} onChange={(e) => setDetail(e.target.value)} required />
      <textarea className={`${inputClass} resize-none`} style={inputStyle} placeholder="Pedido del consumidor" rows={3} value={request} onChange={(e) => setRequest(e.target.value)} required />

      <button
        type="submit"
        className="mt-2 bg-[#5D7B9F] py-4 text-sm uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#9BAED4]"
        style={inputStyle}
      >
        Enviar
      </button>

      {error && (
        <p className="text-center text-sm text-red-600" style={inputStyle}>
          No pudimos enviar tu {type}. Por favor intenta de nuevo.
        </p>
      )}
    </form>
  );
}
