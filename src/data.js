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

const MONTH_ALIASES = {
  januari: 0, jan: 0, january: 0,
  februari: 1, feb: 1, pebruari: 1, february: 1,
  maret: 2, mar: 2, march: 2,
  april: 3, apr: 3,
  mei: 4, may: 4,
  juni: 5, jun: 5, june: 5,
  juli: 6, jul: 6, july: 6,
  agustus: 7, agu: 7, ags: 7, aug: 7, august: 7,
  september: 8, sep: 8, sept: 8,
  oktober: 9, okt: 9, oct: 9, october: 9,
  november: 10, nov: 10, nopember: 10,
  desember: 11, des: 11, dec: 11, december: 11,
};

export const parseTimeFromEventTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") {
    return { hours: 0, minutes: 0 };
  }
  const match = timeStr.match(/(\d{1,2})[:.](\d{2})/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return { hours, minutes };
    }
  }
  return { hours: 0, minutes: 0 };
};

export const formatEventDateInfo = (date) => {
  const day = INDONESIAN_DAYS[date.getDay()];
  const dateStr = `${date.getDate()} ${INDONESIAN_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const targetDate = `${yyyy}-${mm}-${dd}T${hh}:${min}`;

  return { day, date: dateStr, targetDate };
};

export const parseTargetDate = (targetStr) => {
  if (!targetStr || typeof targetStr !== "string") return null;
  const isoMatch = targetStr
    .trim()
    .match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T\s](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    const hours = isoMatch[4] !== undefined ? parseInt(isoMatch[4], 10) : 0;
    const minutes = isoMatch[5] !== undefined ? parseInt(isoMatch[5], 10) : 0;
    const seconds = isoMatch[6] !== undefined ? parseInt(isoMatch[6], 10) : 0;
    const d = new Date(year, month, day, hours, minutes, seconds);
    if (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    ) {
      return d;
    }
  }
  const fallback = new Date(targetStr);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
};

export const parseIndonesianDate = (dateStr, timeStr) => {
  if (!dateStr || typeof dateStr !== "string") return null;
  const trimmed = dateStr.trim();
  const { hours, minutes } = parseTimeFromEventTime(timeStr);

  // Format: "25 Desember 2026", "Jumat, 25 Desember 2026", or "25 Desember"
  const textMatch = trimmed.match(
    /^(?:[a-zA-Z]+,\s*)?(\d{1,2})\s+([a-zA-Z]+)(?:\s+(\d{4}))?$/
  );
  if (textMatch) {
    const day = parseInt(textMatch[1], 10);
    const monthName = textMatch[2].toLowerCase();
    const month = MONTH_ALIASES[monthName];
    if (month !== undefined) {
      const now = new Date();
      let year = textMatch[3] ? parseInt(textMatch[3], 10) : now.getFullYear();
      let candidate = new Date(year, month, day, hours, minutes, 0);
      if (
        candidate.getFullYear() === year &&
        candidate.getMonth() === month &&
        candidate.getDate() === day
      ) {
        if (!textMatch[3] && candidate < now) {
          year += 1;
          candidate = new Date(year, month, day, hours, minutes, 0);
        }
        return candidate;
      }
    }
    return null;
  }

  // Format: "DD/MM/YYYY" or "DD-MM-YYYY"
  const dmyMatch = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    const candidate = new Date(year, month, day, hours, minutes, 0);
    if (
      candidate.getFullYear() === year &&
      candidate.getMonth() === month &&
      candidate.getDate() === day
    ) {
      return candidate;
    }
    return null;
  }

  // Format: "YYYY-MM-DD"
  const ymdMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    const candidate = new Date(year, month, day, hours, minutes, 0);
    if (
      candidate.getFullYear() === year &&
      candidate.getMonth() === month &&
      candidate.getDate() === day
    ) {
      return candidate;
    }
  }

  return null;
};

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
  const now = new Date();
  const defaultEventDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 7,
    9,
    0,
    0
  );
  const eventInfo = formatEventDateInfo(defaultEventDate);

  return {
    hero: {
      title: "Undangan Digital Premium",
      subtitle: "Merayakan Kebersamaan di Hari Istimewa Kita",
    },
    autoUpdateDate: false,
    event: {
      day: eventInfo.day,
      date: eventInfo.date,
      time: "09:00 - 15:00 WIB",
      locationName: "Gedung Grand Palace\nHall Utama, Lantai 2",
    },
    targetDate: eventInfo.targetDate,
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
