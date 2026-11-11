# Projeyi Çalıştırma

Gerekli paketleri yükleyin. örnek .env.example dosyasını .env olarak kopyalayın. İsterseniz varsayılan portu değiştirin. Tüm adımları tamamladıktan sonra geliştirme sunucusunu başlatın.

```
npm install
npm run dev
```

# Ortam Değişkenleri 

| Değişken | Varsayılan | Amaç                    |
|----------|------------|-------------------------|
| PORT     | 3000       | Sunucunun yürüdüğü port |

# Rest Sözleşmesi

| Method | Endpoint    | Amaç          | Başarılı | Hata    | Durum     |
|--------|-------------|---------------|----------|---------|-----------|
| GET    | /events     | Listeyi getir | 200      | -       | Bu sprint |
| GET    | /events/:id | Tek etkinlik  | 200      | 404     | Bu sprint |
| POST   | /events     | Yeni etkinlik | 201      | 400     | Bu sprint |
| PATCH  | /events/:id | Güncelle      | 200      | 400,404 | Sprint 9  |
| DELETE | /events/:id | Sil           | 204      | 404     | Sprint 9  |