// /lib/blog.ts

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  tags: string[]
  readingTime: string
  content: string // markdown content
  author?: string
  authorTitle?: string
  authorImage?: string
}

export const posts: BlogPost[] = [
  {
    slug: "transfer-prescriptions-smoothly",
    title: "5 Simple Steps to Transfer Your Prescriptions Smoothly",
    excerpt:
      "Switching pharmacies shouldn’t be stressful. Follow these five pharmacist-approved steps to transfer your prescriptions quickly — with no gaps in care.",
    image: "/b1.jpg",
    date: "2024-03-18",
    tags: ["prescriptions", "refills", "patient-care", "cape-cod", "pharmacy-transfer"],
    readingTime: "7 min",
    author: "Team",
    authorTitle: " North Falmouth Pharmacy",
    content: `
> **Quick take:** Transferring your prescriptions to North Falmouth Pharmacy is fast, safe, and handled by our team — start to finish. We coordinate with your old pharmacy and prescribers, verify insurance, and schedule delivery or pickup so you never miss a dose.

## Why switch to a local Cape Cod pharmacy?
A local pharmacy gives you **direct access to a licensed pharmacist**, same-day problem solving, and care that fits your life — not a corporate script. At North Falmouth Pharmacy, we support **assisted living, group homes, rest homes, and families** with blister packaging, eMAR integration, and 24/7 clinical support.

---

## Step 1 — Gather the basics
You don’t need much to start a transfer:
- Your **full name** and date of birth  
- Your **current pharmacy’s name and phone number**  
- **Medication names** (a photo of your labels works)  
- Your **insurance card** (front & back)

> **Tip:** If you live in an assisted living or group home, your care team can share this info with us directly.

---

## Step 2 — Tell us how you’d like medications managed
We’ll customize your medication plan:

- **Refill Sync:** Align all refills to one pickup/delivery date  
- **Blister & Compliance Packaging:** Weekly or monthly cards with **AM/Noon/PM/Bedtime**  
- **Delivery Options:** Free local delivery across **North Falmouth & Cape Cod**  
- **eMAR / MAR:** Digital documentation for facilities

---

## Step 3 — We contact your current pharmacy
Our team requests prescription transfers (including remaining refills) and coordinates with your prescribers when new authorizations are needed. We also:
- Check for **drug interactions**  
- Confirm **dosage and timing**  
- Update your **allergy and condition profile**

---

## Step 4 — We verify insurance & pricing
No surprises. We:
- Verify your **plan, copays, and preferred pricing**
- Apply eligible **discounts or manufacturer programs**
- Give you options for **delivery or pickup**

---

## Step 5 — You get your medications, without gaps
You’ll receive your prescriptions in **blister packs or vials** — whatever fits best. We set up:
- **Automatic refills** with reminders  
- **Medication therapy management** (MTM) reviews  
- **Caregiver communications** by phone, text, or email

---

## What about controlled substances?
Some controlled medications can’t be transferred and require a **new prescription**. We’ll contact your prescriber and keep you informed.

---

## Frequently Asked Questions

### How long does a transfer take?
Most transfers are complete **same day**. If prior authorization is needed, we’ll stay on it and keep you updated.

### Will I run out during the switch?
No — we coordinate the timing so there’s **no gap in therapy**.

### Can you deliver to my facility?
Yes. We deliver to **assisted living, memory care, group homes, and rest homes** across Cape Cod. Emergency delivery is available.

---

## Ready to switch?
Call **(508) 564-4459** or stop by **111 County Road, North Falmouth, MA 02556**.  
**North Falmouth Pharmacy** — trusted by Cape Cod families and care facilities for personalized, pharmacist-led service.
    `,
  },

  {
    slug: "why-blister-packaging-improves-safety",
    title: "Why Blister Packaging Improves Safety for Patients & Facilities",
    excerpt:
      "Blister and compliance packaging simplifies medication schedules, improves adherence, and reduces errors — especially in long-term care and group home settings.",
    image: "/b2.jpg",
    date: "2024-03-11",
    tags: ["blister-packaging", "compliance", "ltc", "group-homes", "emar"],
    readingTime: "8 min",
    author: "Team",
    authorTitle: "North Falmouth Pharmacy",
    content: `
> **At a glance:** Blister packaging organizes doses by **date and time**, lowers risk of **missed or double doses**, and speeds up medication passes. It’s a smart safety upgrade for families and facilities.

## What is blister packaging?
Blister (aka **compliance**) packaging is a **sealed card** with individual pockets for each dose — clearly labeled **AM / Noon / PM / Bedtime**. Each card shows the **patient name, drug, strength, and schedule**.

---

## Why clinicians recommend it
- **Fewer errors:** Each dose is sealed and pre-sorted  
- **Better adherence:** Visual clarity + easy checks  
- **Faster med passes:** Nurses and caregivers save time  
- **Audit-ready:** Clean documentation for surveys and inspections

---

## Ideal for:
- **Assisted living & memory care:** Supports consistent med passes  
- **Group homes & rest homes:** Clear oversight for staff and families  
- **Complex regimens:** Multiple meds or frequent dosing  
- **At-home caregivers:** Build confidence and routine

---

## How North Falmouth Pharmacy packages meds
We offer:
- **Weekly or monthly** blister cards  
- **Color-coding** for time of day  
- **Rapid change** handling (new, discontinued, or updated meds)  
- **eMAR/MAR support** for streamlined documentation  
- **Free local delivery** to facilities across Cape Cod

---

## Packaging vs. pill organizers
| Feature | Blister Packaging | Pill Organizer |
| --- | --- | --- |
| Tamper-evident | ✅ | ❌ |
| Labeled by drug & time | ✅ | ❌ |
| Pharmacy-filled | ✅ | ❌ |
| Reduces sorting errors | ✅ | ❌ |

---

## Frequently Asked Questions

### Can we start blister packaging mid-month?
Yes. We’ll **synchronize** your refills and transition seamlessly.

### What if a dose changes?
We **re-pack quickly** and deliver a corrected card.

### Can we integrate with eMAR?
Yes. We support **eMAR** workflows widely used by **assisted living, group homes, and nursing** teams.

---

## Next step
Ask for blister packaging when you transfer or refill. Call **(508) 564-4459** to get started — or visit us at **111 County Road, North Falmouth**.  
**North Falmouth Pharmacy** — safer meds, simpler routines.
    `,
  },

  {
    slug: "seasonal-health-vaccines-preventive-care",
    title: "Seasonal Health: Vaccines & Preventive Care You Shouldn’t Skip",
    excerpt:
      "Protect yourself and your community year-round with pharmacist-recommended vaccines and timely preventive care.",
    image: "/b3.jpg",
    date: "2024-03-05",
    tags: ["vaccines", "immunizations", "preventive-care", "seniors", "ltc"],
    readingTime: "9 min",
    author: "Team",
    authorTitle: "North Falmouth Pharmacy",
    content: `
> **Prevention saves time, money, and hospital visits.** As your Cape Cod pharmacy, we make vaccines easy with **in-pharmacy shots** and **on-site clinics** for facilities.

## Core adult vaccines (pharmacist-recommended)
- **Flu:** Once yearly, fall through winter  
- **COVID-19:** Follow current CDC booster guidance  
- **Shingles (Shingrix):** Two doses, age **50+**  
- **Pneumonia (PCV/PPSV):** For adults **65+** or with risk factors  
- **Tdap:** Every 10 years (or during pregnancy)

> Ask our pharmacist which vaccines fit your age, conditions, and travel plans.

---

## Why vaccines matter in long-term care
Residents in **assisted living, group homes, and memory care** are at higher risk. Vaccines:
- **Reduce outbreaks** and protect staff & visitors  
- **Lower hospitalization rates**  
- **Protect immunocompromised neighbors**  

We provide on-site clinics with **consent forms, VIS documents, and reporting** handled for you.

---

## Your seasonal checklist
**Spring:** Allergy control, shingles updates, wellness reviews  
**Summer:** Travel vaccines (as needed), hydration, sun safety meds  
**Fall:** **Flu** shots, **COVID-19** boosters, pneumonia for eligible adults  
**Winter:** Refill synchronizations, rescue inhalers, cold/flu therapies

---

## What to bring to your vaccine visit
- A **photo ID**  
- **Insurance card**  
- **Medication list** (or photo of labels)  
- Any **allergy information** or past vaccine records

---

## Frequently Asked Questions

### Do you offer vaccines on-site at facilities?
Yes. We run **in-house clinics** for assisted living, group homes, and rest homes across Cape Cod.

### Can I get multiple shots during one visit?
Often yes — we’ll review your health history to determine what’s appropriate.

### Is there a wait after vaccination?
Most visits are **15–20 minutes** start to finish.

---

## Book your vaccine
Walk in, or call **(508) 564-4459** to schedule.  
Facilities can email **care@nfpltc.com** to arrange an **on-site clinic**.  
**North Falmouth Pharmacy** — local care, clinical precision.
    `,
  },
]

// Helpers
export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}