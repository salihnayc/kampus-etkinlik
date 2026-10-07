import {events} from './data.js'

const form = document.querySelector("#etkinlik-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const fd = new FormData(form)
    const data = {
        title: fd.get('etkinlikad'),
        category: fd.get('kategoriler'),
        date: fd.get('tarih'),
        time: fd.get('saat'),
        location: fd.get('yer'),
        description: fd.get('aciklama'),
        capacity: fd.get('kontenjan')
    }

    const errors = {}
    if (data.title.length < 3) {
        errors.title = "Etkinlik adı en az 3 karakter olmalı"
    }
    if (!data.category) {
        errors.category = "Kategori seçilmelidir"
    }
    if (!data.date) {
        errors.date = "Tarih seçilmelidir"
    }
    if (!data.time) {
        errors.date = "Saat seçilmelidir"
    }
    if (!data.description) {
        errors.description = "Açıklama girilmelidir"
    }
    if (parseInt(data.capacity) < 1 || parseInt(data.capacity) > 1000) {
        errors.capacity = "Kontenjan 1 ve 1000 arası olmalıdır"
    }

    if (Object.keys(errors).length == 0) {
        document.querySelector("#form-mesaj").innerHTML = `<pre>${JSON.stringify(data,null,2)}</pre>`
    }
    console.log(data)
})