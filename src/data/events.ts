import type { Slug } from './products';

export interface EventPage {
  slug: string;
  name: string;
  title: string; // <title>, under 60 characters
  metaDescription: string; // under 155 characters
  h1: string;
  intro: string;
  sections: { h: string; p: string[] }[];
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
      'Custom wedding souvenirs in Ghana: shea butter, body butter and shimmer oil with the couple\'s names and date. From 25 pieces, free label design.',
    h1: 'Wedding souvenirs your guests will actually keep',
    intro:
      'Your guests danced, ate, sprayed and celebrated with you. Send them home with a little thank you that carries your names and your date, and that they will use long after the last song.',
    sections: [
      {
        h: 'Why skincare makes the best wedding favour',
        p: [
          'Most wedding souvenirs are admired for a day and forgotten in a drawer. Skincare is different. A tub of pure shea butter, a jar of whipped body butter or a bottle of shimmer oil goes straight onto the dressing table and gets used every morning. Each time, your guest sees your names and remembers your day.',
          'It also suits every guest. Aunties love the shea butter, your friends will fight over the shimmer oil, and the uncles quietly take the hand cream home. Whether you are planning a traditional marriage, a white wedding or both on one weekend, there is a favour that fits.',
        ],
      },
      {
        h: 'Match your favours to your colours',
        p: [
          'You choose the tub or bottle, the lid colour and the scent, and we design a label around your theme for free. Gold lids for a champagne and ivory wedding, pink tubs for a blush theme, navy for something classic. Add a drawstring organza bag in your colours and each guest\'s favours are packed together, ready to hand out at the door or place on every seat.',
          'For the bridal party, parents and the people who helped you plan, step up to a large 250g shea butter or body butter. It is a generous thank you that still matches what the rest of your guests receive.',
        ],
      },
      {
        h: 'How many to order',
        p: [
          'Count your confirmed guests and add about 10% for the people who always turn up without an invitation card. Many couples order one favour per guest and a larger gift for the bridal train. Orders start from 25 pieces per product, so even an intimate wedding is covered.',
          'Order at least two weeks before your date so there is time to approve the design and collect without stress. Our favours are ready 5 to 7 working days after you approve your label.',
        ],
      },
    ],
    products: ['pure-african-shea-butter', 'body-butter', 'shimmer-oil', 'lip-balm'],
    bundles: ['glow-set', 'sweet-pair'],
    labelIdeas: [
      'Esi & Kwame',
      'Ama weds Kofi',
      'The Mensahs',
      'Thanks for celebrating with us',
      'Two hearts, one home',
      'Kwame ❤ Esi',
    ],
    faqs: [
      { q: 'What are the most popular wedding souvenirs in Ghana?', a: 'Small shea butter tubs, shimmer oil and lip balm are the favourites. Many couples bundle two or three together and save 5% on the whole order.' },
      { q: 'Can I put our wedding hashtag on the label?', a: 'Yes. The front of the label can carry any text up to 32 characters, such as your names or your hashtag, with the date underneath.' },
      { q: 'Can I order souvenirs for both the traditional and white wedding?', a: 'Yes. You can order two sets with different dates or designs. Message us on WhatsApp and we will help you plan both.' },
      { q: 'How early should I order wedding souvenirs?', a: 'At least two weeks before the wedding is ideal. Favours are ready 5 to 7 working days after you approve your design.' },
    ],
    cta: 'Design your wedding favours',
    imageAlt: 'Wedding souvenirs: shea butter tubs with gold lids and the couple\'s names on the labels',
  },
  {
    slug: 'funerals',
    name: 'Funerals',
    title: 'Funeral Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      'Respectful funeral souvenirs in Ghana: shea butter, hand cream and hand wash gel with "In loving memory" labels. From 25 pieces, free design.',
    h1: 'Funeral souvenirs to remember them by',
    intro:
      'When family and friends gather to say goodbye, a small keepsake is a gentle way to thank them for standing with you, and to keep your loved one\'s name close.',
    sections: [
      {
        h: 'A keepsake that is used, not put away',
        p: [
          'Funeral souvenirs in Ghana are a way of saying thank you to everyone who travelled, mourned and supported the family. Practical keepsakes are often the most meaningful, because they are used every day. A tub of pure shea butter, a bottle of hand cream or a hand wash gel sits in a home for weeks, and each time it is used, your loved one is remembered.',
          'We keep funeral designs calm and dignified. You can include a photograph or a simple emblem, your loved one\'s name, and their dates, set on colours that match the family\'s chosen cloth, whether black and red, black and white, or white for a celebration of a long life.',
        ],
      },
      {
        h: 'Choosing the right souvenir',
        p: [
          'Shea butter is the most popular choice because almost everyone uses it, from elders to children. Hand cream and hand wash gel are thoughtful practical options and work well for very large gatherings. For close family, the chief mourners and those who helped with the arrangements, a larger tub is a quiet, generous thank you.',
          'If you are planning a one week observance, the burial and a thanksgiving service, you may want souvenirs for more than one occasion. We can prepare different labels for each, so every gathering has its own keepsake.',
        ],
      },
      {
        h: 'We will handle the details with care',
        p: [
          'We know funeral planning is busy and emotional. Choose your products here, pay online, and we will send the label design to you or a family member on WhatsApp within 24 hours. You get two rounds of changes for free, and your souvenirs are ready 5 to 7 working days after you approve. If the date is close, message us and we will tell you honestly what is possible.',
        ],
      },
    ],
    products: ['pure-african-shea-butter', 'hand-cream', 'hand-wash-gel', 'lip-balm'],
    bundles: ['sweet-pair'],
    labelIdeas: [
      'In loving memory of Maame Akosua',
      'Celebrating Opanin Kwabena',
      'Forever in our hearts',
      'Rest well, Grandma',
      'Called to glory · 1942 to 2026',
      'A life well lived',
    ],
    faqs: [
      { q: 'What do people give as funeral souvenirs in Ghana?', a: 'Families often give practical keepsakes such as shea butter, hand cream, hand wash gel, handkerchiefs or calendars, with the deceased\'s name, photo and dates.' },
      { q: 'Can the label include a photo of our loved one?', a: 'Yes. Upload the photo or a finished design as your label front, and we will place the date underneath. We keep the layout respectful and simple.' },
      { q: 'Can you match our funeral cloth colours?', a: 'Yes. Tell us the family\'s colours and we will design the label and choose lid colours to match.' },
      { q: 'Can I order souvenirs quickly for a funeral?', a: 'Our usual time is 5 to 7 working days after you approve the design. If the funeral is sooner, message us on WhatsApp first and we will check what we can do.' },
    ],
    cta: 'Choose funeral souvenirs',
    imageAlt: 'Funeral souvenirs: shea butter tubs with a respectful "In loving memory" label',
  },
  {
    slug: 'naming-ceremonies',
    name: 'Naming ceremonies',
    title: 'Naming Ceremony Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      'Naming ceremony and outdooring souvenirs in Ghana: shea butter and lip balm with the baby\'s name and date. From 25 pieces, free label design.',
    h1: 'Naming ceremony souvenirs with your baby\'s name',
    intro:
      'A new name, a new blessing, and a house full of family. Thank everyone who came to welcome your little one with a favour that carries their name.',
    sections: [
      {
        h: 'The sweetest outdooring favour',
        p: [
          'At an outdooring, the whole family comes together to welcome the baby and share in the joy of a name. Shea butter has always been part of caring for a newborn in Ghana, which makes a small tub with the baby\'s name on it a souvenir that feels just right. Guests take it home and use it, and many mothers keep one as a memento.',
          'Lip balm is another favourite, especially when it is mounted on a printed card with the baby\'s name and a sweet welcome message. Pair a lip balm with a small shea butter for The Sweet Pair and save 5% on your whole order.',
        ],
      },
      {
        h: 'Soft colours, simple labels',
        p: [
          'Choose pink, white, gold or navy lids, or mix them for twins. The label can carry the baby\'s full name, a day name, or a short blessing, with the date of the naming ceremony printed underneath. We design it for free and send it to you on WhatsApp, so even with a newborn at home, ordering takes just a few minutes.',
        ],
      },
      {
        h: 'Plan around the eighth day',
        p: [
          'Many naming ceremonies happen on the eighth day after birth, which does not leave much time. If you can, place your order before the baby arrives, using the expected date, and send us the name as soon as it is chosen. Your favours are ready 5 to 7 working days after you approve the design.',
        ],
      },
    ],
    products: ['pure-african-shea-butter', 'lip-balm', 'body-butter', 'hand-cream'],
    bundles: ['sweet-pair'],
    labelIdeas: [
      'Welcome, Baby Adwoa',
      'Nana Yaw Boateng',
      'Thank you for welcoming Kofi',
      'Blessed with Ama',
      'Our little miracle',
      'Twins: Ataa & Atta',
    ],
    faqs: [
      { q: 'Can I order before we choose the baby\'s name?', a: 'Yes. Place your order with the expected date, then send us the name on WhatsApp. We will finish the label design as soon as we have it.' },
      { q: 'What souvenirs are best for a naming ceremony?', a: 'Small shea butter tubs and lip balms are the most popular. They are affordable, useful and look sweet with the baby\'s name on them.' },
      { q: 'Can you do souvenirs for twins?', a: 'Yes. We can put both names on one label, or make two designs in different colours.' },
    ],
    cta: 'Design your naming ceremony favours',
    imageAlt: 'Naming ceremony souvenirs: small shea butter tubs with the baby\'s name on pink labels',
  },
  {
    slug: 'birthdays',
    name: 'Birthdays',
    title: 'Birthday Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      'Personalised birthday souvenirs and party favours in Ghana: shimmer oil, body butter and lip balm with the celebrant\'s name. From 25 pieces.',
    h1: 'Birthday favours as fun as the party',
    intro:
      'Thirty, fifty, sweet sixteen or a grand 80th. Whatever the number, send your guests home glowing with a favour that has the celebrant\'s name on it.',
    sections: [
      {
        h: 'Party favours that feel grown up',
        p: [
          'Birthday party favours do not have to be sweets in a paper bag. A bottle of golden shimmer oil, a jar of whipped body butter or a lip balm on a printed card feels like a real gift, and guests love having something pretty to take home. For milestone birthdays especially, a personalised souvenir turns a good party into one everyone remembers.',
          'The Glow Set, with a lip balm, a small body butter and a small shimmer oil, is made for birthday parties. Pack them together in a drawstring organza bag in your party colours and save 5% on your whole order.',
        ],
      },
      {
        h: 'Make it about the celebrant',
        p: [
          'Put the celebrant\'s name, their age or a fun line on the front of the label, with the party date underneath. Planning a surprise? Message us and we will keep everything quiet. For a parent\'s 60th or 70th, shea butter and hand cream in elegant colours make a lovely thank you to the family and friends who came to honour them.',
        ],
      },
      {
        h: 'Easy to plan',
        p: [
          'Orders start from 25 pieces per product. Choose your favours, pay online, approve your free label design on WhatsApp, and your souvenirs are ready 5 to 7 working days later. Pick up for free in Accra or have them delivered.',
        ],
      },
    ],
    products: ['shimmer-oil', 'body-butter', 'lip-balm', 'pure-african-shea-butter'],
    bundles: ['glow-set', 'sweet-pair'],
    labelIdeas: [
      'Abena at 30',
      'Fifty & fabulous',
      'Kojo turns 40',
      'Thank you for celebrating Mama',
      'Glow up, it\'s my birthday',
      'Nana @ 80',
    ],
    faqs: [
      { q: 'What are good birthday party favours for adults?', a: 'Shimmer oil, body butter and lip balm are favourites for adult birthdays. Bundle them as The Glow Set for 5% off.' },
      { q: 'Can I put the celebrant\'s age on the label?', a: 'Yes. Any text up to 32 characters works, such as "Abena at 30", with the date underneath.' },
      { q: 'Can you make birthday souvenirs for children?', a: 'Yes. Lip balm on a colourful printed card is a hit with children and their parents.' },
    ],
    cta: 'Design your birthday favours',
    imageAlt: 'Birthday party favours: shimmer oil and lip balms in a pink organza bag',
  },
  {
    slug: 'church-events',
    name: 'Church events',
    title: 'Church Event Souvenirs in Ghana | Medaase Favors',
    metaDescription:
      'Souvenirs for church anniversaries, harvests, thanksgiving and ordinations in Ghana. Shea butter and hand cream with your church name. From 25 pieces.',
    h1: 'Souvenirs for church anniversaries, harvests and thanksgiving',
    intro:
      'A church anniversary, a harvest, a thanksgiving service or an ordination brings the whole congregation together. Mark the day with a favour every member will take home and use.',
    sections: [
      {
        h: 'Practical, dignified and affordable in large numbers',
        p: [
          'Church events often mean large numbers of guests, so souvenirs need to be affordable, useful and suitable for everyone from the youth to the elders. Shea butter, hand cream and hand wash gel tick every box. They are used every day at home, and the church name, the theme of the year or a short verse on the label carries the message well beyond the service.',
          'We can match lid colours to your church or ministry colours, and design a label around your anniversary logo or theme for free. For the clergy, guest ministers and the planning committee, a larger size makes a fitting gift.',
        ],
      },
      {
        h: 'Ideal for many occasions',
        p: [
          'Church anniversaries, harvest thanksgiving, women\'s and men\'s fellowship days, youth programmes, ordinations, inductions, choir anniversaries and pastor appreciation services all suit personalised souvenirs. Families also order them for private thanksgiving services after a wedding, a birth or a recovery.',
        ],
      },
      {
        h: 'Ordering for a congregation',
        p: [
          'Orders start from 25 pieces per product, with no upper limit. For very large orders, message us on WhatsApp before you order so we can plan timing with you. Payment is made in full online through Paystack, which makes it simple for a committee treasurer to keep records.',
        ],
      },
    ],
    products: ['pure-african-shea-butter', 'hand-cream', 'hand-wash-gel', 'lip-balm'],
    bundles: ['sweet-pair'],
    labelIdeas: [
      '25th Anniversary · Grace Chapel',
      'Harvest Thanksgiving 2026',
      'To God be the glory',
      'Women\'s Fellowship Day',
      'Ordination of Rev. Mensah',
      'Psalm 118:24',
    ],
    faqs: [
      { q: 'Can we put our church logo on the label?', a: 'Yes. Upload your logo or anniversary design and we will place the date underneath.' },
      { q: 'Can you handle a very large church order?', a: 'Yes. There is no upper limit. For large quantities, message us first so we can agree a timeline.' },
      { q: 'Can I put a Bible verse on the label?', a: 'Yes, as long as it fits within 32 characters, such as a short verse reference or theme.' },
    ],
    cta: 'Order church event souvenirs',
    imageAlt: 'Church anniversary souvenirs: hand cream bottles with the church name on the labels',
  },
  {
    slug: 'corporate-gifts',
    name: 'Corporate gifts',
    title: 'Corporate Gifts in Accra | Custom Favours | Medaase Favors',
    metaDescription:
      'Branded skincare corporate gifts in Accra: hand cream, shea butter and lip balm with your company logo. For staff, clients and events. From 25 pieces.',
    h1: 'Corporate gifts with your logo on them',
    intro:
      'Thank your team, your clients or your conference guests with a gift they will use every day, branded with your logo and the date of your event.',
    sections: [
      {
        h: 'Branded gifts that stay on the desk',
        p: [
          'Pens get lost and notebooks stay blank. A good hand cream or a tub of pure shea butter with your logo on it gets used daily, at a desk, in a handbag or at home. That makes it one of the most effective, affordable branded gifts for companies in Accra and across Ghana.',
          'Our corporate gifts work for end of year appreciation, client thank yous, product launches, conferences, staff wellness days, women\'s day and new hire welcome packs. Choose a single product or bundle two or more together for 5% off the whole order.',
        ],
      },
      {
        h: 'Your brand, done properly',
        p: [
          'Upload your logo and we design a clean label that respects your brand colours, then send it on WhatsApp for approval. Choose containers and lids that match your brand palette. Add a drawstring organza bag in navy, white or gold and a thank you tag for a finished look.',
        ],
      },
      {
        h: 'Simple ordering and payment',
        p: [
          'Orders start from 25 pieces per product. Pay in full online through Paystack with MoMo or a company card, and you receive an email confirmation with your order reference for your records. Favours are ready 5 to 7 working days after you approve your design. For very large orders, message us first so we can plan production with you.',
        ],
      },
    ],
    products: ['hand-cream', 'pure-african-shea-butter', 'lip-balm', 'hand-wash-gel'],
    bundles: ['sweet-pair'],
    labelIdeas: [
      'Your company logo',
      'Thank you for a great year',
      'Welcome to the team',
      'With gratitude, from all of us',
      'Happy International Women\'s Day',
      'Annual Conference 2026',
    ],
    faqs: [
      { q: 'Can you put our company logo on the gifts?', a: 'Yes. Upload your logo in PNG, JPG, SVG or PDF and we will design the label around it, with the date underneath.' },
      { q: 'Do you provide a receipt for company records?', a: 'Yes. You receive an email confirmation with your order reference and full itemised total once payment is made.' },
      { q: 'What is the best corporate gift for staff?', a: 'Hand cream and shea butter are the most popular because everyone uses them. Bundle with a lip balm to save 5%.' },
    ],
    cta: 'Order branded corporate gifts',
    imageAlt: 'Corporate gifts: hand cream and lip balm with a company logo on the labels',
  },
];

export function getEventPage(slug: string) {
  return EVENT_PAGES.find((e) => e.slug === slug);
}
