import PageHeader from "@/components/header";
import PageFooter from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <PageHeader />
        {children}
        <PageFooter />
    </>
  );
}
