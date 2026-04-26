/**
 * hafta7.js
 * TechConf 2025 – Hafta 7 Lab
 *
 * İki temel etkileşim:
 *  1) Tema değiştirme (Açık / Koyu mod) – classList.toggle()
 *  2) Form doğrulama + başvuru özeti oluşturma – DOM manipulation
 */

"use strict";

// ============================================================
// 1) TEMA DEĞİŞTİRME
// ============================================================
const temaBtn   = document.getElementById("temaBtn");
const temaIcon  = document.getElementById("temaIcon");
const temaLabel = document.getElementById("temaLabel");

// Kayıtlı tercihi uygula (sayfa yenilense bile hatırlasın)
(function initTema() {
  const kayitliTema = localStorage.getItem("techconf-tema");
  if (kayitliTema === "dark") {
    document.body.classList.add("dark-mode");
    temaIcon.className  = "bi bi-sun-fill";
    temaLabel.textContent = "Açık Mod";
  }
})();

temaBtn.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark-mode");

  if (isDark) {
    temaIcon.className    = "bi bi-sun-fill";
    temaLabel.textContent = "Açık Mod";
    localStorage.setItem("techconf-tema", "dark");
  } else {
    temaIcon.className    = "bi bi-moon-stars-fill";
    temaLabel.textContent = "Koyu Mod";
    localStorage.setItem("techconf-tema", "light");
  }
});

// ============================================================
// 2) KAYIT FORMU – DOĞRULAMA + ÖZET ÜRETME
// ============================================================
const kayitFormu  = document.getElementById("kayitFormu");
const uyariAlani  = document.getElementById("uyariAlani");
const uyariMetni  = document.getElementById("uyariMetni");
const sonucAlani  = document.getElementById("sonucAlani");

// Alan etiketleri (kullanıcıya gösterilecek)
const alanEtiketleri = {
  ad:          "Ad",
  soyad:       "Soyad",
  eposta:      "E-posta",
  universite:  "Üniversite",
  bolum:       "Bölüm / Yıl",
  kategori:    "İlgilendiğiniz Alan",
};

// Kategori değerlerini okunabilir isme çevir
const kategoriIsimleri = {
  siber:    "Siber Güvenlik Zirvesi",
  ai:       "Yapay Zeka Atölyesi",
  yazilim:  "Yazılım Mühendisliği",
  hepsi:    "Hepsine Katılmak İstiyorum",
};

kayitFormu.addEventListener("submit", function (event) {
  event.preventDefault();   // Sayfa yenilenmesini engelle

  // --- Alanları Oku ---
  const degerler = {
    ad:         document.getElementById("ad").value.trim(),
    soyad:      document.getElementById("soyad").value.trim(),
    eposta:     document.getElementById("eposta").value.trim(),
    universite: document.getElementById("universite").value.trim(),
    bolum:      document.getElementById("bolum").value.trim(),
    kategori:   document.getElementById("kategori").value,
    biyografi:  document.getElementById("biyografi").value.trim(),
    kvkk:       document.getElementById("kvkk").checked,
  };

  // --- Doğrulama ---
  const eksikler = [];

  Object.entries(alanEtiketleri).forEach(([key, etiket]) => {
    if (!degerler[key]) eksikler.push(etiket);
  });

  if (!degerler.kvkk) eksikler.push("KVKK Onayı");

  // E-posta formatı kontrolü (basit)
  if (degerler.eposta && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(degerler.eposta)) {
    eksikler.push("Geçerli bir e-posta giriniz");
  }

  if (eksikler.length > 0) {
    // Uyarı göster
    uyariMetni.textContent = "Lütfen şu alanları doldurun: " + eksikler.join(", ") + ".";
    uyariAlani.classList.remove("d-none");
    uyariAlani.classList.add("d-flex");
    sonucAlani.classList.add("d-none");

    // Uyarıya kaydır
    uyariAlani.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Uyarıyı gizle
  uyariAlani.classList.add("d-none");
  uyariAlani.classList.remove("d-flex");

  // --- Özet Kartı Oluştur ---
  const kategoriAdi = kategoriIsimleri[degerler.kategori] || degerler.kategori;
  const tarih = new Date().toLocaleDateString("tr-TR", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  const satirlar = [
    { etiket: "Ad Soyad",        deger: `${degerler.ad} ${degerler.soyad}` },
    { etiket: "E-posta",         deger: degerler.eposta },
    { etiket: "Üniversite",      deger: degerler.universite },
    { etiket: "Bölüm / Yıl",    deger: degerler.bolum },
    { etiket: "Seçilen Alan",    deger: kategoriAdi },
    { etiket: "Başvuru Tarihi",  deger: tarih },
  ];

  if (degerler.biyografi) {
    satirlar.push({ etiket: "Tanıtım Notu", deger: degerler.biyografi });
  }

  const satirHTML = satirlar.map(s => `
    <div class="sonuc-satir">
      <span class="sonuc-etiket"><i class="bi bi-check2 me-1 text-accent"></i>${s.etiket}</span>
      <span class="sonuc-deger">${escapeHTML(s.deger)}</span>
    </div>
  `).join("");

  sonucAlani.innerHTML = `
    <div class="sonuc-kart">
      <div class="d-flex align-items-center gap-2 mb-4">
        <div class="p-2 rounded-3" style="background:rgba(79,70,229,0.12)">
          <i class="bi bi-patch-check-fill fs-4 text-accent"></i>
        </div>
        <div>
          <h5 class="mb-0">Başvurunuz Alındı!</h5>
          <small class="text-muted">TechConf 2025 kayıt özeti</small>
        </div>
      </div>
      ${satirHTML}
      <div class="mt-4 pt-2">
        <p class="small text-muted mb-0">
          <i class="bi bi-envelope me-1"></i>
          Onay e-postası <strong>${escapeHTML(degerler.eposta)}</strong> adresine gönderilecektir.
        </p>
      </div>
    </div>
  `;

  sonucAlani.classList.remove("d-none");

  // Başarı sonrası formu sıfırla
  kayitFormu.reset();

  // Sonuca kaydır
  sonucAlani.scrollIntoView({ behavior: "smooth", block: "start" });
});

// XSS'e karşı basit kaçış fonksiyonu
function escapeHTML(str) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(str).replace(/[&<>"']/g, m => map[m]);
}

// ============================================================
// 3) NAVBAR – Aktif bağlantı vurgulama (scroll)
// ============================================================
const sections   = document.querySelectorAll("section[id]");
const navLinks   = document.querySelectorAll(".nav-link[href^='#']");

const gozlemci = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const aktif = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (aktif) aktif.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => gozlemci.observe(s));
