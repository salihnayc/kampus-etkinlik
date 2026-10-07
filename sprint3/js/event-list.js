import {events} from './data.js'

function createCard(event) {
    return `<article class="etkinlik-article"><h2>${event.title}</h2><p>${event.category}</p><p>Tarih: ${event.date} ${event.time}</p><p>Yer: ${event.location}</p><p>Kontenjan: ${event.capacity} kişi</p><p>${event.description}</p><a href="etkinlik-detay.html?id=${event.id}">Detay</a></article>`
}

const list = document.querySelector("#etkinlik-liste")

function render(dizi) {
    list.innerHTML = dizi.map(createCard).join("")
}

if(list.dataset.limit) {
    const yaklasan = [...events]
        .sort((a,b) => a.date.localeCompare(b.date))
        .slice(0, Number(list.dataset.limit))
    render(yaklasan)
} else {
    render(events)
}

const kategoriFiltre = document.querySelector("#kategori-filtre")

const kategoriler = new Set()
events.forEach((item) => kategoriler.add(item.category))

kategoriler.forEach((item) => kategoriFiltre.innerHTML += `<option>${item}</option>`)

const arama = document.querySelector("#arama")

kategoriFiltre.addEventListener("change", (e) => {
    e.preventDefault()
    const aranan = arama.value.toLocaleLowerCase("tr-TR")
    let sonuc
    if (kategoriFiltre.value === "Tümü") {
        sonuc = events.filter((e) => e.title.toLocaleLowerCase("tr-TR").includes(aranan))
    } else {
        sonuc = events.filter((e) => e.category === kategoriFiltre.value && e.title.toLocaleLowerCase("tr-TR").includes(aranan))
    } 
    document.querySelector("#etkinlik-liste").textContent = `${sonuc.length} etkinlik`
    render(sonuc)
})

arama.addEventListener("input", (e) => {
    e.preventDefault()
    const aranan = arama.value.toLocaleLowerCase("tr-TR")
    let sonuc
    if (kategoriFiltre.value === "Tümü") {
        sonuc = events.filter((e) => e.title.toLocaleLowerCase("tr-TR").includes(aranan))
    } else {
        sonuc = events.filter((e) => e.category === kategoriFiltre.value && e.title.toLocaleLowerCase("tr-TR").includes(aranan))
    } 
    document.querySelector("#etkinlik-liste").textContent = `${sonuc.length} etkinlik`
    render(sonuc)
})