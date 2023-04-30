import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Layout({
                        children,
                    }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto flex flex-col h-screen justify-between">
            <Header/>
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
