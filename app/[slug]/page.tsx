import { supabase } from "@/lib/supabase";
import WeddingCountdown from "@/components/WeddingCountdown";
import InvitationCover from "@/components/InvitationCover";
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-black">
          Undangan tidak ditemukan
        </h1>
      </div>
    );
  }
const targetDate = new Date(data.wedding_date).getTime();
const now = Date.now();

const distance = Math.max(targetDate - now, 0);

const days = Math.floor(distance / (1000 * 60 * 60 * 24));

const hours = Math.floor(
  (distance % (1000 * 60 * 60 * 24)) /
  (1000 * 60 * 60)
);

const minutes = Math.floor(
  (distance % (1000 * 60 * 60)) /
  (1000 * 60)
);

const seconds = Math.floor(
  (distance % (1000 * 60)) /
  1000
);
  return (
    <main className="min-h-screen bg-white p-10">
       <InvitationCover
  groomName={data.groom_name}
  brideName={data.bride_name}

/>
        
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

  <p className="text-gray-500 tracking-[0.3em] uppercase mb-4">
    The Wedding Of
  </p>

  <h1 className="text-6xl font-serif text-gray-800 mb-6">
    {data.groom_name}
    <br />
    &
    <br />
    {data.bride_name}
  </h1>

  <p className="text-lg text-gray-600 mb-2">
    {data.wedding_date}
  </p>

  <p className="text-gray-600">
    {data.venue}
  </p>

</section>
<section className="py-24 px-6 bg-white">

  <div className="max-w-5xl mx-auto text-center">

    <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
      Save The Date
    </p>

    <h2 className="text-4xl font-serif text-gray-800 mb-10">
      {data.wedding_date}
    </h2>

    <div className="grid grid-cols-4 gap-5">

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
<p className="text-5xl font-bold text-gray-800">{days}</p>        <p className="mt-3 text-gray-500 uppercase text-sm">
          Days
        </p>
      </div>

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
<p className="text-5xl font-bold text-gray-800">{hours}</p>        <p className="mt-3 text-gray-500 uppercase text-sm">
          Hours
        </p>
      </div>

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
<p className="text-5xl font-bold text-gray-800">{minutes}</p>        <p className="mt-3 text-gray-500 uppercase text-sm">
          Minutes
        </p>
      </div>

      <div className="bg-[#f8f5f2] rounded-2xl p-8">
<p className="text-5xl font-bold text-gray-800">{seconds}</p>        <p className="mt-3 text-gray-500 uppercase text-sm">
          Seconds
        </p>
      </div>

    </div>

  </div>

</section>
<section className="py-24 px-6 bg-[#f8f5f2]">

  <div className="max-w-6xl mx-auto text-center">

    <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
      Bride & Groom
    </p>

    <h2 className="text-4xl font-serif text-gray-800 mb-16">
      The Happy Couple
    </h2>

    <div className="grid md:grid-cols-2 gap-16">

      <div>

        <div className="w-56 h-56 rounded-full bg-gray-300 mx-auto mb-8"></div>

        <h3 className="text-4xl font-serif text-gray-800">
          {data.groom_name}
        </h3>

        <p className="mt-4 text-gray-600">
          Putra dari
        </p>

        <p className="text-gray-800 font-medium">
          Bapak ...
        </p>

        <p className="text-gray-800 font-medium">
          Ibu ...
        </p>

      </div>

      <div>

        <div className="w-56 h-56 rounded-full bg-gray-300 mx-auto mb-8"></div>

        <h3 className="text-4xl font-serif text-gray-800">
          {data.bride_name}
        </h3>

        <p className="mt-4 text-gray-600">
          Putri dari
        </p>

        <p className="text-gray-800 font-medium">
          Bapak ...
        </p>

        <p className="text-gray-800 font-medium">
          Ibu ...
        </p>

      </div>

    </div>

  </div>

</section>
<section className="py-24 px-6 bg-white">

  <div className="max-w-4xl mx-auto">

    <div className="text-center mb-20">

      <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
        Our Journey
      </p>

      <h2 className="text-4xl font-serif text-gray-800">
        Love Story
      </h2>

    </div>

    <div className="space-y-16">

      <div className="border-l-2 border-gray-300 pl-8">

        <h3 className="text-2xl font-serif text-gray-800 mb-2">
          2014
        </h3>

        <h4 className="text-xl font-semibold mb-2">
          First Meet
        </h4>

        <p className="text-gray-600">
          Awal perjalanan cinta dimulai dari sebuah pertemuan yang sederhana.
        </p>

      </div>

      <div className="border-l-2 border-gray-300 pl-8">

        <h3 className="text-2xl font-serif text-gray-800 mb-2">
          2018
        </h3>

        <h4 className="text-xl font-semibold mb-2">
          Relationship
        </h4>

        <p className="text-gray-600">
          Kami memutuskan untuk melangkah bersama dan saling mendukung dalam setiap perjalanan hidup.
        </p>

      </div>

      <div className="border-l-2 border-gray-300 pl-8">

        <h3 className="text-2xl font-serif text-gray-800 mb-2">
          2026
        </h3>

        <h4 className="text-xl font-semibold mb-2">
          Wedding Day
        </h4>

        <p className="text-gray-600">
          Dengan penuh rasa syukur kami memulai babak baru dalam kehidupan sebagai pasangan suami istri.
        </p>

      </div>

    </div>

  </div>

</section>
<section className="py-24 px-6 bg-[#f8f5f2]">

  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-20">

      <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
        Wedding Event
      </p>

      <h2 className="text-4xl font-serif text-gray-800">
        Save The Date
      </h2>

    </div>

    <div className="grid md:grid-cols-2 gap-10">

      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

        <h3 className="text-3xl font-serif text-gray-800 mb-6">
          Akad Nikah
        </h3>

        <p className="text-gray-600 mb-2">
          {data.wedding_date}
        </p>

        <p className="text-gray-600 mb-6">
          {data.wedding_time}
        </p>

        <p className="text-xl font-semibold text-gray-800">
          {data.venue}
        </p>

        <p className="text-gray-600 mt-4 whitespace-pre-wrap">
          {data.address}
        </p>
<a
  href="#"
  className="inline-block mt-8 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-full"
>
  Buka Google Maps
</a>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">

        <h3 className="text-3xl font-serif text-gray-800 mb-6">
          Resepsi
        </h3>

        <p className="text-gray-600 mb-2">
          {data.wedding_date}
        </p>

        <p className="text-gray-600 mb-6">
          {data.wedding_time}
        </p>

        <p className="text-xl font-semibold text-gray-800">
          {data.venue}
        </p>

        <p className="text-gray-600 mt-4 whitespace-pre-wrap">
          {data.address}
        </p>
<a
  href="#"
  className="inline-block mt-8 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-full"
>
  Buka Google Maps
</a>
      </div>

    </div>

  </div>

</section>
<section className="py-24 px-6 bg-white">

  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-20">

      <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
        Our Gallery
      </p>

      <h2 className="text-4xl font-serif text-gray-800">
        Wedding Moments
      </h2>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
  {data.gallery?.split("\n").map((image: string, index: number) => (
    <img
      key={index}
      src={image}
      alt={`Gallery ${index + 1}`}
      className="aspect-square rounded-3xl object-cover w-full"
    />
  ))}
</div>

  </div>

</section>
<section className="py-24 px-6 bg-white">

  <div className="max-w-3xl mx-auto">

    <div className="text-center mb-16">

      <p className="uppercase tracking-[0.25em] text-gray-500 mb-3">
        RSVP
      </p>

      <h2 className="text-4xl font-serif text-gray-800">
        Will You Attend?
      </h2>

    </div>

    <div className="space-y-6">

      <input
        type="text"
        placeholder="Nama"
        className="w-full border rounded-xl p-4"
      />

      <select
        className="w-full border rounded-xl p-4"
      >
        <option>Hadir</option>
        <option>Tidak Hadir</option>
      </select>

      <textarea
        rows={5}
        placeholder="Ucapan..."
        className="w-full border rounded-xl p-4"
      />

      <button
        className="w-full bg-gray-900 text-white rounded-xl py-4 hover:bg-black"
      >
        Kirim Ucapan
      </button>

    </div>

  </div>

</section>
<section className="py-24 px-6 bg-[#f8f5f2]">

  <div className="max-w-4xl mx-auto text-center">

    <p className="uppercase tracking-[0.3em] text-gray-500 mb-3">
      Wedding Gift
    </p>

    <h2 className="text-4xl font-serif text-gray-800 mb-8">
      Gift for the Couple
    </h2>

    <p className="text-gray-600 mb-12">
      Kehadiran dan doa restu Anda sudah menjadi hadiah terindah bagi kami.
      Namun apabila ingin memberikan tanda kasih, dapat melalui rekening berikut.
    </p>

    <div className="bg-white rounded-3xl shadow-lg p-10">

      <h3 className="text-2xl font-semibold mb-4">
        Bank BCA
      </h3>

      <p className="text-3xl font-bold tracking-wider mb-3">
        1234567890
      </p>

      <p className="text-gray-600">
        a.n. Handi Hermanto
      </p>

    </div>

  </div>

</section>
<footer className="bg-gray-900 text-white py-24 px-6">

  <div className="max-w-4xl mx-auto text-center">

    <p className="uppercase tracking-[0.3em] text-gray-400 mb-6">
      Thank You
    </p>

    <h2 className="text-5xl font-serif mb-6">
      {data.groom_name}
      <br />
      &
      <br />
      {data.bride_name}
    </h2>

    <p className="text-gray-300 mb-12">
      {data.wedding_date}
    </p>

    <div className="w-24 h-px bg-gray-600 mx-auto mb-10"></div>

    <p className="text-gray-500 text-sm">
      Made with ❤️ by AKSA Digital Studio
    </p>

  </div>

</footer>
    </main>
  );
}