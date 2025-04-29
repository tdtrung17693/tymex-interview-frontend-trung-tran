import NavigationBar from "./navigation/NavigationBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavigationBar className="sticky top-0" />
      <div className="-mt-[var(--height-navbar)] pt-[var(--height-navbar)]">
        {children}
      </div>
    </div>
  );
}
