export const site = {
  brand: "Safhira Nanda",
  fullName: "Safhira Nanda Rahmadhani",
  email: "safhirara0@gmail.com",
  linkedin: "https://linkedin.com/in/safhiranr",
  url: "https://www.safhira.web.id",
  location: "Purwokerto · Bandung",
  photoUrl:
    process.env.NEXT_PUBLIC_PHOTO_URL ||
    "https://img.safhira.web.id/assets/profile-trans.webp",
  cvUrl:
    process.env.NEXT_PUBLIC_CV_URL ||
    "https://img.safhira.web.id/assets/resume.pdf",
} as const;
