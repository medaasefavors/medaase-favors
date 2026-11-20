import type { Slug } from './products';

// Event landing pages. Keep copy short: one intro line, at most two paragraphs,
// and no repeating facts that the page already shows (minimum, timing, free design).
export interface EventPage {
  slug: string;
  name: string;
  title: string; // <title>, under 60 characters
  metaDescription: string; // under 155 characters
  h1: string;
  intro: string; // one sentence
  body: [string, string?]; // at most two paragraphs
  products: Slug[];
  bundles: string[];
  labelIdeas: string[];
  faqs: { q: string; a: string }[];
  cta: string;
  imageAlt: string;
}

export const EVENT_PAGES: EventPage[] = [
  {
    slug: 'weddings',
    name: 'Weddings',
    title: 'Wedding Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      "Custom wedding souvenirs in Ghana: shea butter, body butter and shimmer oil with the couple's names and date. From 25 pieces, free label design.",
    h1: 'Wedding souvenirs your guests will actually keep',
    intro: 'Send every guest home with your names, your date and something they will use every day.',
    body: [
      'Skincare does not end up in a drawer. A jar of shea butter or a bottle of shimmer oil sits on the dressing table, and your guests remember your day every time they use it.',
      'Choose black, white or clear jars with a label in your colours, and give the bridal train a larger size so they feel extra special.',
    ],
    products: ['pure-african-shea-butter', 'body-butter', 'shimmer-oil', 'lip-balm'],
    bundles: ['glow-set', 'sweet-pair'],
    labelIdeas: ['Esi & Kwame', 'Ama weds Kofi', 'The Mensahs', 'Thanks for celebrating with us', 'Two hearts, one home', 'Kwame ❤ Esi'],
    faqs: [
      { q: 'How many wedding souvenirs should I order?', a: 'Your confirmed guests plus about 10% for unexpected guests, and a larger gift for the bridal party.' },
      { q: 'Can I order for both the traditional and white wedding?', a: 'Yes. Order two sets with different dates or designs in one go.' },
      { q: 'How early should I order?', a: 'Two weeks before the wedding is ideal.' },
    ],
    cta: 'Design your wedding favours',
    imageAlt: "Wedding souvenirs: shea butter jars with the couple's names on the labels",
  },
  {
    slug: 'funerals',
    name: 'Funerals',
    title: 'Funeral Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      'Respectful funeral souvenirs in Ghana: shea butter, hand cream and hand wash gel with "In loving memory" labels. From 25 pieces, free design.',
    h1: 'Funeral souvenirs to remember them by',
    intro: 'A gentle way to thank everyone who stood with your family, and to keep your loved one\'s name close.',
    body: [
      'Practical keepsakes like shea butter, hand cream and hand wash gel are used every day, so your loved one is quietly remembered in every home.',
      'We keep designs calm and dignified, with their name, dates and a photo if you wish, in your family\'s funeral colours.',
    ],
    products: ['pure-african-shea-butter', 'hand-cream', 'hand-wash-gel', 'lip-balm'],
    bundles: ['sweet-pair'],
    labelIdeas: ['In loving memory of Maame Akosua', 'Celebrating Opanin Kwabena', 'Forever in our hearts', 'Rest well, Grandma', 'Called to glory · 1942 to 2026', 'A life well lived'],
    faqs: [
      { q: 'Can the label include a photo?', a: 'Yes. Upload the photo and we will design a simple, respectful label around it.' },
      { q: 'Can you match our funeral cloth colours?', a: 'Yes. Tell us the colours and we will match the label.' },
      { q: 'The funeral is very soon. Can you help?', a: 'Email us first and we will tell you honestly what is possible.' },
    ],
    cta: 'Choose funeral souvenirs',
    imageAlt: 'Funeral souvenirs: shea butter jars with an "In loving memory" label',
  },
  {
    slug: 'naming-ceremonies',
    name: 'Naming ceremonies',
    title: 'Naming Ceremony Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      "Naming ceremony and outdooring souvenirs in Ghana: shea butter and lip balm with the baby's name and date. From 25 pieces, free label design.",
    h1: "Naming ceremony souvenirs with your baby's name",
    intro: 'Thank everyone who came to welcome your little one with a favour that carries their name.',
    body: [
      "Shea butter has always been part of caring for a newborn in Ghana, so a small jar with the baby's name feels just right. Lip balm on a printed card with the baby's name is another favourite.",
      "With the eighth day coming fast, you can order before the baby arrives and send us the name later.",
    ],
    products: ['pure-african-shea-butter', 'lip-balm', 'body-butter', 'hand-cream'],
    bundles: ['sweet-pair'],
    labelIdeas: ['Welcome, Baby Adwoa', 'Nana Yaw Boateng', 'Thank you for welcoming Kofi', 'Blessed with Ama', 'Our little miracle', 'Twins: Ataa & Atta'],
    faqs: [
      { q: "Can I order before we choose the baby's name?", a: 'Yes. Order with the expected date and email us the name when it is chosen.' },
      { q: 'Can you do souvenirs for twins?', a: 'Yes. Both names on one label, or two designs in different colours.' },
    ],
    cta: 'Design your naming ceremony favours',
    imageAlt: "Naming ceremony souvenirs: small shea butter jars with the baby's name",
  },
  {
    slug: 'birthdays',
    name: 'Birthdays',
    title: 'Birthday Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      "Personalised birthday souvenirs and party favours in Ghana: shimmer oil, body butter and lip balm with the celebrant's name. From 25 pieces.",
    h1: 'Birthday favours as fun as the party',
    intro: "Thirty, fifty or a grand 80th: send your guests home glowing, with the celebrant's name on every favour.",
    body: [
      'Shimmer oil, body butter and lip balm feel like real gifts, not party leftovers. The Glow Set puts all three together in one bag.',
      "For a parent's 60th or 70th, shea butter and hand cream in elegant colours make a lovely thank you.",
    ],
    products: ['shimmer-oil', 'body-butter', 'lip-balm', 'pure-african-shea-butter'],
    bundles: ['glow-set', 'sweet-pair'],
    labelIdeas: ['Abena at 30', 'Fifty & fabulous', 'Kojo turns 40', 'Thank you for celebrating Mama', "Glow up, it's my birthday", 'Nana @ 80'],
    faqs: [
      { q: "Can I put the celebrant's age on the label?", a: 'Yes, for example "Abena at 30", with the date underneath.' },
      { q: 'Planning a surprise?', a: 'Tell us and we will keep everything quiet.' },
    ],
    cta: 'Design your birthday favours',
    imageAlt: 'Birthday party favours: shimmer oil and lip balms in pink organza bags',
  },
  {
    slug: 'church-events',
    name: 'Church events',
    title: 'Church Event Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      'Souvenirs for church anniversaries, harvests, thanksgiving and ordinations in Ghana. Shea butter and hand cream with your church name. From 25 pieces.',
    h1: 'Souvenirs for anniversaries, harvests and thanksgiving',
    intro: 'Mark the day with a favour every member takes home and uses.',
    body: [
      'Shea butter, hand cream and hand wash gel suit everyone from the youth to the elders, and they are affordable in large numbers.',
      'We design the label around your church colours, anniversary logo or theme.',
    ],
    products: ['pure-african-shea-butter', 'hand-cream', 'hand-wash-gel', 'lip-balm'],
    bundles: ['sweet-pair'],
    labelIdeas: ['25th Anniversary · Grace Chapel', 'Harvest Thanksgiving 2026', 'To God be the glory', "Women's Fellowship Day", 'Ordination of Rev. Mensah', 'Psalm 118:24'],
    faqs: [
      { q: 'Can we put our church logo on the label?', a: 'Yes. Upload it and we will place the date underneath.' },
      { q: 'Can you handle a very large order?', a: 'Yes. Message us first so we can agree a timeline.' },
    ],
    cta: 'Order church event souvenirs',
    imageAlt: 'Church anniversary souvenirs: hand cream bottles with the church name',
  },
  {
    slug: 'corporate-gifts',
    name: 'Corporate gifts',
    title: 'Corporate Gifts in Accra | Custom Favours | Medaase Favors',
    metaDescription:
      'Branded skincare corporate gifts in Accra: hand cream, shea butter and lip balm with your company logo. For staff, clients and events. From 25 pieces.',
    h1: 'Corporate gifts with your logo on them',
    intro: 'Thank your team, clients or conference guests with a gift they use every day.',
    body: [
      'Pens get lost. A hand cream or shea butter with your logo stays on the desk and gets used daily.',
      'Perfect for end of year gifts, client thank yous, launches, conferences and welcome packs.',
    ],
    products: ['hand-cream', 'pure-african-shea-butter', 'lip-balm', 'hand-wash-gel'],
    bundles: ['sweet-pair'],
    labelIdeas: ['Your company logo', 'Thank you for a great year', 'Welcome to the team', 'With gratitude, from all of us', "Happy Women's Day", 'Annual Conference 2026'],
    faqs: [
      { q: 'Do you provide a receipt?', a: 'Yes. You get an itemised email confirmation with your order reference.' },
      { q: 'Can you match our brand colours?', a: 'Yes. Upload your logo and we will design the label in your brand colours.' },
    ],
    cta: 'Order branded corporate gifts',
    imageAlt: 'Corporate gifts: hand cream and lip balm with a company logo',
  },
];

export function getEventPage(slug: string) {
  return EVENT_PAGES.find((e) => e.slug === slug);
}
