export type Lang = 'tr' | 'en';

export interface Tool {
  label: string;
  /**
   * Brand names render under English casing rules — Turkish uppercase would
   * otherwise turn "Jira" into "JİRA" and "MS Office" into "MS OFFİCE".
   */
  brand?: boolean;
}

export interface Experience {
  number: string;
  role: string;
  company: string;
  meta: string;
  points: string[];
}

export interface Project {
  number: string;
  name: string;
  category: string;
  meta: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export interface Content {
  nav: {
    about: string;
    experience: string;
    projects: string;
    contact: string;
    menu: string;
    close: string;
  };
  meta: { title: string; description: string };
  skillsLabel: string;
  hero: { greeting: string; tagline: string };
  contactCta: string;
  marquee: { row1: string[]; row2: Tool[] };
  about: { heading: string; body: string };
  experience: { heading: string; items: Experience[] };
  projects: { heading: string; items: Project[] };
  education: {
    heading: string;
    degree: string;
    school: string;
    meta: string;
    languagesLabel: string;
    languages: string;
    skillsLabel: string;
    skills: string[];
  };
  contact: { heading: string; body: string; emailLabel: string };
  footer: string;
}

const brand = (label: string): Tool => ({ label, brand: true });

/** Technology names, identical in both languages. */
const DEV_TOOLS: Tool[] = ['Python', 'SQL', 'React', 'JavaScript', 'Flask'].map(brand);
const WORK_TOOLS: Tool[] = ['MS Office', 'Jira', 'Notion', 'Trello'].map(brand);

export const CONTENT: Record<Lang, Content> = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close menu',
    },
    meta: {
      title: 'Doğukan Uzun — Electrical & Electronics Engineer',
      description:
        'Doğukan Uzun — Electrical and Electronics Engineer working on commercial strategy, business development and data-driven decision making.',
    },
    skillsLabel: 'Skills and tools',
    hero: {
      greeting: "Hi, i'm Doğukan",
      tagline: 'electrical and electronics engineer',
    },
    contactCta: 'Contact Me',
    marquee: {
      row1: [
        'Commercial Analysis',
        'Customer Development',
        'Data-Driven Decision Making',
        'Sales & Channel Performance',
        'Project Leadership',
        'Cross-Functional Collaboration',
        'Business Development',
      ],
      row2: [
        ...DEV_TOOLS,
        // Commercial ground covered at Handarte
        { label: 'E-commerce' },
        { label: 'Marketplaces' },
        { label: 'B2B Sales' },
        { label: 'Lead Qualification' },
        { label: 'Channel Analysis' },
        ...WORK_TOOLS,
      ],
    },
    about: {
      heading: 'About me',
      body:
        'i am an electrical and electronics engineering graduate with project-based experience in commercial strategy and business development. i analyse product, sales, customer and channel data, turn market insight into actionable recommendations, and lead cross-functional teams. Let’s build something incredible together!',
    },
    experience: {
      heading: 'Experience',
      items: [
        {
          number: '01',
          role: 'Commercial Strategy & Business Development Associate',
          company: 'Handarte',
          meta: 'Istanbul · Jan 2026 — Present · Project-Based',
          points: [
            'Working directly with management on commercial growth projects for a consumer-products brand operating across e-commerce, marketplaces and B2B sales channels.',
            'Analysing product, sales, customer and channel data to identify growth opportunities and support product prioritisation.',
            'Supporting B2B customer development through target-account research, lead qualification, outreach preparation and partnership evaluation.',
            'Translating customer and market insight into actionable recommendations presented directly to management.',
          ],
        },
        {
          number: '02',
          role: 'Project Manager & Co-Founder',
          company: 'Biletlik',
          meta: 'Istanbul · 2024 — 2026',
          points: [
            'Led a five-person team across embedded, web and product workstreams: planning, task allocation and progress tracking.',
            'Analysed target customer segments and user needs, contributing to product requirements, user experience and business-model planning.',
          ],
        },
        {
          number: '03',
          role: 'Embedded Systems Intern',
          company: 'LOTEC Technology',
          meta: 'Ankara · Jul 2025 — Aug 2025',
          points: [
            'Contributed to electronic system development, testing, debugging and documentation.',
            'Strengthened structured problem solving, adaptability and cross-team collaboration.',
          ],
        },
      ],
    },
    projects: {
      heading: 'Projects',
      items: [
        {
          number: '01',
          name: 'Interactive Sign Language Assistant',
          category: 'Graduation Project',
          meta: '2025 — 2026',
          description:
            'An end-to-end real-time system that recognises isolated Turkish Sign Language signs from live camera input, converts recognised gloss sequences into natural Turkish, and generates context-aware AI responses.',
          highlights: [
            '98.9% validation accuracy',
            '97.2% live top-1 accuracy',
            '19-class dataset',
          ],
          stack: ['MediaPipe', 'BiLSTM', 'Open-set rejection', 'Gemini API', 'Flask'],
        },
        {
          number: '02',
          name: 'AI-Based Voice Assistant System',
          category: 'Personal Project',
          meta: 'May 2025 — Jun 2025',
          description:
            'A desktop AI assistant with three selectable personas, voice and text interaction, a customizable interface and memory. Speech-to-text, text-to-speech, OCR and API components were integrated into a user-facing prototype.',
          highlights: ['3 personas', 'Voice + text', 'Memory'],
          stack: ['React', 'JavaScript', 'Speech-to-text', 'Text-to-speech', 'OCR'],
        },
        {
          number: '03',
          name: 'Biletlik',
          category: 'Co-Founder',
          meta: '2024 — 2026',
          description:
            'A ticketing product built from scratch with a five-person team. i owned project planning and coordination across embedded, web and product workstreams, alongside customer-segment and business-model research.',
          highlights: ['5-person team', 'Embedded + web + product', 'Business model'],
          stack: ['Product requirements', 'UX planning', 'Market research'],
        },
      ],
    },
    education: {
      heading: 'Education',
      degree: 'B.Sc. in Electrical and Electronics Engineering',
      school: 'Istanbul University-Cerrahpaşa',
      meta: 'Istanbul · Jul 2026',
      languagesLabel: 'Languages',
      languages: 'Turkish (Native) · English (B2, Upper-Intermediate)',
      skillsLabel: 'Core skills',
      skills: [
        'Commercial Analysis',
        'Customer Development',
        'Data-Driven Decision Making',
        'Sales & Channel Performance',
        'Project Leadership',
        'Cross-Functional Collaboration',
        'Business Development',
      ],
    },
    contact: {
      heading: 'Contact',
      body: 'Open to commercial leadership and graduate programmes. Say hello.',
      emailLabel: 'Email',
    },
    footer: 'Designed & built by Doğukan Uzun',
  },

  tr: {
    nav: {
      about: 'Hakkımda',
      experience: 'Deneyim',
      projects: 'Projeler',
      contact: 'İletişim',
      menu: 'Menü',
      close: 'Menüyü kapat',
    },
    meta: {
      title: 'Doğukan Uzun — Elektrik ve Elektronik Mühendisi',
      description:
        'Doğukan Uzun — Ticari strateji, iş geliştirme ve veriye dayalı karar alma alanlarında çalışan elektrik ve elektronik mühendisi.',
    },
    skillsLabel: 'Yetkinlikler ve araçlar',
    hero: {
      greeting: 'Merhaba, ben Doğukan',
      tagline: 'elektrik elektronik mühendisi',
    },
    contactCta: 'İletişime Geç',
    marquee: {
      row1: [
        'Ticari Analiz',
        'Müşteri Geliştirme',
        'Veriye Dayalı Karar Alma',
        'Satış & Kanal Performansı',
        'Proje Liderliği',
        'Fonksiyonlar Arası İş Birliği',
        'İş Geliştirme',
      ],
      row2: [
        ...DEV_TOOLS,
        // Handarte'de çalışılan ticari alanlar
        { label: 'E-ticaret' },
        { label: 'Pazaryerleri' },
        { label: 'B2B Satış' },
        { label: 'Lead Niteleme' },
        { label: 'Kanal Analizi' },
        ...WORK_TOOLS,
      ],
    },
    about: {
      heading: 'Hakkımda',
      body:
        'Elektrik ve elektronik mühendisliği mezunuyum; ticari strateji ve iş geliştirme alanında proje bazlı deneyimim var. Ürün, satış, müşteri ve kanal verisini analiz ediyor, pazar içgörülerini uygulanabilir önerilere dönüştürüyor ve fonksiyonlar arası ekipleri koordine ediyorum. Hadi birlikte harika bir şey inşa edelim!',
    },
    experience: {
      heading: 'Deneyim',
      items: [
        {
          number: '01',
          role: 'Ticari Strateji & İş Geliştirme Uzmanı',
          company: 'Handarte',
          meta: 'İstanbul · Oca 2026 — Devam ediyor · Proje bazlı',
          points: [
            'E-ticaret, pazaryerleri ve B2B satış kanallarında faaliyet gösteren bir tüketici ürünleri markası için yönetimle birlikte ticari büyüme projeleri yürütüyorum.',
            'Büyüme fırsatlarını belirlemek ve ürün önceliklendirmesini desteklemek için ürün, satış, müşteri ve kanal verisini analiz ediyorum.',
            'Hedef hesap araştırması, lead niteleme, iletişim hazırlığı ve potansiyel iş birliği değerlendirmesiyle B2B müşteri geliştirmeyi destekliyorum.',
            'Müşteri ve pazar içgörülerini uygulanabilir önerilere dönüştürüp doğrudan yönetime sunuyorum.',
          ],
        },
        {
          number: '02',
          role: 'Proje Yöneticisi & Kurucu Ortak',
          company: 'Biletlik',
          meta: 'İstanbul · 2024 — 2026',
          points: [
            'Gömülü, web ve ürün iş kollarında beş kişilik bir ekibi yönettim: planlama, görev dağılımı ve ilerleme takibi.',
            'Hedef müşteri segmentlerini ve kullanıcı ihtiyaçlarını analiz ederek ürün gereksinimlerine, kullanıcı deneyimine ve iş modeli planlamasına katkı verdim.',
          ],
        },
        {
          number: '03',
          role: 'Gömülü Sistemler Stajyeri',
          company: 'LOTEC Teknoloji',
          meta: 'Ankara · Tem 2025 — Ağu 2025',
          points: [
            'Elektronik sistem geliştirme, test, hata ayıklama ve dokümantasyon süreçlerine katkı sağladım.',
            'Yapılandırılmış problem çözme, uyum yeteneği ve ekipler arası iş birliği becerilerimi güçlendirdim.',
          ],
        },
      ],
    },
    projects: {
      heading: 'Projeler',
      items: [
        {
          number: '01',
          name: 'Etkileşimli İşaret Dili Asistanı',
          category: 'Bitirme Projesi',
          meta: '2025 — 2026',
          description:
            'Canlı kamera görüntüsünden izole Türk İşaret Dili işaretlerini tanıyan, tanınan gloss dizilerini doğal Türkçeye çeviren ve bağlama duyarlı yapay zekâ yanıtları üreten uçtan uca gerçek zamanlı bir sistem.',
          highlights: [
            '%98,9 doğrulama doğruluğu',
            '%97,2 canlı top-1 doğruluk',
            '19 sınıflı veri seti',
          ],
          stack: ['MediaPipe', 'BiLSTM', 'Açık küme reddi', 'Gemini API', 'Flask'],
        },
        {
          number: '02',
          name: 'Yapay Zekâ Tabanlı Sesli Asistan',
          category: 'Kişisel Proje',
          meta: 'May 2025 — Haz 2025',
          description:
            'Seçilebilen üç farklı kişiliğe sahip, sesli ve yazılı etkileşim sunan, arayüzü özelleştirilebilen ve hafıza özelliği olan bir masaüstü yapay zekâ asistanı. Konuşmadan metne, metinden konuşmaya, OCR ve API bileşenleri kullanıcıya dönük bir prototipte birleştirildi.',
          highlights: ['3 kişilik', 'Ses + metin', 'Hafıza'],
          stack: ['React', 'JavaScript', 'Konuşmadan metne', 'Metinden konuşmaya', 'OCR'],
        },
        {
          number: '03',
          name: 'Biletlik',
          category: 'Kurucu Ortak',
          meta: '2024 — 2026',
          description:
            'Beş kişilik bir ekiple sıfırdan kurulan bir biletleme ürünü. Gömülü, web ve ürün iş kolları arasında proje planlama ve koordinasyonun yanı sıra müşteri segmenti ve iş modeli araştırmasını üstlendim.',
          highlights: ['5 kişilik ekip', 'Gömülü + web + ürün', 'İş modeli'],
          stack: ['Ürün gereksinimleri', 'UX planlama', 'Pazar araştırması'],
        },
      ],
    },
    education: {
      heading: 'Eğitim',
      degree: 'Elektrik ve Elektronik Mühendisliği Lisans',
      school: 'İstanbul Üniversitesi-Cerrahpaşa',
      meta: 'İstanbul · Tem 2026',
      languagesLabel: 'Diller',
      languages: 'Türkçe (Ana dil) · İngilizce (B2, Orta-İleri)',
      skillsLabel: 'Temel yetkinlikler',
      skills: [
        'Ticari Analiz',
        'Müşteri Geliştirme',
        'Veriye Dayalı Karar Alma',
        'Satış & Kanal Performansı',
        'Proje Liderliği',
        'Fonksiyonlar Arası İş Birliği',
        'İş Geliştirme',
      ],
    },
    contact: {
      heading: 'İletişim',
      body: 'Ticari liderlik ve yeni mezun programlarına açığım. Merhaba de.',
      emailLabel: 'E-posta',
    },
    footer: 'Doğukan Uzun tarafından tasarlandı ve kodlandı',
  },
};

export const LINKS = {
  email: 'muhdogukanuzun@gmail.com',
  linkedin: 'https://linkedin.com/in/dogukan-uzun',
  github: 'https://github.com/dgknzn',
};
