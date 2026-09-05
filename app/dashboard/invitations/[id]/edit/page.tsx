"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";
import AudioUpload from "@/components/AudioUpload";
import { defaultSections } from "@/lib/defaultSections";
import TemplatePicker from "@/components/dashboard/TemplatePicker";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function EditInvitationPage({ params }: Props) {
  const router = useRouter();

  const [id, setId] = useState("");

  const [groomName, setGroomName] = useState("");
const [brideName, setBrideName] = useState("");
const [groomFather, setGroomFather] = useState("");
const [groomMother, setGroomMother] = useState("");

const [brideFather, setBrideFather] = useState("");
const [brideMother, setBrideMother] = useState("");
const [groomPhoto, setGroomPhoto] = useState("");
const [bridePhoto, setBridePhoto] = useState("");
const [groomCutout, setGroomCutout] = useState("");
const [brideCutout, setBrideCutout] = useState("");
const [heroBackground, setHeroBackground] = useState("");
const [weddingDate, setWeddingDate] = useState("");
const [weddingTime, setWeddingTime] = useState("");
const [venue, setVenue] = useState("");
const [address, setAddress] = useState("");
const [akadDate, setAkadDate] = useState("");
const [akadTime, setAkadTime] = useState("");
const [akadVenue, setAkadVenue] = useState("");
const [akadAddress, setAkadAddress] = useState("");
const [akadMaps, setAkadMaps] = useState("");

const [receptionDate, setReceptionDate] = useState("");
const [receptionTime, setReceptionTime] = useState("");
const [receptionVenue, setReceptionVenue] = useState("");
const [receptionAddress, setReceptionAddress] = useState("");
const [receptionMaps, setReceptionMaps] = useState("");
const [story1Year, setStory1Year] = useState("");
const [story1Title, setStory1Title] = useState("");
const [story1Description, setStory1Description] = useState("");

const [story2Year, setStory2Year] = useState("");
const [story2Title, setStory2Title] = useState("");
const [story2Description, setStory2Description] = useState("");

const [story3Year, setStory3Year] = useState("");
const [story3Title, setStory3Title] = useState("");
const [story3Description, setStory3Description] = useState("");

const [story, setStory] = useState("");
const [bankName, setBankName] = useState("");
const [bankAccount, setBankAccount] = useState("");
const [accountName, setAccountName] = useState("");

const [giftAddress, setGiftAddress] = useState("");
const [giftNote, setGiftNote] = useState("");

const [qrisImage, setQrisImage] = useState("");

const [music, setMusic] = useState("");
const [liveStreamTitle, setLiveStreamTitle] = useState("");
const [liveStreamUrl, setLiveStreamUrl] = useState("");
const [theme, setTheme] = useState("elegant-gold");
const [templateId, setTemplateId] = useState("template-001");
const [status, setStatus] = useState("Draft");
  const [maxGuest, setMaxGuest] = useState(1);
const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
const [gallery1, setGallery1] = useState("");
const [gallery2, setGallery2] = useState("");
const [gallery3, setGallery3] = useState("");
const [gallery4, setGallery4] = useState("");
const [gallery5, setGallery5] = useState("");
  const [gallery6, setGallery6] = useState("");
const [sections, setSections] = useState(defaultSections);
const sectionItems = [
  { key: "hero", label: "Hero", description: "Tampilkan Hero Section" },
  { key: "countdown", label: "Countdown", description: "Countdown menuju hari pernikahan" },
  { key: "couple", label: "Bride & Groom", description: "Profil mempelai" },
  { key: "story", label: "Love Story", description: "Cerita perjalanan cinta" },
  { key: "event", label: "Wedding Event", description: "Detail acara pernikahan" },
  {key: "live_stream",label: "Live Streaming",description: "Tampilkan tombol siaran langsung",},
  { key: "gallery", label: "Gallery", description: "Galeri foto" },
  { key: "rsvp", label: "RSVP", description: "Konfirmasi kehadiran tamu" },
  { key: "gift", label: "Gift", description: "Gift & QRIS" },
  { key: "music", label: "Music", description: "Background music" },
] as const;
useEffect(() => {
    loadInvitation();
    // The invitation is intentionally loaded once when this edit page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadInvitation() {
    const { id } = await params;
    setId(id);

    const { data, error } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setGroomName(data.groom_name ?? "");
setBrideName(data.bride_name ?? "");
setGroomFather(data.groom_father ?? "");
setGroomMother(data.groom_mother ?? "");

setBrideFather(data.bride_father ?? "");
setBrideMother(data.bride_mother ?? "");
setGroomPhoto(data.groom_photo ?? "");
setBridePhoto(data.bride_photo ?? "");
setGroomCutout(data.groom_cutout ?? "");
setBrideCutout(data.bride_cutout ?? "");
setHeroBackground(data.hero_background ?? "");
const galleryList = (data.gallery ?? "")
  .split(",")
  .map((item: string) => item.trim());

setGallery1(galleryList[0] ?? "");
setGallery2(galleryList[1] ?? "");
setGallery3(galleryList[2] ?? "");
setGallery4(galleryList[3] ?? "");
setGallery5(galleryList[4] ?? "");
setGallery6(galleryList[5] ?? "");
setWeddingDate(data.wedding_date ?? "");
setWeddingTime(data.wedding_time ?? "");
setVenue(data.venue ?? "");
setAddress(data.address ?? "");
setAkadDate(data.akad_date ?? "");
setAkadTime(data.akad_time ?? "");
setAkadVenue(data.akad_venue ?? "");
setAkadAddress(data.akad_address ?? "");
setAkadMaps(data.akad_maps ?? "");

setReceptionDate(data.reception_date ?? "");
setReceptionTime(data.reception_time ?? "");
setReceptionVenue(data.reception_venue ?? "");
setReceptionAddress(data.reception_address ?? "");
setReceptionMaps(data.reception_maps ?? "");
setStory1Year(data.story1_year ?? "");
setStory1Title(data.story1_title ?? "");
setStory1Description(data.story1_description ?? "");

setStory2Year(data.story2_year ?? "");
setStory2Title(data.story2_title ?? "");
setStory2Description(data.story2_description ?? "");

setStory3Year(data.story3_year ?? "");
setStory3Title(data.story3_title ?? "");
setStory3Description(data.story3_description ?? "");
setStory(data.story ?? "");
setBankName(data.bank_name ?? "");
setBankAccount(data.bank_account ?? "");
setAccountName(data.account_name ?? "");

setGiftAddress(data.gift_address ?? "");
setGiftNote(data.gift_note ?? "");

setQrisImage(data.qris_image ?? "");

setMusic(data.music ?? "");
setLiveStreamTitle(data.live_stream_title ?? "");
setLiveStreamUrl(data.live_stream_url ?? "");
setTheme(data.theme ?? "elegant-gold");
setTemplateId(data.template_id ?? "template-001");
setSections({
  ...defaultSections,
  ...(data.sections ?? {}),
});

setStatus(data.status ?? "Draft");
setMaxGuest(data.max_guest ?? 1);

setLoading(false);
  }

  async function updateInvitation() {
    setSaving(true);

    const { error } = await supabase
      .from("invitations")
      .update({

  groom_name: groomName,
  bride_name: brideName,
  hero_background: heroBackground,
groom_photo: groomPhoto,
bride_photo: bridePhoto,
groom_cutout: groomCutout,
bride_cutout: brideCutout,
groom_father: groomFather,
groom_mother: groomMother,

bride_father: brideFather,
bride_mother: brideMother,
wedding_date: weddingDate || null,
  wedding_time: weddingTime,
 venue: venue,
address: address,
akad_date: akadDate || null,
  akad_time: akadTime,
  akad_venue: akadVenue,
  akad_address: akadAddress,
  akad_maps: akadMaps,

reception_date: receptionDate || null,
  reception_time: receptionTime,
  reception_venue: receptionVenue,
  reception_address: receptionAddress,
  reception_maps: receptionMaps,
story1_year: story1Year,
story1_title: story1Title,
story1_description: story1Description,

story2_year: story2Year,
story2_title: story2Title,
story2_description: story2Description,

story3_year: story3Year,
story3_title: story3Title,
story3_description: story3Description,

story: story,

gallery: [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
]
  .filter((item) => item.trim() !== "")
  .join(","),

bank_name: bankName,
bank_account: bankAccount,
account_name: accountName,

gift_address: giftAddress,
gift_note: giftNote,

qris_image: qrisImage,

music: music,
live_stream_title: liveStreamTitle,
live_stream_url: liveStreamUrl,
theme: theme,
template_id: templateId,
sections: sections,

status: status,
max_guest: maxGuest,
})
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil diperbarui.");

    router.push("/dashboard/invitations");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="text-black text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-black mb-8">
        Edit Undangan
      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="mb-6">
<h2 className="text-2xl font-bold text-black mb-6">
  Informasi Pengantin
        </h2>
<h2 className="text-2xl font-bold text-black mb-6">
  Hero
</h2>

<ImageUpload
  label="Hero Background"
  value={heroBackground}
  onChange={setHeroBackground}
/>
<div className="mt-6 mb-8">

  <label className="block text-black font-semibold mb-2">
    Theme
  </label>

  <select
    value={theme}
    onChange={(e) => setTheme(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  >
    <option value="elegant-gold">
      Elegant Gold
    </option>

    <option value="luxury-black">
      Luxury Black
    </option>

    <option value="sakura-pink">
      Sakura Pink
    </option>

    <option value="forest-green">
      Forest Green
    </option>

    <option value="royal-blue">
      Royal Blue
    </option>

  </select>

</div>
<TemplatePicker
  value={templateId}
  onChange={setTemplateId}
/>
<h2 className="text-2xl font-bold text-black mb-6 mt-12">
  Bride & Groom
</h2>

<ImageUpload
  label="Foto Mempelai Pria"
  value={groomPhoto}
  onChange={setGroomPhoto}
/>

<ImageUpload
  label="Foto Mempelai Wanita"
  value={bridePhoto}
  onChange={setBridePhoto}
/>
{["template-002", "template-003", "template-005", "template-006", "template-007", "template-008", "template-009", "template-010", "template-011", "template-012", "template-013", "template-014"].includes(templateId) && (
  <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
    <h3 className="mb-2 text-lg font-bold text-black">
      Foto Mempelai Full Body
    </h3>

    <p className="mb-5 text-sm text-gray-600">
      Direkomendasikan untuk template yang menampilkan portrait editorial.
      Gunakan PNG atau WebP dengan latar transparan untuk hasil terbaik.
    </p>

    <ImageUpload
      label="Ornamen Mempelai Pria"
      value={groomCutout}
      onChange={setGroomCutout}
    />

    <ImageUpload
      label="Ornamen Mempelai Wanita"
      value={brideCutout}
      onChange={setBrideCutout}
    />
  </div>
          )}
          <label className="block text-black font-semibold mb-2">
            Nama Mempelai Pria
          </label>

          <input
            type="text"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
            className="w-full border rounded-lg p-3 text-black"
          />
            </div>

        <div className="mb-6">
          <label className="block text-black font-semibold mb-2">
            Nama Mempelai Wanita
            </label>
            <input
  type="text"
  value={brideName}
  onChange={(e) => setBrideName(e.target.value)}
  className="w-full border rounded-lg p-3 text-black"
/>
</div>
     <div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Ayah Mempelai Pria
  </label>

  <input
    type="text"
    value={groomFather}
    onChange={(e) => setGroomFather(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Ibu Mempelai Pria
  </label>

  <input
    type="text"
    value={groomMother}
    onChange={(e) => setGroomMother(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Ayah Mempelai Wanita
  </label>

  <input
    type="text"
    value={brideFather}
    onChange={(e) => setBrideFather(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Ibu Mempelai Wanita
  </label>

  <input
    type="text"
    value={brideMother}
    onChange={(e) => setBrideMother(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<hr className="my-10" />
<hr className="my-10" />

<h2 className="text-2xl font-bold text-black mb-6">
  Informasi Utama
</h2>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Tanggal Pernikahan untuk Countdown
  </label>

  <input
    type="date"
    value={weddingDate}
    onChange={(e) => setWeddingDate(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>
<h2 className="text-2xl font-bold text-black mb-6">
  Akad
</h2>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Tanggal Akad
  </label>

  <input
    type="date"
    value={akadDate}
    onChange={(e) => setAkadDate(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Jam Akad
  </label>

  <input
    type="time"
    value={akadTime}
    onChange={(e) => setAkadTime(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Venue Akad
  </label>

  <input
    type="text"
    value={akadVenue}
    onChange={(e) => setAkadVenue(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Alamat Akad
  </label>

  <textarea
    value={akadAddress}
    onChange={(e) => setAkadAddress(e.target.value)}
    rows={4}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Link Google Maps Akad
  </label>

  <input
    type="text"
    value={akadMaps}
    onChange={(e) => setAkadMaps(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>
<hr className="my-10" />

<h2 className="text-2xl font-bold text-black mb-6">
  Resepsi
</h2>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Tanggal Resepsi
  </label>

  <input
    type="date"
    value={receptionDate}
    onChange={(e) => setReceptionDate(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Jam Resepsi
  </label>

  <input
    type="time"
    value={receptionTime}
    onChange={(e) => setReceptionTime(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Venue Resepsi
  </label>

  <input
    type="text"
    value={receptionVenue}
    onChange={(e) => setReceptionVenue(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Alamat Resepsi
  </label>

  <textarea
    value={receptionAddress}
    onChange={(e) => setReceptionAddress(e.target.value)}
    rows={4}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Link Google Maps Resepsi
  </label>

  <input
    type="text"
    value={receptionMaps}
    onChange={(e) => setReceptionMaps(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>
<hr className="my-10" />

<h2 className="text-2xl font-bold text-black mb-6">
  Love Story
</h2>

<h3 className="text-xl font-semibold text-black mb-4">
  Story 1
</h3>

<input
  type="text"
  placeholder="Tahun"
  value={story1Year}
  onChange={(e) => setStory1Year(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-4"
/>

<input
  type="text"
  placeholder="Judul"
  value={story1Title}
  onChange={(e) => setStory1Title(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-4"
/>

<textarea
  rows={4}
  placeholder="Deskripsi"
  value={story1Description}
  onChange={(e) => setStory1Description(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-8"
/>
<h3 className="text-xl font-semibold text-black mb-4">
  Story 2
</h3>

<input
  type="text"
  placeholder="Tahun"
  value={story2Year}
  onChange={(e) => setStory2Year(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-4"
/>

<input
  type="text"
  placeholder="Judul"
  value={story2Title}
  onChange={(e) => setStory2Title(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-4"
/>

<textarea
  rows={4}
  placeholder="Deskripsi"
  value={story2Description}
  onChange={(e) => setStory2Description(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-8"
/>
<h3 className="text-xl font-semibold text-black mb-4">
  Story 3
</h3>

<input
  type="text"
  placeholder="Tahun"
  value={story3Year}
  onChange={(e) => setStory3Year(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-4"
/>

<input
  type="text"
  placeholder="Judul"
  value={story3Title}
  onChange={(e) => setStory3Title(e.target.value)}
  className="w-full border rounded-lg p-3 text-black mb-4"
/>

<textarea
  rows={4}
  placeholder="Deskripsi"
  value={story3Description}
  onChange={(e) => setStory3Description(e.target.value)}
  className="w-full border rounded-lg p-3 text-black"
/>
 <div className="mb-6">
<ImageUpload
  label="Gallery 1"
  value={gallery1}
  onChange={setGallery1}
/>

<ImageUpload
  label="Gallery 2"
  value={gallery2}
  onChange={setGallery2}
/>

<ImageUpload
  label="Gallery 3"
  value={gallery3}
  onChange={setGallery3}
/>

<ImageUpload
  label="Gallery 4"
  value={gallery4}
  onChange={setGallery4}
/>

<ImageUpload
  label="Gallery 5"
  value={gallery5}
  onChange={setGallery5}
/>

<ImageUpload
  label="Gallery 6"
  value={gallery6}
  onChange={setGallery6}
/>
</div>
<hr className="my-10" />

<h2 className="text-2xl font-bold text-black mb-6">
  Wedding Gift
</h2>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Nama Bank
  </label>

  <input
    type="text"
    value={bankName}
    onChange={(e) => setBankName(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Nomor Rekening
  </label>

  <input
    type="text"
    value={bankAccount}
    onChange={(e) => setBankAccount(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Nama Pemilik Rekening
  </label>

  <input
    type="text"
    value={accountName}
    onChange={(e) => setAccountName(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Alamat Pengiriman Kado
  </label>

  <textarea
    rows={4}
    value={giftAddress}
    onChange={(e) => setGiftAddress(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Catatan Kado
  </label>

  <textarea
    rows={3}
    value={giftNote}
    onChange={(e) => setGiftNote(e.target.value)}
    className="w-full border rounded-lg p-3 text-black"
  />
</div>

<ImageUpload
  label="QRIS"
  value={qrisImage}
  onChange={setQrisImage}
/>

<hr className="my-10" />

<h2 className="text-2xl font-bold text-black mb-6">
  Music
</h2>

<AudioUpload
  label="Music"
  value={music}
  onChange={setMusic}
/>
<hr className="my-10" />

<h2 className="text-2xl font-bold text-black mb-6">
  Sections
</h2>

<div className="rounded-xl border border-gray-200 divide-y">

  {sectionItems.map((item) => (

    <div
      key={item.key}
      className="flex items-center justify-between p-6"
    >

      <div>
        <p className="font-semibold text-black">
          {item.label}
        </p>

        <p className="text-sm text-gray-500">
          {item.description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setSections({
            ...sections,
            [item.key]: !sections[item.key],
          });
        }}
        className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${
          sections[item.key] ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
            sections[item.key] ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>

    </div>

  ))}

</div>

{sections.live_stream && (
  <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
    <h3 className="text-xl font-bold text-black">
      Pengaturan Live Streaming
    </h3>

    <p className="mt-1 text-sm text-gray-600">
      Isi tautan YouTube, Zoom, atau Instagram Live.
    </p>

    <div className="mt-5">
      <label className="mb-2 block font-semibold text-black">
        Judul Siaran
      </label>

      <input
        type="text"
        value={liveStreamTitle}
        onChange={(e) => setLiveStreamTitle(e.target.value)}
        placeholder="Contoh: Live Wedding Dadang & Iis"
        className="w-full rounded-lg border p-3 text-black"
      />
    </div>

    <div className="mt-5">
      <label className="mb-2 block font-semibold text-black">
        Link Live Streaming
      </label>

      <input
        type="url"
        value={liveStreamUrl}
        onChange={(e) => setLiveStreamUrl(e.target.value)}
        placeholder="https://www.youtube.com/..."
        className="w-full rounded-lg border p-3 text-black"
      />
    </div>
  </div>
)}

<div className="mb-6">
  <label className="block text-black font-semibold mb-2">
    Status
  </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-3 text-black"
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>

        <button
          onClick={updateInvitation}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

      </div>
    </>
  );
}
