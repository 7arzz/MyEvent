export const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export const INDONESIAN_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const getTodayDateInfo = (date = new Date()) => {
  const day = INDONESIAN_DAYS[date.getDay()];
  const dateStr = `${date.getDate()} ${INDONESIAN_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const targetDate = `${yyyy}-${mm}-${dd}T23:59:59`;

  return { day, date: dateStr, targetDate };
};

export const getDefaultInvitationData = () => {
  const today = getTodayDateInfo();
  return {
    hero: {
      title: "Undangan Digital Premium",
      subtitle: "Merayakan Kebersamaan di Hari Istimewa Kita",
    },
    autoUpdateDate: true,
    event: {
      day: today.day,
      date: today.date,
      time: "09:00 - 15:00 WIB",
      locationName: "Gedung Grand Palace\nHall Utama, Lantai 2",
    },
    targetDate: today.targetDate,
    agenda: [
      {
        time: "09:00 - 09:30",
        title: "Pembukaan & Sambutan",
        description:
          "Ucapan pembukaan oleh MC dan sambutan hangat dari tuan rumah.",
      },
      {
        time: "09:30 - 11:30",
        title: "Acara Inti & Ramah Tamah",
        description:
          "Sesi utama yang penuh makna, dilanjutkan dengan ramah tamah antar tamu.",
      },
      {
        time: "11:30 - 13:00",
        title: "Jamuan Makan Siang",
        description:
          "Sajian hidangan istimewa sambil menikmati alunan musik akustik.",
      },
      {
        time: "13:00 - Selesai",
        title: "Penutupan & Dokumentasi",
        description:
          "Foto bersama seluruh tamu undangan sebelum mengakhiri sesi acara.",
      },
    ],
    location: {
      address:
        "Jl. Grand Avenue No. 123, Blok C, Jakarta Pusat, DKI Jakarta 10220",
      mapUrl: "https://maps.google.com",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.52441982!2d106.82281481112456!3d-6.1753924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2dbf5c351%3A0x6e7887556a31c5!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1711516000000!5m2!1sid!2sid",
    },
    contact: {
      email: "contact@myevent.id",
      phone: "+62 812 3456 7890",
      instagram: "@myevent_premium",
      facebook: "MyEvent Premium",
    },
  };
};

export const DEFAULT_INVITATION_DATA = getDefaultInvitationData();
