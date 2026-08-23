# Wedding Invitation SaaS

## Tech Stack

- Next.js
- React
- Tailwind CSS v4
- Supabase
- TypeScript

---

# STATUS PROJECT

## Foundation

✅ Phase 1 — Setup Project  
✅ Phase 2 — Dashboard Layout  
✅ Phase 3 — Sidebar  
✅ Phase 4 — Navbar  
✅ Phase 5 — Supabase Connection  
✅ Phase 6 — Invitation CRUD  
✅ Phase 7 — Guest CRUD  
✅ Phase 8 — Dashboard Improvement  

---

## Invitation Experience

✅ Phase 15 — Theme Engine (MVP)  
✅ Phase 16 — Dynamic Prewedding Background  
✅ Phase 17 — Gallery Upgrade  
- Masonry  
- Lightbox  
- Lazy Load  

✅ Phase 18 — RSVP Experience  
✅ Phase 19 — Gift Experience  
✅ Phase 20 — Music Experience  
✅ Phase 21 — Mobile Polish  
✅ Phase 22 — Desktop Polish  
✅ Phase 23 — Performance Optimization  
✅ Phase 24 — Admin Dashboard Improvement  

---

# Phase 25 — Multi Template System

✅ 25.1 Folder Structure  
✅ 25.2 Template Types  
✅ 25.3 Template Registry  
✅ 25.4 Template Renderer  
✅ 25.5 Dashboard Template Picker  
✅ 25.6 Save Template  
✅ 25.7 Dynamic Routing  

## Notes

- Halaman publik `app/[slug]` dan preview `app/preview/[slug]` memakai `TemplateRenderer`.
- Template dipilih melalui dashboard dan disimpan ke kolom `template_id`.
- Template001 lama tidak digunakan lagi dan akan dibangun ulang sebagai template baru pada phase terpisah.

---

# Phase 26 — Template 002: Javanese / Sekar Sogan

## Completed

✅ Cover  
✅ Hero dan Countdown  
✅ Couple  
✅ Story  
✅ Event  
✅ Gallery dan Lightbox  
✅ RSVP dan Guestbook  
✅ Gift dan QRIS  
✅ Footer  
✅ Background Sekar Sogan  
✅ Ornamen dekoratif dan ambient petal motion  
✅ Ornamen mempelai bergerak opsional  
✅ Upload ornamen mempelai pria dan wanita di dashboard  
✅ Kolom database `groom_cutout` dan `bride_cutout`  
✅ Template002 aktif di Dashboard Template Picker  
✅ Preview dan halaman publik menggunakan Template002  
✅ Live Streaming dengan desain khusus Sekar Sogan  
✅ Toggle `live_stream`, judul siaran, dan tautan streaming  
✅ Dukungan embed YouTube  
✅ Live Streaming tampil di halaman publik setelah Event dan sebelum Gallery  
✅ Lokalisasi Bahasa Indonesia untuk Cover, Countdown, RSVP, dan Guestbook  

## Remaining QA

✅ Final visual QA desktop  
✅ Final visual QA mobile  
✅ Periksa konsistensi Preview dan halaman publik  
⬜ Validasi aset PNG transparan ornamen mempelai    

---

# Phase 27 — Template 003: Sundanese / Puspa Priangan

## Completed

✅ Template003 terdaftar pada Template Registry  
✅ Template003 aktif pada Dashboard Template Picker  
✅ Save Template003 ke `template_id`  
✅ Cover  
✅ Hero dan Countdown  
✅ Couple  
✅ Story  
✅ Event  
✅ Live Streaming  
✅ Gallery horizontal dan Lightbox  
✅ RSVP dan Guestbook  
✅ Gift dan QRIS  
✅ Footer  
✅ Background kanvas Puspa Priangan  
✅ Ornamen flora Priangan  
✅ Layout Event Akad kiri dan Resepsi kanan  
✅ Ornamen RSVP dan Gift  
✅ Motion ornamen RSVP dan Gift  
✅ Footer ramping dengan warna krem–sage  
✅ Toggle, judul, tautan, dan embed YouTube untuk Live Streaming  

## Remaining QA

✅ Final visual polish Couple  
✅ Final visual QA mobile  
✅ Final visual QA desktop  
✅ Periksa semua teks tetap terbaca di atas ornamen  
✅ Periksa konsistensi Preview dan halaman publik  
⬜ Uji seluruh toggle section, termasuk Live Streaming  

---

# Phase 28 — Template 004: Chinese Imperial

## Completed

✅ Template004 terdaftar dan dapat dipilih di dashboard  
✅ Cover Chinese Imperial  
✅ Hero dengan foto prewedding dan countdown  
✅ Imperial Blessing: ayat Alkitab dan inisial mempelai  
✅ Couple dengan foto mempelai mandiri dan motion zoom  
✅ Story bergaya timeline bergeser  
✅ Event Holy Matrimony dan Wedding Reception  
✅ Gallery master preview dan thumbnail horizontal  
✅ RSVP dan Guestbook  
✅ Gift dengan tab Bank Account, QRIS, dan Delivery Address  
✅ Footer ringkas  
✅ Bahasa Inggris untuk Cover, Hero, Couple, Story, dan Event  
✅ Motion kelopak bunga merah di Story  
✅ Motion ornamen pada Event  
✅ Live Streaming dengan desain khusus Chinese Imperial  
✅ DecorLayer global dinonaktifkan untuk Template004 agar ornamen tidak muncul di RSVP  
✅ Live Streaming diperbarui dengan frame imperial merah–emas, gerbang dekoratif, dan fallback tautan serasi  

---

# Phase 29 — Cross-Template QA & Production Ready

## Completed

✅ Uji RSVP, QRIS, Maps, dan musik  
✅ `npm run build` berhasil  
✅ Build berhasil setelah lokalisasi Bahasa Indonesia Template002    
✅ Live Streaming Template002 terverifikasi tampil di halaman publik  
✅ Preview dan halaman publik sudah memakai data section yang sama  
✅ Konsistensi Preview dan halaman publik Template002–004 diverifikasi  
✅ Validasi data kosong Template002–004; Gift Template002 dan Template003 tersembunyi bila semua data Gift kosong  
✅ Background CSS utama Template003 dan Template004 dikonversi ke WebP  
✅ Optimasi Next Image diaktifkan untuk AVIF/WebP dan gambar Supabase Template002–004  

## Remaining

✅ Final visual QA Template002 di desktop dan mobile  
✅ Final visual QA Template003 di desktop dan mobile  
✅ Final visual QA Template004 di desktop dan mobile    
✅ Audit aset gambar besar selesai; aset prioritas Template002–004 telah diidentifikasi  
✅ Optimasi ukuran gambar dan loading  
✅ Hapus `console.log` pengembangan  
✅ Bereskan warning ESLint yang tidak digunakan  
✅ Validasi data kosong pada seluruh template aktif  
⚠️ Audit Supabase kode selesai; RLS live belum dapat diverifikasi dari lingkungan ini karena koneksi TLS ke endpoint gagal  
✅ Implementasi Auth SSR, guard dashboard/preview, token RSVP, guestbook RPC, validasi upload, dan migration RLS/Storage selesai di kode  
✅ Pricing placeholder disembunyikan dari dashboard, route, dan sitemap untuk launch awal  
✅ Robots dan template environment deployment disiapkan untuk route admin yang tidak diindeks  
⬜ Terapkan migration Supabase, backfill owner undangan lama, dan verifikasi policy live sebelum deployment preview  
⬜ Publish / deployment production  

---

# DATABASE NOTES

Kolom yang digunakan oleh sistem template:

- `template_id`
- `groom_cutout`
- `bride_cutout`
- `live_stream_title`
- `live_stream_url`

Section yang digunakan:

- `live_stream`

---

# DEVELOPMENT RULES

- Seluruh UI Template002 hanya diubah di folder `components/templates/template-002`.
- Seluruh UI Template003 hanya diubah di folder `components/templates/template-003`.
- Seluruh UI Template004 hanya diubah di folder `components/templates/template-004`.
- Template001 ditunda dan tidak diubah sampai phase rebuild dimulai.
- `PROJECT_PROGRESS.md` diperbarui setiap bagian besar selesai.
- Hindari refactor besar saat sedang melakukan visual QA.

---

# ACTIVE NOTES

- Template001: Ditunda untuk rebuild total sebagai template baru.
- Template002: Javanese / Sekar Sogan.
- Template003: Sundanese / Puspa Priangan.
- Template004: Chinese Imperial.
- Final visual QA desktop dan mobile Template002–004 telah selesai.
- Validasi data kosong Template002–004 telah selesai; Gift kini aman untuk data pembayaran yang belum diisi.
- Warning ESLint telah diselesaikan; production build berhasil tanpa warning.
- Auth SSR serta guard dashboard/preview telah diimplementasikan; RSVP publik memakai token acak dan RPC terbatas.
- Migration RLS dan Storage siap di `supabase/migrations/20260823_auth_and_rls.sql`, tetapi belum diterapkan ke project Supabase live.
- Pricing ditunda; menu dan route placeholder disembunyikan untuk launch awal.
- Fokus berikutnya adalah menjalankan migration, backfill ownership, lalu menguji policy live sebelum deployment preview.
