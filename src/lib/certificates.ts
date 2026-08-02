const CERT_BASE = "https://safhira.web.id/assets/certificate";

export type CertificateMeta = {
  id: string;
  year: string;
  pdfUrl?: string;
};

/** Display order: newest first. CITSS has no PDF preview. */
export const certificates: CertificateMeta[] = [
  {
    id: "citss",
    year: "2024",
    pdfUrl: `${CERT_BASE}/serkom-supervisor-pengelola-layanan-it.pdf`,
  },
  {
    id: "hki",
    year: "2023",
    pdfUrl: `${CERT_BASE}/hki.pdf`,
  },
  {
    id: "ai",
    year: "2022",
    pdfUrl: `${CERT_BASE}/artificial-intelligence.pdf`,
  },
  {
    id: "publication",
    year: "2022",
    pdfUrl: `${CERT_BASE}/loa-jurnal.pdf`,
  },
  {
    id: "integrasi",
    year: "2021",
    pdfUrl: `${CERT_BASE}/arsitektur-integrasi-sistem.pdf`,
  },
  {
    id: "iot",
    year: "2020",
    pdfUrl: `${CERT_BASE}/iot.pdf`,
  },
];
