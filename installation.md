## Shadcn UI Kurulumu

Tüm Shadcn bileşenlerini eklemek için:

```bash
npx shadcn@latest add --all
```

## Prisma Kurulumu

Prisma ve PostgreSQL için gerekli paketleri adım adım kurun:

1. Geliştirme bağımlılıklarını yükleyin:

   ```bash
   npm install prisma tsx @types/pg --save-dev
   ```

2. Çalışma zamanı bağımlılıklarını yükleyin:

   ```bash
   npm install @prisma/client @prisma/adapter-pg dotenv pg
   ```

3. Prisma yapılandırmasını başlatın:
   ```bash
   npx prisma init
   ```
4. Tabloların migarete oluşturun:
   ```bash
   npx prisma migrate dev --name init
   npx prisma migrate dev
   npx prisma migreate reset ``Herşeyi siler`
   ```

# TRPC Kurulumu

TRPC için gerekli kurulumlar

1. Geliştirme bağımlılıklarını yükleyin:
   ```bash
   npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query@latest zod client-only server-only
   ```

## Not

Sunucu olarak **AWS US East2 (Ohio)**

Tarayıcı önbelleğini temizlemek için: **Ctrl + Shift + Delete**
//
