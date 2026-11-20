export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  published: string; // YYYY-MM-DD
  intro: string;
  sections: { h: string; p?: string[]; list?: string[] }[];
  cta: { text: string; path: string };
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-many-souvenirs-for-a-wedding',
    title: 'How many souvenirs should I order for my wedding?',
    metaTitle: 'How Many Wedding Souvenirs to Order | Medaase Favors',
    metaDescription:
      'A simple way to work out how many wedding souvenirs to order in Ghana, with extras, bridal party gifts and timing.',
    published: '2026-11-20',
    intro:
      'It is one of the first questions couples ask, and one of the easiest to get wrong. Order too few and someone important goes home empty handed. Order too many and you are left with boxes in the boot. Here is a simple way to get it right.',
    sections: [
      {
        h: 'Start with your confirmed guest list',
        p: [
          'Begin with the number of people you have actually invited and expect to attend, not the number of invitation cards printed. If you are doing both a traditional marriage and a white wedding, count each event separately, because guest lists are rarely the same.',
          'Then decide whether you are giving one favour per guest or one per household. One per guest is the norm at most Ghanaian weddings, especially when favours are placed on seats or handed out at the door.',
        ],
      },
      {
        h: 'Add 10% for the guests you did not count',
        p: [
          'Every Ghanaian wedding has guests who were not on the list: the friend who brings a friend, the cousin who arrives from abroad, the colleague who heard about it. Adding about 10% on top of your confirmed number usually covers them. For very large, open weddings, consider 15%.',
        ],
      },
      {
        h: 'Plan special gifts for your inner circle',
        p: [
          'Your bridal train, parents, MC, planner and the aunties who did all the running around deserve something a little more generous. Many couples give them a larger 250g jar of shea butter or body butter, matching the guest favours but clearly special.',
        ],
      },
      {
        h: 'A quick example',
        list: [
          '180 confirmed guests',
          '+ 10% extras = 198, rounded up to 200',
          '+ 12 larger gifts for the bridal party and parents',
          'Order: 200 small favours and 12 large favours',
        ],
      },
      {
        h: 'Give yourself time',
        p: [
          'Order at least two weeks before the wedding. That leaves time to approve your free label design, for us to make your favours in 5 to 7 working days, and for you to collect them without last minute stress.',
        ],
      },
    ],
    cta: { text: 'See wedding souvenirs', path: '/souvenirs/weddings' },
  },
  {
    slug: 'funeral-souvenir-ideas-ghana',
    title: 'Funeral souvenir ideas in Ghana that families actually keep',
    metaTitle: 'Funeral Souvenir Ideas in Ghana | Medaase Favors',
    metaDescription:
      'Thoughtful funeral souvenir ideas in Ghana that mourners use and keep, with label wording and tips for choosing the right keepsake.',
    published: '2026-11-20',
    intro:
      'Funeral souvenirs are a way of thanking everyone who stood with the family, and of keeping a loved one\'s memory alive in the homes of those who knew them. The best ones are simple, useful and dignified.',
    sections: [
      {
        h: 'Choose something people use every day',
        p: [
          'A souvenir that is used daily is seen daily. Practical keepsakes like shea butter, hand cream and hand wash gel are popular because they end up on dressing tables and beside sinks, where your loved one\'s name is a gentle, everyday reminder.',
        ],
      },
      {
        h: 'Ideas that work well',
        list: [
          'A small jar of pure shea butter with the deceased\'s name and dates',
          'Hand cream in a white bottle with a simple photo label',
          'Hand wash gel for very large gatherings',
          'Lip balm on a printed card for younger relatives',
          'A larger jar for chief mourners and those who helped with the arrangements',
        ],
      },
      {
        h: 'Keep the design calm',
        p: [
          'Use the family\'s funeral colours, a clear photograph or emblem, the full name and the years of birth and passing. Wording such as "In loving memory of", "Celebrating the life of" or "Called to glory" is respectful and familiar. Avoid crowding the label; less is more.',
        ],
      },
      {
        h: 'Plan for each gathering',
        p: [
          'If you are holding a one week observance, a burial and a thanksgiving service, decide early whether you want one souvenir for all, or a different one for each. Ordering everything together saves time and, if you choose two or more products, 5% on the whole order.',
        ],
      },
    ],
    cta: { text: 'See funeral souvenirs', path: '/souvenirs/funerals' },
  },
  {
    slug: 'what-to-write-on-souvenir-labels',
    title: 'What to write on souvenir labels: 30 ideas for weddings, funerals and naming ceremonies',
    metaTitle: 'What to Write on Souvenir Labels: 30 Ideas | Medaase Favors',
    metaDescription:
      'Thirty short label ideas for wedding, funeral, naming ceremony, birthday, church and corporate souvenirs in Ghana, all under 32 characters.',
    published: '2026-11-20',
    intro:
      'You have chosen your favours. Now, what should the label say? The best label text is short, personal and easy to read at a glance. Every idea below fits within 32 characters, with the date printed underneath.',
    sections: [
      {
        h: 'Weddings',
        list: [
          'Esi & Kwame',
          'Ama weds Kofi',
          'The Mensahs',
          'Thanks for celebrating with us',
          'Two hearts, one home',
          'Love, laughter, ever after',
          'Mr & Mrs Owusu',
        ],
      },
      {
        h: 'Funerals',
        list: [
          'In loving memory of Maame Akosua',
          'Celebrating Opanin Kwabena',
          'Forever in our hearts',
          'Rest well, Grandma',
          'A life well lived',
          'Called to glory',
        ],
      },
      {
        h: 'Naming ceremonies',
        list: [
          'Welcome, Baby Adwoa',
          'Nana Yaw Boateng',
          'Thank you for welcoming Kofi',
          'Blessed with Ama',
          'Our little miracle',
        ],
      },
      {
        h: 'Birthdays',
        list: ['Abena at 30', 'Fifty & fabulous', 'Kojo turns 40', 'Nana @ 80', 'Thank you for celebrating Mama'],
      },
      {
        h: 'Church events and corporate gifts',
        list: [
          '25th Anniversary · Grace Chapel',
          'Harvest Thanksgiving 2026',
          'To God be the glory',
          'Thank you for a great year',
          'Welcome to the team',
          'With gratitude, from all of us',
          'Annual Conference 2026',
        ],
      },
      {
        h: 'A few tips',
        p: [
          'Keep it short so it reads clearly on a small jar. Use the names people actually call you. Double check spelling, especially of names and dates. And remember, we design the label for free and email it to you, so you can see exactly how it looks before anything is printed.',
        ],
      },
    ],
    cta: { text: 'Start your order', path: '/products' },
  },
];

export function getGuide(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}
