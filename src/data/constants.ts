export interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  tag: string;
  weight: string;
  image: string;
  description: string;
  approved: boolean;
}

export interface Settings {
  promoEnabled: boolean;
  promoCode: string;
  promoPercent: number;
  promoTitle: string;
  deliveryFee: number;
  deliveryEstimate: string;
  paymentMethods: { cod: boolean; bkash: boolean; nagad: boolean };
  adminPin: string;
}

export interface Order {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  paymentMethod: string;
  total: number;
  items: string;
}

export interface CartItem extends Product {
  quantity: number;
  customDetails?: { flavor: string; weight: string; message: string };
}

export interface User {
  id: number;
  name: string;
  email: string;
  pass?: string;
  provider: string;
  avatar: string;
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "রাজকীয় চকোলেট ট্রাফেল কেক",
    category: "birthday",
    price: 1250,
    rating: 5.0,
    reviews: 128,
    tag: "বেস্টসেলার",
    weight: "১ কেজি",
    image:
      "https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "বেলজিয়ান চকোলেট ও প্রিমিয়াম কোকোর এক স্বর্গীয় মিশ্রণ।",
    approved: true,
  },
  {
    id: 2,
    name: "স্বর্গীয় স্ট্রবেরি ফ্লোরাল ডিলাইট",
    category: "birthday",
    price: 1400,
    rating: 4.9,
    reviews: 95,
    tag: "তাজা ফল",
    weight: "১ কেজি",
    image:
      "https://images.pexels.com/photos/12927172/pexels-photo-12927172.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "তাজা স্ট্রবেরি ও ভ্যানিলা স্পঞ্জের অপূর্ব যুগলবন্দী।",
    approved: true,
  },
  {
    id: 3,
    name: "এলিগ্যান্ট হোয়াইট ওয়েডিং কেক",
    category: "wedding",
    price: 4500,
    rating: 5.0,
    reviews: 42,
    tag: "প্রিমিয়াম",
    weight: "৩ কেজি",
    image:
      "https://images.pexels.com/photos/30233124/pexels-photo-30233124.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "খাঁটি মাখনের ফ্রস্টিং ও এডিবল ফ্লাওয়ার দিয়ে সজ্জিত।",
    approved: true,
  },
  {
    id: 4,
    name: "সিগনেচার মিক্সড বেরি চিজকেক",
    category: "pastry",
    price: 350,
    rating: 4.8,
    reviews: 210,
    tag: "শেফ স্পেশাল",
    weight: "১ পিস",
    image:
      "https://images.pexels.com/photos/19498995/pexels-photo-19498995.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "ক্রিমি চিজ ও তাজা ব্লুবেরি-রাস্পবেরির মেলবন্ধন।",
    approved: true,
  },
  {
    id: 5,
    name: "গোল্ডেন গ্লেজড ভ্যানিলা ডোনাট",
    category: "pastry",
    price: 120,
    rating: 4.7,
    reviews: 340,
    tag: "জনপ্রিয়",
    weight: "১ পিস",
    image:
      "https://images.pexels.com/photos/13914951/pexels-photo-13914951.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "নরম ও তুলতুলে ডোনাট, ভ্যানিলা গ্লেজ ও স্প্রিংকলস।",
    approved: true,
  },
  {
    id: 6,
    name: "কাস্টমাইজড গোল্ডেন সেলিব্রেশন",
    category: "custom",
    price: 2500,
    rating: 4.9,
    reviews: 76,
    tag: "এক্সক্লুসিভ",
    weight: "২ কেজি",
    image:
      "https://images.pexels.com/photos/19651268/pexels-photo-19651268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "মনের মতো কাস্টমাইজড ডিজাইনের গোল্ডেন ফিনাইল কেক।",
    approved: true,
  },
  {
    id: 7,
    name: "ক্লাসিক ব্ল্যাক ফরেস্ট ডিলাইট",
    category: "birthday",
    price: 1100,
    rating: 4.8,
    reviews: 180,
    tag: "সবার প্রিয়",
    weight: "১ কেজি",
    image:
      "https://images.pexels.com/photos/8478055/pexels-photo-8478055.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "চকোলেট লেয়ার, চেরি ফিলিং ও হুইপড ক্রিম।",
    approved: true,
  },
  {
    id: 8,
    name: "প্রিমিয়াম ভেলভেট রোমান্স কেক",
    category: "wedding",
    price: 3200,
    rating: 5.0,
    reviews: 58,
    tag: "লাক্সারি",
    weight: "২ কেজি",
    image:
      "https://images.pexels.com/photos/3983580/pexels-photo-3983580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    description: "রেড ভেলভেট স্পঞ্জ ও সিল্কি ক্রিম চিজ ফ্রস্টিং।",
    approved: true,
  },
];

export const DEFAULT_SETTINGS: Settings = {
  promoEnabled: true,
  promoCode: "BAKE20",
  promoPercent: 20,
  promoTitle: "প্রথম অর্ডারে ২০% ছাড়!",
  deliveryFee: 80,
  deliveryEstimate: "২-৪ ঘণ্টা",
  paymentMethods: { cod: true, bkash: true, nagad: true },
  adminPin: "1234",
};
