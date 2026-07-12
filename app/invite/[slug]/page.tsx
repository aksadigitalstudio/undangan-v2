
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        Undangan Digital
      </h1>

      <p className="text-2xl">
        Kode Undangan:
      </p>

      <h2 className="text-4xl font-bold text-pink-600 mt-4">
        {slug}
      </h2>
    </main>
  );
}