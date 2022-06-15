import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn'
import { faAngellist } from '@fortawesome/free-brands-svg-icons/faAngellist'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope'
// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'https://github.com/akhikolla',
    label: 'Github',
    icon: faGithub,
  },
  {
    link: 'https://www.facebook.com/profile.php?id=100080718874806',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    link: 'https://www.instagram.com/akhilachowdarykolla/',
    label: 'Instagram',
    icon: faInstagram,
  },
  {
    link: '',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: '',
    label: 'Angel List',
    icon: faAngellist,
  },
  {
    link: 'mailto:akhila.c.kolla@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
]

export default data
