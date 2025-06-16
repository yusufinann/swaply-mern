# Swaply - MERN Yığınlı İkinci El Takas Platformu 🔁

[![GitHub Repo stars](https://img.shields.io/github/stars/yusufinann/swaply-mern?style=social)](https://github.com/yusufinann/swaply-mern/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yusufinann/swaply-mern?style=social)](https://github.com/yusufinann/swaply-mern/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yusufinann/swaply-mern)](https://github.com/yusufinann/swaply-mern/issues)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE) <!-- Eğer bir lisansınız varsa -->

**Swaply (Takasta), kullanıcıların ikinci el eşyalarını listeleyebilecekleri ve bunları nakit kullanmadan doğrudan başkalarıyla takas edebilecekleri, MERN yığını (MongoDB, Express, React, Node.js) ile oluşturulmuş tam yığınlı bir web uygulamasıdır.**

> ♻️ **Sürdürülebilir ticaret artık çok kolay. Değerini biliyorsan, paraya gerek yok!**

**Daha Fazla Bilgi Edinin:** Projenin arkasındaki vizyonu ve felsefeyi keşfetmek için tanıtım sitemizi ziyaret edin:
👉 [**infotakasta.netlify.app**](https://infotakasta.netlify.app/)

---

## 🌟 Projenin Amacı ve Vizyonu

Günümüz tüketim kültüründe, birçok kullanılabilir eşya atıl duruma düşmekte veya gereksiz yere çöpe gitmektedir. Aynı zamanda, insanlar yeni ihtiyaçlarını karşılamak için sürekli olarak para harcamak zorunda kalmaktadır. Swaply (Takasta), bu iki soruna yenilikçi bir çözüm sunar:

*   **Ekonomik Değer Yaratma:** Kullanıcıların artık ihtiyaç duymadıkları eşyalarını, para harcamadan, doğrudan istedikleri başka eşyalarla takas etmelerini sağlar.
*   **Sürdürülebilirliği Teşvik Etme:** Eşyaların ömrünü uzatarak, yeniden kullanımı teşvik ederek ve atığı azaltarak döngüsel ekonomiye katkıda bulunur.
*   **Topluluk Oluşturma:** Güvenli ve şeffaf bir ortamda, kullanıcıların birbirleriyle etkileşim kurabileceği, paylaşımda bulunabileceği bir topluluk inşa eder.
*   **Akıllı Çözümler Sunma:** Yapay zeka destekli özelliklerle takas sürecini kolaylaştırır ve kullanıcı deneyimini zenginleştirir.

**Vizyonumuz,** insanların tüketim alışkanlıklarını değiştirerek daha bilinçli, ekonomik ve çevre dostu bir yaşam tarzını benimsemelerine öncülük eden, Türkiye'nin lider takas platformu olmaktır.

---

## ✨ Temel Özellikler

Swaply (Takasta), kullanıcı dostu ve zengin bir takas deneyimi sunmak için aşağıdaki temel özellikleri içerir (veya planlamaktadır):

*   **Kullanıcı Kayıt ve Profil Yönetimi:** Güvenli kimlik doğrulama ve kişiselleştirilmiş kullanıcı profilleri.
*   **Eşya Listeleme:** Detaylı açıklamalar, kategoriler ve yüksek kaliteli görsellerle kolay eşya yükleme.
*   **Gelişmiş Arama ve Filtreleme:** Kullanıcıların aradıkları eşyaları kolayca bulabilmeleri için lokasyon, kategori, değer vb. bazlı filtreler.
*   **Yapay Zeka Destekli Değerleme (Planlanan):** Yüklenen eşyaların tahmini piyasa değerini belirlemeye yardımcı olacak AI entegrasyonu.
*   **Akıllı Eşleştirme Önerileri:** Kullanıcıların listeledikleri ve aradıkları eşyalara göre potansiyel takas eşleşmeleri sunma.
*   **Doğrudan Takas Teklifleri:** Kullanıcıların birbirlerine doğrudan takas teklifleri gönderebilmesi.
*   **Karma Takas (Eşya + Az Miktarda Nakit - Planlanan):** Değer farklarını dengelemek için küçük miktarda nakit ekleme seçeneği.
*   **Güvenli Takas Süreci:**
    *   **Emanet Sistemi (Planlanan):** Yüksek değerli eşyalar için güvenli bir aracı mekanizması.
    *   **Kullanıcı Değerlendirme ve Yorum Sistemi:** Güvenilir bir topluluk oluşturmak için kullanıcıların birbirlerini puanlayabilmesi.
*   **Anlık Mesajlaşma:** Kullanıcıların takas detaylarını görüşebilmeleri için platform içi gerçek zamanlı sohbet (Socket.io ile).
*   **Bildirim Sistemi:** Yeni teklifler, mesajlar ve eşleşmeler hakkında anlık bildirimler.
*   **Takas Çemberleri (Planlanan):** Belirli ilgi alanlarına veya coğrafi bölgelere göre özel takas grupları oluşturma.
*   **Karbon Ayak İzi Takibi (Planlanan):** Yapılan her takasın çevreye olan olumlu etkisini göstererek farkındalık yaratma.

---

## 🚀 Kullanılan Teknolojiler

Swaply (Takasta), modern ve ölçeklenebilir bir mimari üzerine inşa edilmiştir:

*   **Frontend:**
    *   **React.js:** Kullanıcı arayüzü geliştirmek için popüler bir JavaScript kütüphanesi.
    *   **Material UI (veya benzeri bir UI kütüphanesi):** Hızlı ve estetik bileşenler oluşturmak için.
    *   **Context API / Redux (veya Zustand/Jotai):** Global state yönetimi için.
    *   **React Router:** İstemci tarafı yönlendirme için.
*   **Backend:**
    *   **Node.js:** Sunucu tarafı JavaScript çalışma zamanı ortamı.
    *   **Express.js:** Hızlı ve minimalist bir Node.js web uygulama çatısı.
    *   **MongoDB Atlas / Yerel MongoDB:** Esnek ve ölçeklenebilir NoSQL belge veritabanı.
    *   **Mongoose:** MongoDB için zarif bir nesne modelleme aracı.
    *   **JSON Web Tokens (JWT):** Güvenli kimlik doğrulama ve yetkilendirme için.
    *   **Bcrypt.js:** Parola hashleme için.
*   **Gerçek Zamanlı İletişim:**
    *   **Socket.io:** Anlık mesajlaşma ve bildirimler için çift yönlü, olay tabanlı iletişim.
*   **Diğer Araçlar ve Servisler (Potansiyel):**
    *   **Cloudinary / AWS S3:** Resim ve medya dosyalarını depolamak için.
    *   **Nodemailer:** E-posta bildirimleri için.
    *   **Docker:** Geliştirme ve dağıtım süreçlerini kolaylaştırmak için (opsiyonel).
    *   **Jest / Mocha / Chai:** Test otomasyonu için.

---

## 🛠️ Kurulum ve Çalıştırma (Geliştirme Ortamı)

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

**Ön Koşullar:**

*   [Node.js](https://nodejs.org/) (LTS versiyonu önerilir)
*   [MongoDB](https://www.mongodb.com/try/download/community) (yerel olarak kurulmuş veya MongoDB Atlas hesabı)
*   `npm` veya `yarn` paket yöneticisi

**Backend Kurulumu:**

1.  Repoyu klonlayın:
    ```bash
    git clone https://github.com/yusufinann/swaply-mern.git
    cd swaply-mern/backend  # Backend klasörüne gidin
    ```
2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    # veya
    yarn install
    ```
3.  Bir `.env` dosyası oluşturun ve aşağıdaki ortam değişkenlerini tanımlayın:
    ```env
    PORT=5000 # veya tercih ettiğiniz bir port
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    # Gerekirse diğer değişkenler (Cloudinary API keyleri vb.)
    ```
4.  Sunucuyu başlatın:
    ```bash
    npm run dev
    # veya
    yarn dev
    ```

**Frontend Kurulumu:**

1.  Yeni bir terminal açın ve frontend klasörüne gidin:
    ```bash
    cd ../frontend # Ana proje dizininden
    ```
2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    # veya
    yarn install
    ```
3.  Gerekirse `.env` dosyasında backend API adresini (`REACT_APP_API_URL=http://localhost:5000/api`) tanımlayın.
4.  React geliştirme sunucusunu başlatın:
    ```bash
    npm start
    # veya
    yarn start
    ```

Artık uygulama `http://localhost:3000` (veya frontend için belirlediğiniz port) adresinde çalışıyor olmalı ve backend `http://localhost:5000` (veya backend için belirlediğiniz port) üzerinden API isteklerini dinliyor olmalı.

---
## 🤝 Katkıda Bulunma

Swaply (Takasta) projesine katkıda bulunmak harika olur! Geliştirmemize yardımcı olmak, hata bildirmek veya yeni özellikler önermek isterseniz:

1.  Bu repoyu fork'layın.
2.  Yeni bir özellik dalı oluşturun (`git checkout -b feature/harika-bir-ozellik`).
3.  Değişikliklerinizi commit'leyin (`git commit -m 'Eklendi: Harika bir özellik'`).
4.  Dalınızı push'layın (`git push origin feature/harika-bir-ozellik`).
5.  Bir Pull Request (Çekme İsteği) açın.

Lütfen katkılarınızın projenin genel vizyonu ve kodlama standartlarıyla uyumlu olmasına özen gösterin.

---

## 💡 Gelecek Geliştirmeler

*   Tam kapsamlı yapay zeka destekli değerleme ve eşleştirme.
*   Mobil uygulama (React Native veya native).
*   Gelişmiş kullanıcı analitikleri ve raporlama.
*   Coğrafi konum tabanlı daha hassas eşleştirme ve "yakınımdakiler" özelliği.
*   Oyunlaştırma elementleri (rozetler, puanlar) ile kullanıcı etkileşimini artırma.
*   Daha fazla güvenlik katmanı ve dolandırıcılık önleme mekanizmaları.

---

## 👤 Geliştirici

**Yusuf İnan**

*   GitHub: [@yusufinann](https://github.com/yusufinann)
*   LinkedIn: [Yusuf İnan](https://www.linkedin.com/in/yusuf-inan-a42396266/)
*   Tanıtım Sitesi: [infotakasta.netlify.app](https://infotakasta.netlify.app/)

---

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız. (Eğer bir lisans dosyası eklediyseniz.)

---

Swaply (Takasta) ile sürdürülebilir bir geleceğe adım atın! Fikir ve önerilerinizi her zaman bekliyoruz.
