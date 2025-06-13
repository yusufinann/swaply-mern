import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ToysIcon from '@mui/icons-material/Toys';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import BookIcon from '@mui/icons-material/Book';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import RecyclingIcon from '@mui/icons-material/Recycling';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ChatIcon from '@mui/icons-material/Chat';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export const categories = [
  {
    id: 1,
    title: 'Elektronik',
    subtitle: 'Telefonlar, Bilgisayarlar',
    icon: <DevicesOtherIcon sx={{ fontSize: 60, color: '#1565c0' }} />,
    bgColor: '#e3f2fd', // Light Blue
    link: '/category/elektronik',
  },
  {
    id: 2,
    title: 'Moda ve Giyim',
    subtitle: 'Kıyafetler, Ayakkabılar',
    icon: <CheckroomIcon sx={{ fontSize: 60, color: '#c62828' }} />,
    bgColor: '#ffebee', // Light Red
    link: '/category/moda',
  },
  {
    id: 3,
    title: 'Ev ve Yaşam',
    subtitle: 'Mobilyalar, Dekorasyon',
    icon: <HomeWorkIcon sx={{ fontSize: 60, color: '#2e7d32' }} />,
    bgColor: '#e8f5e9', // Light Green
    link: '/category/ev-yasam',
  },
  {
    id: 4,
    title: 'Hobi ve Oyuncak',
    subtitle: 'Kitaplar, Oyunlar',
    icon: <ToysIcon sx={{ fontSize: 60, color: '#ff8f00' }} />,
    bgColor: '#fff3e0', // Light Orange
    link: '/category/hobi-oyuncak',
  },
  {
    id: 5,
    title: 'Kitap ve Dergi',
    subtitle: 'Romanlar, Eğitim',
    icon: <BookIcon sx={{ fontSize: 60, color: '#4527a0' }} />,
    bgColor: '#ede7f6', // Light Purple
    link: '/category/kitap',
  },
  {
    id: 6,
    title: 'Spor ve Outdoor',
    subtitle: 'Ekipmanlar, Aksesuarlar',
    icon: <SportsEsportsIcon sx={{ fontSize: 60, color: '#00695c' }} />,
    bgColor: '#e0f2f1', // Light Teal
    link: '/category/spor',
  },
  {
    id: 7,
    title: 'Araç Parçaları',
    subtitle: 'Oto, Motosiklet',
    icon: <DirectionsCarIcon sx={{ fontSize: 60, color: '#6a1b9a' }} />,
    bgColor: '#f3e5f5', // Light Deep Purple
    link: '/category/arac',
  },
  {
    id: 8,
    title: 'Diğer Her Şey',
    subtitle: 'Antikalar, Koleksiyonlar',
    icon: <BuildIcon sx={{ fontSize: 60, color: '#4e342e' }} />,
    bgColor: '#efebe9', // Light Brown
    link: '/category/diger',
  },
];

export const featuredItems = [
  {
    id: 1,
    name: 'Vintage Deri Ceket',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Az kullanılmış, M beden, gerçek deri ceket.',
    wants: 'Eski bir plak çalar veya fotoğraf makinesi',
    category: 'Moda ve Giyim',
    user: 'Ayşe K.',
  },
  {
    id: 2,
    name: 'Klasik Gitar',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Yeni başlayanlar için ideal, iyi durumda.',
    wants: 'Grafik tablet veya 2 adet roman',
    category: 'Hobi ve Oyuncak',
    user: 'Mehmet B.',
  },
  {
    id: 3,
    name: 'Retro Kahve Makinesi',
    imageUrl: 'https://images.pexels.com/photos/4349846/pexels-photo-4349846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Çalışır durumda, şık tasarımlı kahve makinesi.',
    wants: 'Bluetooth hoparlör',
    category: 'Ev ve Yaşam',
    user: 'Zeynep S.',
  },
  {
    id: 4,
    name: 'Dağ Bisikleti',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: '26 jant, bakımları yeni yapıldı.',
    wants: 'Koşu bandı veya drone',
    category: 'Spor ve Outdoor',
    user: 'Ali T.',
  },
];

export const howItWorksSteps = [
  {
    id: 1,
    icon: <AddCircleOutlineIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Ürününü Yükle',
    description: 'Takas etmek istediğin eşyanın fotoğrafını çek, bilgilerini gir ve ne istediğini belirt.',
  },
  {
    id: 2,
    icon: <FindInPageIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Takasları Keşfet',
    description: 'Diğer kullanıcıların yüklediği ürünlere göz at, sana uygun olanları bul.',
  },
  {
    id: 3,
    icon: <SwapHorizIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Teklif Gönder',
    description: 'Beğendiğin bir ürün için kendi ürününle takas teklif et.',
  },
  {
    id: 4,
    icon: <ChatIcon color="primary" sx={{ fontSize: 50 }} />,
    title: 'Anlaş ve Takasla',
    description: 'Teklifin kabul edilirse satıcıyla sohbet et, detayları konuş ve takası gerçekleştir.',
  },
];

export const recentSwaps = [
    { item1: 'iPhone 13', item2: 'MacBook Air', user1: 'Ahmet K.', user2: 'Selin M.', time: '2 saat önce' },
    { item1: 'Dağ Bisikleti', item2: 'Drone', user1: 'Can T.', user2: 'Zehra B.', time: '5 saat önce' },
    { item1: 'Kitap Seti', item2: 'Gitar', user1: 'Ece S.', user2: 'Murat Y.', time: '1 gün önce' }
  ];

  export   const stats = [
    { label: 'Aktif Takas', value: '2,847', icon: <SwapHorizIcon /> },
    { label: 'Mutlu Kullanıcı', value: '12,340', icon: <PeopleIcon /> },
    { label: 'Başarılı Takas', value: '8,920', icon: <TrendingUpIcon /> },
    { label: 'CO₂ Tasarrufu', value: '45 Ton', icon: <RecyclingIcon /> }
  ];