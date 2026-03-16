import { MODEL_URLS } from './models';

export const EXHIBITS = [
  { id: 'hdd', path: MODEL_URLS.hdd, title: 'Жёсткий диск', text: 'Накопитель на магнитных дисках. Эволюция хранения данных.' },
  { id: 'kbd', path: MODEL_URLS.kbd, title: 'Клавиатура', text: 'Основное устройство ввода текста.' },
  { id: 'cd', path: MODEL_URLS.cd, title: 'CD-диск', text: 'Оптический носитель данных.' },
  { id: 'monitor_ru', path: MODEL_URLS.monitorRu, title: 'Монитор', text: 'Устройство вывода. От CRT к LCD.' },
  { id: 'printer', path: MODEL_URLS.printer, title: 'Принтер', text: 'Печать как часть офисной революции.' },

  { id: 'ibm5110', path: MODEL_URLS.ibm5110, title: 'IBM 5110', text: 'Ранний портативный компьютер.' },
  { id: 'computer1977', path: MODEL_URLS.computer1977, title: 'Компьютер 1977', text: 'Эпоха домашних ПК.' },
  { id: 'pet', path: MODEL_URLS.pet, title: 'Commodore PET', text: 'Знаковый компьютер конца 70-х.' },
  { id: 'kenbak', path: MODEL_URLS.kenbak, title: 'KENBAK-1', text: 'Один из первых персональных компьютеров.' },
  { id: 'amiga_floppy', path: MODEL_URLS.amigaFloppy, title: 'Дискета (Amiga)', text: 'Классический носитель 80–90-х.' },
  { id: 'cp500', path: MODEL_URLS.cp500, title: 'CP-500 (клон TRS-80)', text: 'Клон популярной платформы TRS-80.' },

  { id: 'enigma', path: MODEL_URLS.enigma, title: 'Enigma', text: 'Шифровальная машина, символ криптоистории.' },
  { id: 'apple2', path: MODEL_URLS.apple2, title: 'Apple II', text: 'Один из самых известных ПК 70-х.' },
  { id: 'pc90s', path: MODEL_URLS.pc90s, title: 'ПК 1990-х (CRT)', text: 'Классический образ домашнего ПК.' },
  { id: 'terminal', path: MODEL_URLS.terminal, title: 'Платёжный терминал', text: 'Эволюция безналичных платежей.' },
  { id: 'sony_pvm', path: MODEL_URLS.sonyPvm, title: 'Sony PVM (PlayStation)', text: 'Проф. монитор / эпоха консолей.' },
  { id: 'radio', path: MODEL_URLS.radio, title: 'Винтажное радио', text: 'Техника связи до цифровой эры.' },
  { id: 'nec', path: MODEL_URLS.nec, title: 'NEC компьютер', text: 'Японская школа ПК.' },
  { id: 'psp', path: MODEL_URLS.psp, title: 'PSP', text: 'Портативная игровая консоль.' },

  { id: 'm68000', path: MODEL_URLS.m68000, title: 'Motorola 68000', text: 'Легендарный процессор: Atari/Amiga/Mac и др.' },
  { id: 'post_radio', path: MODEL_URLS.postRadio, title: 'Радио (стилизация)', text: 'Декоративная модель в ретро-стиле.' },
  { id: 'tv11', path: MODEL_URLS.tv11, title: 'Телевизор', text: 'Эволюция ТВ-устройств.' },
  { id: 'mic', path: MODEL_URLS.mic, title: 'Винтажный микрофон', text: 'Звукозапись и радиоэфир.' },
  { id: 'univac', path: MODEL_URLS.univac, title: 'UNIVAC', text: 'Ранняя коммерческая ЭВМ.' },
  { id: 'toshiba', path: MODEL_URLS.toshiba, title: 'Toshiba T1000', text: 'Ранний ноутбук: переносимые вычисления.' },
];

export const ROOM_SIZE = 30;
export const ROOM_HEIGHT = 6.2;
export const PLAYER_HEIGHT = 1.65;

export const GRID_STEP = 5.2;
export const BORDER_MARGIN = 4.2;
export const MIN_GAP = 1.1;

export const SHOW_DISTANCE = 3.2;
export const FOCUS_DISTANCE = 3.2;

export const FLOAT_AMPL = 0.06;
export const FLOAT_SPEED = 1.2;

