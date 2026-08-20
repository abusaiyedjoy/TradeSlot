// Mock data for Vehicle Rental Management Dashboard
// Mirrors the backend schema: staff, vehicles, rentals

export type VehicleCategory = "Car" | "SUV" | "Truck" | "Van" | "Luxury" | "Motorcycle"
export type RentalStatus = "booked" | "ongoing" | "completed" | "cancelled"

export interface Vehicle {
  id: number
  name: string
  plate_number: string
  category: VehicleCategory
  daily_rate: number
  photo_path: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
  // Derived / UI helpers
  available: boolean
  description: string
  features: string[]
  seats: number
  fuel_type: "Petrol" | "Diesel" | "Electric" | "Hybrid"
  transmission: "Automatic" | "Manual"
  mileage: number
}

export interface Rental {
  id: number
  vehicle_id: number
  vehicle_name: string
  vehicle_plate: string
  customer_name: string
  customer_phone: string
  start_date: string
  end_date: string
  total_amount: number
  status: RentalStatus
  created_at: string
  updated_at: string
}

export interface Staff {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface RentalNote {
  id: number
  rental_id: number
  sender: "staff" | "customer"
  sender_name: string
  message: string
  timestamp: string
  is_booking_card?: boolean
  booking_slot?: {
    date: string
    time: string
    fee: number
    buffer_minutes: number
  }
}

export interface MonthlyVehicleReport {
  vehicle_id: number
  vehicle_name: string
  vehicle_plate: string
  category: VehicleCategory
  total_bookings: number
  days_rented: number
  revenue: number
}

// ─── Mock Staff ────────────────────────────────────────────
export const MOCK_STAFF: Staff = {
  id: 1,
  name: "Alex Morgan",
  email: "alex.morgan@rentals.co",
  avatar: undefined,
}

// ─── Mock Vehicles ──────────────────────────────────────────
export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Camry 2023",
    plate_number: "ABC-1234",
    category: "Car",
    daily_rate: 65,
    photo_path: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80",
    deleted_at: null,
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-08-01T09:00:00Z",
    available: true,
    description: "Reliable and fuel-efficient mid-size sedan. Perfect for city driving and long road trips. Equipped with the latest safety features.",
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth", "Backup Camera", "Cruise Control"],
    seats: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    mileage: 18500,
  },
  {
    id: 2,
    name: "Ford Explorer 2022",
    plate_number: "DEF-5678",
    category: "SUV",
    daily_rate: 95,
    photo_path: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80",
    deleted_at: null,
    created_at: "2024-02-15T09:00:00Z",
    updated_at: "2024-08-10T09:00:00Z",
    available: false,
    description: "Spacious and powerful SUV ideal for family trips and off-road adventures. Comes with 3-row seating and ample cargo space.",
    features: ["Heated Seats", "Panoramic Sunroof", "Third Row Seating", "4WD", "Apple CarPlay"],
    seats: 7,
    fuel_type: "Petrol",
    transmission: "Automatic",
    mileage: 32000,
  },
  {
    id: 3,
    name: "Mercedes-Benz E-Class",
    plate_number: "GHI-9012",
    category: "Luxury",
    daily_rate: 180,
    photo_path: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80",
    deleted_at: null,
    created_at: "2024-03-20T09:00:00Z",
    updated_at: "2024-08-12T09:00:00Z",
    available: true,
    description: "Premium luxury sedan with top-tier comfort and performance. Experience class-leading technology and handcrafted interior finishes.",
    features: ["Leather Seats", "Burmester Sound", "Ambient Lighting", "Night Vision", "Adaptive Cruise"],
    seats: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    mileage: 8200,
  },
  {
    id: 4,
    name: "Ford F-150 Raptor",
    plate_number: "JKL-3456",
    category: "Truck",
    daily_rate: 120,
    photo_path: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    deleted_at: null,
    created_at: "2024-04-01T09:00:00Z",
    updated_at: "2024-08-05T09:00:00Z",
    available: true,
    description: "High-performance off-road truck. Best choice for construction sites, adventures, or heavy-duty towing needs.",
    features: ["Towing Package", "Off-Road Mode", "Bed Liner", "LED Headlights", "Remote Start"],
    seats: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    mileage: 45000,
  },
  {
    id: 5,
    name: "Honda Odyssey 2023",
    plate_number: "MNO-7890",
    category: "Van",
    daily_rate: 85,
    photo_path: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    deleted_at: null,
    created_at: "2024-05-10T09:00:00Z",
    updated_at: "2024-07-30T09:00:00Z",
    available: true,
    description: "Family-friendly minivan with versatile seating configurations. Great for large groups, school runs, and airport transfers.",
    features: ["Sliding Doors", "Rear Entertainment", "Stow-N-Go Seating", "Wifi Hotspot", "USB Charging"],
    seats: 8,
    fuel_type: "Petrol",
    transmission: "Automatic",
    mileage: 28000,
  },
  {
    id: 6,
    name: "Tesla Model 3",
    plate_number: "PQR-1122",
    category: "Car",
    daily_rate: 110,
    photo_path: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80",
    deleted_at: null,
    created_at: "2024-06-01T09:00:00Z",
    updated_at: "2024-08-15T09:00:00Z",
    available: true,
    description: "All-electric premium sedan with 358-mile range. Enjoy autopilot features, instant torque, and zero emission driving.",
    features: ["Autopilot", "Over-the-Air Updates", "Supercharger Network", "15-inch Touchscreen", "Glass Roof"],
    seats: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
    mileage: 12000,
  },
]

// ─── Mock Rentals ──────────────────────────────────────────
export const MOCK_RENTALS: Rental[] = [
  {
    id: 1,
    vehicle_id: 1,
    vehicle_name: "Toyota Camry 2023",
    vehicle_plate: "ABC-1234",
    customer_name: "Jordan Mitchell",
    customer_phone: "+1 555-0101",
    start_date: "2026-07-29",
    end_date: "2026-08-03",
    total_amount: 325,
    status: "completed",
    created_at: "2026-07-20T10:00:00Z",
    updated_at: "2026-08-03T18:00:00Z",
  },
  {
    id: 2,
    vehicle_id: 2,
    vehicle_name: "Ford Explorer 2022",
    vehicle_plate: "DEF-5678",
    customer_name: "Sarah Chen",
    customer_phone: "+1 555-0202",
    start_date: "2026-08-10",
    end_date: "2026-08-15",
    total_amount: 475,
    status: "completed",
    created_at: "2026-08-01T09:00:00Z",
    updated_at: "2026-08-15T17:00:00Z",
  },
  {
    id: 3,
    vehicle_id: 3,
    vehicle_name: "Mercedes-Benz E-Class",
    vehicle_plate: "GHI-9012",
    customer_name: "Marcus Thorne",
    customer_phone: "+1 555-0303",
    start_date: "2026-08-18",
    end_date: "2026-08-22",
    total_amount: 720,
    status: "ongoing",
    created_at: "2026-08-10T11:00:00Z",
    updated_at: "2026-08-18T09:00:00Z",
  },
  {
    id: 4,
    vehicle_id: 4,
    vehicle_name: "Ford F-150 Raptor",
    vehicle_plate: "JKL-3456",
    customer_name: "Elena Rostova",
    customer_phone: "+1 555-0404",
    start_date: "2026-08-25",
    end_date: "2026-08-28",
    total_amount: 360,
    status: "booked",
    created_at: "2026-08-15T14:00:00Z",
    updated_at: "2026-08-15T14:00:00Z",
  },
  {
    id: 5,
    vehicle_id: 5,
    vehicle_name: "Honda Odyssey 2023",
    vehicle_plate: "MNO-7890",
    customer_name: "David Vance",
    customer_phone: "+1 555-0505",
    start_date: "2026-08-12",
    end_date: "2026-08-15",
    total_amount: 255,
    status: "cancelled",
    created_at: "2026-08-05T10:00:00Z",
    updated_at: "2026-08-06T09:00:00Z",
  },
  {
    id: 6,
    vehicle_id: 6,
    vehicle_name: "Tesla Model 3",
    vehicle_plate: "PQR-1122",
    customer_name: "Amara Okafor",
    customer_phone: "+1 555-0606",
    start_date: "2026-08-20",
    end_date: "2026-08-24",
    total_amount: 440,
    status: "booked",
    created_at: "2026-08-16T09:00:00Z",
    updated_at: "2026-08-16T09:00:00Z",
  },
]

// ─── Mock Rental Notes ─────────────────────────────────────
export const MOCK_RENTAL_NOTES: RentalNote[] = [
  {
    id: 1,
    rental_id: 4,
    sender: "customer",
    sender_name: "Elena Rostova",
    message: "Hi, I need the truck for a home move. Will there be any issue with the mileage limit?",
    timestamp: "10:42 AM",
  },
  {
    id: 2,
    rental_id: 4,
    sender: "staff",
    sender_name: "Alex Morgan",
    message: "Hi Elena! No mileage limits apply for the Raptor during your rental period. Would you like us to add the additional cargo tie-down kit?",
    timestamp: "10:43 AM",
  },
  {
    id: 3,
    rental_id: 4,
    sender: "customer",
    sender_name: "Elena Rostova",
    message: "That would be perfect, yes! And is the Aug 25th pickup at 9am still available?",
    timestamp: "10:45 AM",
  },
  {
    id: 4,
    rental_id: 4,
    sender: "staff",
    sender_name: "Alex Morgan",
    message: "Absolutely! I found you a confirmed slot on Aug 25th at 09:00 AM. Would you like to secure this booking?",
    timestamp: "10:46 AM",
    is_booking_card: true,
    booking_slot: {
      date: "August 25, 2026",
      time: "09:00 AM",
      fee: 360,
      buffer_minutes: 30,
    },
  },
]

// ─── Mock Monthly Report (August 2026) ─────────────────────
export const MOCK_MONTHLY_REPORT: MonthlyVehicleReport[] = [
  {
    vehicle_id: 3,
    vehicle_name: "Mercedes-Benz E-Class",
    vehicle_plate: "GHI-9012",
    category: "Luxury",
    total_bookings: 3,
    days_rented: 14,
    revenue: 2520,
  },
  {
    vehicle_id: 1,
    vehicle_name: "Toyota Camry 2023",
    vehicle_plate: "ABC-1234",
    category: "Car",
    total_bookings: 4,
    days_rented: 11,
    revenue: 715,
  },
  {
    vehicle_id: 2,
    vehicle_name: "Ford Explorer 2022",
    vehicle_plate: "DEF-5678",
    category: "SUV",
    total_bookings: 2,
    days_rented: 5,
    revenue: 475,
  },
  {
    vehicle_id: 4,
    vehicle_name: "Ford F-150 Raptor",
    vehicle_plate: "JKL-3456",
    category: "Truck",
    total_bookings: 2,
    days_rented: 6,
    revenue: 720,
  },
  {
    vehicle_id: 6,
    vehicle_name: "Tesla Model 3",
    vehicle_plate: "PQR-1122",
    category: "Car",
    total_bookings: 2,
    days_rented: 8,
    revenue: 880,
  },
  {
    vehicle_id: 5,
    vehicle_name: "Honda Odyssey 2023",
    vehicle_plate: "MNO-7890",
    category: "Van",
    total_bookings: 1,
    days_rented: 0,
    revenue: 0,
  },
]
