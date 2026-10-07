import {events} from './data.js'

const id = new URLSearchParams(location.search).get('id')

const event = events.find((e) => e.id === id)

const detay = document.querySelector("#detay-article")

if (!event) {
    detay.innerHTML = `${id} numaralı etkinlik bulunamadı`
} else {
    detay.innerHTML = `<figure>
                <img src="banner.png" alt="${event.title} Afişi" class="etkinlik-afis">
                <figcaption><i>Şekil: ${event.title} afişi</i></figcaption>
            </figure>
            <dl class="etkinlik-dl">
                <dt>Etkinlik Adı</dt>
                <dd>${event.title}</dd>
                <dt>Kategori</dt>
                <dd>${event.category}</dd>
                <dt>Tarih</dt>
                <dd>${event.date}, ${event.time}</dd>
                <dt>Yer</dt>
                <dd>${event.location}</dd>
                <dt>Kontenjan</dt>
                <dd>${event.capacity}</dd>
                <dt>Açıklama</dt>
                <dd>${event.description}</dd>
            </dl>

            <a href="etkinlikler.html">Listeye dön</a>`
}