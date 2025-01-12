import Navbar from "@/components/common/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col gap-6 w-full">
      <Navbar />
      {children}
    </div>
  );
}
