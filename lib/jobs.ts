export type Job = {
  title: string
  slug: string
  location: string
  company: string
  posted: string
  description: string[]
  responsibilities?: string[]
  education?: string[]
  qualifications?: string[]
  benefits?: string[]
  schedule?: string[]
  type: string
  workLocation: string
  email: string
}

export const jobs: Job[] = [
  {
    title: "Staff Pharmacist",
    slug: "staff-pharmacist",
    location: "North Falmouth, MA 02556",
    company: "North Falmouth Pharmacy",
    posted: "Nov 07, 2025",
    description: [
      "If you have a positive, energetic attitude and are self-motivated, looking for a unique work environment with growth opportunity, then North Falmouth Pharmacy may be the place for you. We are looking for a Pharmacist to join our team.",
      "The position is part-time, Monday-Friday, with a weekend rotation (generally 1 weekend day per month). Applicant must be available to work between the hours of 8:30 am and 4:30 pm.",
      "Our Pharmacy needs an experienced professional to dispense blister-packed medication to our customers (ALF and Group Home residents). Work hand in hand with doctors and nursing staff at facilities. Process Medicare billing. Analyze prescribing trends to monitor patient compliance and to prevent excessive medication use or waste, and recognize harmful drug interactions. Once every month: Work on-call and weekend to assist ALF nursing staff to fill emergency prescriptions.",
    ],
    education: [
      "Bachelor’s degree or PharmD in Pharmacy or Pharmaceutical Sciences.",
    ],
    qualifications: [
      "Current, valid license registered to practice by the Massachusetts State Board of Pharmacy.",
    ],
    benefits: ["Paid time off"],
    schedule: ["4 hour shift", "8 hour shift", "Monday to Friday"],
    type: "Part-time / Full-time",
    workLocation: "In person",
    email: "pharmacy@yourdomain.com",
  },
  {
    title: "Certified Pharmacy Technician (CPhT)",
    slug: "certified-pharmacy-technician",
    location: "North Falmouth, MA 02556",
    company: "North Falmouth Pharmacy",
    posted: "Nov 07, 2025",
    description: [
      "We are seeking a dedicated and detail-oriented Certified Pharmacy Technician to join our healthcare team. In this role, you will be responsible for providing exceptional patient care and support in a hospital setting. Your expertise in aseptic technique, medication administration, and IV infusion will be crucial in ensuring the safe and effective delivery of pharmaceutical services. The ideal candidate will thrive in a fast-paced environment and possess strong communication skills to enhance patient service.",
    ],
    responsibilities: [
      "Prepare and dispense medications accurately according to prescriptions and established protocols.",
      "Utilize aseptic technique during the preparation of sterile products, including IV infusions.",
      "Assist pharmacists in managing medication therapy for patients in critical care and acute care settings.",
      "Conduct medication administration under the supervision of licensed pharmacists.",
      "Maintain accurate records of medication inventory, orders, and patient profiles.",
      "Provide exceptional patient service by answering questions and addressing concerns regarding medications.",
      "Collaborate with healthcare professionals to ensure optimal patient outcomes.",
      "Participate in continuous education and training to stay current with pharmacy practices.",
    ],
    qualifications: [
      "Certification as a Pharmacy Technician is required.",
      "Experience in a hospital or clinical pharmacy setting is preferred.",
      "Proficient knowledge of aseptic technique, IV infusion processes, and medication administration protocols.",
      "Strong understanding of patient care principles within critical care and acute care environments.",
      "Excellent organizational skills with attention to detail.",
      "Ability to communicate effectively with patients and healthcare team members.",
      "Commitment to maintaining patient confidentiality and adhering to regulatory standards.",
    ],
    benefits: [
      "Health insurance",
      "Paid time off",
      "Paid training",
      "Referral program",
    ],
    schedule: ["8 hour shift", "Monday to Friday"],
    type: "Full-time / Part-time",
    workLocation: "In person",
    email: "pharmacy@yourdomain.com",
  },
  {
    title: "Pharmacy Technician",
    slug: "pharmacy-technician",
    location: "North Falmouth, MA 02556",
    company: "North Falmouth Pharmacy",
    posted: "Nov 07, 2025",
    description: [
      "We are seeking a Pharmacy Technician to become a part of our team! You will assist in the preparation of medications under the direction of a pharmacist.",
      "Prepare medication and other healthcare products for patients. Count and label medications, according to prescription order. Record and maintain log sheets for monthly orders. Monitor storage and inventory of medications and supplies.",
    ],
    qualifications: [
      "Previous experience in pharmacy or other related fields.",
      "Strong analytical and critical thinking skills.",
      "Excellent written and verbal communication skills.",
      "Strong organizational skills and detail oriented.",
      "Ability to adapt in a fast-paced, high-volume environment.",
    ],
    education: [
      "High school diploma or equivalent.",
      "Massachusetts State registration as a Pharmacy Technician.",
      "Pharmacy Technician Certification Board (PTCB) Certification preferred.",
    ],
    benefits: ["Health insurance", "Paid time off"],
    schedule: ["8:30 AM – 4:30 PM", "Monday to Friday"],
    type: "Full-time",
    workLocation: "In person",
    email: "pharmacy@yourdomain.com",
  },
]