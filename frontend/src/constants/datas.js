
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
    id: "1",
    title: 'Elektronik',
    subtitle: 'Telefonlar, Bilgisayarlar',
    icon: <DevicesOtherIcon sx={{ fontSize: 60, color: '#1565c0' }} />,
    bgColor: '#e3f2fd',
    link: '/category/elektronik',
    value: 'elektronik',
  },
  {
    id: "2",
    title: 'Moda ve Giyim',
    subtitle: 'Kıyafetler, Ayakkabılar',
    icon: <CheckroomIcon sx={{ fontSize: 60, color: '#c62828' }} />,
    bgColor: '#ffebee',
    link: '/category/moda',
    value: 'moda',
  },
  {
    id: "3",
    title: 'Ev ve Yaşam',
    subtitle: 'Mobilyalar, Dekorasyon',
    icon: <HomeWorkIcon sx={{ fontSize: 60, color: '#2e7d32' }} />,
    bgColor: '#e8f5e9',
    link: '/category/ev-yasam',
    value: 'ev-yasam',
  },
  {
    id: "4",
    title: 'Hobi ve Oyuncak',
    subtitle: 'Kitaplar, Oyunlar',
    icon: <ToysIcon sx={{ fontSize: 60, color: '#ff8f00' }} />,
    bgColor: '#fff3e0',
    link: '/category/hobi-oyuncak',
    value: 'hobi-oyuncak',
  },
  {
    id: "5",
    title: 'Kitap ve Dergi',
    subtitle: 'Romanlar, Eğitim',
    icon: <BookIcon sx={{ fontSize: 60, color: '#4527a0' }} />,
    bgColor: '#ede7f6',
    link: '/category/kitap',
    value: 'kitap',
  },
  {
    id: "6",
    title: 'Spor ve Outdoor',
    subtitle: 'Ekipmanlar, Aksesuarlar',
    icon: <SportsEsportsIcon sx={{ fontSize: 60, color: '#00695c' }} />,
    bgColor: '#e0f2f1',
    link: '/category/spor',
    value: 'spor',
  },
  {
    id: "7",
    title: 'Araç Parçaları',
    subtitle: 'Oto, Motosiklet',
    icon: <DirectionsCarIcon sx={{ fontSize: 60, color: '#6a1b9a' }} />,
    bgColor: '#f3e5f5',
    link: '/category/arac',
    value: 'arac',
  },
  {
    id: "8",
    title: 'Diğer Her Şey',
    subtitle: 'Antikalar, Koleksiyonlar',
    icon: <BuildIcon sx={{ fontSize: 60, color: '#4e342e' }} />,
    bgColor: '#efebe9',
    link: '/category/diger',
    value: 'diger',
  },
];

export const featuredItems = [
  {
    id: 101,
    name: 'Vintage Deri Ceket',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Az kullanılmış, M beden, gerçek deri ceket.',
    wants: 'Eski bir plak çalar veya fotoğraf makinesi',
    category: 'Moda ve Giyim',
    user: 'Ayşe K.',
    location: 'İstanbul',
    timeAgo: '1 saat önce',
    rating: 4.8
  },
  {
    id: 102,
    name: 'Klasik Gitar',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Yeni başlayanlar için ideal, iyi durumda.',
    wants: 'Grafik tablet veya 2 adet roman',
    category: 'Hobi ve Oyuncak',
    user: 'Mehmet B.',
    location: 'Ankara',
    timeAgo: '3 saat önce',
    rating: 4.5
  },
  {
    id: 103,
    name: 'Retro Kahve Makinesi',
    imageUrl: 'https://images.pexels.com/photos/4349846/pexels-photo-4349846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Çalışır durumda, şık tasarımlı kahve makinesi.',
    wants: 'Bluetooth hoparlör',
    category: 'Ev ve Yaşam',
    user: 'Zeynep S.',
    location: 'İzmir',
    timeAgo: '5 saat önce',
    rating: 4.2
  },
  {
    id: 104,
    name: 'Dağ Bisikleti',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: '26 jant, bakımları yeni yapıldı.',
    wants: 'Koşu bandı veya drone',
    category: 'Spor ve Outdoor',
    user: 'Ali T.',
    location: 'Bursa',
    timeAgo: '1 gün önce',
    rating: 4.9
  },
];

export const allMarketItems = [
  {
    id: 1,
    name: 'Vintage Deri Ceket',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    description: 'Az kullanılmış, M beden, gerçek deri ceket.',
    wants: 'Eski bir plak çalar veya fotoğraf makinesi',
    category: 'Moda ve Giyim',
    user: 'Ayşe K.',
    location: 'İstanbul',
    timeAgo: '1 saat önce',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Klasik Gitar',
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3VpdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: 'Yeni başlayanlar için ideal, iyi durumda.',
    wants: 'Grafik tablet veya 2 adet roman',
    category: 'Hobi ve Oyuncak',
    user: 'Mehmet B.',
    location: 'Ankara',
    timeAgo: '3 saat önce',
    rating: 4.5
  },
  {
    id: 3,
    name: 'Retro Kahve Makinesi',
    imageUrl: 'https://images.pexels.com/photos/4349846/pexels-photo-4349846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Çalışır durumda, şık tasarımlı kahve makinesi.',
    wants: 'Bluetooth hoparlör',
    category: 'Ev ve Yaşam',
    user: 'Zeynep S.',
    location: 'İzmir',
    timeAgo: '5 saat önce',
    rating: 4.2
  },
  {
    id: 4,
    name: 'Dağ Bisikleti',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    description: '26 jant, bakımları yeni yapıldı.',
    wants: 'Koşu bandı veya drone',
    category: 'Spor ve Outdoor',
    user: 'Ali T.',
    location: 'Bursa',
    timeAgo: '1 gün önce',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Akıllı Telefon XZ Model',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=500&q=60',
    description: 'Kutulu, faturalı, az kullanılmış akıllı telefon.',
    wants: 'Daha üst model bir telefonla takas + fark',
    category: 'Elektronik',
    user: 'Elif Y.',
    location: 'İstanbul',
    timeAgo: '2 saat önce',
    rating: 4.6
  },
  {
    id: 6,
    name: 'Dizüstü Bilgisayar Pro',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=60',
    description: 'İş ve oyun için uygun, güçlü dizüstü bilgisayar.',
    wants: 'Masaüstü oyun bilgisayarı',
    category: 'Elektronik',
    user: 'Can D.',
    location: 'Ankara',
    timeAgo: '6 saat önce',
    rating: 4.7
  },
  {
    id: 7,
    name: 'Yazlık Elbise',
    imageUrl: 'https://images.unsplash.com/photo-1595777457585-1568e7d7d079?auto=format&fit=crop&w=500&q=60',
    description: 'S beden, hiç giyilmemiş yazlık elbise.',
    wants: 'Vintage çanta veya eşarp',
    category: 'Moda ve Giyim',
    user: 'Sema G.',
    location: 'Antalya',
    timeAgo: '4 saat önce',
    rating: 4.3
  },
   {
    id: 8,
    name: 'Çocuk Oyuncak Seti',
    imageUrl: 'https://images.unsplash.com/photo-1566576912319-1d415ce88348?auto=format&fit=crop&w=500&q=60',
    description: 'Eğitici ahşap oyuncak seti, 3-5 yaş.',
    wants: 'Çocuk kitapları',
    category: 'Hobi ve Oyuncak',
    user: 'Murat K.',
    location: 'İzmir',
    timeAgo: '8 saat önce',
    rating: 4.0
  },
  {
    id: 9,
    name: '"Yüzüklerin Efendisi" Serisi',
    imageUrl: 'https://images.unsplash.com/photo-1593301400977-22c6f3759a78?auto=format&fit=crop&w=500&q=60',
    description: '3 kitaplık set, çok iyi durumda.',
    wants: 'Harry Potter serisi veya bilim kurgu romanları',
    category: 'Kitap ve Dergi',
    user: 'Deniz A.',
    location: 'İstanbul',
    timeAgo: '10 saat önce',
    rating: 5.0
  },
  {
    id: 10,
    name: 'Profesyonel Basketbol Topu',
    imageUrl: 'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&w=500&q=60',
    description: 'Spalding, outdoor kullanıma uygun.',
    wants: 'Futbol topu veya antrenman ekipmanları',
    category: 'Spor ve Outdoor',
    user: 'Berk S.',
    location: 'Adana',
    timeAgo: '12 saat önce',
    rating: 4.4
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

export const stats = [
    { label: 'Aktif Takas', value: '2,847', icon: <SwapHorizIcon /> },
    { label: 'Mutlu Kullanıcı', value: '12,340', icon: <PeopleIcon /> },
    { label: 'Başarılı Takas', value: '8,920', icon: <TrendingUpIcon /> },
    { label: 'CO₂ Tasarrufu', value: '45 Ton', icon: <RecyclingIcon /> }
  ];

export const slides = [
    {
      title: "Paranı Harcama, Takasta Kazan!",
      subtitle: "Fazlalık eşyalarınla hayallerindeki ürünlere ulaş. Sürdürülebilir ve ekonomik."
    },
    {
      title: "Birinin Çöpü, Başkasının Hazinesi",
      subtitle: "Kullanmadığın eşyalar başkalarının tam ihtiyacı olabilir. Takasla kazan!"
    },
    {
      title: "Değiş Tokuş, Değer Kazan",
      subtitle: "Para harcamadan istediğin ürünlere sahip ol. Akıllı takasın adresi."
    },
    {
      title: "Sürdürülebilir Yaşam Başlıyor",
      subtitle: "Çevreye dost, cebine uygun. Takasla hem tasarruf et hem doğayı koru."
    },
    {
      title: "Eşyalarına Yeni Hayat Ver",
      subtitle: "Evindeki fazlalıklar başka birinin eksikliğini tamamlasın. Takas yap, mutlu ol!"
    }
  ];