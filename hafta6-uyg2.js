function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    return value - 273.15;
}

function fromCelsius(celsius, unit) {
    if (unit === "C") return celsius;
    if (unit === "F") return (celsius * 9 / 5) + 32;
    return celsius + 273.15;
}

document.getElementById("donusturBtn").addEventListener("click", function () {
    const value = Number(document.getElementById("deger").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const sonucAlan = document.getElementById("donusumSonucu");

    if (Number.isNaN(value)) {
        sonucAlan.textContent = "Lutfen gecerli bir sayi giriniz.";
        return;
    }

    const celsius = toCelsius(value, from);
    const converted = fromCelsius(celsius, to);

    sonucAlan.textContent = value + " " + from + " = " + converted.toFixed(2) + " " + to;
});
