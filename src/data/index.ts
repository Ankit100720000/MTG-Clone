import {
  BookOpen, Microscope, Calculator, Award, GraduationCap,
  Truck, Zap, ShieldCheck, RefreshCcw, Globe, Headphones, Clock,
} from 'lucide-react';

export const BOOK_IMAGES: Record<string, string> = {
  neet_physics:    '/book_neet_physics.png',
  ncert_biology:   '/book_ncert_biology.png',
  jee_chemistry:   '/book_jee_chemistry.png',
  olympiad_maths:  '/book_olympiad_maths.png',
  cbse_science:    '/cbse_science.png',
  neet_guide_bio:  '/neet_guide_bio.png',
  jee_maths:       '/jee_maths.png',
  cbse_english:    '/cbse_english.png',
  ncert_exemplar:  '/ncert_exemplar.png',
  neet_36yr:       '/neet_36yr.png',
  jee_adv_physics: '/jee_adv_physics.png',
  olympiad_nso:    '/olympiad_nso.png',
  magazine_phy:    '/magazine_phy.png',
  magazine_chem:   '/magazine_chem.png',
  magazine_math:   '/magazine_math.png',
  magazine_bio:    '/magazine_bio.png',
};

export const PROMO_BANNERS = [
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/02/b2b_website_banner_1.jpg', link: 'https://mtg.in/bulk-inquiries/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/online_class_banner.webp', link: 'https://mtg.in/online-classes/live-classes/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/olympiad_50_per_off_workbook.webp', link: 'https://mtg.in/combo-packs-on-discount/olympiad-books/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/olympiad_50_per_off.webp', link: 'https://mtg.in/olympiad-books-ntse/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/free-masterclass.webp', link: '#' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/foundation_course_2026.webp', link: 'https://mtg.in/school-books-boards/foundation-courses/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/Regional-entrance_1.webp', link: 'https://mtg.in/engineering-entrance-exams/regional-engineering-entrance/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/100-percent-banner-scaled.webp', link: '#' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/neet_banner_new-2.webp', link: 'https://mtg.in/medical-entrance-exams/neet-exam-books/neet-previous-years-paper/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/MTG-website-banner-KCET.webp', link: '#' },
];

// Real category images from MTG website
export const SHOP_BY_CATEGORY = [
  { label: 'NEET',              img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/neet.jpg',                link: 'https://mtg.in/medical-entrance-exams/' },
  { label: 'JEE Main & Adv',    img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/jee-1.jpg',               link: 'https://mtg.in/engineering-entrance-exams/jee-exam-books-main-and-advanced/' },
  { label: 'Olympiad',          img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/olympiad.jpg',             link: 'https://mtg.in/olympiad-books-ntse/' },
  { label: 'CBSE Boards',       img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/cbse.jpg',                 link: 'https://mtg.in/school-books-boards/cbse-books/' },
  { label: 'Foundation',        img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/foundation.jpg',           link: 'https://mtg.in/school-books-boards/foundation-courses/' },
  { label: 'NCERT Solutions',   img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/ncert.jpg',                link: 'https://mtg.in/school-books-boards/ncert-solutions/' },
  { label: 'School Books',      img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/school_books.jpg',         link: 'https://mtg.in/school-books-boards/school-textbooks/' },
  { label: 'Regional Entrance', img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/regional_eng.jpg',         link: 'https://mtg.in/engineering-entrance-exams/regional-engineering-entrance/' },
  { label: 'Online Classes',    img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/online_class.jpg',         link: 'https://mtg.in/online-classes/' },
  { label: 'Early Learning',    img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/early_learning.webp',      link: 'https://mtg.in/early-learning/' },
  { label: 'Activities',        img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/activity_literature.jpg',  link: 'https://mtg.in/activities-and-literature/' },
  { label: 'Govt Exams',        img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2024/08/gov_exam.jpg',             link: 'https://mtg.in/government-sector-exams/' },
];

// Real offer/deal banners from MTG
export const OFFER_BANNERS = [
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/04/workbook-combo-offer-banner.webp',       label: 'Olympiad Combo',     link: 'https://mtg.in/combo-packs-on-discount/olympiad-books/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/02/neet-offer-banner.jpg',                  label: 'NEET Books Offer',   link: 'https://mtg.in/medical-entrance-exams/' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2025/08/SOF-Olympiad-online-test-package.webp',  label: 'Online Test Pack',   link: '#' },
  { img: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/foundation_course_offer_banner_2026.webp', label: 'Foundation Course', link: 'https://mtg.in/school-books-boards/foundation-courses/' },
];

// New Releases — real product data
export const NEW_RELEASES = [
  { id: 'nr1', title: '100% NCERT PCME Combo Class 12', price: 1572, oldPrice: 1965, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/9789375445098_cbse_100_percent_cl_12_pcme_2026-250x322.webp', link: 'https://mtg.in/combo-discount-coupon/class-12-mtg-100-percent-pcme-combo/', badge: 'Bestseller' },
  { id: 'nr2', title: '100% NCERT PCBE Combo Class 12', price: 1516, oldPrice: 1895, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/9789375441007_cbse_100_percent_cl_12_pcbe_2026-250x322.webp', link: '#', badge: 'Bestseller' },
  { id: 'nr3', title: '100% NCERT PCM Combo Class 12',  price: 1288, oldPrice: 1515, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/9789375443186_cbse_100_percent_cl_12_pcm_2026-250x322.webp',  link: '#', badge: 'Featured' },
  { id: 'nr4', title: '100% NCERT PCB Combo Class 12',  price: 1228, oldPrice: 1445, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/9789375449430_cbse_100_percent_cl_12_pcb_2026-250x322.webp',  link: '#', badge: 'Featured' },
  { id: 'nr5', title: '100% NCERT PC Combo Class 12',   price: 896,  oldPrice: 995,  image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/9789375442417_cbse_100_percent_cl_12_pcb_2026-250x322.webp',  link: '#', badge: '10% OFF' },
  { id: 'nr6', title: '100% NCERT Physics Class 12',    price: 520,  oldPrice: 0,    image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/03/9789369574087_100_percent_phy_cl12-250x326.webp',            link: '#', badge: 'New' },
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
  { id: 'm1', name: 'Physics For You',    desc: '₹749–₹3,239/yr', price: 749, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/05/2026050015735_phy_may_issue-250x335.webp',  color: '#FEF2F2', accent: '#DC1E1E' },
  { id: 'm2', name: 'Chemistry Today',    desc: '₹749–₹3,239/yr', price: 749, image: BOOK_IMAGES.magazine_chem, color: '#F0FDF4', accent: '#16A34A' },
  { id: 'm3', name: 'Mathematics Today',  desc: '₹749–₹3,239/yr', price: 749, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/05/2026050015737_math_may_issue-250x335.webp', color: '#EFF6FF', accent: '#2563EB' },
  { id: 'm4', name: 'Biology Today',      desc: '₹749–₹3,239/yr', price: 749, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2026/05/2026050015738_bio_may_issue-250x335.webp',  color: '#F5F3FF', accent: '#7C3AED' },
  { id: 'm5', name: 'PCMB Combo',         desc: '₹2,800–₹7,740/yr', price: 2800, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2021/05/2023_pcmb_combo-250x329.jpg', color: '#FFFBEB', accent: '#D97706' },
  { id: 'm6', name: 'PCB Combo',          desc: '₹2,200–₹6,840/yr', price: 2200, image: 'https://mtgpublicwp.mtg.in/wp-content/uploads/2021/05/2023_pcb_combo-250x329.jpg',  color: '#FEF2F2', accent: '#E11D48' },
];

export const CATEGORIES = [
  { label: 'All',      icon: BookOpen },
  { label: 'NEET',     icon: Microscope },
  { label: 'JEE',      icon: Calculator },
  { label: 'Olympiad', icon: Award },
  { label: 'CBSE',     icon: GraduationCap },
];

export const FOOTER_SECTIONS = {
  explore: ['NEET', 'JEE', 'Olympiad', 'CBSE', 'Magazines', 'Online Classes', 'Foundation Courses', 'NCERT Solutions'],
  company: ['About Us', 'Contact Us', 'Careers', 'Press Releases', 'Blog'],
  partner: ['Online Class Teacher', 'Authors & Editors', 'Influencers', 'Distributors'],
  support: ['Help Center', 'FAQs', 'How to Buy', 'Shipping', 'Returns & Cancellation', 'Bulk Orders', 'MTG in Your City'],
  policy: ['Privacy Policy', 'User Terms', 'Return Policy', 'CSR Policy', 'Disclaimer'],
};

export const NAV_LINKS = ['Classes', 'NEET', 'JEE', 'Olympiad', 'CBSE', 'Magazines', 'Online Classes'];

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
