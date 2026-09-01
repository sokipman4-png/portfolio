// ================================================================
// SATU-SATUNYA SUMBER DATA WEBSITE.
// Semua isi portfolio diedit manual di file ini.
// Tidak ada hubungan dengan scanner.
// ================================================================

export const site = {
  brand: "SIHRIZAL",
  location: "Indonesia",
  email: "hello@sihrizal.online",
  github: "https://github.com/sokipman4-png",
  profileImage: "/images/profile-placeholder.webp",

  // Tampilan awal: "editorial", "terminal", "studio"
  defaultDesign: "editorial",

  // Ubah false setelah Anda selesai mencoba 3 desain.
  showDesignSwitcher: true,

  // Analytics pengunjung memakai Cloudflare D1.
  traffic: {
    enabled: true,
    timeZone: "Asia/Jakarta",
    activeWindowSeconds: 90,
    refreshSeconds: 15,
    heartbeatSeconds: 25,
  },

  // Statistik hero — manual.
  stats: {
    projects: 34,
    sourceLines: 5056831,
    sourceFiles: 7572,
    technologies: 40,
  },

  // Strip skill/teknologi di halaman Beranda.
  marquee: [
    "Go", "Python", "Node.js", "React", "Vite", "FastAPI",
    "Firebase", "Redis", "SQLite", "WebSocket", "Socket.IO",
    "ESP32", "Arduino", "Flutter", "Kotlin", "Bluetooth LE",
    "Playwright", "OpenRouter", "WhatsMeow", "GPS"
  ],
}

export const copy = {
  id: {
    languageGate: {
      kicker: "Bahasa tampilan",
      title: "Pilih bahasa",
      body: "Pilih bahasa yang ingin digunakan. Anda bisa menggantinya kapan saja dari menu atas.",
      id: "Bahasa Indonesia",
      en: "English"
    },
    design: {
      label: "Tampilan",
      editorial: "Editorial",
      terminal: "Terminal",
      studio: "Studio",
      theme: "Mode",
      light: "Terang",
      dark: "Gelap",
      effect: "Efek pindah",
      book: "Buka buku",
      fade: "Soft fade",
      slide: "Geser",
      wipe: "Curtain"
    },
    nav: {
      home: "Beranda",
      work: "Project pilihan",
      index: "Semua project",
      current: "Sedang dikerjakan",
      activities: "Kegiatan",
      videos: "Video",
      about: "Tentang",
      contact: "Kontak"
    },
    hero: {
      eyebrow: "Independent builder · Indonesia",
      line1: "Saya membangun",
      line2: "software, sistem realtime",
      line3: "dan perangkat.",
      body: "Portfolio berisi project software, eksperimen AI, sistem realtime, aplikasi, hardware, kegiatan, dan tutorial yang saya kerjakan.",
      cta: "Lihat project",
      currentCta: "Lihat yang sedang dikerjakan"
    },
    bio: {
      kicker: "Perkenalan",
      title: "Saya suka membangun sesuatu yang benar-benar bisa dipakai.",
      body1: "Fokus saya ada pada proses mengubah ide menjadi sistem yang berjalan: dari interface, backend, otomasi dan komunikasi realtime, sampai perangkat berbasis ESP32.",
      body2: "Saya menikmati proses mencoba, membongkar masalah, menguji pendekatan baru, lalu menyederhanakannya sampai hasil akhirnya terasa jelas dan berguna.",
      photoAlt: "Foto profil",
      focusLabel: "Area yang sering saya kerjakan",
      focus: ["Web & backend systems", "AI & automation", "Realtime communication", "IoT & hardware"]
    },
    stats: {
      projects: "projects detected",
      lines: "source lines",
      files: "source files",
      technologies: "technologies"
    },
    current: {
      kicker: "Sedang dikerjakan",
      title: "Project yang sedang berjalan.",
      body: "Waktu pengerjaan dihitung otomatis dari waktu order, jadi durasi tidak perlu diperbarui manual.",
      ordered: "Waktu order",
      elapsed: "Sudah berjalan",
      estimate: "Estimasi",
      expected: "Perkiraan selesai",
      purpose: "Kegunaan",
      price: "Harga",
      requests: "Permintaan",
      interested: "Peminat",
      interestButton: "Saya tertarik",
      interestedButton: "Minat tercatat",
      demo: "Contoh data",
      notSet: "Belum diisi"
    },
    index: {
      kicker: "Project index",
      title: "Daftar project.",
      body: "Cari project berdasarkan nama. Jumlah pengguna dan akses ditampilkan langsung agar project yang paling aktif mudah ditemukan.",
      placeholder: "Cari nama project...",
      users: "Pengguna",
      accesses: "Akses",
      price: "Harga",
      license: "Lisensi",
      open: "Lihat",
      sortLabel: "Urutkan",
      sortUsersDesc: "Pengguna terbanyak",
      sortUsersAsc: "Pengguna tersedikit",
      sortAccessDesc: "Akses terbanyak",
      sortPriceAsc: "Harga termurah",
      sortPriceDesc: "Harga termahal",
      sortAZ: "Nama A–Z",
      sortZA: "Nama Z–A",
      top: "Top"
    },
    project: {
      kicker: "Detail project",
      users: "Pengguna saat ini",
      accesses: "Jumlah akses",
      price: "Harga",
      license: "Jenis akses",
      platforms: "Platform",
      highlights: "Fitur utama",
      noDescription: "Deskripsi project belum diisi.",
      notSet: "Belum diisi"
    },
    activities: {
      kicker: "Perjalanan & kegiatan",
      title: "Catatan kegiatan seperti berita pribadi.",
      body: "Seminar, sharing session, kunjungan, kegiatan komunitas, dan perjalanan ditampilkan dalam satu halaman khusus.",
      demo: "Contoh kegiatan"
    },
    videos: {
      kicker: "Video & tutorial",
      title: "Video terbaru dari YouTube.",
      body: "Upload terbaru dapat muncul otomatis setelah Channel ID diisi.",
      watch: "Tonton di YouTube",
      empty: "Isi YouTube Channel ID di src/data/site-content.js."
    },
    about: {
      kicker: "Tentang",
      title: "Buat bekerja. Lalu buat jelas.",
      items: [
        ["A", "Fungsi lebih dulu", "Tampilan harus membantu orang menyelesaikan sesuatu."],
        ["B", "Cepat sejak awal", "Kurangi beban yang tidak perlu dan jaga halaman tetap ringan."],
        ["C", "Lihat sistem secara utuh", "Frontend, backend, realtime, data, dan perangkat saling terhubung."],
        ["D", "Uji, bukan asumsi", "Saya lebih suka menguji lalu memperbaiki dari hasil nyata."]
      ],
      skillsTitle: "Skill & area yang saya kerjakan",
      skillsBody: "Skill di bawah dirangkum dari jenis project yang saya bangun. Tidak memakai persentase kemampuan agar fokus pada bidang yang benar-benar pernah dikerjakan.",
      skillsTab: "Skill",
      trafficTab: "Trafik",
      trafficTitle: "Trafik website",
      trafficBody: "Ringkasan pengunjung anonim berdasarkan browser. Grafik menampilkan pengunjung unik harian selama 30 hari terakhir.",
      trafficToday: "Hari ini",
      trafficWeek: "7 hari",
      trafficMonth: "30 hari",
      trafficYear: "365 hari",
      trafficNow: "Online sekarang",
      trafficChart: "30 hari terakhir",
      trafficNotReady: "Analytics belum diaktifkan. Hubungkan D1 dengan binding PORTFOLIO_DB.",
      trafficPrivacy: "Tidak menyimpan IP mentah. ID browser di-hash di server; angka merupakan perkiraan perangkat/browser unik, bukan identitas orang."
    },
    contact: {
      kicker: "Kontak",
      title: "Punya ide yang menarik untuk dibangun?",
      body: "Hubungi saya untuk membahas project, eksperimen, atau kolaborasi."
    }
  },

  en: {
    languageGate: {
      kicker: "Display language",
      title: "Choose a language",
      body: "Choose your preferred language. You can switch it anytime from the top menu.",
      id: "Bahasa Indonesia",
      en: "English"
    },
    design: {
      label: "Design",
      editorial: "Editorial",
      terminal: "Terminal",
      studio: "Studio",
      theme: "Mode",
      light: "Light",
      dark: "Dark",
      effect: "Transition",
      book: "Book flip",
      fade: "Soft fade",
      slide: "Slide",
      wipe: "Curtain"
    },
    nav: {
      home: "Home",
      work: "Selected work",
      index: "All projects",
      current: "In progress",
      activities: "Activities",
      videos: "Videos",
      about: "About",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Independent builder · Indonesia",
      line1: "I build",
      line2: "software, realtime systems",
      line3: "and devices.",
      body: "A portfolio of software projects, AI experiments, realtime systems, applications, hardware, activities, and tutorials.",
      cta: "View projects",
      currentCta: "See work in progress"
    },
    bio: {
      kicker: "Introduction",
      title: "I like building things that can actually be used.",
      body1: "My focus is turning ideas into working systems: interfaces, backends, automation, realtime communication, and ESP32-based devices.",
      body2: "I enjoy exploring problems, testing approaches, and simplifying the result until it feels clear and useful.",
      photoAlt: "Profile photo",
      focusLabel: "Areas I often work across",
      focus: ["Web & backend systems", "AI & automation", "Realtime communication", "IoT & hardware"]
    },
    stats: {
      projects: "projects detected",
      lines: "source lines",
      files: "source files",
      technologies: "technologies"
    },
    current: {
      kicker: "In progress",
      title: "Projects currently being built.",
      body: "Elapsed build time is calculated automatically from the order timestamp.",
      ordered: "Ordered at",
      elapsed: "Elapsed",
      estimate: "Estimate",
      expected: "Expected finish",
      purpose: "Purpose",
      price: "Price",
      requests: "Requests",
      interested: "Interested",
      interestButton: "I'm interested",
      interestedButton: "Interest saved",
      demo: "Sample data",
      notSet: "Not set"
    },
    index: {
      kicker: "Project index",
      title: "Project directory.",
      body: "Search by project name. Current users and access counts are shown directly so the most active projects are easy to spot.",
      placeholder: "Search project name...",
      users: "Users",
      accesses: "Accesses",
      price: "Price",
      license: "License",
      open: "Open",
      sortLabel: "Sort",
      sortUsersDesc: "Most users",
      sortUsersAsc: "Fewest users",
      sortAccessDesc: "Most accessed",
      sortPriceAsc: "Lowest price",
      sortPriceDesc: "Highest price",
      sortAZ: "Name A–Z",
      sortZA: "Name Z–A",
      top: "Top"
    },
    project: {
      kicker: "Project detail",
      users: "Current users",
      accesses: "Access count",
      price: "Price",
      license: "Access type",
      platforms: "Platforms",
      highlights: "Highlights",
      noDescription: "Project description has not been added.",
      notSet: "Not set"
    },
    activities: {
      kicker: "Journey & activities",
      title: "Personal news-style activity notes.",
      body: "Seminars, sharing sessions, visits, community activities, and journeys live in one dedicated view.",
      demo: "Sample activity"
    },
    videos: {
      kicker: "Videos & tutorials",
      title: "Latest YouTube videos.",
      body: "Recent uploads can appear automatically after the Channel ID is configured.",
      watch: "Watch on YouTube",
      empty: "Add your YouTube Channel ID in src/data/site-content.js."
    },
    about: {
      kicker: "About",
      title: "Make it work. Then make it clear.",
      items: [
        ["A", "Useful first", "Interfaces should help people finish something."],
        ["B", "Fast by default", "Reduce unnecessary weight and keep the page lean."],
        ["C", "Think in systems", "Frontend, backend, realtime, data, and devices belong together."],
        ["D", "Test, don't assume", "I prefer testing ideas and improving from real results."]
      ],
      skillsTitle: "Skills & areas I work across",
      skillsBody: "These areas are summarized from the kinds of projects I build. No arbitrary percentage scores are used.",
      skillsTab: "Skills",
      trafficTab: "Traffic",
      trafficTitle: "Website traffic",
      trafficBody: "Anonymous browser-based visitor summary. The chart shows daily unique visitors for the last 30 days.",
      trafficToday: "Today",
      trafficWeek: "7 days",
      trafficMonth: "30 days",
      trafficYear: "365 days",
      trafficNow: "Online now",
      trafficChart: "Last 30 days",
      trafficNotReady: "Analytics is not enabled yet. Bind a D1 database as PORTFOLIO_DB.",
      trafficPrivacy: "Raw IP addresses are not stored. Browser IDs are hashed server-side; counts approximate unique devices/browsers, not human identities."
    },
    contact: {
      kicker: "Contact",
      title: "Have something interesting to build?",
      body: "Get in touch to discuss a project, experiment, or collaboration."
    }
  }
}

// Skill manual — edit/tambah/hapus sendiri.
export const skills = [
  {
    id: "automation",
    title: "Automation Systems",
    description: {
      id: "Merancang workflow otomatis untuk proses berulang, order, monitoring, dan komunikasi.",
      en: "Designing automation workflows for repetitive processes, ordering, monitoring, and communication."
    }
  },
  {
    id: "backend",
    title: "Backend Systems",
    description: {
      id: "Membangun API, service, penyimpanan data, serta integrasi antar sistem.",
      en: "Building APIs, services, data persistence, and system integrations."
    }
  },
  {
    id: "ai-agent",
    title: "AI Agent",
    description: {
      id: "Eksperimen dan pengembangan agent untuk membantu pekerjaan digital yang berulang.",
      en: "Experimenting with and building agents for repetitive digital work."
    }
  },
  {
    id: "android",
    title: "Android Apps",
    description: {
      id: "Membangun aplikasi Android untuk marketplace, tracking, finance, reward, dan utilitas.",
      en: "Building Android apps for marketplaces, tracking, finance, rewards, and utilities."
    }
  },
  {
    id: "iot",
    title: "IoT / ESP32",
    description: {
      id: "Menggabungkan software dengan ESP32, Arduino, GPS, Bluetooth LE, dan perangkat fisik.",
      en: "Connecting software with ESP32, Arduino, GPS, Bluetooth LE, and physical devices."
    }
  },
  {
    id: "realtime",
    title: "Realtime Systems",
    description: {
      id: "Mengerjakan komunikasi realtime, WebSocket, event, tracking, dan status yang terus berubah.",
      en: "Working with realtime communication, WebSocket, events, tracking, and changing state."
    }
  },
  {
    id: "messaging",
    title: "WhatsApp / Discord Bots",
    description: {
      id: "Membuat bot komunikasi, notifikasi, workflow customer service, dan otomasi komunitas.",
      en: "Building communication bots, notifications, customer-service workflows, and community automation."
    }
  },
  {
    id: "data",
    title: "Data & Web Extraction",
    description: {
      id: "Mengambil, menyusun, dan mengolah data website untuk kebutuhan analisis atau workflow lanjutan.",
      en: "Collecting, structuring, and processing web data for analysis and downstream workflows."
    }
  },
  {
    id: "tracking",
    title: "GPS & Tracking",
    description: {
      id: "Eksperimen tracking lokasi dan perangkat melalui aplikasi, GPS, dan hardware kustom.",
      en: "Experimenting with location and device tracking through apps, GPS, and custom hardware."
    }
  },
  {
    id: "network",
    title: "Networking & Proxy",
    description: {
      id: "Eksperimen jaringan, koneksi lokal, proxy, dan integrasi antar perangkat.",
      en: "Experimenting with networking, local connectivity, proxies, and device integration."
    }
  }
]

// ================================================================
// DATA PROJECT MANUAL TERBARU.
// Hanya edit di sini. Tidak ada teknologi/bahasa yang ditampilkan lagi.
// Cara mengisi `business`:
//
// users:
//   Jumlah pengguna saat ini. Contoh: 125.
//   Jika null => tampil "Belum diisi".
//   Jika D1 punya users > 0, nilai live D1 dapat menggantikan angka manual.
//
// accesses:
//   ANGKA AWAL / BASELINE akses. Contoh: 1800.
//   Website akan menampilkan: accesses manual + akses baru dari D1.
//   Jadi isi 1800 jika sebelum counter live project sudah pernah diakses 1800 kali.
//
// price:
//   Teks yang tampil. Bisa object ID/EN seperti:
//   price: { id: "Rp99.000 / bulan", en: "IDR 99,000 / month" }
//   atau string sederhana: price: "Rp99.000 / bulan"
//
// priceValue:
//   ANGKA MURNI untuk sorting harga. Contoh: 99000.
//   Tidak ditampilkan ke visitor.
//
// license:
//   Jenis akses yang tampil, mis. "Lisensi bulanan" / "Beli putus (full code)".
//
// topRank:
//   Ranking manual cadangan. Angka 1 = prioritas tertinggi.
//   Digunakan jika jumlah pengguna sama / belum ada.
//   Badge Top 1/2/3 mengikuti ranking akhir website.
// ================================================================
export const projects = [
  {
    "id": "antam-bot",
    "title": "Antam Bot",
    "visible": true,
    "featured": true,
    "featuredRank": 1,
    "category": "Automation",
    "description": {
      "id": "Sistem otomasi untuk membantu proses pemesanan produk Antam melalui Logam Mulia, mulai dari input data melalui WhatsApp, pemantauan stok, hingga notifikasi status antrean dan checkout. Dirancang agar proses yang berulang dapat berjalan lebih praktis dan terpusat.",
      "en": "An automation system designed to streamline Antam ordering through Logam Mulia, from WhatsApp-based data input and stock monitoring to queue and checkout status notifications. Built to make repetitive ordering workflows more practical and centralized."
    },
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android / Termux",
      "VPS"
    ],
    "highlights": {
      "id": [
        "Input dan pengaturan melalui WhatsApp",
        "Pemantauan stok Antam secara real-time",
        "Notifikasi status antrean dan checkout",
        "Dapat dijalankan di server sendiri atau layanan titip server"
      ],
      "en": [
        "WhatsApp-based setup and input",
        "Real-time Antam stock monitoring",
        "Queue and checkout status notifications",
        "Self-hosted or managed-server deployment"
      ]
    },
    "business": {
      "users": 132.874,
      "price": {
        "id": "6.500.000",
        "en": "6.500.000"
      },
      "license": {
        "id": "Bulanan",
        "en": "Monthly"
      },
      "topRank": 1,
      "accesses": 1.321,
      "priceValue": null
    }
  },
  {
    "id": "shopee-automation",
    "title": "Shopee Bot Automation",
    "visible": true,
    "featured": true,
    "featuredRank": 2,
    "category": "Automation",
    "description": {
      "id": "Bot otomasi pemesanan untuk Shopee yang membantu menjalankan order terjadwal, termasuk kebutuhan flash sale atau pembelian pada waktu tertentu. Cocok untuk workflow yang membutuhkan eksekusi cepat dan konsisten tanpa harus menjalankan langkah yang sama secara manual.",
      "en": "An ordering automation bot for Shopee that supports scheduled purchases, including flash-sale workflows and time-based ordering. Designed for workflows that need fast, consistent execution without repeating the same manual steps."
    },
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android / Termux",
      "VPS"
    ],
    "highlights": {
      "id": [
        "Order otomatis berdasarkan waktu",
        "Mendukung workflow flash sale",
        "Dapat dijalankan pada server sendiri",
        "Opsi penggunaan melalui layanan titip server"
      ],
      "en": [
        "Time-based automated ordering",
        "Flash-sale workflow support",
        "Self-hosted deployment",
        "Managed-server option"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": 4,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "chesstl",
    "title": "ChessTL",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Education",
    "description": {
      "id": "Aplikasi latihan catur berbasis Android yang membantu pengguna memahami langkah berikutnya melalui panduan suara saat berlatih. Fokusnya adalah mempercepat proses belajar, membangun pola berpikir posisi, dan membantu pengguna mengevaluasi pilihan langkah dengan lebih terarah.",
      "en": "An Android chess-training application that guides users through suggested next moves using audio feedback during practice. Its focus is accelerating learning, developing positional thinking, and helping users evaluate move choices more systematically."
    },
    "platforms": [
      "Android"
    ],
    "highlights": {
      "id": [
        "Panduan langkah melalui suara",
        "Dirancang untuk latihan dan pembelajaran catur",
        "Membantu membangun pola pikir posisi dan keputusan langkah"
      ],
      "en": [
        "Audio move guidance",
        "Designed for chess practice and learning",
        "Helps develop positional thinking and move-selection habits"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "sahmmanbo",
    "title": "SahmmanBo",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Finance",
    "description": {
      "id": "Program analisis saham yang membantu membaca pola pergerakan harga, membuat proyeksi hingga tujuh hari ke depan, dan memberikan indikator sederhana untuk membantu proses evaluasi sebuah saham. Tersedia mode simulasi dengan saldo virtual agar strategi dapat diuji sebelum digunakan pada kondisi nyata.",
      "en": "A stock-analysis program that helps identify price patterns, produce projections for up to seven days, and provide simple indicators to support stock evaluation. It also includes a virtual-balance simulation mode for testing strategies before applying them in real conditions."
    },
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "highlights": {
      "id": [
        "Analisis pola harga",
        "Proyeksi pergerakan hingga tujuh hari",
        "Indikator evaluasi kelayakan",
        "Simulasi dengan saldo virtual"
      ],
      "en": [
        "Price-pattern analysis",
        "Up-to-seven-day movement projections",
        "Evaluation indicators",
        "Virtual-balance simulation"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "wistabo",
    "title": "WisTabo",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Travel",
    "description": {
      "id": "Bot otomasi untuk membantu proses booking tiket wisata pada tiketwisata.surabaya.go.id. Pengaturan dapat dilakukan melalui WhatsApp sehingga proses pemesanan lebih mudah dikontrol tanpa harus terus membuka halaman web secara manual.",
      "en": "An automation bot for booking attractions through tiketwisata.surabaya.go.id. Configuration can be handled through WhatsApp, making the booking workflow easier to control without repeatedly operating the website manually."
    },
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android / Termux"
    ],
    "highlights": {
      "id": [
        "Booking tiket wisata otomatis",
        "Pengaturan melalui WhatsApp",
        "Dapat dijalankan di desktop maupun Android melalui Termux"
      ],
      "en": [
        "Automated attraction-ticket booking",
        "WhatsApp-based configuration",
        "Desktop and Android/Termux support"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "jaban",
    "title": "JABAN",
    "visible": true,
    "featured": true,
    "featuredRank": 3,
    "category": "Marketplace",
    "description": {
      "id": "Aplikasi Android yang dirancang untuk membantu UMKM, individu, dan perusahaan menjangkau pengguna di sekitar mereka. JABAN menggabungkan pencarian lokasi, komunikasi, layanan driver, dashboard, serta fitur jual-beli agar usaha, produk, dan informasi lebih mudah ditemukan.",
      "en": "An Android application designed to help small businesses, individuals, and companies reach nearby users. JABAN combines location discovery, messaging, driver services, dashboards, and marketplace features to make businesses, products, and information easier to find."
    },
    "platforms": [
      "Android"
    ],
    "highlights": {
      "id": [
        "Login dan pendaftaran pengguna",
        "Chatting dan lokasi toko",
        "Driver dan dashboard",
        "E-commerce tanpa biaya transaksi platform",
        "Dukungan server lokal"
      ],
      "en": [
        "User login and registration",
        "Messaging and store location",
        "Driver services and dashboard",
        "Marketplace without platform transaction fees",
        "Local-server support"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": 2,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "cazzbox",
    "title": "CazzBox",
    "visible": true,
    "featured": true,
    "featuredRank": 4,
    "category": "Rewards",
    "description": {
      "id": "Aplikasi Android berbasis misi dan pelacakan aktivitas perangkat. Pengguna menyelesaikan target waktu tertentu, menerima iklan sesuai aturan program, lalu mengumpulkan poin yang dapat digunakan mengikuti ketentuan reward, termasuk opsi pencairan atau kebutuhan biaya kesehatan.",
      "en": "An Android app built around missions and device-activity tracking. Users complete time-based goals, receive ads according to the program rules, and collect points that can be redeemed under the reward terms, including cash-out or health-related use cases."
    },
    "platforms": [
      "Android"
    ],
    "highlights": {
      "id": [
        "Misi berbasis aktivitas perangkat",
        "Pelacakan waktu penggunaan",
        "Sistem poin dan reward",
        "Opsi penukaran sesuai ketentuan program"
      ],
      "en": [
        "Device-activity missions",
        "Usage-time tracking",
        "Points and rewards",
        "Redemption options under program terms"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "guide",
    "title": "GUIDE",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Travel",
    "description": {
      "id": "Aplikasi Android untuk menemukan dan memesan pemandu wisata di berbagai lokasi. Pengguna memilih tujuan, kemudian menerima penawaran dari pemandu yang mencakup harga, fasilitas, dan layanan sehingga dapat membandingkan opsi sebelum menentukan pilihan.",
      "en": "An Android app for discovering and booking tour guides across different destinations. Users choose a location and receive offers from guides that include pricing, facilities, and services, making it easier to compare options before booking."
    },
    "platforms": [
      "Android"
    ],
    "highlights": {
      "id": [
        "Pencarian pemandu berdasarkan lokasi",
        "Penawaran harga dan fasilitas dari tiap pemandu",
        "Sistem perbandingan / lelang penawaran",
        "Favorit dan pilihan pemandu"
      ],
      "en": [
        "Location-based guide discovery",
        "Guide-specific pricing and facilities",
        "Offer comparison / bidding model",
        "Favorites and guide selection"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "catat-keuanganku",
    "title": "Catat Keuanganku",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Finance",
    "description": {
      "id": "Aplikasi Android untuk membantu mengelola kondisi keuangan pribadi secara lebih terstruktur. Mencakup pencatatan pemasukan, pengeluaran, tabungan, aset simpanan, grafik perubahan nilai aset seperti emas atau perak, serta sistem misi untuk membantu pengguna mencapai target keuangan.",
      "en": "An Android application for managing personal finances in a more structured way. It covers income, expenses, savings, stored assets, value-change charts for assets such as gold or silver, and goal-based missions to help users work toward financial targets."
    },
    "platforms": [
      "Android"
    ],
    "highlights": {
      "id": [
        "Pemasukan dan pengeluaran",
        "Tabungan dan aset simpanan",
        "Grafik perubahan nilai aset",
        "Misi dan target keuangan"
      ],
      "en": [
        "Income and expense tracking",
        "Savings and stored assets",
        "Asset-value charts",
        "Financial goals and missions"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "rpgautobot",
    "title": "RPGautoBot",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Game Automation",
    "description": {
      "id": "Program otomasi gerakan untuk eksperimen pada lingkungan game RPG Android. Sistem dapat merekam atau menjalankan pola gerakan kustom, mengikuti objek yang bergerak, dan mengeksekusi aktivitas secara otomatis di latar belakang untuk kebutuhan pengujian dan pembelajaran otomasi.",
      "en": "A movement-automation program for experimentation in Android RPG environments. It can record or execute custom movement patterns, track moving objects, and run automated actions in the background for automation testing and learning."
    },
    "platforms": [
      "Windows",
      "Linux",
      "macOS",
      "Android"
    ],
    "highlights": {
      "id": [
        "Gerakan kustom seperti macro/autoclick",
        "Pelacakan objek bergerak",
        "Otomasi aktivitas di latar belakang"
      ],
      "en": [
        "Custom movement and macro-like actions",
        "Moving-object tracking",
        "Background activity automation"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "laben",
    "title": "LaBen",
    "visible": true,
    "featured": true,
    "featuredRank": 5,
    "category": "IoT",
    "description": {
      "id": "Sistem pelacakan lokasi benda yang menghubungkan aplikasi Android dengan perangkat ESP32 atau Arduino kustom. Dirancang untuk membantu memantau posisi objek melalui kombinasi hardware dan aplikasi mobile.",
      "en": "An object-location tracking system connecting an Android application with custom ESP32 or Arduino hardware. Designed to monitor the position of physical objects through a combination of embedded hardware and mobile software."
    },
    "platforms": [
      "Android",
      "ESP32",
      "Arduino"
    ],
    "highlights": {
      "id": [
        "Tracking lokasi benda",
        "Integrasi aplikasi Android dengan perangkat kustom",
        "Dukungan ESP32 / Arduino"
      ],
      "en": [
        "Object-location tracking",
        "Android app and custom-device integration",
        "ESP32 / Arduino support"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "proxkal",
    "title": "ProxKal",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Networking",
    "description": {
      "id": "Program untuk membangun proxy lokal dengan memanfaatkan koneksi data dari perangkat Android. Sistem dirancang untuk membuat dan mengelola banyak endpoint proxy dari koneksi yang tersedia, dengan dukungan desktop serta Android yang sudah memiliki akses root.",
      "en": "A program for creating local proxy endpoints using an Android device's mobile-data connection. It is designed to create and manage multiple proxy endpoints from available connections, with desktop support and rooted-Android operation."
    },
    "platforms": [
      "Windows",
      "Linux",
      "Android (root)"
    ],
    "highlights": {
      "id": [
        "Membangun proxy lokal dari koneksi data Android",
        "Mendukung banyak endpoint/IP sesuai konfigurasi dan jaringan",
        "Penggunaan desktop dan Android dengan akses root"
      ],
      "en": [
        "Local proxies from Android mobile data",
        "Multiple endpoints/IPs depending on configuration and network",
        "Desktop and rooted-Android operation"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "ytm",
    "title": "YTM",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Utility",
    "description": {
      "id": "Utility untuk mengotomatisasi pengunduhan dan konversi daftar video YouTube menjadi file audio MP3 dari daftar URL yang disimpan di file teks. Cocok untuk pemrosesan batch pada konten yang memang diizinkan untuk diunduh.",
      "en": "A utility for automating the download and conversion of a list of YouTube videos into MP3 audio files from URLs stored in a text file. Designed for batch processing of content that is permitted to be downloaded."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Input daftar URL dari file .txt",
        "Proses download secara massal",
        "Konversi hasil menjadi MP3"
      ],
      "en": [
        "URL-list input from a .txt file",
        "Batch downloading",
        "MP3 conversion"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "boiket",
    "title": "Boiket",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Ticketing",
    "description": {
      "id": "Bot otomasi untuk membantu proses pemesanan tiket pada Tiket.com. Dibuat untuk mengurangi langkah manual pada alur pemesanan dan mengeksekusi workflow order secara lebih konsisten.",
      "en": "An automation bot for assisting ticket ordering on Tiket.com. Built to reduce repetitive manual steps in the booking flow and execute the ordering workflow more consistently."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Otomasi alur pemesanan tiket",
        "Mengurangi langkah order manual"
      ],
      "en": [
        "Automated ticket-ordering flow",
        "Reduces repetitive booking steps"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "lokbot",
    "title": "LoKBot",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Ticketing",
    "description": {
      "id": "Bot otomasi pemesanan tiket yang dirancang untuk workflow berbasis Loket.com. Fokusnya adalah menjalankan tahapan order secara otomatis agar proses pembelian tiket lebih ringkas.",
      "en": "An automated ticket-ordering bot designed around Loket.com workflows. Its focus is automating ordering steps to make the ticket-purchase process more streamlined."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Otomasi workflow pemesanan",
        "Integrasi alur berbasis Loket.com"
      ],
      "en": [
        "Automated ordering workflow",
        "Loket.com-based flow integration"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "trackgep",
    "title": "TrackGep",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "IoT",
    "description": {
      "id": "Program GPS tracking untuk perangkat ESP32 atau Arduino. Project ini berfokus pada pengambilan dan pemantauan informasi lokasi dari perangkat embedded yang dapat digunakan sebagai bagian dari sistem pelacakan kustom.",
      "en": "A GPS-tracking program for ESP32 or Arduino devices. The project focuses on collecting and monitoring location data from embedded hardware as part of a custom tracking system."
    },
    "platforms": [
      "ESP32",
      "Arduino"
    ],
    "highlights": {
      "id": [
        "GPS tracking",
        "Integrasi perangkat embedded"
      ],
      "en": [
        "GPS tracking",
        "Embedded-device integration"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "keyloss",
    "title": "Keyloss",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "IoT",
    "description": {
      "id": "Sistem alarm kunci motor berbasis ESP32 yang dirancang untuk membantu memberikan peringatan pada skenario kunci atau perangkat terkait kendaraan tertinggal atau terpisah dari pengguna.",
      "en": "An ESP32-based motorcycle-key alarm system designed to provide alerts when a key or related vehicle device is left behind or becomes separated from the user."
    },
    "platforms": [
      "ESP32"
    ],
    "highlights": {
      "id": [
        "Alarm berbasis perangkat ESP32",
        "Fokus pada keamanan dan pengingat kunci motor"
      ],
      "en": [
        "ESP32-based alert system",
        "Motorcycle-key safety and reminder use case"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "macalearn",
    "title": "Macalearn",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "AI / Training",
    "description": {
      "id": "Program untuk membantu proses training internal perusahaan dengan memanfaatkan kumpulan database sebagai sumber materi dan pengetahuan. Dirancang agar informasi perusahaan dapat dipelajari dan digunakan dalam proses pelatihan yang lebih terstruktur.",
      "en": "A program for supporting internal company training using a collected database as its knowledge and learning source. Designed to make company information easier to structure and reuse during training."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Training berbasis database perusahaan",
        "Pengelolaan pengetahuan untuk kebutuhan internal"
      ],
      "en": [
        "Company-database-based training",
        "Knowledge organization for internal use"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "ai-agent-personal",
    "title": "AI Agent Personal",
    "visible": true,
    "featured": true,
    "featuredRank": 6,
    "category": "AI",
    "description": {
      "id": "Agent berbasis AI yang dirancang untuk membantu mengambil alih pekerjaan digital yang berulang dan monoton. Tujuannya adalah mengurangi tugas manual dengan workflow otomatis yang dapat disesuaikan dengan kebutuhan pengguna.",
      "en": "An AI-based personal agent designed to take over repetitive and monotonous digital tasks. Its goal is to reduce manual work through automation workflows that can be adapted to the user's needs."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Otomasi pekerjaan berulang",
        "Workflow dapat disesuaikan dengan kebutuhan pengguna",
        "Pendekatan berbasis AI Agent"
      ],
      "en": [
        "Repetitive-work automation",
        "User-customizable workflows",
        "AI-agent-based approach"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": 3,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "ai-agent-world",
    "title": "AI Agent World",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "AI",
    "description": {
      "id": "Platform web untuk melatih dan mengembangkan AI Agent agar dapat disesuaikan dengan kebutuhan tertentu. Agent yang sudah memiliki kemampuan dan spesialisasi dapat diposisikan sebagai aset digital yang ditawarkan sesuai kebutuhan pengguna atau pembeli.",
      "en": "A web platform for training and developing AI agents around specific needs. Agents with developed capabilities and specializations can be positioned as digital assets offered according to user or buyer requirements."
    },
    "platforms": [
      "Web"
    ],
    "highlights": {
      "id": [
        "Training dan pengembangan agent",
        "Spesialisasi berdasarkan kebutuhan",
        "Konsep marketplace untuk agent"
      ],
      "en": [
        "Agent training and development",
        "Need-based specialization",
        "Agent marketplace concept"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "warkbot",
    "title": "WarKbot",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Automation",
    "description": {
      "id": "Bot otomasi untuk membantu proses pembelian produk pada warlok.com. Sistem dibuat untuk menjalankan alur pembelian secara otomatis sehingga langkah yang berulang dapat ditangani oleh program.",
      "en": "An automation bot for product purchases on warlok.com. The system is designed to execute the buying workflow automatically so repetitive steps can be handled by the program."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Otomasi alur pembelian produk",
        "Mengurangi proses manual berulang"
      ],
      "en": [
        "Automated product-purchase flow",
        "Reduces repetitive manual steps"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "game-kartu-remi",
    "title": "Game Kartu Remi",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Game",
    "description": {
      "id": "Game berbasis web dengan aturan kartu remi yang dapat dikustomisasi. Dibuat sebagai permainan strategi dan latihan berpikir dengan alur permainan yang dapat berjalan otomatis sesuai aturan yang sudah ditentukan.",
      "en": "A web-based card game with customizable rummy rules. Built as a strategy and thinking exercise with gameplay flows that can run automatically according to configured rules."
    },
    "platforms": [
      "Web"
    ],
    "highlights": {
      "id": [
        "Aturan remi kustom",
        "Permainan strategi",
        "Alur permainan otomatis"
      ],
      "en": [
        "Custom rummy rules",
        "Strategy gameplay",
        "Automated game flow"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "jaga-panen-ai",
    "title": "Jaga Panen AI",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Agritech",
    "description": {
      "id": "Sistem untuk membantu pemantauan hasil panen di gudang, termasuk pencatatan kondisi produk dan alur pengiriman. Tujuannya adalah membuat proses monitoring hasil panen lebih terorganisir dan mudah dipantau.",
      "en": "A system for monitoring harvested products in storage, including product-condition records and delivery workflows. Its goal is to make harvest monitoring more organized and easier to track."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Pemantauan hasil panen di gudang",
        "Pencatatan produk",
        "Monitoring alur pengiriman"
      ],
      "en": [
        "Warehouse harvest monitoring",
        "Product records",
        "Delivery-flow monitoring"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "screppro",
    "title": "ScrepPro",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Data Tool",
    "description": {
      "id": "Aplikasi untuk mengambil dan mengumpulkan data dari website tertentu atau sekumpulan halaman web. Dibuat untuk mempermudah proses ekstraksi data yang berulang agar hasilnya dapat digunakan kembali untuk analisis atau kebutuhan lain.",
      "en": "An application for collecting data from specific websites or sets of web pages. Built to simplify repetitive data-extraction workflows so the results can be reused for analysis or other purposes."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Ekstraksi data website",
        "Mendukung target halaman tertentu",
        "Pemrosesan data berulang"
      ],
      "en": [
        "Website data extraction",
        "Specific-page targeting",
        "Repeatable data-processing workflows"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "whatbrodo",
    "title": "WhatBrodo",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Messaging",
    "description": {
      "id": "Chatbot WhatsApp untuk membalas pesan tertentu secara otomatis berdasarkan aturan yang sudah ditentukan. Cocok untuk kebutuhan respons cepat pada pesan berulang, pertanyaan umum, atau workflow layanan pelanggan sederhana.",
      "en": "A WhatsApp chatbot that automatically replies to selected messages based on predefined rules. Suitable for fast responses to repetitive messages, common questions, or simple customer-service workflows."
    },
    "platforms": [
      "WhatsApp"
    ],
    "highlights": {
      "id": [
        "Balasan otomatis berdasarkan aturan",
        "Respons untuk pesan atau kata kunci tertentu",
        "Cocok untuk workflow customer service"
      ],
      "en": [
        "Rule-based auto replies",
        "Message or keyword-specific responses",
        "Customer-service workflow support"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "whutsup",
    "title": "WhutSup!",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Messaging",
    "description": {
      "id": "Chatbot WhatsApp berbasis AI Agent yang dirancang untuk menangani percakapan dan menjawab berbagai pertanyaan secara lebih fleksibel dibanding chatbot berbasis aturan sederhana.",
      "en": "An AI-agent-powered WhatsApp chatbot designed to handle conversations and answer a broad range of questions more flexibly than a simple rule-based chatbot."
    },
    "platforms": [
      "WhatsApp"
    ],
    "highlights": {
      "id": [
        "Percakapan berbasis AI Agent",
        "Jawaban fleksibel untuk berbagai pertanyaan",
        "Integrasi melalui WhatsApp"
      ],
      "en": [
        "AI-agent conversations",
        "Flexible answers across different questions",
        "WhatsApp integration"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "rpg-absolute",
    "title": "RPG Absolute",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Game",
    "description": {
      "id": "Game bot berbasis Discord dengan konsep permainan RPG. Bot menyediakan pengalaman permainan langsung di server Discord sehingga interaksi pemain dapat berlangsung melalui command dan sistem game yang terintegrasi dengan server.",
      "en": "A Discord-based RPG game bot that brings gameplay directly into a Discord server, allowing players to interact through commands and game systems integrated with the community server."
    },
    "platforms": [
      "Discord"
    ],
    "highlights": {
      "id": [
        "Game RPG di Discord",
        "Interaksi melalui bot dan command",
        "Berjalan di server komunitas"
      ],
      "en": [
        "RPG gameplay in Discord",
        "Bot and command-based interaction",
        "Runs inside community servers"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "guild-bank-app",
    "title": "Guild Bank App",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Finance",
    "description": {
      "id": "Aplikasi perbankan dan manajemen keuangan berbasis Discord untuk komunitas atau server tertentu. Sistem membantu mencatat dan mengelola data keuangan pengguna atau organisasi langsung melalui bot di Discord.",
      "en": "A Discord-based banking and financial-management application for specific communities or servers. It helps record and manage user or organizational financial data directly through a Discord bot."
    },
    "platforms": [
      "Discord"
    ],
    "highlights": {
      "id": [
        "Manajemen data keuangan",
        "Berbasis server Discord",
        "Dapat digunakan untuk komunitas atau organisasi"
      ],
      "en": [
        "Financial-data management",
        "Discord-server based",
        "Suitable for communities or organizations"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "cobs",
    "title": "Cobs",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Data Tool",
    "description": {
      "id": "Bot scraping untuk mengumpulkan data dari website Curse of Aros. Dibuat untuk mengambil informasi yang dibutuhkan secara otomatis agar data lebih mudah dikumpulkan, disimpan, dan digunakan pada proses berikutnya.",
      "en": "A scraping bot for collecting data from the Curse of Aros website. Built to automate information gathering so the data can be stored and reused in downstream workflows."
    },
    "platforms": [],
    "highlights": {
      "id": [
        "Pengambilan data Curse of Aros",
        "Otomasi proses scraping",
        "Data dapat digunakan kembali"
      ],
      "en": [
        "Curse of Aros data collection",
        "Automated scraping workflow",
        "Reusable collected data"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "ipnetbo",
    "title": "IpnetBO",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Finance",
    "description": {
      "id": "Bot berbasis Discord untuk membantu workflow terkait transaksi aset kripto, seperti verifikasi pembayaran dan penerimaan serta proses pembelian coin dari layanan yang terhubung. Dirancang sebagai antarmuka bot untuk mengelola alur transaksi secara lebih terstruktur.",
      "en": "A Discord-based bot for cryptocurrency-related workflows such as payment and receipt verification and coin-purchase processes from connected services. Designed as a bot interface for managing transaction flows in a more structured way."
    },
    "platforms": [
      "Discord"
    ],
    "highlights": {
      "id": [
        "Verifikasi pembayaran dan penerimaan",
        "Workflow pembelian coin",
        "Antarmuka transaksi melalui Discord"
      ],
      "en": [
        "Payment and receipt verification",
        "Coin-purchase workflow",
        "Discord-based transaction interface"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "linkadabot",
    "title": "LinkAdaBot",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Messaging",
    "description": {
      "id": "Bot Discord untuk mendistribusikan berita atau informasi ke pengguna, server, dan channel tertentu. Cocok untuk otomatisasi penyampaian update agar informasi dapat dikirim secara konsisten ke tujuan yang sudah ditentukan.",
      "en": "A Discord bot for distributing news or information to selected users, servers, and channels. Suitable for automating updates so information can be delivered consistently to predefined destinations."
    },
    "platforms": [
      "Discord"
    ],
    "highlights": {
      "id": [
        "Distribusi berita otomatis",
        "Target user, server, atau channel",
        "Pengiriman informasi terjadwal atau terarah"
      ],
      "en": [
        "Automated news distribution",
        "User/server/channel targeting",
        "Directed or scheduled information delivery"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "scanning-file",
    "title": "Scanning File",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Developer Tool",
    "description": {
      "id": "Utility untuk memindai folder project dan menghasilkan ringkasan teknis seperti bahasa pemrograman yang digunakan, jumlah file, serta jumlah kode pada file yang ditemukan. Dibuat untuk membantu memahami isi sebuah workspace tanpa memeriksanya satu per satu.",
      "en": "A utility for scanning project folders and producing technical summaries such as programming languages, file counts, and code volume across discovered files. Built to understand a workspace without inspecting every file manually."
    },
    "platforms": [
      "Windows",
      "Linux",
      "macOS"
    ],
    "highlights": {
      "id": [
        "Scan folder secara rekursif",
        "Identifikasi bahasa pemrograman",
        "Ringkasan file dan jumlah kode"
      ],
      "en": [
        "Recursive folder scanning",
        "Programming-language identification",
        "File and code-volume summaries"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "trackpaper",
    "title": "TrackPaper",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "IoT",
    "description": {
      "id": "Eksperimen hardware dan aplikasi Android untuk membantu melacak perangkat yang hilang dengan konsep perangkat pelacak yang memanfaatkan media berbasis kertas sebagai bagian dari rancangan. Project menggabungkan perangkat fisik dan aplikasi mobile dalam satu sistem tracking.",
      "en": "A hardware and Android-app experiment for tracking lost devices using a tracker concept that incorporates paper-based media as part of the design. The project combines a physical device and mobile software in one tracking system."
    },
    "platforms": [
      "Android",
      "Custom Hardware"
    ],
    "highlights": {
      "id": [
        "Tracking perangkat yang hilang",
        "Kombinasi hardware dan aplikasi Android",
        "Konsep perangkat berbasis kertas"
      ],
      "en": [
        "Lost-device tracking",
        "Hardware and Android-app combination",
        "Paper-based device concept"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  },
  {
    "id": "wa-bot-pro",
    "title": "WA Bot Pro",
    "visible": true,
    "featured": false,
    "featuredRank": null,
    "category": "Messaging",
    "description": {
      "id": "Platform otomasi WhatsApp yang menggabungkan rule-based automation dan AI Agent untuk menangani pesan masuk, membalas pesan tertentu, serta mengirim pesan ke grup atau pelanggan berdasarkan jadwal yang berbeda. Dirancang untuk membantu UMKM dan pengguna umum mengurangi pekerjaan komunikasi yang berulang.",
      "en": "A WhatsApp automation platform combining rule-based automation and AI agents to handle incoming messages, reply to selected conversations, and send messages to groups or customers on different schedules. Designed to help small businesses and general users reduce repetitive communication work."
    },
    "platforms": [
      "WhatsApp"
    ],
    "highlights": {
      "id": [
        "Balasan otomatis untuk pesan umum maupun pesan khusus",
        "Pengiriman pesan terjadwal",
        "Dukungan grup dan pelanggan tertentu",
        "Kombinasi automation dan AI Agent"
      ],
      "en": [
        "Automatic replies for general and specific messages",
        "Scheduled message delivery",
        "Group and selected-customer support",
        "Combination of automation and AI agents"
      ]
    },
    "business": {
      "users": null,
      "price": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "license": {
        "id": "Belum diisi",
        "en": "Not set"
      },
      "topRank": null,
      "accesses": 0,
      "priceValue": null
    }
  }
]

// Project yang sedang dibuat.
export const currentProjects = [
  {
    id: "voucher-activation-automation",
    demo: false,

    name: {
      id: "Voucher Activation Automation",
      en: "Voucher Activation Automation"
    },

    purpose: {
      id: "Menghubungkan dua sistem aplikasi berbeda agar proses aktivasi data voucher paket dapat berjalan otomatis tanpa perlu memindahkan data dan memproses respons secara manual.",
      en: "Connecting two different application systems so voucher package activation can run automatically without manually transferring data or processing responses."
    },

    description: {
      id: "Sistem otomasi yang mengintegrasikan API dari dua aplikasi berbeda ke dalam satu alur kerja. Program membaca input dan respons dari masing-masing API, mengenali pola data menggunakan parsing dan regex, kemudian mengolah hasilnya menjadi perintah yang dapat diteruskan ke sistem berikutnya secara otomatis. Project ini dikembangkan untuk menyederhanakan proses aktivasi data voucher paket, mengurangi pekerjaan berulang, dan membuat alur antar-aplikasi berjalan lebih cepat serta terstruktur.",
      en: "An automation system that integrates APIs from two different applications into a single workflow. The program reads inputs and responses from each API, identifies data patterns through parsing and regular expressions, then transforms the results into commands that can automatically continue to the next system. The project is being developed to simplify voucher package activation, reduce repetitive work, and create a faster and more structured application-to-application workflow."
    },

    price: {
      id: "7.500.000",
      en: "7.500.000"
    },

    // Ganti sesuai waktu project/order sebenarnya.
    orderedAt: "2026-09-01T09:00:00+07:00",

    // Ganti sesuai estimasi pengerjaan.
    estimatedDays: 14,

    requests: 1,
    interestBase: 1
  },

  {
    id: "automated-media-publishing",
    demo: false,

    name: {
      id: "Automated Media Publishing System",
      en: "Automated Media Publishing System"
    },

    purpose: {
      id: "Mengotomatisasi proses pembuatan konten multimedia hingga publikasi ke YouTube, mulai dari pengolahan bahan video, foto, dan audio sampai penjadwalan upload ke akun yang dipilih.",
      en: "Automating the multimedia content creation and YouTube publishing workflow, from processing video, image, and audio assets to scheduled uploads on selected accounts."
    },

    description: {
      id: "Sistem otomasi produksi dan publikasi konten yang dapat menggabungkan video, foto, dan audio menjadi satu hasil akhir secara otomatis. Program dapat menambahkan judul atau teks, memilih variasi efek secara dinamis, menyusun media, dan menghasilkan video siap publikasi. Setelah proses rendering selesai, sistem dapat menjadwalkan serta mengunggah video ke akun YouTube yang telah ditentukan. Dukungan pengaturan akun dan konfigurasi jaringan juga disiapkan agar proses publikasi multi-akun dapat dikelola secara terpisah dan lebih terstruktur.",
      en: "An automated content production and publishing system that combines video, images, and audio into a finished media output. The program can add titles or text, dynamically select visual effects, compose media assets, and generate videos ready for publishing. Once rendering is complete, the system can schedule and upload videos to selected YouTube accounts. Account and network configuration support is also included to keep multi-account publishing workflows separated and organized."
    },

    price: {
      id: "20.000.000",
      en: "20.000.000"
    },

    // Ganti sesuai waktu project/order sebenarnya.
    orderedAt: "2026-09-01T09:00:00+07:00",

    // Ganti sesuai estimasi pengerjaan.
    estimatedDays: 21,

    requests: 1,
    interestBase: 1
  }
]

export const activities = [
  {
    id: "segera-hadir",
    demo: true,
    date: "2026-09-03",
    location: "Surabaya",
    image: "/images/activity-placeholder.webp",
    title: {
      id: "sharing session / seminar",
      en: "sharing session / seminar"
    },
    description: {
      id: "cerita singkat kegiatan, lokasi, materi, peserta, dan hal menarik yang terjadi.",
      en: "short note about the event, location, material, audience, and highlights."
    }
  }
]

export const youtube = {
  channelId: "",
  channelUrl: "",
  maxVideos: 6,
  manualVideos: []
}
