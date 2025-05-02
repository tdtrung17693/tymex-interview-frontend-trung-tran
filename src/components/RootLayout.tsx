import { QueryClientProvider } from "@/lib/react-query";
import Footer from "./Footer";
import NavigationBar from "./navigation/NavigationBar";
import { navigation } from "./navigation/navigation.constant";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider>
      <div data-vaul-drawer-wrapper="true">
        <NavigationBar className="sticky top-0" navigation={navigation} />
        <div className="-mt-[var(--height-navbar)] pt-[var(--height-navbar)]">
          {children}
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
