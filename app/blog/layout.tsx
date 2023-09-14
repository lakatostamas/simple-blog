import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emersoft-blog",
  description: "Built by Tamas",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-b from-white to-gray-200 p-5">
      <div className="flex justify-center max-w-7xl">{children}</div>
    </div>
  );
}
