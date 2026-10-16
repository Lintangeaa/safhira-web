export type Locale = "en" | "id";

export const dictionaries = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      work: "Work",
      achievements: "Achievements",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      title: "Product Manager",
      openLine: "Also exploring System Analyst roles",
      availability: "Open to Product Manager & System Analyst roles",
      location: "Purwokerto · Bandung",
      supporting:
        "I bridge users, business, and engineering—turning research and requirements into products that ship.",
      ctaEmail: "Email me",
      ctaCv: "Download CV",
      ctaContact: "Get in touch",
      photoAlt: "Portrait of Safhira Nanda",
      photoPending: "Photo coming soon",
      badge: "Available for new roles",
      currentRole: "Currently PM at Cazh",
      stats: [
        { value: "3.93", label: "GPA · Information Systems" },
        { value: "6", label: "Certifications" },
        { value: "12", label: "Team members led" },
      ],
    },
    about: {
      heading: "About",
      body: "An enthusiastic product professional with a strong passion for digital technologies. I analyze user needs, define product strategy, and design technology-based solutions that align with business goals—while keeping stakeholders and engineering in sync.",
      leadership:
        "Led Human Resource Development at HMSI Telkom University Purwokerto, coordinating 12 division members and cadre development programs.",
    },
    experience: {
      heading: "Experience",
      items: [
        {
          company: "PT Cazh Teknologi Inovasi",
          place: "Banyumas, Indonesia",
          role: "Product Manager",
          period: "Feb 2025 — Present",
          blurb:
            "EdTech company specializing in education management systems—improving efficiency, transparency, and accessibility of educational administration.",
          points: [
            "Research user needs, market trends, and industry developments to guide product innovation.",
            "Gather and analyze requirements from stakeholders to define product solutions.",
            "Design system workflows and features; author concept docs and PRDs.",
            "Collaborate with Engineering, Design, and Business to deliver aligned outcomes.",
            "Support Services and Sales on new features; evaluate products for continuous improvement.",
            "Report product updates and recommendations to the executive team.",
          ],
        },
        {
          company: "ATR/BPN Banyumas",
          place: "Banyumas, Indonesia",
          role: "Administrative Assistant Intern",
          period: "Aug 2023",
          blurb:
            "Ministry of Agrarian Affairs and Spatial Planning / National Land Agency—land services and administration for Banyumas Regency.",
          points: [
            "Supported land procurement and development processes.",
            "Coordinated with stakeholders for smooth operations and regulatory compliance.",
          ],
        },
        {
          company: "PT Telkom Indonesia",
          place: "Semarang, Indonesia",
          role: "Customer Care Intern",
          period: "Dec 2018 — Mar 2019",
          blurb:
            "Indonesia’s largest ICT and telecommunications provider.",
          points: [
            "Handled customer inquiries and issue resolution.",
            "Assisted with accurate, confidential customer data management.",
            "Supported on-site product installations.",
          ],
        },
      ],
    },
    work: {
      heading: "Selected work",
      sub: "Mini cases from product work at Cazh—discovery to delivery.",
      metricSlot: "Metric TBD",
      readCase: "Read case study",
      back: "Back to portfolio",
      results: "Results",
      artifacts: "Artifacts",
      cases: [
        {
          tag: "01 · Discovery",
          title: "User research → product direction",
          summary:
            "Conducted research on user needs and market trends to surface insights that inform product innovation and prioritization in education management systems.",
          outcome:
            "Clearer problem framing for stakeholders and a shared direction for feature improvement.",
        },
        {
          tag: "02 · Definition",
          title: "PRD & workflow design",
          summary:
            "Designed system workflows and product features, then captured them in concept documents and PRDs so engineering and business stayed aligned.",
          outcome:
            "Requirements clarified before build—reducing ambiguity for Engineering and Design.",
        },
        {
          tag: "03 · Delivery",
          title: "Cross-team delivery & rollout support",
          summary:
            "Partnered with Engineering, Design, and Business through delivery, while supporting Services and Sales with guidance on new features and updates.",
          outcome:
            "Smoother handoffs from build to go-live, with executives kept in the loop on progress.",
        },
      ],
    },
    achievements: {
      heading: "Achievements & certifications",
      preview: "Preview",
      hidePreview: "Hide",
      openPdf: "Open PDF",
      items: {
        citss: {
          title: "Certified IT Service Supervisor (CITSS)",
          detail:
            "Competent in IT Service Management—BNSP certified, valid three years.",
        },
        hki: {
          title: "Computer Program Copyright Registration",
          detail: "Pencatatan Hak Cipta Program Komputer.",
        },
        ai: {
          title: "Artificial Intelligence for GenZ — Synthesis",
          detail: "Studi Independen Kampus Merdeka Batch 3.",
        },
        publication: {
          title: "Journal Publication — Letter of Acceptance",
          detail:
            "Letter of Acceptance for a journal publication related to research work.",
        },
        integrasi: {
          title: "System Integration Architecture",
          detail:
            "Kredensial Mikro Mahasiswa Indonesia — soft skills credential.",
        },
        iot: {
          title: "Internet of Things Training",
          detail: "Bootcamp / training program.",
        },
      },
    },
    education: {
      heading: "Education",
      items: [
        {
          school: "Telkom University Purwokerto",
          degree: "Bachelor of Information Systems",
          meta: "Aug 2020 — Jun 2024 · GPA 3.93 / 4.00",
          note: "Certified IT Service Supervisor (CITSS)",
        },
        {
          school: "SMK Telkom Purwokerto",
          degree: "Computer and Network Engineering",
          meta: "Jun 2017 — Jul 2020 · 89.64 / 100",
          note: "",
        },
      ],
    },
    skills: {
      heading: "Skills",
      groups: [
        {
          label: "Product",
          items: [
            "User research",
            "Requirements analysis",
            "PRD & concept docs",
            "Workflow design",
            "Stakeholder alignment",
            "Product evaluation",
          ],
        },
        {
          label: "Collaboration",
          items: [
            "Engineering partnership",
            "Design collaboration",
            "Business & sales enablement",
            "Executive reporting",
          ],
        },
        {
          label: "Foundations",
          items: [
            "IT service management",
            "System thinking",
            "Information systems",
            "Problem solving",
          ],
        },
      ],
    },
    contact: {
      heading: "Contact",
      sub: "Tell me about the role—I’ll get back to you by email.",
      name: "Name",
      email: "Email",
      role: "Role interest",
      roleOptions: [
        { value: "apm", label: "Product Manager" },
        { value: "sa", label: "System Analyst" },
        { value: "other", label: "Other" },
      ],
      message: "Message",
      submit: "Send message",
      sending: "Sending…",
      success: "Message sent. Thank you—I’ll reply soon.",
      error: "Something went wrong. Please email me directly.",
      orEmail: "Or email",
      linkedin: "LinkedIn",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  id: {
    nav: {
      about: "Tentang",
      experience: "Pengalaman",
      work: "Karya",
      achievements: "Pencapaian",
      education: "Pendidikan",
      skills: "Keahlian",
      contact: "Kontak",
    },
    hero: {
      title: "Product Manager",
      openLine: "Juga terbuka untuk peran System Analyst",
      availability:
        "Terbuka untuk peran Product Manager & System Analyst",
      location: "Purwokerto · Bandung",
      supporting:
        "Saya menjembatani pengguna, bisnis, dan engineering—mengubah riset dan kebutuhan menjadi produk yang benar-benar terkirim.",
      ctaEmail: "Email saya",
      ctaCv: "Unduh CV",
      ctaContact: "Hubungi saya",
      photoAlt: "Foto Safhira Nanda",
      photoPending: "Foto segera hadir",
      badge: "Siap untuk peran baru",
      currentRole: "Saat ini PM di Cazh",
      stats: [
        { value: "3.93", label: "IPK · Sistem Informasi" },
        { value: "6", label: "Sertifikasi" },
        { value: "12", label: "Anggota tim dipimpin" },
      ],
    },
    about: {
      heading: "Tentang",
      body: "Profesional produk yang antusias terhadap teknologi digital. Saya menganalisis kebutuhan pengguna, merumuskan strategi produk, dan merancang solusi berbasis teknologi yang selaras dengan tujuan bisnis—sambil menjaga komunikasi antara stakeholder dan tim teknis.",
      leadership:
        "Memimpin Human Resource Development di HMSI Telkom University Purwokerto, mengoordinasikan 12 anggota divisi dan program kaderisasi.",
    },
    experience: {
      heading: "Pengalaman",
      items: [
        {
          company: "PT Cazh Teknologi Inovasi",
          place: "Banyumas, Indonesia",
          role: "Product Manager",
          period: "Feb 2025 — Sekarang",
          blurb:
            "Perusahaan EdTech yang berfokus pada sistem manajemen pendidikan—meningkatkan efisiensi, transparansi, dan aksesibilitas administrasi pendidikan.",
          points: [
            "Meneliti kebutuhan pengguna, tren pasar, dan perkembangan industri untuk inovasi produk.",
            "Mengumpulkan dan menganalisis requirement dari stakeholder untuk mendefinisikan solusi produk.",
            "Merancang alur sistem dan fitur; menyusun dokumen konsep dan PRD.",
            "Berkolaborasi dengan Engineering, Design, dan Business untuk delivery yang selaras.",
            "Mendukung Services dan Sales terkait fitur baru; mengevaluasi produk untuk perbaikan berkelanjutan.",
            "Melaporkan update dan rekomendasi produk kepada tim eksekutif.",
          ],
        },
        {
          company: "ATR/BPN Banyumas",
          place: "Banyumas, Indonesia",
          role: "Magang Administrative Assistant",
          period: "Agu 2023",
          blurb:
            "Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional—layanan dan administrasi pertanahan Kabupaten Banyumas.",
          points: [
            "Mendukung proses pengadaan dan pengembangan tanah.",
            "Berkoordinasi dengan stakeholder untuk operasional yang lancar dan patuh regulasi.",
          ],
        },
        {
          company: "PT Telkom Indonesia",
          place: "Semarang, Indonesia",
          role: "Magang Customer Care",
          period: "Des 2018 — Mar 2019",
          blurb:
            "Penyedia ICT dan telekomunikasi terbesar di Indonesia.",
          points: [
            "Menangani pertanyaan pelanggan dan resolusi isu.",
            "Membantu pengelolaan data pelanggan secara akurat dan rahasia.",
            "Mendukung instalasi produk di lokasi pelanggan.",
          ],
        },
      ],
    },
    work: {
      heading: "Karya pilihan",
      sub: "Mini case dari pekerjaan produk di Cazh—dari discovery hingga delivery.",
      metricSlot: "Metrik menyusul",
      readCase: "Baca studi kasus",
      back: "Kembali ke portofolio",
      results: "Hasil",
      artifacts: "Artefak",
      cases: [
        {
          tag: "01 · Discovery",
          title: "Riset pengguna → arah produk",
          summary:
            "Melakukan riset kebutuhan pengguna dan tren pasar untuk menghasilkan insight yang mengarahkan inovasi dan prioritas produk pada sistem manajemen pendidikan.",
          outcome:
            "Framing masalah yang lebih jelas bagi stakeholder dan arah bersama untuk perbaikan fitur.",
        },
        {
          tag: "02 · Definition",
          title: "PRD & desain alur kerja",
          summary:
            "Merancang alur sistem dan fitur produk, lalu menuangkannya dalam dokumen konsep dan PRD agar engineering dan bisnis tetap selaras.",
          outcome:
            "Requirement lebih jelas sebelum build—mengurangi ambiguitas bagi Engineering dan Design.",
        },
        {
          tag: "03 · Delivery",
          title: "Delivery lintas tim & dukungan rollout",
          summary:
            "Bermitra dengan Engineering, Design, dan Business selama delivery, sekaligus mendukung Services dan Sales dengan panduan fitur dan update baru.",
          outcome:
            "Handoff dari build ke go-live lebih mulus, dengan eksekutif tetap terinformasi.",
        },
      ],
    },
    achievements: {
      heading: "Pencapaian & sertifikasi",
      preview: "Pratinjau",
      hidePreview: "Tutup",
      openPdf: "Buka PDF",
      items: {
        citss: {
          title: "Certified IT Service Supervisor (CITSS)",
          detail:
            "Kompeten dalam IT Service Management—tersertifikasi BNSP, berlaku tiga tahun.",
        },
        hki: {
          title: "Pencatatan Hak Cipta Program Komputer",
          detail: "Registrasi hak cipta program komputer.",
        },
        ai: {
          title: "Artificial Intelligence for GenZ — Synthesis",
          detail: "Studi Independen Kampus Merdeka Batch 3.",
        },
        publication: {
          title: "Publikasi Jurnal — Letter of Acceptance",
          detail:
            "Letter of Acceptance untuk publikasi jurnal terkait karya penelitian.",
        },
        integrasi: {
          title: "Arsitektur Integrasi Sistem",
          detail: "Kredensial Mikro Mahasiswa Indonesia.",
        },
        iot: {
          title: "Training Internet of Things",
          detail: "Program bootcamp / pelatihan.",
        },
      },
    },
    education: {
      heading: "Pendidikan",
      items: [
        {
          school: "Telkom University Purwokerto",
          degree: "S1 Sistem Informasi",
          meta: "Agu 2020 — Jun 2024 · IPK 3.93 / 4.00",
          note: "Certified IT Service Supervisor (CITSS)",
        },
        {
          school: "SMK Telkom Purwokerto",
          degree: "Teknik Komputer dan Jaringan",
          meta: "Jun 2017 — Jul 2020 · 89.64 / 100",
          note: "",
        },
      ],
    },
    skills: {
      heading: "Keahlian",
      groups: [
        {
          label: "Produk",
          items: [
            "Riset pengguna",
            "Analisis requirement",
            "PRD & dokumen konsep",
            "Desain alur kerja",
            "Alignment stakeholder",
            "Evaluasi produk",
          ],
        },
        {
          label: "Kolaborasi",
          items: [
            "Kemitraan engineering",
            "Kolaborasi design",
            "Enablement bisnis & sales",
            "Reporting eksekutif",
          ],
        },
        {
          label: "Fondasi",
          items: [
            "IT service management",
            "System thinking",
            "Sistem informasi",
            "Problem solving",
          ],
        },
      ],
    },
    contact: {
      heading: "Kontak",
      sub: "Ceritakan perannya—saya akan membalas melalui email.",
      name: "Nama",
      email: "Email",
      role: "Minat peran",
      roleOptions: [
        { value: "apm", label: "Product Manager" },
        { value: "sa", label: "System Analyst" },
        { value: "other", label: "Lainnya" },
      ],
      message: "Pesan",
      submit: "Kirim pesan",
      sending: "Mengirim…",
      success: "Pesan terkirim. Terima kasih—saya akan segera membalas.",
      error: "Terjadi kesalahan. Silakan email langsung.",
      orEmail: "Atau email",
      linkedin: "LinkedIn",
    },
    footer: {
      rights: "Hak cipta dilindungi.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
