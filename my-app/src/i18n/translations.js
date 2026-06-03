/* ──────────────────────────────────────────────────────────────
   Site-wide copy for every language.
   Languages: en (English) · zh (Traditional Chinese, Taiwan) · id (Indonesian)
   Non-translatable values (brand names, tech tags, prices, icons)
   stay in their components.
─────────────────────────────────────────────────────────────── */

export const translations = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      projects: "Projects",
      process: "Process",
    },
    header: {
      getInTouch: "Get in touch ↗",
      switchLang: "Switch language",
      toggleTheme: "Toggle dark mode",
      toggleMenu: "Toggle menu",
    },
    sections: {
      hero: "Hero",
      bio: "About Me",
      services: "Services",
      education: "Education Timeline",
      projects: "Selected Projects",
      process: "My Process",
      cta: "Call to Action",
    },
    hero: {
      eyebrow: "Available for freelance",
      tagline: "Freelance web developer crafting fast, beautiful websites, from design to deployment.",
      viewWork: "View Work",
      getInTouch: "Get in Touch",
      scroll: "scroll",
      stats: [
        { n: "50+", label: "Projects" },
        { n: "7 Years", label: "Experience" },
        { n: "Education", label: "IT · Taiwan" },
        { n: "Open", label: "For freelance" },
      ],
    },
    cta: {
      eyebrow: "Let's collaborate",
      headingLine1: "Got a project",
      headingLine2: "in mind?",
      body: "Ready to help from concept to launch. Tell me what you need and we'll make it real.",
      start: "Start a Project →",
      viewWork: "View Work",
    },
    bio: {
      eyebrow: "About Me",
      headLead: "Hi, I'm Bryan,",
      headAccent: "web developer",
      headRest: " & AI integrator.",
      para1: "I'm a freelance web developer based in Yogyakarta, focused on building websites that don't just look sharp, but are fast, responsive, and actually work for your business. From personal branding and portfolios to online stores and AI integration, I handle it all from start to launch.",
      para2: "My core stack is React and Tailwind CSS, a combination that gives full control over both performance and visual detail. Backed by a D3 IT diploma in Taiwan that built my technical foundation and structured thinking, every project I take on holds a clear standard: clean, efficient, and on point.",
      para3: "Lately I've also been integrating AI into web products, from RAG-based systems that genuinely understand business context, to workflow automation and smart pipelines wired straight into your operations. AI isn't just a trend; set up properly, it becomes real leverage for your business to grow.",
      techStack: "Tech Stack",
    },
    services: {
      eyebrow: "Services",
      heading: "What I Offer",
      items: [
        {
          title: "UI / UX Design",
          desc: "Clean, aesthetic, user-friendly interfaces, designed so users feel at home and your business looks professional.",
        },
        {
          title: "Web Development",
          desc: "Fast, scalable, well-structured websites with React and Tailwind CSS. Flawless on every device, from phone to desktop.",
        },
        {
          title: "Deploy & Maintain",
          desc: "From local to live, deployed to Vercel or your hosting of choice, including domain setup and post-launch support.",
        },
        {
          title: "AI Integration",
          desc: "RAG-based AI systems that understand your business context, workflow automation via API, and smart pipelines wired straight into your operations.",
        },
      ],
    },
    education: {
      eyebrow: "Background",
      heading: "Education Timeline",
      scrollHint: "scroll to explore",
      items: [
        { status: "High School", desc: "Science, Gembala Baik", location: "Pontianak",  year: "Foundation" },
        { status: "D3 Degree",   desc: "IT & Engineering",      location: "Taiwan",     year: "2020" },
        { status: "University",  desc: "IT, Atma Jaya",         location: "Yogyakarta", year: "2023" },
        { status: "Now",         desc: "Building Your Website", location: "My Room",    year: "Today" },
      ],
    },
    process: {
      eyebrow: "How I Work",
      heading: "My Process",
      stepLabel: "Step",
      items: [
        {
          title: "Discovery",
          desc: "We talk first about your business, goals, and target audience. From there I map out what's truly needed, not just features, but the solution.",
          note: "Brief · Goals",
        },
        {
          title: "Design",
          desc: "Wireframes and UI mockups are built in Figma. You can review, give feedback, and request changes before a single line of code is written.",
          note: "Figma · Mockup",
        },
        {
          title: "Build",
          desc: "Development starts with React and Tailwind as the foundation: clean, fast, and scalable. Every component is built to a clear standard.",
          note: "React · Tailwind",
        },
        {
          title: "Launch",
          desc: "Deployed to the hosting service of your choice. Domain setup, performance checks, and making sure everything runs perfectly before go-live.",
          note: "Vercel · Domain",
        },
      ],
    },
    projects: {
      eyebrow: "Selected Work",
      heading: "What I've built.",
      visitSite: "Visit live site",
      inDevelopment: "In development",
      comingSoon: "Live preview coming soon",
      prev: "Previous project",
      next: "Next project",
      view: "View",
      openNewTab: "Open in a new tab",
      regionLabel: "Project previews",
      items: [
        {
          category: "E-Commerce Platform",
          description: "A streetwear storefront with editorial product pages, instant filtering, and a checkout flow built to keep shoppers moving.",
          caseStudy: {
            problem: "High cart abandonment rate and a clunky browsing experience on mobile devices.",
            solution: "Designed a mobile-first, high-performance storefront with instant filtering and a seamless checkout flow.",
            result: "Increased mobile conversion rate by 40% and significantly reduced page load times."
          }
        },
        {
          category: "Clinic Booking System",
          description: "A clinic booking system with appointment scheduling, patient records, and a doctor dashboard that stays fast on any device.",
          caseStudy: {
            problem: "Manual appointment scheduling caused double bookings and frustrated patients.",
            solution: "Developed a custom booking system with real-time availability and an intuitive dashboard for the clinic staff.",
            result: "Eliminated scheduling conflicts and reduced admin workload by 15 hours a week."
          }
        },
        {
          category: "Beauty Clinic Landing",
          description: "A premium aesthetic clinic landing page with an editorial feel, a service catalog, gallery, and consultation booking.",
          caseStudy: {
            problem: "The clinic's premium brand wasn't reflected online, resulting in low digital consultation requests.",
            solution: "Built an editorial-style, visually striking landing page using modern animations to convey luxury and trust.",
            result: "Elevated brand perception and boosted online consultation bookings by 60% in the first month."
          }
        },
        {
          category: "AI Automation Platform",
          description: "An AI automation platform for Indonesian SMEs that turns WhatsApp and Instagram chats into a self-running sales pipeline.",
          caseStudy: {
            problem: "SMEs were overwhelmed by repetitive customer inquiries on WhatsApp, leading to delayed responses and lost sales opportunities.",
            solution: "Built a custom RAG-based AI chatbot integrated directly with the Meta API. The system intelligently reads product knowledge bases to answer complex questions automatically.",
            result: "Automated 85% of repetitive chats and enabled 24/7 customer support, increasing lead conversion rates by 3x."
          }
        },
        {
          category: "Company Profile / Catalog",
          description: "A company profile and product catalog for a plastic packaging supplier, covering product lines, company story, and contact.",
          caseStudy: {
            problem: "B2B buyers struggled to find specific product specifications from an outdated PDF catalog.",
            solution: "Created a structured, easily navigable digital catalog with clear product lines and direct inquiry features.",
            result: "Streamlined the B2B purchasing process, resulting in faster sales cycles and a 25% increase in inbound leads."
          }
        },
        {
          category: "Competitive Programming Contest",
          description: "The event platform for LINK 2026, a competitive programming contest, with team login, contest info, and timeline.",
          caseStudy: {
            problem: "Managing team registrations, announcements, and timelines for a large contest was chaotic and error-prone.",
            solution: "Engineered a centralized event platform with a secure team portal, automated timelines, and clear instructions.",
            result: "Successfully onboarded 100+ teams with zero registration errors and dramatically improved the participant experience."
          }
        },
      ],
    },
    footer: {
      available: "Available",
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
    nav: {
      about: "關於",
      services: "服務",
      projects: "作品",
      process: "流程",
    },
    header: {
      getInTouch: "聯絡我 ↗",
      switchLang: "切換語言",
      toggleTheme: "切換深色模式",
      toggleMenu: "切換選單",
    },
    sections: {
      hero: "主視覺",
      bio: "關於我",
      services: "服務",
      education: "求學歷程",
      projects: "精選作品",
      process: "合作流程",
      cta: "行動呼籲",
    },
    hero: {
      eyebrow: "開放接案中",
      tagline: "自由接案網頁開發者，從設計到上線，打造快速又精緻的網站。",
      viewWork: "查看作品",
      getInTouch: "與我聯絡",
      scroll: "捲動",
      stats: [
        { n: "50+",  label: "專案" },
        { n: "7 年", label: "經驗" },
        { n: "學歷", label: "資訊 · 台灣" },
        { n: "開放", label: "接案中" },
      ],
    },
    cta: {
      eyebrow: "一起合作吧",
      headingLine1: "有專案",
      headingLine2: "構想了嗎？",
      body: "從概念到上線，我都能幫上忙。說說你的需求，我們一起把它實現。",
      start: "開始專案 →",
      viewWork: "查看作品",
    },
    bio: {
      eyebrow: "關於我",
      headLead: "嗨，我是 Bryan，",
      headAccent: "網頁開發者",
      headRest: "兼 AI 整合師。",
      para1: "我是一位以印尼日惹為據點的自由接案網頁開發者，專注於打造不只外觀出色，更快速、響應流暢、真正能為你的業務帶來成效的網站。從個人品牌、作品集，到線上商店與 AI 整合，我都能從零到上線一手包辦。",
      para2: "我的核心技術組合是 React 與 Tailwind CSS，這個搭配能同時完整掌控效能與視覺細節。加上在台灣修讀資訊科技二專所打下的技術基礎與結構化思維，我經手的每個專案都有明確標準：乾淨、高效、切中要點。",
      para3: "近來我也持續將 AI 整合進網頁產品中，從真正理解業務脈絡的 RAG 系統，到工作流程自動化，以及直接串接你營運的智慧管線。AI 不只是趨勢；只要佈署得當，它就能成為你業務成長的真實助力。",
      techStack: "技術棧",
    },
    services: {
      eyebrow: "服務",
      heading: "我能提供什麼",
      items: [
        {
          title: "UI / UX 設計",
          desc: "乾淨、具美感且易於使用的介面，讓使用者願意停留，也讓你的品牌更顯專業。",
        },
        {
          title: "網站開發",
          desc: "以 React 與 Tailwind CSS 打造快速、可擴充且結構清晰的網站，在手機到桌機的每種裝置上都完美運作。",
        },
        {
          title: "部署與維護",
          desc: "從本機到上線，部署至 Vercel 或你選擇的主機，包含網域設定與上線後的支援。",
        },
        {
          title: "AI 整合",
          desc: "理解你業務脈絡的 RAG AI 系統、透過 API 的工作流程自動化，以及直接串接營運的智慧管線。",
        },
      ],
    },
    education: {
      eyebrow: "背景",
      heading: "求學歷程",
      scrollHint: "捲動探索",
      items: [
        { status: "高中",     desc: "自然組 · Gembala Baik", location: "坤甸",   year: "起點" },
        { status: "二專學位", desc: "資訊科技與工程",        location: "台灣",   year: "2020" },
        { status: "大學",     desc: "資訊科技 · Atma Jaya",  location: "日惹",   year: "2023" },
        { status: "現在",     desc: "打造你的網站",          location: "我的房間", year: "今天" },
      ],
    },
    process: {
      eyebrow: "我的工作方式",
      heading: "合作流程",
      stepLabel: "步驟",
      items: [
        {
          title: "探索",
          desc: "我們先聊聊你的業務、目標與受眾。我會從中釐清真正需要的，不只是功能，而是解決方案。",
          note: "需求 · 目標",
        },
        {
          title: "設計",
          desc: "在 Figma 中製作線框圖與 UI 設計稿。你可以在寫下任何一行程式碼之前先檢視、回饋並提出修改。",
          note: "Figma · 設計稿",
        },
        {
          title: "開發",
          desc: "以 React 與 Tailwind 為基礎展開開發：乾淨、快速且可擴充。每個元件都依明確標準打造。",
          note: "React · Tailwind",
        },
        {
          title: "上線",
          desc: "部署到你選擇的主機。網域設定、效能檢查，並在正式上線前確保一切運作完美。",
          note: "Vercel · 網域",
        },
      ],
    },
    projects: {
      eyebrow: "精選作品",
      heading: "我打造的作品。",
      visitSite: "造訪官網",
      inDevelopment: "開發中",
      comingSoon: "即時預覽即將推出",
      prev: "上一個專案",
      next: "下一個專案",
      view: "查看",
      openNewTab: "在新分頁開啟",
      regionLabel: "專案預覽",
      items: [
        {
          category: "電商平台",
          description: "潮流服飾電商網站，具備編輯風格的商品頁、即時篩選，以及為轉換而打造的結帳流程。",
          caseStudy: {
            problem: "購物車放棄率高，且行動裝置上的瀏覽體驗不流暢。",
            solution: "設計了行動裝置優先、高效能的店面，具備即時篩選與無縫結帳流程。",
            result: "行動裝置轉換率提升 40%，並顯著降低了頁面載入時間。"
          }
        },
        {
          category: "診所預約系統",
          description: "牙醫診所預約系統，包含看診排程、病患資料，以及在各種裝置上都流暢的醫師後台。",
          caseStudy: {
            problem: "人工預約常導致重複排程，並讓病患感到挫折。",
            solution: "開發具備即時空檔查詢的客製化預約系統，以及直覺的診所人員儀表板。",
            result: "消除了排程衝突，每週為行政人員減少 15 小時的工作量。"
          }
        },
        {
          category: "醫美診所網站",
          description: "充滿編輯質感的高端醫美診所官網，涵蓋療程介紹、作品藝廊與諮詢預約。",
          caseStudy: {
            problem: "診所的高端品牌形象未能在網路上展現，導致線上諮詢預約率低落。",
            solution: "建立具備編輯質感、視覺強烈的登陸頁，運用現代動畫傳遞奢華與信任感。",
            result: "提升了品牌認知度，首月線上諮詢預約量即成長 60%。"
          }
        },
        {
          category: "AI 自動化平台",
          description: "為印尼中小企業打造的 AI 自動化平台，將 WhatsApp 與 Instagram 對話轉化為自動運轉的銷售管線。",
          caseStudy: {
            problem: "中小企業被 WhatsApp 上重複的顧客詢問淹沒，導致回覆延遲並錯失銷售機會。",
            solution: "建立客製化的 RAG AI 聊天機器人，直接與 Meta API 整合。系統能智慧讀取產品知識庫，自動回答複雜的問題。",
            result: "自動化 85% 的重複訊息並實現 24/7 客服，將潛在客戶轉換率提升 3 倍。"
          }
        },
        {
          category: "公司形象 / 型錄",
          description: "塑膠包裝供應商的公司形象與產品型錄網站，涵蓋產品線、公司故事與聯絡方式。",
          caseStudy: {
            problem: "B2B 買家難以從過時的 PDF 型錄中找到特定的產品規格。",
            solution: "建立結構化、易於導覽的數位型錄，具備清晰的產品線與直接詢問功能。",
            result: "簡化了 B2B 採購流程，縮短銷售週期，並使潛在客戶詢問量增加 25%。"
          }
        },
        {
          category: "競技程式設計賽事",
          description: "LINK 2026 競技程式設計大賽的活動平台，包含隊伍登入、賽事資訊與時程。",
          caseStudy: {
            problem: "大型賽事的隊伍註冊、公告與時程管理混亂且容易出錯。",
            solution: "打造集中的活動平台，具備安全的隊伍入口、自動化時程與清晰的指示。",
            result: "成功協助 100 多支隊伍零錯誤完成註冊，大幅提升參賽者體驗。"
          }
        },
      ],
    },
    footer: {
      available: "開放接案",
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

  id: {
    nav: {
      about: "Tentang",
      services: "Layanan",
      projects: "Proyek",
      process: "Proses",
    },
    header: {
      getInTouch: "Hubungi saya ↗",
      switchLang: "Ganti bahasa",
      toggleTheme: "Ganti mode gelap",
      toggleMenu: "Buka/tutup menu",
    },
    sections: {
      hero: "Hero",
      bio: "Tentang Saya",
      services: "Layanan",
      education: "Lini Masa Pendidikan",
      projects: "Proyek Pilihan",
      process: "Proses Kerja",
      cta: "Ajakan Bertindak",
    },
    hero: {
      eyebrow: "Tersedia untuk freelance",
      tagline: "Web developer freelance yang membangun website cepat dan elok, dari desain hingga deployment.",
      viewWork: "Lihat Karya",
      getInTouch: "Hubungi Saya",
      scroll: "gulir",
      stats: [
        { n: "50+", label: "Proyek" },
        { n: "7 Tahun", label: "Pengalaman" },
        { n: "Pendidikan", label: "IT · Taiwan" },
        { n: "Terbuka", label: "Untuk freelance" },
      ],
    },
    cta: {
      eyebrow: "Ayo berkolaborasi",
      headingLine1: "Punya proyek",
      headingLine2: "yang ingin diwujudkan?",
      body: "Siap membantu dari konsep hingga peluncuran. Ceritakan kebutuhanmu dan kita wujudkan bersama.",
      start: "Mulai Proyek →",
      viewWork: "Lihat Karya",
    },
    bio: {
      eyebrow: "Tentang Saya",
      headLead: "Hai, saya Bryan,",
      headAccent: "web developer",
      headRest: " & integrator AI.",
      para1: "Saya web developer freelance yang berbasis di Yogyakarta, fokus membangun website yang tidak hanya tampil tajam, tapi juga cepat, responsif, dan benar-benar bekerja untuk bisnismu. Dari personal branding dan portofolio hingga toko online dan integrasi AI, semua saya tangani dari awal sampai peluncuran.",
      para2: "Stack utama saya adalah React dan Tailwind CSS, kombinasi yang memberi kontrol penuh atas performa sekaligus detail visual. Didukung diploma D3 IT di Taiwan yang membangun fondasi teknis dan pola pikir terstruktur saya, setiap proyek yang saya kerjakan memegang standar yang jelas: bersih, efisien, dan tepat sasaran.",
      para3: "Belakangan ini saya juga mengintegrasikan AI ke produk web, dari sistem berbasis RAG yang benar-benar memahami konteks bisnis, hingga otomatisasi alur kerja dan pipeline cerdas yang terhubung langsung ke operasionalmu. AI bukan sekadar tren; jika disiapkan dengan benar, ia menjadi daya ungkit nyata bagi pertumbuhan bisnismu.",
      techStack: "Tech Stack",
    },
    services: {
      eyebrow: "Layanan",
      heading: "Yang Saya Tawarkan",
      items: [
        {
          title: "Desain UI / UX",
          desc: "Antarmuka yang bersih, estetis, dan ramah pengguna, dirancang agar pengguna merasa nyaman dan bisnismu terlihat profesional.",
        },
        {
          title: "Pengembangan Web",
          desc: "Website cepat, scalable, dan terstruktur rapi dengan React dan Tailwind CSS. Sempurna di setiap perangkat, dari ponsel hingga desktop.",
        },
        {
          title: "Deploy & Maintenance",
          desc: "Dari lokal hingga online, di-deploy ke Vercel atau hosting pilihanmu, termasuk setup domain dan dukungan pasca-peluncuran.",
        },
        {
          title: "Integrasi AI",
          desc: "Sistem AI berbasis RAG yang memahami konteks bisnismu, otomatisasi alur kerja via API, dan pipeline cerdas yang terhubung langsung ke operasionalmu.",
        },
      ],
    },
    education: {
      eyebrow: "Latar Belakang",
      heading: "Lini Masa Pendidikan",
      scrollHint: "gulir untuk menjelajah",
      items: [
        { status: "SMA",         desc: "IPA, Gembala Baik",     location: "Pontianak",  year: "Fondasi" },
        { status: "Gelar D3",    desc: "IT & Teknik",           location: "Taiwan",     year: "2020" },
        { status: "Universitas", desc: "IT, Atma Jaya",         location: "Yogyakarta", year: "2023" },
        { status: "Sekarang",    desc: "Membangun Website-mu",  location: "Kamar Saya", year: "Hari Ini" },
      ],
    },
    process: {
      eyebrow: "Cara Saya Bekerja",
      heading: "Proses Kerja",
      stepLabel: "Langkah",
      items: [
        {
          title: "Discovery",
          desc: "Kita bicara dulu tentang bisnis, tujuan, dan target audiensmu. Dari situ saya petakan apa yang benar-benar dibutuhkan, bukan sekadar fitur, tapi solusinya.",
          note: "Brief · Tujuan",
        },
        {
          title: "Desain",
          desc: "Wireframe dan mockup UI dibuat di Figma. Kamu bisa meninjau, memberi masukan, dan meminta perubahan sebelum satu baris kode pun ditulis.",
          note: "Figma · Mockup",
        },
        {
          title: "Build",
          desc: "Pengembangan dimulai dengan React dan Tailwind sebagai fondasi: bersih, cepat, dan scalable. Setiap komponen dibangun dengan standar yang jelas.",
          note: "React · Tailwind",
        },
        {
          title: "Peluncuran",
          desc: "Di-deploy ke layanan hosting pilihanmu. Setup domain, pengecekan performa, dan memastikan semuanya berjalan sempurna sebelum go-live.",
          note: "Vercel · Domain",
        },
      ],
    },
    projects: {
      eyebrow: "Karya Pilihan",
      heading: "Yang sudah saya bangun.",
      visitSite: "Kunjungi situs",
      inDevelopment: "Dalam pengembangan",
      comingSoon: "Pratinjau langsung segera hadir",
      prev: "Proyek sebelumnya",
      next: "Proyek berikutnya",
      view: "Lihat",
      openNewTab: "Buka di tab baru",
      regionLabel: "Pratinjau proyek",
      items: [
        {
          category: "Platform E-Commerce",
          description: "Toko streetwear dengan halaman produk bergaya editorial, filter instan, dan alur checkout yang dirancang agar pembeli terus bergerak.",
          caseStudy: {
            problem: "Tingkat keranjang belanja yang ditinggalkan sangat tinggi dan pengalaman menjelajah di HP kurang mulus.",
            solution: "Mendesain toko berorientasi mobile dengan performa tinggi, filter instan, dan alur checkout tanpa hambatan.",
            result: "Meningkatkan tingkat konversi mobile sebesar 40% dan mempercepat waktu muat halaman secara drastis."
          }
        },
        {
          category: "Sistem Booking Klinik",
          description: "Sistem booking klinik dengan penjadwalan janji temu, rekam medis pasien, dan dashboard dokter yang tetap cepat di perangkat apa pun.",
          caseStudy: {
            problem: "Penjadwalan manual sering menyebabkan bentrok jadwal dan membuat pasien kecewa.",
            solution: "Mengembangkan sistem booking kustom dengan ketersediaan real-time dan dashboard intuitif untuk staf klinik.",
            result: "Menghilangkan konflik jadwal dan mengurangi beban kerja admin hingga 15 jam seminggu."
          }
        },
        {
          category: "Landing Klinik Kecantikan",
          description: "Landing page klinik estetika premium dengan nuansa editorial, katalog layanan, galeri, dan booking konsultasi.",
          caseStudy: {
            problem: "Kualitas premium klinik tidak tercermin secara online, sehingga permintaan konsultasi digital sangat rendah.",
            solution: "Membangun landing page bergaya editorial yang mencolok secara visual menggunakan animasi modern untuk menyampaikan kesan mewah.",
            result: "Meningkatkan citra merek dan mendongkrak booking konsultasi online hingga 60% di bulan pertama."
          }
        },
        {
          category: "Platform Otomatisasi AI",
          description: "Platform otomatisasi AI untuk UKM Indonesia yang mengubah chat WhatsApp dan Instagram menjadi pipeline penjualan yang berjalan sendiri.",
          caseStudy: {
            problem: "UKM kewalahan membalas pesan berulang dari pelanggan di WhatsApp, yang menyebabkan respons lambat dan hilangnya potensi penjualan.",
            solution: "Membangun AI Chatbot kustom berbasis RAG yang terintegrasi langsung dengan Meta API. Sistem ini membaca basis pengetahuan produk untuk menjawab pertanyaan kompleks secara otomatis.",
            result: "Berhasil mengotomatisasi 85% pesan berulang dan memberikan layanan pelanggan 24/7, meningkatkan konversi prospek hingga 3x lipat."
          }
        },
        {
          category: "Company Profile / Katalog",
          description: "Company profile dan katalog produk untuk pemasok kemasan plastik, mencakup lini produk, kisah perusahaan, dan kontak.",
          caseStudy: {
            problem: "Pembeli B2B kesulitan mencari spesifikasi produk tertentu dari katalog PDF yang sudah usang.",
            solution: "Membuat katalog digital terstruktur yang mudah dinavigasi, dengan lini produk yang jelas dan fitur inquiry langsung.",
            result: "Menyederhanakan proses pembelian B2B, mempercepat siklus penjualan, dan meningkatkan prospek masuk (leads) sebesar 25%."
          }
        },
        {
          category: "Kontes Competitive Programming",
          description: "Platform acara untuk LINK 2026, kontes competitive programming, dengan login tim, info kontes, dan lini masa.",
          caseStudy: {
            problem: "Manajemen pendaftaran tim, pengumuman, dan lini masa untuk kontes besar sangat kacau dan rawan kesalahan.",
            solution: "Membangun platform acara terpusat dengan portal tim yang aman, lini masa otomatis, dan instruksi yang jelas.",
            result: "Berhasil mendaftarkan 100+ tim tanpa kesalahan registrasi sama sekali dan secara dramatis meningkatkan pengalaman peserta."
          }
        },
      ],
    },
    footer: {
      available: "Tersedia",
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
};
