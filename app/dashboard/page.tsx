export default function DashboardPage() {
  return (
    <>
      <h1 className="text-4xl font-bold text-black mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Undangan
          </h2>

          <p className="text-3xl font-bold mt-2">
            1
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Template Aktif
          </h2>

          <p className="text-3xl font-bold mt-2">
            -
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500 text-sm">
            Total Kunjungan
          </h2>

          <p className="text-3xl font-bold mt-2">
            0
          </p>
        </div>
      </div>
    </>
  );
}