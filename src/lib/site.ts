export const site = {
  brand: "Safhira Nanda",
  fullName: "Safhira Nanda Rahmadhani",
  email: "safhirara0@gmail.com",
  linkedin: "https://linkedin.com/in/safhiranr",
  location: "Purwokerto · Bandung",
  photoUrl:
    process.env.NEXT_PUBLIC_PHOTO_URL ||
    "https://safhira.web.id/assets/profile-trans.webp",
  cvUrl:
    process.env.NEXT_PUBLIC_CV_URL ||
    "https://safhira.web.id/assets/resume.pdf",
} as const;
