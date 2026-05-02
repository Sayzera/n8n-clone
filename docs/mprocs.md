# mprocs

**mprocs**, birkaç komutu **aynı anda** çalıştırıp her birinin çıktısını ayrı bölmelerde gösteren bir araçtır ([kaynak](https://github.com/pvolok/mprocs)).

Bu projede `mprocs` **devDependency** olarak kuruludur (`package.json`). Global kurmadan kullanmak için:

```bash
npm install
npm run dev:all
```

`dev:all` komutu **`mprocs.yaml`** yüklendiğinde ilk çizimden sonra süreçleri **`restart-all`** ile başlatır; böylece hepsi **`DOWN`**’da takılı kalıp manuel **`s`** beklemez.

İsteğe bağlı global kurulum:

```bash
npm install -g mprocs
```

---

## Yerel yapılandırma

- **`mprocs.yaml`**: Süreç listesi (`inngest`, `next`, `prisma`). Her süreçte `autostart: true` kullanılıyor.
- **`npm run dev`** argüman verirken **`cmd`** dizisi şeklinde ayrılmalıdır: `["npm", "run", "dev", "--", "-p", "3001"]`. Tek parça `"dev -- -p 3001"` geçersizdir; Next hiç başlamaz.

İki komutu doğrudan argümanla da çalıştırabilirsiniz:

```bash
mprocs "npm run dev" "npm run watch:css"
```

---

## Sorun giderme (Cursor / VS Code)

- **`s` tepki vermiyorsa:** Odak süreç listesinde olmalı. Sağ çıktı panelindeysen **`Ctrl+A`** liste odasına döner — entegre terminalde **`Ctrl+A` sık sık “tümünü seç”** bağlı olduğu için mprocs almayabilir. En sorunsuzu: **Windows Terminal** veya sistem PowerShell/CMD ile proje kökünde `npm run dev:all`.

- **`%AppData%\Roaming\mprocs\mprocs.yaml`** gibi kullanıcı genel yapılandırması eski **`autostart: false`** veya keymap taşıyorsa beklenmedik davranır; şüphede yedekleyip kapatın ya da sıfırlayın.

---

## İpuçları

- Yerel güncelleme: `npm update mprocs` veya paket sürümünü `package.json` içinden yükseltmek.
- Global kullanıcılar için: `npm install -g mprocs@latest`; PATH’te `%AppData%\npm` olduğundan emin olun (Windows).
