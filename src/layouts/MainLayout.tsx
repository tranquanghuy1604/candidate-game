import Header from "./Header";
import DefaultHead from "./default-head";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="p-8">
      <DefaultHead />
      <Header />
      {children}
    </div>
  );
}
