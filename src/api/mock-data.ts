const categories = ['Наука', 'Технология', 'История', 'Медицина', 'Спорт',  'Природа'];

function generateRandomText() {
  const loremIpsum = [
    'Nam egestas, elit cursus facilisis interdum, est enim laoreet mauris, et congue nunc erat ut dui.',
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
    'Curabitur eros dui, tempor vel semper sed, lobortis et erat. Suspendisse augue diam, semper a tristique sed, hendrerit in odio',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Curabitur vel euismod justo. Nunc dignissim, tortor in placerat vestibulum, mi felis consectetur lorem, nec cursus lacus lacus a eros.',
    'Cras aliquet sagittis quam, ac maximus nibh. Fusce ligula purus, ullamcorper vel elit a, laoreet iaculis metus'
  ];

  const randomIndex = Math.floor(Math.random() * loremIpsum.length);
  return loremIpsum[randomIndex];
}

const generateMockData = (startYear: number, endYear: number) => {
  let yearsRange = Array.from({length: endYear - startYear + 1}, (_, index) => startYear + index);

  const events = yearsRange.map(year => {
    return {
      year,
      description: generateRandomText()
    };
  });

  const category = categories.splice(getRandomInt(0, categories.length - 1), 1)[0]

  yearsRange = [startYear, endYear];

  return {
    yearsRange,
    events,
    category
  };
}

const getRandomInt = (min: number, max: number) => (Math.floor(Math.random() * (max - min + 1) + min));

// Пример использования функции
export const mockData = [
  generateMockData(1960, 1975),
  generateMockData(1992, 1998),
  generateMockData(1999, 2006),
  generateMockData(2007, 2010),
  generateMockData(2011, 2020),
  generateMockData(2021, 2023),
].slice(0, getRandomInt(2, 6))
