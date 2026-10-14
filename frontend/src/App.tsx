import { useState } from 'react'
import './App.css'
import { events } from './data/events';
import type { CampusEvent, Category } from './types/campus-events';
import { filterByCategory, findEventById, searchEvents } from './utils/filter-events';

type PageName = 'home' | 'events' | 'add-event' | 'event-detail' | 'update-event'
interface Pages {
  id: number;
  pageName: PageName;
  title: string
}

const pages: Pages[] = [
  {
    id: 1,
    pageName: 'home',
    title: 'Ana Sayfa'
  },
  {
    id: 2,
    pageName: 'events',
    title: 'Etkinlikler'
  },
  {
    id: 3,
    pageName: 'add-event',
    title: 'Etkinlik Ekle'
  }
]

export default function App() {
  
  const [page, setPage] = useState<PageName>('home');
  const [eventId, setEventId] = useState('');

  function go(next: PageName) {
    setPage(next);
  }

  const upcoming = events.sort( (a,b) => a.date.localeCompare(b.date)).slice(0,2);

  function renderCard(event: CampusEvent) {
    return (
      <article className='kart' key={event.id}>
        <h2>{event.title}</h2>
        <p className='kart-kategori'>{event.category}</p>
        <p>Tarih: {event.date} Saat {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <p><a className='kart-link' onClick={ () => {
          go('event-detail');
          setEventId(event.id);
        }}>Detayları Gör</a></p>
      </article>
    )
  }

  const [searchText, setSearchText] = useState('');

  const [category, setCategory] = useState<Category | ''>('');

  const categories = new Set(events.map(e => e.category))

  const filtered = filterByCategory(searchEvents(events,searchText),category)

  let etkinlikSayfa = (
    <p>{eventId} etkinlik bulunamadı</p>
  )

  const detay = findEventById(events,eventId);
  if (detay != undefined) {
    etkinlikSayfa = (<>
      <div className='detay-ust'>
        <figure>
          <img src={detay.image} alt={detay.title + " Afişi"} width="480" height="270"/>
          <figcaption>{detay.title + " Afişi"}</figcaption>
        </figure>
        <section className='kunye'>
          <h2>Etkinlik Künyesi</h2>
            <dt>Tarih</dt>
            <dd>{detay.date} {detay.time}</dd>
            <dt>Yer</dt>
            <dd>{detay.location}</dd>
            <dt>Kategori</dt>
            <dd>{detay.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{detay.capacity} kişi</dd>
        </section>
      </div>
      <h2>Açıklama</h2>
      <p>{detay.description}</p>
      <p className='form-butonlar'>
        <a onClick={() => go('events')}>Tüm etkinliklere dön</a>
        <a onClick={() => go('update-event')}>Bu etkinliği güncelle</a>
      </p>
    </>)
  }

  return(
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>
      <nav className="menu">
        <ul>
          {
            pages.map( (p) => <li key={p.id}><a onClick={() => go(p.pageName)} aria-current={p.pageName === page ? 'page' : 'false'}>{p.title}</a></li>)
          }
        </ul>
      </nav>
      <main>
        {page === 'home' && (<>
          <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
          <section className="etkinlik-listesi">
            {upcoming.map(renderCard)}
          </section>
          <p><a className="buton" onClick={() => go('events')}>Tüm etkinlikleri gör</a></p>
        </>)}
        {page === 'events' && (<>
          <form className='filtre'>
            <p className='alan'>
              <label htmlFor="arama">Etkinlik Ara</label>
              <input type="search" id='arama' placeholder='Etkinlik ara' onChange={(e) => setSearchText(e.target.value)}/>
            </p>
            <p className='alan'>
              <label htmlFor="kategori-filtre">Kategori</label>
              <select id="kategori-filtre" onChange={(e) => {
                if (e.target.value === "Tümü") setCategory('')
                else setCategory(e.target.value as Category)
              }}>
                <option value="Tümü">Tümü</option>
                {
                  [...categories].map((c) => <option value={c}>{c}</option>)
                }
              </select>
            </p>
          </form>

          <section className='etkinlik-listesi'>
            {filtered.map(renderCard)}
          </section>
        </>)}
        {page === 'event-detail' && (<>
          <article className='detay'>
            {etkinlikSayfa}
          </article>
        </>)}
        {page === 'add-event' && (<>
          <p className='bilgi'>Yıldızlı alanlar zorunludur</p>
          <form id="etkinlik-formu" className="form" data-mode="ekle" noValidate>
          <p className="alan">
            <label htmlFor="ad">Etkinlik Adı *</label>
            <input type="text" id="ad" name="ad" max="80" placeholder="Örn. Kariyer Günleri 2026" required />
            <span id="ad-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="kategori">Kategori *</label>
            <select id="kategori" name="kategori" required>
              <option value="">Seçiniz</option>
            </select>
            <span id="kategori-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="tarih">Tarih *</label>
            <input type="date" id="tarih" name="tarih" required />
            <span id="tarih-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="saat">Saat *</label>
            <input type="time" id="saat" name="saat" required />
            <span id="saat-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="yer">Yer *</label>
            <input type="text" id="yer" name="yer" max="80" placeholder="Örn. A Blok Konferans Salonu" required />
            <span id="yer-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="kontenjan">Kontenjan</label>
            <input type="number" id="kontenjan" name="kontenjan" min="1" max="1000" />
            <span id="kontenjan-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="aciklama">Açıklama</label>
            <textarea id="aciklama" name="aciklama"></textarea>
          </p>

          <p className="form-butonlar">
            <button type="submit" className="buton">Kaydet</button>
          </p>
        </form>
        </>)}
        {page === 'update-event' && (<>
          <p className='bilgi'>Yıldızlı alanlar zorunludur</p>
          <form id="etkinlik-formu" className="form" data-mode="ekle" noValidate>
          <p className="alan">
            <label htmlFor="ad">Etkinlik Adı *</label>
            <input type="text" id="ad" name="ad" max="80" placeholder="Örn. Kariyer Günleri 2026" required />
            <span id="ad-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="kategori">Kategori *</label>
            <select id="kategori" name="kategori" required>
              <option value="">Seçiniz</option>
            </select>
            <span id="kategori-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="tarih">Tarih *</label>
            <input type="date" id="tarih" name="tarih" required />
            <span id="tarih-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="saat">Saat *</label>
            <input type="time" id="saat" name="saat" required />
            <span id="saat-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="yer">Yer *</label>
            <input type="text" id="yer" name="yer" max="80" placeholder="Örn. A Blok Konferans Salonu" required />
            <span id="yer-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="kontenjan">Kontenjan</label>
            <input type="number" id="kontenjan" name="kontenjan" min="1" max="1000" />
            <span id="kontenjan-hata" className="hata-metni"></span>
          </p>

          <p className="alan">
            <label htmlFor="aciklama">Açıklama</label>
            <textarea id="aciklama" name="aciklama"></textarea>
          </p>

          <p className="form-butonlar">
            <button type="submit" className="buton">Kaydet</button>
          </p>
        </form>
        </>)}
      </main>
      <footer>
        <p>Salih Naycı &middot; 2416501023 &middot; 2026</p>
      </footer>
    </>
  )
}