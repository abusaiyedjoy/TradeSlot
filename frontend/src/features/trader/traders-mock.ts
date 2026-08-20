export interface MockTrader {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  avatar: string;
  verified: boolean;
  workAreas: string[];
  skills: string[];
  bio: string;
}

export const MOCK_TRADERS: MockTrader[] = [
  {
    id: "trader-1",
    name: "Alex Carter",
    category: "Plumber",
    rating: 4.9,
    reviewsCount: 124,
    hourlyRate: 65,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=120&h=120",
    verified: true,
    workAreas: ["North London", "Westminster", "Camden"],
    skills: ["Leak Repair", "Pipe Installation", "Boiler Servicing"],
    bio: "Certified plumber with 8+ years of experience. Quick response and high-quality repairs guaranteed."
  },
  {
    id: "trader-2",
    name: "Sarah Jenkins",
    category: "Electrician",
    rating: 4.8,
    reviewsCount: 98,
    hourlyRate: 70,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    verified: true,
    workAreas: ["Kensington", "Chelsea", "Fulham"],
    skills: ["Wiring Setup", "Smart Home Install", "Safety Auditing"],
    bio: "Licensed domestic electrician. Dedicated to safe, reliable, and energy-efficient electrical work."
  },
  {
    id: "trader-3",
    name: "Marcus Thorne",
    category: "Carpenter",
    rating: 5.0,
    reviewsCount: 84,
    hourlyRate: 55,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    verified: true,
    workAreas: ["Hackney", "Islington", "Tower Hamlets"],
    skills: ["Furniture Repair", "Custom Cabinets", "Door Framing"],
    bio: "Passionate carpenter. Specialized in bespoke cabinetry and detailed wood restorations."
  },
  {
    id: "trader-4",
    name: "Elena Rostova",
    category: "Painter",
    rating: 4.7,
    reviewsCount: 112,
    hourlyRate: 48,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120",
    verified: true,
    workAreas: ["Greenwich", "Southwark", "Lewisham"],
    skills: ["Wall Painting", "Wallpapering", "Exterior Detailing"],
    bio: "Professional decorator. Giving houses a fresh, vibrant, and clean update for over 6 years."
  },
  {
    id: "trader-5",
    name: "David Vance",
    category: "Locksmith",
    rating: 4.9,
    reviewsCount: 143,
    hourlyRate: 60,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    verified: true,
    workAreas: ["Camden", "Islington", "Hampstead"],
    skills: ["Emergency Lockout", "Security Upgrade", "Key Duplication"],
    bio: "Prompt 24/7 locksmith service. Home security consultant with focus on advanced locking mechanisms."
  }
];
