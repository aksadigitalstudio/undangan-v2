interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-gray-500 text-sm">
        {title}
      </h2>

      <p className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  );
}