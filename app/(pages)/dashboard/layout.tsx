import type { Metadata } from 'next';
import '../../globals.css';
import { Providers } from '@/app/lib/providers';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import localFont from 'next/font/local';
const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const Gugi = localFont({
  src: "../../fonts/Gugi-Regular.woff",
  variable: "--font-gugi",
  weight: "100 900",
});
const taebek = localFont({
  src: "../../fonts/TAEBAEK.woff",
  variable: "--font-taebek",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: 'Deluna Dashboard',
  description: 'Deluna is Discord bot to help you manage your server.',
  // 다크 모드 지원
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} ${Gugi.variable} ${taebek.variable} antialiased`}>
    <SidebarProvider>
      <div className="flex">
        {/* 사이드바 */}
        <AppSidebar />
        
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 p-4">
          
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href='#'>
                    대시보드
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Providers>{children}</Providers>
        </div>
      </SidebarInset>           
        </main>
      </div>
    </SidebarProvider>
    </body>
    </html>
  )
}
