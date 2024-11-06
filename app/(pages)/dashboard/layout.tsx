import type { Metadata } from 'next';
import '../../globals.css';
import { Providers } from '@/app/lib/providers';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export const metadata: Metadata = {
  title: 'Deluna Dashboard',
  description: 'Deluna is Discord bot to help you manage your server.',
  // 다크 모드 지원
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        {/* 사이드바 */}
        <AppSidebar />
        
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <Providers>{children}</Providers>
        </main>
      </div>
    </SidebarProvider>
  )
}
