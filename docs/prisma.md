# Prisma (bu proje)

Bu projede **Prisma 7** kullanılıyor. Şema `prisma/schema.prisma` içinde; istemci çıktısı `generated/prisma` altında üretilir (`generator` bloğu).

Bağlantı ve migrasyon yolu **`prisma.config.ts`** üzerinden tanımlı:

- `datasource.url` → ortam değişkeni `DATABASE_URL`
- `migrations.path` → `prisma/migrations`

`.env` içinde `DATABASE_URL` tanımlı olmalıdır.

---

## `npx prisma migrate dev`

**Ne işe yarar:** `schema.prisma` ile veritabanı arasındaki farkı algılar, yeni bir migrasyon SQL dosyası oluşturur, bu migrasyonu **geliştirme veritabanına uygular** ve ardından `prisma generate` ile Prisma Client’ı günceller.

**Tipik akış:**

1. `schema.prisma` dosyasında model/index ilişkilerini değiştirirsiniz.
2. `npx prisma migrate dev` çalıştırırsınız.
3. Prisma değişiklikleri algılar; migrasyon adı ister (veya `-n` ile verirsiniz).
4. `prisma/migrations/<timestamp>_<isim>/migration.sql` oluşur ve veritabanına uygulanır.

**Yaygın seçenekler:**

| Seçenek | Anlamı |
|--------|--------|
| `-n`, `--name <isim>` | Migrasyon klasör adına anlamlı isim verir (ör. `add_user_table`). |
| `--create-only` | Sadece migrasyon dosyasını oluşturur; **veritabanına uygulamaz**. Boş şema değişikliği yoksa boş migrasyon da üretebilir. |
| `--schema <yol>` | Varsayılan dışında bir şema dosyası kullanır. |
| `--url <connection_string>` | `prisma.config.ts` içindeki URL’yi geçici olarak ezer. |

**Örnekler:**

```bash
# Şema değişikliğinden sonra migrasyon + uygulama + generate
npx prisma migrate dev

# İsim vererek
npx prisma migrate dev -n auth_better

# Sadece SQL dosyasını üret, DB’ye dokunma (inceleme / CI senaryoları)
npx prisma migrate dev --create-only -n my_change
```

**Dikkat:**

- **`migrate dev` üretim (production) için tasarlanmaz**; geliştirme sırasında şemayı DB ile hızlıca senkron tutmak içindir. Üretimde genelde `prisma migrate deploy` kullanılır.
- Takım halinde çalışıyorsanız migrasyon dosyalarını versiyon kontrolüne ekleyin; başkasının oluşturduğu migrasyonları çekip kendi DB’nize uygulamanız gerekir.

---

## `npx prisma /explain` — böyle bir komut yok

Prisma CLI’da **`explain`** veya **`/explain`** adlı bir alt komut **bulunmuyor**. Komut listesi için:

```bash
npx prisma -h
```

**Sorgu planı (EXPLAIN) istiyorsanız** (PostgreSQL bu projede kullanılıyor), bunu veritabanı tarafında yaparsınız:

- **psql veya bir SQL istemcisi:** `EXPLAIN` / `EXPLAIN ANALYZE` ile ham SQL çalıştırın.
- **Uygulama içi:** Prisma ile `prisma.$queryRaw` veya `$executeRaw` kullanarak `EXPLAIN ...` döndürebilirsiniz (güvenlik: kullanıcı girdisini ham SQL’e doğrudan eklemeyin).

Performans için Prisma’nın resmi ürünleri (ör. Accelerate) ayrı konudur; CLI’daki `migrate dev` ile aynı şey değildir.

---

## İlgili komutlar (kısa)

| Komut | Görev |
|--------|--------|
| `npx prisma generate` | Şemaya göre Prisma Client’ı `generated/prisma` altında üretir. |
| `npx prisma studio` | Veriyi tarayıcıda gezinmek için GUI. |
| `npx prisma migrate deploy` | **Üretim:** bekleyen migrasyonları uygular (CI/CD’de yaygın). |
| `npx prisma db push` | Migrasyon dosyası oluşturmadan şemayı DB’ye iter (hızlı prototip; takım/migrasyon geçmişi için `migrate dev` tercih edilir). |
| `npx prisma validate` | Şema sözdizimini doğrular. |
| `npx prisma format` | Şema dosyasını biçimlendirir. |

---

## Özet

- **`migrate dev`:** şema → migrasyon SQL → dev DB’ye uygula → client üret.
- **`prisma /explain`:** yok; sorgu planı için PostgreSQL `EXPLAIN` veya ham sorgu kullanın.
