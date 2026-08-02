import promoBannerImg from '../assets/images/regenerated_image_1785198706619.png';
import poster2Img from '../assets/images/regenerated_image_1785198793016.png';
import deltaLogoImg from '../assets/images/regenerated_image_1785198851415.jpg';
import branchManagerImg from '../assets/images/branch_manager_photo_1785230421070.jpg';

export interface NewsPost {
  id: string;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  badgeEn: string;
  badgeBn: string;
  category: 'offer' | 'notice' | 'expansion' | 'gaming' | 'payment';
  date: string;
  image: string;
  linkTextEn?: string;
  linkTextBn?: string;
  actionUrl?: string;
  featured?: boolean;
}

export const NEWS_POSTS: NewsPost[] = [
  {
    id: 'post-1',
    titleEn: '⚡ 100% Optical Fiber Grid Active across Mithapukur Union & Akmal Market',
    titleBn: '⚡ মিঠাপুকুর ইউনিয়ন ও আকমল মার্কেটে ১০০% অপটিক্যাল ফাইবার নেটওয়ার্ক সচল',
    summaryEn: 'Delta Internet has upgraded all primary optical backbone cables across Boldipukur Bazaar, Union Council, and local market hubs for zero-lag 10 Gbps capability.',
    summaryBn: 'ডেল্টা ইন্টারনেট বলদপুকুর বাজার, ইউনিয়ন পরিষদ এবং স্থানীয় মার্কেট সমূহে জিরো-ল্যাগ ১০ জিবিপিএস সক্ষমতার অপটিক্যাল ফাইবার ব্যাকবোন চালু করেছে।',
    badgeEn: 'Network Upgrade',
    badgeBn: 'নেটওয়ার্ক আপডেট',
    category: 'expansion',
    date: '2026-07-28',
    image: poster2Img,
    featured: true,
  },
  {
    id: 'post-2',
    titleEn: '🎁 Free Fiber Cable & ৳100 Discount on 30 Mbps+ Broadband Packages',
    titleBn: '🎁 ৩০ Mbps+ প্যাকেজে ফ্রি অপটিক্যাল কেবল ও ১ম মাসে ১০০ টাকা ছাড়!',
    summaryEn: 'Apply for any new fiber broadband connection above 30 Mbps this month and enjoy complimentary drop wire cable setup with ৳100 bill discount.',
    summaryBn: 'এই মাসে ৩০ Mbps বা তার বেশি গতির নতুন ব্রডব্যান্ড সংযোগ নিলে ফ্রি ড্রপ ওয়্যার ক্যাবল সেটআপ এবং ১ম মাসের বিলে ১০০ টাকা ছাড় উপভোগ করুন।',
    badgeEn: 'Limited Offer',
    badgeBn: 'বিশেষ অফার',
    category: 'offer',
    date: '2026-07-25',
    image: promoBannerImg,
    featured: true,
  },
  {
    id: 'post-3',
    titleEn: '🏷️ Delta Internet Corporate Brand & Quality Assurance Emblem',
    titleBn: '🏷️ ডেল্টা ইন্টারনেট করপোরেট ব্র্যান্ড ও কোয়ালিটি লোগো',
    summaryEn: 'Official high-resolution brand identity and emblem of Delta Software & Communication for Mithapukur Branch.',
    summaryBn: 'মিঠাপুকুর শাখার জন্য ডেল্টা সফটওয়্যার অ্যান্ড কমিউনিকেশনের অফিসিয়াল ব্র্যান্ড পরিচয় এবং লোগো।',
    badgeEn: 'Brand Identity',
    badgeBn: 'ব্র্যান্ড আইডেন্টিটি',
    category: 'notice',
    date: '2026-07-20',
    image: deltaLogoImg,
    featured: true,
  },
  {
    id: 'post-4',
    titleEn: '👨‍💼 Branch Executive Mahamudul Hasan Desk Support',
    titleBn: '👨‍💼 ব্রাঞ্চ এক্সিকিউটিভ মাহমুদুল হাসান অন-সাইট সেবা ডেস্ক',
    summaryEn: 'Direct engineering supervision and client service desk headed by Branch Manager Mahamudul Hasan at Akmal Market.',
    summaryBn: 'আকমল মার্কেটে শাখা প্রধান মাহমুদুল হাসানের সরাসরি তত্ত্বাবধানে ২৪/৭ ক্লায়েন্ট সার্ভিস ও ইঞ্জিনিয়ারিং সাপোর্ট ডেস্কেল।',
    badgeEn: 'Leadership',
    badgeBn: 'নেতৃত্ব ও সেবা',
    category: 'expansion',
    date: '2026-07-15',
    image: branchManagerImg,
    featured: true,
  },
];
