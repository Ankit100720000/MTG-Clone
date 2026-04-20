import {
  BookOpen, Microscope, Calculator, Award, GraduationCap,
  Truck, Zap, ShieldCheck, RefreshCcw, Globe, Headphones, Clock,
} from 'lucide-react';

export const BOOK_IMAGES: Record<string, string> = {
  neet_physics:    '/book_neet_physics.png',
  ncert_biology:   '/book_ncert_biology.png',
  jee_chemistry:   '/book_jee_chemistry.png',
  olympiad_maths:  '/book_olympiad_maths.png',
  cbse_science:    'https://placehold.co/400x540/FFF5F5/DC1E1E?text=100%25+NCERT%0AScience+10&font=poppins',
  neet_guide_bio:  'https://placehold.co/400x540/F0FDF4/16A34A?text=NEET+Guide%0ABiology&font=poppins',
  jee_maths:       'https://placehold.co/400x540/EFF6FF/2563EB?text=JEE+Maths%0AChapterwise&font=poppins',
  cbse_english:    'https://placehold.co/400x540/F5F3FF/7C3AED?text=CBSE+100%25%0AEnglish+12&font=poppins',
  ncert_exemplar:  'https://placehold.co/400x540/FFFBEB/B45309?text=NCERT%0AExemplar+9&font=poppins',
  neet_36yr:       'https://placehold.co/400x540/FEF2F2/DC1E1E?text=36+Years+NEET%0AChapterwise&font=poppins',
  jee_adv_physics: 'https://placehold.co/400x540/EFF6FF/1D4ED8?text=JEE+Adv%0APhysics&font=poppins',
  olympiad_nso:    'https://placehold.co/400x540/F0FDF4/15803D?text=NSO+Science%0AOlympiad+8&font=poppins',
  magazine_phy:    'https://placehold.co/300x400/FEF2F2/DC1E1E?text=Physics%0AFor+You&font=poppins',
  magazine_chem:   'https://placehold.co/300x400/F0FDF4/15803D?text=Chemistry%0AToday&font=poppins',
  magazine_math:   'https://placehold.co/300x400/EFF6FF/1D4ED8?text=Mathematics%0AToday&font=poppins',
  magazine_bio:    'https://placehold.co/300x400/F5F3FF/7C3AED?text=Biology%0AToday&font=poppins',
};

export const PROMO_BANNERS = [
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/02/b2b_website_banner_1.jpg', link: 'https://mtg.in/bulk-inquiries/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/online_class_banner.webp', link: 'https://mtg.in/online-classes/live-classes/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/olympiad_50_per_off_workbook.webp', link: 'https://mtg.in/combo-packs-on-discount/olympiad-books/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/olympiad_50_per_off.webp', link: 'https://mtg.in/olympiad-books-ntse/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/free-masterclass.webp', link: 'https://us06web.zoom.us/meeting/register/OoGm0cmtTHyYg7rO4YQFZQ' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/foundation_course_2026.webp', link: 'https://mtg.in/school-books-boards/foundation-courses/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/Regional-entrance_1.webp', link: 'https://mtg.in/engineering-entrance-exams/regional-engineering-entrance/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/100-percent-banner-scaled.webp', link: 'https://mtg.in/products-search/?product-cats=all&search=100+Percent' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/neet_banner_new-2.webp', link: 'https://mtg.in/medical-entrance-exams/neet-exam-books/neet-previous-years-paper/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/MTG-website-banner-KCET.webp', link: 'https://mtg.in/engineering-entrance-exams/regional-engineering-entrance/karnataka-cet-kcet/' },
];

export const ALL_BOOKS = [
  { id: 1,  title: 'Physics Chemistry Mathematics Biology (PCMB) Combo',    subtitle: 'Class 11 & 12',             price: 695, oldPrice: 895, badge: 'Bestseller', category: 'NEET',    rating: 4.8, reviews: 2341, image: BOOK_IMAGES.neet_physics,    tags: ['NEET 2026', 'Theory + MCQ'] },
  { id: 2,  title: 'Physics, Chemistry and Biology Today (PCB) Series',      subtitle: 'For NEET / AIIMS',          price: 850, oldPrice: 999, badge: 'New',        category: 'NEET',    rating: 4.9, reviews: 3892, image: BOOK_IMAGES.ncert_biology,   tags: ['NEET 2026', 'Chapterwise MCQ'] },
  { id: 3,  title: 'Physics, Chemistry and Mathematics(PCM) Today',          subtitle: '27 Years (1998-2025)',       price: 499, oldPrice: 625, badge: 'Sale',       category: 'JEE',     rating: 4.7, reviews: 1204, image: BOOK_IMAGES.jee_chemistry,   tags: ['JEE 2026', 'Previous Year'] },
  { id: 4,  title: 'International Mathematical Olympiad Workbook',            subtitle: 'Class 8 - IMO',             price: 275, oldPrice: 350, badge: '',           category: 'Olympiad', rating: 4.6, reviews: 876,  image: BOOK_IMAGES.olympiad_maths,  tags: ['IMO', 'Class 8'] },
  { id: 5,  title: '100 Percent NCERT and CBSE Science, Mathematics',        subtitle: 'CBSE Board Exam',           price: 425, oldPrice: 525, badge: 'Hot',        category: 'CBSE',    rating: 4.7, reviews: 1573, image: BOOK_IMAGES.cbse_science,    tags: ['CBSE 2026', 'Class 10'] },
  { id: 6,  title: '100 Percent NCERT and CBSE Biology Class 12',            subtitle: 'Class 11 & 12',             price: 745, oldPrice: 895, badge: '',           category: 'NEET',    rating: 4.8, reviews: 2108, image: BOOK_IMAGES.neet_guide_bio,  tags: ['NEET 2026', 'Theory + MCQ'] },
  { id: 7,  title: '100 Percent NCERT and CBSE Mathematics Class 12',        subtitle: 'Chapterwise 33 Years',      price: 545, oldPrice: 699, badge: 'Bestseller', category: 'JEE',     rating: 4.9, reviews: 3101, image: BOOK_IMAGES.jee_maths,       tags: ['JEE 2026', 'Chapterwise'] },
  { id: 8,  title: '100 Percent NCERT and CBSE English Class 12',            subtitle: 'CBSE Board Exam',           price: 395, oldPrice: 475, badge: '',           category: 'CBSE',    rating: 4.5, reviews: 687,  image: BOOK_IMAGES.cbse_english,    tags: ['CBSE 2026', 'Class 12'] },
  { id: 9,  title: '100 Percent NCERT and CBSE Chemistry Class 12',          subtitle: 'Maths & Science',           price: 325, oldPrice: 399, badge: 'New',        category: 'CBSE',    rating: 4.6, reviews: 945,  image: BOOK_IMAGES.ncert_exemplar,  tags: ['CBSE', 'Class 9'] },
  { id: 10, title: '100 Percent NCERT and CBSE Physics Class 12',            subtitle: 'PYQs with Solutions',       price: 725, oldPrice: 895, badge: 'Top Seller', category: 'NEET',    rating: 4.9, reviews: 4521, image: BOOK_IMAGES.neet_36yr,       tags: ['NEET 2026', 'PYQ 36 Years'] },
  { id: 11, title: 'JEE Advanced Chapterwise Physics',                        subtitle: '19 Years Solutions',        price: 595, oldPrice: 749, badge: '',           category: 'JEE',     rating: 4.7, reviews: 1389, image: BOOK_IMAGES.jee_adv_physics, tags: ['JEE Adv', 'Physics'] },
  { id: 12, title: 'NSO Science Olympiad Workbook Class 8',                   subtitle: 'National Science Olympiad', price: 185, oldPrice: 240, badge: '',           category: 'Olympiad', rating: 4.5, reviews: 612,  image: BOOK_IMAGES.olympiad_nso,    tags: ['NSO', 'Class 8'] },
];

export const MAGAZINES = [
  { id: 'm1', name: 'Physics For You Subscription',    desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_phy,  color: '#FEF2F2', accent: '#DC1E1E' },
  { id: 'm2', name: 'Chemistry Today Subscription',    desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_chem, color: '#F0FDF4', accent: '#16A34A' },
  { id: 'm3', name: 'Mathematics Today Subscription',  desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_math, color: '#EFF6FF', accent: '#2563EB' },
  { id: 'm4', name: 'Biology Today Subscription',      desc: '1 Year Full Access', price: 50, image: BOOK_IMAGES.magazine_bio,  color: '#F5F3FF', accent: '#7C3AED' },
];

export const CATEGORIES = [
  { label: 'All',      icon: BookOpen },
  { label: 'NEET',     icon: Microscope },
  { label: 'JEE',      icon: Calculator },
  { label: 'Olympiad', icon: Award },
  { label: 'CBSE',     icon: GraduationCap },
];

export const NAV_LINKS = ['Classes', 'Olympiad', 'Medical / NEET', 'Engineering / JEE', 'Magazines', 'Online Classes', 'CBSE Boards', 'CUET'];

export const TICKER_ITEMS = [
  { icon: Truck,       text: 'Free Delivery across India on orders above ₹499' },
  { icon: Zap,         text: 'New 2026 editions now available — updated syllabus' },
  { icon: Award,       text: '#1 Educational Publisher trusted by 50L+ students' },
  { icon: ShieldCheck, text: '100% Secure Payments — UPI, Cards, Net Banking' },
  { icon: RefreshCcw,  text: 'Hassle-free 15-day return policy' },
  { icon: Globe,       text: 'International shipping available worldwide' },
  { icon: Headphones,  text: '24/7 Customer support — Call 0124-4951200' },
  { icon: Clock,       text: 'Same-day dispatch on orders before 2 PM' },
];

export const TESTIMONIALS = [
  { id: 1, name: 'Ananya Sharma', role: 'NEET AIR 85',           text: 'Objective NCERT at your Fingertips was my daily companion. The assertion-reason questions closely matched the actual NEET paper. Highly recommended!', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ananya' },
  { id: 2, name: 'Rahul Desai',   role: 'JEE Main 99.8%ile',     text: 'The Chapterwise Solutions gave me exact insights into the NTA pattern. Practicing 35 years of PYQs built my confidence immensely. A must-buy for aspirants.', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul' },
  { id: 3, name: 'Priya Verma',   role: 'NSO Gold Medalist',      text: 'I started preparing with MTG Olympiad workbooks in Class 6. The conceptual clarity and question variety are unmatched and built my foundation.', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Priya' },
  { id: 4, name: 'Vikram Singh',  role: 'CBSE Class 12 Topper',   text: '100 Percent Physics and Chemistry boards books are absolute life savers. Highly structured and easy to grasp.', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Vikram' },
  { id: 5, name: 'Neha Gupta',   role: 'JEE Advanced Rank 214',  text: 'Physics For You magazine provided me with those advanced tricky questions that gave me the edge I needed.', image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Neha' },
];

// Helpers shared across components
export const discount = (price: number, old: number) => Math.round(((old - price) / old) * 100);
export const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

export const badgeClass: Record<string, string> = {
  Bestseller:   'badge-best',
  'Top Seller': 'badge-best',
  New:          'badge-new',
  Sale:         'badge-sale',
  Hot:          'badge-hot',
};
