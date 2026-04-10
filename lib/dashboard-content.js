export const dashboardContent = {
  schoolName: "Sekolah Menengah Integrasi TV Sekolah",
  tagline: "Paparan digital untuk makluman rasmi, aktiviti dan jadual harian.",
  location: "Dewan Utama | Lobi Pentadbiran | Surau Sekolah",
  quickInfo: [
    { title: "Sesi", value: "Pagi" },
    { title: "Kehadiran Sasaran", value: "98%" },
    { title: "Tema Minggu Ini", value: "Disiplin & Ihsan" },
  ],
};

export const slides = [
  {
    id: "announcement-poster",
    type: "announcement",
    theme: "announcement",
    label: "Poster Pengumuman",
    kicker: "Hebahan Rasmi Sekolah",
    title: "Minggu Kokurikulum Bermula Isnin Ini",
    description:
      "Semua murid dikehendaki hadir mengikut rumah sukan masing-masing dan memakai pakaian yang telah ditetapkan oleh guru penasihat.",
    highlight: "Perhimpunan khas pada 7:30 pagi di dataran terbuka.",
    sideNote:
      "Sesuai untuk poster program, lawatan, peperiksaan, kutipan derma, dan makluman pentadbiran.",
    items: [
      { title: "Tarikh", value: "14 April 2026" },
      { title: "Masa", value: "7:30 pagi" },
      { title: "Tempat", value: "Dataran Terbuka" },
      { title: "Pakaian", value: "Uniform rumah sukan" },
    ],
  },
  {
    id: "prayer-time-poster",
    type: "prayer",
    theme: "prayer",
    label: "Poster Waktu Solat",
    kicker: "Waktu Solat Hari Ini",
    title: "Jadual Solat Untuk Warga Sekolah",
    description:
      "Sila bersedia lebih awal untuk solat berjemaah. Pastikan aktiviti dihentikan lima minit sebelum azan untuk persediaan ke surau.",
    sideNote:
      "Data contoh ini boleh ditukar kepada waktu sebenar mengikut zon sekolah anda.",
    prayerTimes: [
      { name: "Subuh", time: "5:58 pagi" },
      { name: "Zohor", time: "1:13 petang" },
      { name: "Asar", time: "4:26 petang" },
      { name: "Maghrib", time: "7:22 malam" },
      { name: "Isyak", time: "8:31 malam" },
    ],
    notes: [
      { title: "Zon", value: "WLY01 / Kuala Lumpur" },
      { title: "Iqamah Zohor", value: "1:25 petang" },
      { title: "Iqamah Asar", value: "4:35 petang" },
    ],
  },
];
