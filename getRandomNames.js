const names = [
  'Андрій',
  'Богдан',
  'Володимир',
  'Григорій',
  'Дмитро',
  'Едуард',
  'Євген',
  'Ждан',
  'Захар',
  'Іван',
  'Йосип',
  'Кирило',
  'Леонід',
  'Михайло',
  'Назар',
  'Олександр',
  'Павло',
  'Роман',
  'Сергій',
  'Тарас',
  'Устим',
  'Федір',
  'Харитон',
  'Цезар',
  'Юрій',
  'Ярослав'
]

const fathersNames = [
  'Андрійович',
  'Богданович',
  'Володимирович',
  'Григорович',
  'Дмитрович',
  'Едуардович',
  'Євгенович',
  'Жданович',
  'Захарович',
  'Іванович',
  'Йосипович',
  'Кирилович',
  'Леонідович',
  'Михайлович',
  'Назарович',
  'Олександрович',
  'Павлович',
  'Романович',
  'Сергійович',
  'Тарасович',
  'Устимович',
  'Федорович',
  'Харитонович',
  'Цезарович',
  'Юрійович',
  'Ярославович'
]

export function getRandomName(letter) {
  const res = getName(letter, names);
  if (res) {
    return res;
  } else {
    return console.log(`No name found for letter: ${letter}`);
  }
}

export function getRandomFathersName(letter) {
  const res = getName(letter, fathersNames);
  if (res) {
    return res;
  } else {
    return console.log(`No fathers name found for letter: ${letter}`);
  }
}

function getName(letter, list) {
  return list.find(name => name.startsWith(letter));
}
