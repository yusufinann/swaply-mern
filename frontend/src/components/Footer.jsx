// src/components/Footer.jsx
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink, // Renamed to avoid conflict
  IconButton,
  Stack,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  SwapHoriz,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const brandColor = '#4caf50';

  const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const footerSections = [
    {
      title: 'Hızlı Linkler',
      links: [
        { text: 'Ana Sayfa', href: '/', isInternal: true },
        { text: 'Ürün Yükle', href: '/urun-yukle', isInternal: true },
        { text: 'Takas Teklifi', href: '/takas-teklifi', isInternal: true },
        { text: 'Kategoriler', href: '/kategoriler', isInternal: true },
      ],
    },
    {
      title: 'Destek',
      links: [
        { text: 'Yardım Merkezi', href: '/help-center', isInternal: true },
        { text: 'İletişim', href: '/contact', isInternal: true },
        { text: 'Güvenlik', href: '/security', isInternal: true },
        { text: 'SSS', href: '/faq', isInternal: true },
      ],
    },
    {
      title: 'Yasal',
      links: [
        { text: 'Kullanım Şartları', href: '/terms', isInternal: true },
        { text: 'Gizlilik Politikası', href: '/privacy', isInternal: true },
        { text: 'Çerez Politikası', href: '/cookies', isInternal: true },
        { text: 'KVKK', href: '/kvkk', isInternal: true },
      ],
    },
  ];

  return (
    <Box sx={{
      backgroundColor: 'grey.900',
      color: 'grey.300',
      pt: 3,
      pb: 2,
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
              <SwapHoriz sx={{ fontSize: '1.8rem', color: brandColor }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'common.white' }}>
                Second-Hand Swap
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.6 }}>
              Eşyalarını takas etmenin en kolay yolu. Paranı harcamadan ihtiyaçlarını karşıla,
              çevreye duyarlı bir yaşam tarzı benimse.
            </Typography>
          </Grid>

          {footerSections.map((section) => (
            <Grid item xs={12} sm={4} md={8 / 3} key={section.title}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: 'common.white',
                  mb: 1,
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={0.5}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.text}
                    component={link.isInternal ? RouterLink : 'a'}
                    to={link.isInternal ? link.href : undefined}
                    href={!link.isInternal ? link.href : undefined}
                    target={!link.isInternal && (link.href.startsWith('http') || link.href === '#') ? '_blank' : undefined}
                    rel={!link.isInternal && link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    variant="body2"
                    sx={{
                      color: 'grey.400',
                      textDecoration: 'none',
                      '&:hover': {
                        color: brandColor,
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.text}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'grey.700',
            pt: 2,
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {currentYear} Second-Hand Swap Marketplace. Tüm hakları saklıdır.
          </Typography>
          <Stack direction="row" spacing={0.5}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                size="small"
                sx={{
                  color: 'grey.500',
                  '&:hover': {
                    color: brandColor,
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;