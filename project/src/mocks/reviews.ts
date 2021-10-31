import { ReviewProps } from '../types/review';

export const reviews: ReviewProps[] = [
  {
    id: 1,
    user: {
      id: 4,
      name: 'Kate Muir',
    },
    rating: 8.9,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2019-05-08T14:13:56.569Z',
  },
  {
    id: 2,
    user: {
      id: 5,
      name: 'Muir Kate',
    },
    rating: 6.9,
    comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '2019-02-06T12:32:56.569Z',
  },
  {
    id: 3,
    user: {
      id: 1,
      name: 'Mr. X',
    },
    rating: 7.2,
    comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    date: '2015-01-12T17:22:56.569Z',
  },
  {
    id: 4,
    user: {
      id: 3,
      name: 'John Smith',
    },
    rating: 8.1,
    comment: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2018-04-09T10:12:56.569Z',
  },
  {
    id: 5,
    user: {
      id: 2,
      name: 'Hunny Bunny',
    },
    rating: 8.5,
    comment: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    date: '2020-07-03T10:32:56.569Z',
  },
];
