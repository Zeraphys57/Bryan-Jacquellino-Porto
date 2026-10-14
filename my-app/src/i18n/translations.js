/* ──────────────────────────────────────────────────────────────
   Site-wide copy for every language.
   Languages: id (Indonesian, default for Indonesian visitors) · en (English)
              · zh (Traditional Chinese, Taiwan)
   Written for business owners, not developers: outcomes first, no jargon.
   Non-translatable values (brand names, tech tags, links, images)
   live in src/data/projects.js and the components.
─────────────────────────────────────────────────────────────── */

export const translations = {
  id: {
    meta: {
      title: "Bryan Jacquellino",
    },
    nav: {
      work: "Karya",
      services: "Layanan",
      process: "Proses",
      about: "Tentang",
      faq: "FAQ",
    },
    header: {
      home: "Bryan Jacquellino, kembali ke atas",
      mainNav: "Navigasi utama",
      contact: "Hubungi",
      langLabel: "Pilih bahasa",
      toggleTheme: "Ganti mode gelap atau terang",
      toggleMenu: "Buka atau tutup menu",
    },
    whatsapp: {
      label: "Chat via WhatsApp",
      message: "Halo Bryan! Saya lihat portfolio kamu dan ingin diskusi soal website untuk bisnis saya.",
    },
    hero: {
      available: "Menerima project baru",
      headline: "Website yang bikin bisnismu dipercaya.",
      intro: "Saya Bryan, freelance web developer di Yogyakarta. Dari desain sampai website-mu online, semuanya saya urus.",
      ctaPrimary: "Chat via WhatsApp",
      ctaSecondary: "Lihat karya",
      showcaseLabel: "Lihat karya yang sudah saya bangun",
      stats: [
        { n: "50+", label: "Project" },
        { n: "7 Tahun", label: "Pengalaman" },
        { n: "Taiwan", label: "Diploma IT" },
        { n: "< 24 jam", label: "Waktu respons" },
      ],
    },
    projects: {
      heading: "Yang sudah saya bangun.",
      intro: "Project nyata untuk bisnis, komunitas, dan produk digital.",
      conceptHeading: "Eksplorasi konsep",
      conceptIntro: "Desain konsep untuk mengasah gaya dan teknik baru, bukan pesanan klien.",
      conceptBadge: "Konsep",
      visitSite: "Kunjungi situs",
      viewDemo: "Lihat demo",
      story: "Cerita project",
      problem: "Masalah",
      solution: "Solusi",
      result: "Hasil",
      items: {
        tumbuh: {
          category: "Platform otomatisasi AI",
          description: "Platform untuk UKM Indonesia yang mengubah chat WhatsApp dan Instagram menjadi alur penjualan yang berjalan sendiri.",
          problem: "UKM kewalahan membalas pesan berulang dari pelanggan di WhatsApp, yang menyebabkan respons lambat dan hilangnya potensi penjualan.",
          solution: "Membangun AI chatbot kustom berbasis RAG yang terintegrasi langsung dengan Meta API. Sistem ini membaca basis pengetahuan produk untuk menjawab pertanyaan kompleks secara otomatis.",
          result: "Berhasil mengotomatisasi 85% pesan berulang dan memberikan layanan pelanggan 24/7, meningkatkan konversi prospek hingga 3x lipat.",
        },
        plastik: {
          category: "Company profile & katalog",
          description: "Company profile dan katalog produk untuk pemasok kemasan plastik, mencakup lini produk, kisah perusahaan, dan kontak.",
          problem: "Klien membutuhkan kehadiran digital yang profesional untuk membangun branding produk yang kuat dan tidak lagi hanya mengandalkan katalog offline.",
          solution: "Mendesain profil perusahaan dan katalog digital yang modern dan terstruktur untuk menampilkan lini produk dengan elegan dan membangun kredibilitas merek.",
          result: "Citra merek klien meningkat, dan pembeli B2B punya platform yang mudah diakses sehingga prospek (inquiries) bertambah.",
        },
        ksp: {
          category: "Portal komunitas kampus",
          description: "Website Kelompok Studi Pemrograman di Informatika Atma Jaya Yogyakarta: jadwal kelas, modul, challenge mingguan, hall of fame, dan login anggota.",
          result: "Dipakai puluhan anggota dan tentor aktif untuk kelas dan challenge mingguan.",
        },
        link: {
          category: "Platform lomba competitive programming",
          description: "Platform acara untuk LINK 2026, kontes competitive programming, dengan login tim, info kontes, dan lini masa.",
          problem: "Manajemen pendaftaran tim, pengumuman, dan lini masa untuk kontes besar sangat kacau dan rawan kesalahan.",
          solution: "Membangun platform acara terpusat dengan portal tim yang aman, lini masa otomatis, dan instruksi yang jelas.",
          result: "Berhasil mendaftarkan 100+ tim tanpa kesalahan registrasi dan membuat pengalaman peserta jauh lebih lancar.",
        },
        meridian: {
          category: "Portfolio arsitektur",
          description: "Konsep portfolio studio arsitektur dengan model 3D bangunan dan tipografi yang elegan.",
        },
        lumiere: {
          category: "Landing page klinik",
          description: "Konsep landing page klinik kecantikan premium dengan katalog layanan, galeri, dan booking konsultasi.",
        },
        neobrut: {
          category: "Toko fashion",
          description: "Konsep toko fashion neo-brutalis dengan kontras tinggi dan interaksi yang berani.",
        },
        bashion: {
          category: "Toko online",
          description: "Konsep toko streetwear dengan halaman produk bergaya editorial dan filter instan.",
        },
        dentist: {
          category: "Dashboard klinik",
          description: "Konsep dashboard dokter gigi untuk jadwal janji temu dan data pasien.",
        },
      },
    },
    services: {
      heading: "Yang bisa saya buatkan.",
      intro: "Pilih yang paling dekat dengan kebutuhanmu. Kalau masih ragu, ceritakan saja bisnismu dan saya bantu tentukan.",
      includedLabel: "Selalu termasuk",
      included: [
        "Desain di Figma sebelum coding",
        "Tampilan rapi di HP",
        "Setup domain & hosting",
        "Bantuan setelah website online",
      ],
      cta: "Diskusikan kebutuhanmu",
      items: [
        {
          title: "Landing page",
          desc: "Satu halaman yang fokus untuk promo, peluncuran produk, atau tujuan iklan, dengan tombol WhatsApp langsung ke kamu.",
          fit: "Cocok untuk produk baru, event, dan iklan Instagram atau Google.",
        },
        {
          title: "Website company profile",
          desc: "Hingga 5 halaman (beranda, tentang, produk, kontak, dan lainnya) dengan SEO dasar supaya bisnismu mudah ditemukan di Google.",
          fit: "Cocok untuk usaha yang ingin terlihat profesional di depan pelanggan dan mitra B2B.",
        },
        {
          title: "Web app & dashboard",
          desc: "Sistem dengan login admin untuk mengelola data harian: booking, pendaftaran, stok, sampai laporan yang bisa diekspor.",
          fit: "Cocok untuk klinik, komunitas, event, dan bisnis dengan banyak data.",
        },
        {
          title: "Chatbot & otomatisasi AI",
          desc: "Chatbot WhatsApp dan Instagram yang menjawab pelanggan 24/7 dari data produkmu, plus alur kerja yang berjalan otomatis.",
          fit: "Cocok untuk bisnis yang kewalahan membalas chat.",
        },
      ],
    },
    process: {
      heading: "Cara kerjanya.",
      intro: "Empat langkah sederhana, dari obrolan pertama sampai website-mu online.",
      items: [
        {
          title: "Ngobrol dulu",
          desc: "Kita bahas bisnismu, siapa pelangganmu, dan apa yang harus dicapai website-nya. Dari situ saya susun apa saja yang perlu dibuat.",
        },
        {
          title: "Desain",
          desc: "Kamu lihat dulu tampilannya di Figma, kasih masukan, dan minta perubahan sebelum satu baris kode ditulis.",
        },
        {
          title: "Pembuatan",
          desc: "Website dibangun supaya cepat dibuka, rapi di HP maupun laptop, dan mudah dikembangkan nanti.",
        },
        {
          title: "Online",
          desc: "Saya setup domain dan hosting, cek performanya, lalu website-mu online. Setelah itu saya tetap bantu.",
        },
      ],
    },
    about: {
      heading: "Hai, saya Bryan.",
      paragraphs: [
        "Saya freelance web developer di Yogyakarta. Saya membangun website yang bukan cuma tampil keren, tapi juga cepat, rapi di HP, dan benar-benar bekerja untuk bisnismu, dari company profile dan toko online sampai integrasi AI.",
        "Saya belajar IT lewat program D3 di Taiwan, lalu melanjutkan studi IT di Universitas Atma Jaya Yogyakarta. Belakangan saya juga membangun chatbot dan otomatisasi berbasis AI, supaya pekerjaan berulang di bisnismu bisa berjalan sendiri.",
      ],
      photoAlt: "Foto Bryan Jacquellino",
      role: "Freelance web developer · Yogyakarta",
      facts: [
        { label: "Lokasi", value: "Yogyakarta, Indonesia (GMT+7)" },
        { label: "Klien", value: "Indonesia, Taiwan, dan remote" },
        { label: "Pendidikan", value: "D3 IT di Taiwan · IT di Universitas Atma Jaya Yogyakarta" },
        { label: "Respons", value: "Dalam 24 jam" },
      ],
      techLabel: "Teknologi yang saya pakai",
    },
    faq: {
      heading: "Pertanyaan umum.",
      intro: "Belum ketemu jawabannya? Tanya langsung saja.",
      cta: "Tanya via WhatsApp",
      items: [
        {
          q: "Berapa lama sampai website-nya jadi?",
          a: "Tergantung skala project. Setelah ngobrol di awal, saya kirim rincian pekerjaan beserta estimasi waktunya sebelum kamu memutuskan.",
        },
        {
          q: "Apakah bisa revisi?",
          a: "Bisa. Desain dibuat dulu di Figma, jadi kamu bisa melihat, memberi masukan, dan meminta perubahan sebelum coding dimulai.",
        },
        {
          q: "Bagaimana sistem pembayarannya?",
          a: "Bertahap. Pengerjaan dimulai H+1 setelah tanda jadi diterima, dan sisanya dibayar mengikuti tahapan project.",
        },
        {
          q: "Domain dan hosting bagaimana?",
          a: "Saya bantu pilih dan setup domain serta hosting. Biaya pihak ketiga seperti domain, hosting, atau kuota AI terpisah dari biaya pengerjaan.",
        },
        {
          q: "Kalau setelah online ada masalah?",
          a: "Saya tetap bantu setelah website online. Hubungi saja lewat WhatsApp, saya balas dalam 24 jam.",
        },
        {
          q: "Saya di luar Yogyakarta, bisa?",
          a: "Bisa. Saya bekerja dengan klien di Indonesia, Taiwan, dan secara remote. Semuanya bisa diurus lewat WhatsApp atau email.",
        },
      ],
    },
    contact: {
      headingLine1: "Ayo bikin",
      headingLine2: "website-mu.",
      body: "Ceritakan bisnismu dan apa yang kamu butuhkan. Saya balas dalam 24 jam.",
      primary: "Chat via WhatsApp",
      secondary: "Kirim email",
    },
    footer: {
      location: "Yogyakarta, Indonesia",
    },
    pitch: {
      devTag: "Bryan Jacquellino · Dev",
      title: "Pilihan Investasi",
      subtitle: "Solusi Digital & Integrasi AI",
      items: [
        { name: "Landing Page Standar",        desc: "Satu halaman, responsif, Tailwind CSS" },
        { name: "Website Multi-Halaman",       desc: "Hingga 5 halaman (Beranda, Tentang, dll.), SEO" },
        { name: "Web App + CRUD Sederhana",    desc: "Login admin, manajemen data, database" },
        { name: "Web App + CRUD Kompleks",     desc: "Relasi kompleks, dashboard, ekspor laporan" },
        { name: "Integrasi AI Saja",           desc: "Integrasi chatbot atau analisis tanpa database berat" },
        { name: "Web Cerdas (CRUD + AI)",      desc: "Manajemen data plus asisten AI cerdas" },
        { name: "SISTEM PENUH (Enterprise)",   desc: "Otomatisasi total, AI Analyst, skala besar" },
      ],
      footerNote: "* Biaya yang tercantum adalah Development Fee. Belum termasuk biaya operasional pihak ketiga (domain, Supabase Pro, kuota AI API).",
      shortcut: "ESC untuk menutup · Alt+P untuk membuka",
      shortcutAUS: "ESC untuk menutup · Alt+Q untuk membuka",
      estimateNote: "Hanya estimasi harga. Penawaran akhir tergantung lingkup dan kebutuhan proyek.",
    },
  },

  en: {
    meta: {
      title: "Bryan Jacquellino",
    },
    nav: {
      work: "Work",
      services: "Services",
      process: "Process",
      about: "About",
      faq: "FAQ",
    },
    header: {
      home: "Bryan Jacquellino, back to top",
      mainNav: "Main navigation",
      contact: "Contact",
      langLabel: "Choose language",
      toggleTheme: "Toggle dark mode",
      toggleMenu: "Open or close the menu",
    },
    whatsapp: {
      label: "Chat on WhatsApp",
      message: "Hi Bryan! I saw your portfolio and would like to discuss a website for my business.",
    },
    hero: {
      available: "Taking on new projects",
      headline: "Websites your customers trust.",
      intro: "I'm Bryan, a freelance web developer in Yogyakarta, Indonesia. From design to launch, I handle everything.",
      ctaPrimary: "Chat on WhatsApp",
      ctaSecondary: "See my work",
      showcaseLabel: "See the websites I've built",
      stats: [
        { n: "50+", label: "Projects" },
        { n: "7 Years", label: "Experience" },
        { n: "Taiwan", label: "IT diploma" },
        { n: "< 24h", label: "Response time" },
      ],
    },
    projects: {
      heading: "What I've built.",
      intro: "Real projects for businesses, communities and digital products.",
      conceptHeading: "Concept explorations",
      conceptIntro: "Concept designs where I sharpen new styles and techniques. Not client commissions.",
      conceptBadge: "Concept",
      visitSite: "Visit site",
      viewDemo: "View demo",
      story: "Project story",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      items: {
        tumbuh: {
          category: "AI automation platform",
          description: "A platform for Indonesian SMEs that turns WhatsApp and Instagram chats into a self-running sales pipeline.",
          problem: "SMEs were overwhelmed by repetitive customer inquiries on WhatsApp, leading to delayed responses and lost sales opportunities.",
          solution: "Built a custom RAG-based AI chatbot integrated directly with the Meta API. The system reads product knowledge bases to answer complex questions automatically.",
          result: "Automated 85% of repetitive chats and enabled 24/7 customer support, increasing lead conversion rates by 3x.",
        },
        plastik: {
          category: "Company profile & catalogue",
          description: "A company profile and product catalogue for a plastic packaging supplier, covering product lines, company story and contact.",
          problem: "The client needed a professional digital presence to build strong product branding and move away from relying only on offline catalogues.",
          solution: "Designed a modern, structured company profile and digital catalogue that showcases their product lines and builds brand credibility.",
          result: "A stronger brand image and an easy-to-reach platform for B2B buyers that brought in more inquiries.",
        },
        ksp: {
          category: "Campus community portal",
          description: "The website of the Programming Study Group in Informatics at Atma Jaya Yogyakarta: class schedule, modules, weekly challenges, a hall of fame and member login.",
          result: "Used by dozens of active members and tutors for classes and weekly challenges.",
        },
        link: {
          category: "Programming contest platform",
          description: "The event platform for LINK 2026, a competitive programming contest, with team login, contest info and timeline.",
          problem: "Managing team registrations, announcements and timelines for a large contest was chaotic and error-prone.",
          solution: "Built a central event platform with a secure team portal, automated timelines and clear instructions.",
          result: "Onboarded 100+ teams with zero registration errors and a much smoother participant experience.",
        },
        meridian: {
          category: "Architecture portfolio",
          description: "An architecture studio portfolio concept with a 3D building model and elegant typography.",
        },
        lumiere: {
          category: "Clinic landing page",
          description: "A premium beauty clinic landing page concept with a service catalogue, gallery and consultation booking.",
        },
        neobrut: {
          category: "Fashion store",
          description: "A neo-brutalist fashion store concept with high contrast and bold interactions.",
        },
        bashion: {
          category: "Online store",
          description: "A streetwear store concept with editorial product pages and instant filtering.",
        },
        dentist: {
          category: "Clinic dashboard",
          description: "A dentist dashboard concept for appointments and patient records.",
        },
      },
    },
    services: {
      heading: "What I can build for you.",
      intro: "Pick the one closest to what you need. Not sure yet? Tell me about your business and I'll help you choose.",
      includedLabel: "Always included",
      included: [
        "A Figma design before any code",
        "A layout that works on phones",
        "Domain & hosting setup",
        "Support after launch",
      ],
      cta: "Talk about your project",
      items: [
        {
          title: "Landing page",
          desc: "One focused page for a promotion, a product launch or an ad campaign, with a WhatsApp button straight to you.",
          fit: "Good for new products, events, and Instagram or Google ads.",
        },
        {
          title: "Company profile website",
          desc: "Up to 5 pages (home, about, products, contact and more) with basic SEO so customers can find you on Google.",
          fit: "Good for businesses that want to look professional to customers and B2B partners.",
        },
        {
          title: "Web app & dashboard",
          desc: "A system with an admin login to manage everyday data: bookings, registrations, stock and exportable reports.",
          fit: "Good for clinics, communities, events and data-heavy businesses.",
        },
        {
          title: "AI chatbots & automation",
          desc: "WhatsApp and Instagram chatbots that answer customers 24/7 from your product data, plus workflows that run themselves.",
          fit: "Good for businesses buried in customer chats.",
        },
      ],
    },
    process: {
      heading: "How it works.",
      intro: "Four simple steps, from our first chat to your website going live.",
      items: [
        {
          title: "We talk",
          desc: "We go through your business, your customers and what the website needs to achieve. Then I map out exactly what to build.",
        },
        {
          title: "Design",
          desc: "You see the design in Figma first, give feedback and request changes before a single line of code is written.",
        },
        {
          title: "Build",
          desc: "Your site is built to load fast, look right on phones and laptops, and be easy to grow later.",
        },
        {
          title: "Launch",
          desc: "I set up the domain and hosting, check performance and put your site live. After that, I'm still here to help.",
        },
      ],
    },
    about: {
      heading: "Hi, I'm Bryan.",
      paragraphs: [
        "I'm a freelance web developer in Yogyakarta, Indonesia. I build websites that don't just look sharp, but are fast, work well on phones and actually work for your business, from company profiles and online stores to AI integration.",
        "I studied IT through a diploma programme in Taiwan and continued my IT studies at Universitas Atma Jaya Yogyakarta. Lately I also build AI chatbots and automations, so the repetitive work in your business can run on its own.",
      ],
      photoAlt: "Photo of Bryan Jacquellino",
      role: "Freelance web developer · Yogyakarta",
      facts: [
        { label: "Location", value: "Yogyakarta, Indonesia (GMT+7)" },
        { label: "Clients", value: "Indonesia, Taiwan and remote" },
        { label: "Education", value: "IT diploma in Taiwan · IT at Universitas Atma Jaya Yogyakarta" },
        { label: "Response", value: "Within 24 hours" },
      ],
      techLabel: "Tools I use",
    },
    faq: {
      heading: "Common questions.",
      intro: "Didn't find your answer? Just ask.",
      cta: "Ask on WhatsApp",
      items: [
        {
          q: "How long until my website is ready?",
          a: "It depends on the size of the project. After our first chat, I send you a breakdown of the work with a time estimate before you decide.",
        },
        {
          q: "Can I ask for revisions?",
          a: "Yes. The design is made in Figma first, so you can see it, give feedback and ask for changes before any coding starts.",
        },
        {
          q: "How does payment work?",
          a: "In stages. Work starts the day after the booking deposit arrives, and the rest is paid as the project moves through its stages.",
        },
        {
          q: "What about the domain and hosting?",
          a: "I help you choose and set up the domain and hosting. Third-party costs such as the domain, hosting or AI usage are separate from my development fee.",
        },
        {
          q: "What if something breaks after launch?",
          a: "I still help after your site is live. Just message me on WhatsApp; I reply within 24 hours.",
        },
        {
          q: "I'm not in Yogyakarta. Can we still work together?",
          a: "Yes. I work with clients in Indonesia, Taiwan and remotely. Everything can be handled over WhatsApp or email.",
        },
      ],
    },
    contact: {
      headingLine1: "Let's build",
      headingLine2: "your website.",
      body: "Tell me about your business and what you need. I reply within 24 hours.",
      primary: "Chat on WhatsApp",
      secondary: "Send an email",
    },
    footer: {
      location: "Yogyakarta, Indonesia",
    },
    pitch: {
      devTag: "Bryan Jacquellino · Dev",
      title: "Investment Options",
      subtitle: "Digital Solution & AI Integration",
      items: [
        { name: "Standard Landing Page",      desc: "Single page, responsive, Tailwind CSS" },
        { name: "Multi-Page Website",         desc: "Up to 5 pages (Home, About, etc.), SEO" },
        { name: "Web App + Simple CRUD",      desc: "Admin login, data management, database" },
        { name: "Web App + Complex CRUD",     desc: "Complex relations, dashboard, report export" },
        { name: "AI Integration Only",        desc: "Chatbot or analysis integration without a heavy database" },
        { name: "Smart Web (CRUD + AI)",      desc: "Data management plus a smart AI assistant" },
        { name: "FULL SYSTEM (Enterprise)",   desc: "Total automation, AI Analyst, large scale" },
      ],
      footerNote: "* The listed cost is the Development Fee. It does not include third-party operational costs (domain, Supabase Pro, AI API quota).",
      shortcut: "ESC to close · Alt+P to toggle",
      shortcutAUS: "ESC to close · Alt+Q to toggle",
      estimateNote: "Estimated pricing only. The final quote depends on project scope and requirements.",
    },
  },

  zh: {
    meta: {
      title: "Bryan Jacquellino",
    },
    nav: {
      work: "作品",
      services: "服務",
      process: "流程",
      about: "關於",
      faq: "常見問題",
    },
    header: {
      home: "Bryan Jacquellino，回到頂端",
      mainNav: "主要導覽",
      contact: "聯絡",
      langLabel: "選擇語言",
      toggleTheme: "切換深色模式",
      toggleMenu: "開啟或關閉選單",
    },
    whatsapp: {
      label: "WhatsApp 聯絡我",
      message: "Bryan 你好！我看了你的作品集，想和你討論我的事業網站。",
    },
    hero: {
      available: "目前可接新案",
      headline: "讓客戶信任你的網站。",
      intro: "我是 Bryan，印尼日惹的自由接案網頁開發者。從設計到網站上線，全部由我負責。",
      ctaPrimary: "WhatsApp 聯絡我",
      ctaSecondary: "查看作品",
      showcaseLabel: "查看我打造的網站",
      stats: [
        { n: "50+", label: "專案" },
        { n: "7 年", label: "經驗" },
        { n: "台灣", label: "資訊二專" },
        { n: "< 24 小時", label: "回覆時間" },
      ],
    },
    projects: {
      heading: "我打造的作品。",
      intro: "為企業、社群與數位產品打造的真實專案。",
      conceptHeading: "概念探索",
      conceptIntro: "為磨練新風格與技術而做的概念設計，並非客戶委託。",
      conceptBadge: "概念",
      visitSite: "造訪網站",
      viewDemo: "查看示範",
      story: "專案故事",
      problem: "問題",
      solution: "解決方案",
      result: "成果",
      items: {
        tumbuh: {
          category: "AI 自動化平台",
          description: "為印尼中小企業打造的平台，將 WhatsApp 與 Instagram 對話轉化為自動運轉的銷售流程。",
          problem: "中小企業被 WhatsApp 上重複的顧客詢問淹沒，導致回覆延遲並錯失銷售機會。",
          solution: "建立客製化的 RAG AI 聊天機器人，直接與 Meta API 整合。系統能讀取產品知識庫，自動回答複雜的問題。",
          result: "自動化 85% 的重複訊息並實現 24/7 客服，將潛在客戶轉換率提升 3 倍。",
        },
        plastik: {
          category: "公司形象與型錄",
          description: "塑膠包裝供應商的公司形象與產品型錄網站，涵蓋產品線、公司故事與聯絡方式。",
          problem: "客戶需要專業的數位形象來建立強大的產品品牌，並擺脫僅依賴線下型錄的現狀。",
          solution: "設計現代化、結構清楚的公司簡介與數位型錄，展示產品線並建立品牌信譽。",
          result: "品牌形象提升，B2B 買家有了容易使用的平台，詢問量也隨之增加。",
        },
        ksp: {
          category: "校園社群入口網站",
          description: "日惹 Atma Jaya 大學資訊系程式研究社的網站：課程時間表、教材、每週挑戰、名人堂與會員登入。",
          result: "數十位活躍成員與助教用它上課與參加每週挑戰。",
        },
        link: {
          category: "程式競賽平台",
          description: "LINK 2026 競技程式設計大賽的活動平台，包含隊伍登入、賽事資訊與時程。",
          problem: "大型賽事的隊伍註冊、公告與時程管理混亂且容易出錯。",
          solution: "打造集中的活動平台，具備安全的隊伍入口、自動化時程與清楚的說明。",
          result: "100 多支隊伍零錯誤完成註冊，參賽者體驗也順暢許多。",
        },
        meridian: {
          category: "建築作品集",
          description: "建築事務所作品集概念，搭配 3D 建築模型與優雅排版。",
        },
        lumiere: {
          category: "診所登陸頁",
          description: "高端醫美診所登陸頁概念，含療程介紹、作品藝廊與諮詢預約。",
        },
        neobrut: {
          category: "時尚商店",
          description: "新粗野主義時尚商店概念，高對比、互動大膽。",
        },
        bashion: {
          category: "線上商店",
          description: "潮流服飾電商概念，具編輯風格的商品頁與即時篩選。",
        },
        dentist: {
          category: "診所後台",
          description: "牙醫後台概念，管理看診預約與病患資料。",
        },
      },
    },
    services: {
      heading: "我能為你打造的。",
      intro: "選一個最接近你需求的方案。還不確定？告訴我你的事業，我幫你一起決定。",
      includedLabel: "每個專案都包含",
      included: [
        "寫程式前先在 Figma 確認設計",
        "手機上也好用的版面",
        "網域與主機設定",
        "上線後的支援",
      ],
      cta: "聊聊你的專案",
      items: [
        {
          title: "形象登陸頁",
          desc: "專為促銷、新品上市或廣告活動打造的單一頁面，附上直接聯絡你的 WhatsApp 按鈕。",
          fit: "適合新產品、活動，以及 Instagram 或 Google 廣告。",
        },
        {
          title: "企業形象網站",
          desc: "最多 5 頁（首頁、關於、產品、聯絡等），加上基本 SEO，讓客戶在 Google 上找到你。",
          fit: "適合想在客戶與 B2B 夥伴面前展現專業的企業。",
        },
        {
          title: "網頁應用與後台",
          desc: "具管理員登入的系統，用來管理日常資料：預約、報名、庫存，以及可匯出的報表。",
          fit: "適合診所、社群、活動，以及資料量大的事業。",
        },
        {
          title: "AI 聊天機器人與自動化",
          desc: "根據你的產品資料 24 小時回覆客戶的 WhatsApp 與 Instagram 聊天機器人，以及自動運作的工作流程。",
          fit: "適合被客戶訊息淹沒的商家。",
        },
      ],
    },
    process: {
      heading: "合作流程。",
      intro: "從第一次聊天到網站上線，只要四個步驟。",
      items: [
        {
          title: "先聊聊",
          desc: "我們先了解你的事業、你的客戶，以及網站要達成的目標，再規劃需要打造的內容。",
        },
        {
          title: "設計",
          desc: "在寫任何程式碼之前，你會先在 Figma 看到設計，可以給意見、要求修改。",
        },
        {
          title: "開發",
          desc: "網站開發得載入快速、在手機與筆電上都好看，未來也容易擴充。",
        },
        {
          title: "上線",
          desc: "我會設定網域與主機、檢查效能，讓網站正式上線。上線後也會持續協助。",
        },
      ],
    },
    about: {
      heading: "嗨，我是 Bryan。",
      paragraphs: [
        "我是印尼日惹的自由接案網頁開發者。我打造的網站不只好看，還要快速、在手機上好用，並真正為你的事業帶來效果，從公司形象網站、線上商店到 AI 整合。",
        "我在台灣修讀資訊科技二專，之後在日惹 Atma Jaya 大學繼續攻讀資訊科技。最近我也在打造 AI 聊天機器人與自動化，讓你事業中重複的工作自動完成。",
      ],
      photoAlt: "Bryan Jacquellino 的照片",
      role: "自由接案網頁開發者 · 印尼日惹",
      facts: [
        { label: "所在地", value: "印尼日惹（GMT+7）" },
        { label: "客戶", value: "印尼、台灣與遠端" },
        { label: "學歷", value: "台灣資訊科技二專 · 日惹 Atma Jaya 大學資訊科技" },
        { label: "回覆", value: "24 小時內" },
      ],
      techLabel: "我使用的技術",
    },
    faq: {
      heading: "常見問題。",
      intro: "沒找到答案？直接問我吧。",
      cta: "用 WhatsApp 詢問",
      items: [
        {
          q: "網站多久可以完成？",
          a: "視專案規模而定。初次討論後，我會先寄給你工作明細與時程估算，讓你再做決定。",
        },
        {
          q: "可以修改嗎？",
          a: "可以。設計會先在 Figma 完成，你可以在開始寫程式前檢視、給意見並要求修改。",
        },
        {
          q: "付款方式是什麼？",
          a: "分階段付款。收到訂金後隔天開始製作，其餘款項依專案進度支付。",
        },
        {
          q: "網域和主機怎麼處理？",
          a: "我會協助你挑選並設定網域與主機。網域、主機或 AI 用量等第三方費用與開發費分開計算。",
        },
        {
          q: "上線後出問題怎麼辦？",
          a: "網站上線後我仍會協助。直接用 WhatsApp 聯絡我，我會在 24 小時內回覆。",
        },
        {
          q: "我不在日惹，也可以合作嗎？",
          a: "可以。我與印尼、台灣以及遠端的客戶合作，所有事情都能透過 WhatsApp 或 Email 處理。",
        },
      ],
    },
    contact: {
      headingLine1: "一起打造",
      headingLine2: "你的網站。",
      body: "告訴我你的事業與需求，我會在 24 小時內回覆。",
      primary: "WhatsApp 聯絡我",
      secondary: "寄送 Email",
    },
    footer: {
      location: "印尼日惹",
    },
    pitch: {
      devTag: "Bryan Jacquellino · 開發者",
      title: "投資方案",
      subtitle: "數位解決方案與 AI 整合",
      items: [
        { name: "標準登陸頁",            desc: "單頁、響應式、Tailwind CSS" },
        { name: "多頁式網站",            desc: "最多 5 個頁面（首頁、關於等）、SEO" },
        { name: "網頁應用 + 簡易 CRUD",  desc: "管理員登入、資料管理、資料庫" },
        { name: "網頁應用 + 複雜 CRUD",  desc: "複雜關聯、儀表板、報表匯出" },
        { name: "僅 AI 整合",            desc: "聊天機器人或分析整合，不含大型資料庫" },
        { name: "智慧網站（CRUD + AI）", desc: "資料管理加上智慧 AI 助理" },
        { name: "完整系統（企業級）",     desc: "全面自動化、AI 分析師、大規模" },
      ],
      footerNote: "* 上列費用為開發費（Development Fee），不含第三方營運成本（網域、Supabase Pro、AI API 額度）。",
      shortcut: "ESC 關閉 · Alt+P 開關",
      shortcutAUS: "ESC 關閉 · Alt+Q 開關",
      estimateNote: "僅為估算價格，最終報價視專案範圍與需求而定。",
    },
  },
};
