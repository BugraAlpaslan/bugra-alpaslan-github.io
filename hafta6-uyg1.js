function harfNotuHesapla(ortalama) {
    if (ortalama >= 90) return "AA";
    if (ortalama >= 85) return "BA";
    if (ortalama >= 80) return "BB";
    if (ortalama >= 75) return "CB";
    if (ortalama >= 65) return "CC";
    if (ortalama >= 58) return "DC";
    if (ortalama >= 50) return "DD";
    if (ortalama >= 40) return "FD";
    return "FF";
}

document.getElementById("hesaplaBtn").addEventListener("click", function () {
    const adSoyad = document.getElementById("adSoyad").value.trim();
    const vize = Number(document.getElementById("vizeNotu").value);
    const finalNotu = Number(document.getElementById("finalNotu").value);
    const sonucAlan = document.getElementById("notSonucu");

    if (!adSoyad) {
        sonucAlan.textContent = "Lutfen ad soyad giriniz.";
        return;
    }

    if (Number.isNaN(vize) || Number.isNaN(finalNotu) || vize < 0 || vize > 100 || finalNotu < 0 || finalNotu > 100) {
        sonucAlan.textContent = "Lutfen 0-100 araliginda gecerli notlar giriniz.";
        return;
    }

    const ortalama = (vize * 0.4) + (finalNotu * 0.6);
    const harf = harfNotuHesapla(ortalama);
    const durum = ortalama >= 50 ? "GECTI" : "KALDI";

    sonucAlan.textContent = adSoyad + " | Ortalama: " + ortalama.toFixed(2) + " | Harf Notu: " + harf + " | Durum: " + durum;
});
