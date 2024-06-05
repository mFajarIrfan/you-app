import {
  GiChargingBull,
  GiGoat,
  GiHorseHead,
  GiMonkey,
  GiPig,
  GiRabbit,
  GiRat,
  GiRooster,
  GiSittingDog,
  GiSnake,
  GiSpikedDragonHead,
  GiTiger,
} from "react-icons/gi";

export const getChineseZodiac = (year: number) => {
  const zodiacs = [
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
  ];
  return zodiacs[year % 12];
};

export const getChineseZodiacIcon = (zodiac: string) => {
  if (zodiac === "Monkey") {
    return <GiMonkey />;
  }
  if (zodiac === "Rooster") {
    return <GiRooster />;
  }
  if (zodiac === "Dog") {
    return <GiSittingDog />;
  }
  if (zodiac === "Pig") {
    return <GiPig />;
  }
  if (zodiac === "Rat") {
    return <GiRat />;
  }
  if (zodiac === "Ox") {
    return <GiChargingBull />;
  }
  if (zodiac === "Tiger") {
    return <GiTiger />;
  }
  if (zodiac === "Rabbit") {
    return <GiRabbit />;
  }
  if (zodiac === "Dragon") {
    return <GiSpikedDragonHead />;
  }
  if (zodiac === "Snake") {
    return <GiSnake />;
  }
  if (zodiac === "Horse") {
    return <GiHorseHead />;
  }
  if (zodiac === "Goat") {
    return <GiGoat />;
  }
};
