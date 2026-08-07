export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  credentials: string[];
  linkedin?: string;
}

export const LEADERS: TeamMember[] = [
  {
    id: "sonu-singh",
    name: "Mr. Sonu Singh",
    role: "Director & Founder",
    photo: "/images/team/sonu-singh-square.webp",
    credentials: [
      "SIS Security Leadership",
      "SLV Security Operations",
      "Jaguar Security",
      "ICICI Bank Security Governance",
      "Bajaj Group",
    ],
    bio: "Mr. Sonu Singh has held senior executive leadership positions with India's premier security and financial institutions including SIS, SLV Security, Jaguar Security, ICICI, and Bajaj. With deep operational expertise across PSARA state compliance, high-level regulatory liaisoning, manpower framework verification, and multi-state security licensing, he leads PSARA Consultant's mission to professionalize private security setup across all 36 Indian States and UTs.",
  },
  {
    id: "nakul-singh-jadaun",
    name: "Mr. Nakul Singh Jadaun",
    role: "Director",
    photo: "/images/team/nakul-singh-square.webp",
    credentials: [
      "Bajaj Group",
      "BSS Security Operations",
      "PSARA Licensing Specialist",
      "Quality Control Audit",
    ],
    bio: "Mr. Nakul Singh Jadaun brings comprehensive expertise in operational management, statutory audit preparation, and state-level PSARA documentation strategy. Having spearheaded complex compliance projects with Bajaj and BSS Security, he drives PSARA Consultant's client onboarding, police verification protocols, training institute tie-ups, and field execution quality.",
  },
];
