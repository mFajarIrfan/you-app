import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";

export const getHoroscope = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";

  return "";
};

export const getHoroscopeIcon = (horoscope: string) => {
  if (horoscope === "Aries") {
    return <TbZodiacAries />;
  }
  if (horoscope === "Taurus") {
    return <TbZodiacTaurus />;
  }
  if (horoscope === "Gemini") {
    return <TbZodiacGemini />;
  }
  if (horoscope === "Cancer") {
    return <TbZodiacCancer />;
  }
  if (horoscope === "Leo") {
    return <TbZodiacLeo />;
  }
  if (horoscope === "Virgo") {
    return <TbZodiacVirgo />;
  }
  if (horoscope === "Libra") {
    return <TbZodiacLibra />;
  }
  if (horoscope === "Scorpio") {
    return <TbZodiacScorpio />;
  }
  if (horoscope === "Sagittarius") {
    return <TbZodiacSagittarius />;
  }
  if (horoscope === "Capricorn") {
    return <TbZodiacCapricorn />;
  }
  if (horoscope === "Aquarius") {
    return <TbZodiacAquarius />;
  }
  if (horoscope === "Pisces") {
    return <TbZodiacPisces />;
  }
};
