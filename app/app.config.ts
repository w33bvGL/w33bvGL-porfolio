export default defineAppConfig({
  global: {
    picture: {
      src: '/avatar.jpg',
      alt: 'Vahe — Full Stack Developer'
    },
    email: 'w33bv.gl@gmail.com',
    available: true,
    birthday: '2005-03-30'
  },
  ui: {
    colors: {
      primary: 'red',
      neutral: 'neutral'
    }
  },
  footer: {
    credits: `Copyright © 2024 - ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/w33bvGL',
        'target': '_blank',
        'aria-label': 'Vahe on GitHub'
      },
      {
        'icon': 'i-simple-icons-telegram',
        'to': 'https://t.me/Vahesargsyan2005',
        'target': '_blank',
        'aria-label': 'Vahe on Telegram'
      },
      {
        'icon': 'i-simple-icons-facebook',
        'to': 'https://facebook.com/profile.php?id=61551120939139',
        'target': '_blank',
        'aria-label': 'Vahe on Facebook'
      },
      {
        'icon': 'i-simple-icons-maildotru',
        'to': 'mailto:w33bv.gl@gmail.com',
        'target': '_blank',
        'aria-label': 'Send email to Vahe'
      }
    ]
  }
})
