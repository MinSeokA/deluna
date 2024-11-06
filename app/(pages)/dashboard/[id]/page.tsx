'use client'; // Ensure this page is client-side

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  memberCount: number;
  activity: string; // 예: "활동중", "잠잠한", 등
}

const GuildDashboard = () => {
  const { data: session } = useSession();
  const [guildData, setGuildData] = useState<Guild | null>(null);

  const pathname = usePathname();

  // Get guild ID from the pathname
  const guildId = pathname.replace('/dashboard/', '');

  
  // guildId가 배열일 경우 첫 번째 값을 사용
  const guildIdString = Array.isArray(guildId) ? guildId[0] : guildId;

  console.log(guildIdString);

  useEffect(() => {
    if (session?.user?.guilds && guildIdString) {
      const guild = session.user.guilds.find(
        (guild: { id: string }) => guild.id === guildIdString
      );
      setGuildData(guild || null); // Ensure guild is either found or null
    }
  }, [session, guildIdString]);

  if (!guildData) {
    return (
      <div className='max-w-lg mx-auto bg-white shadow-md rounded-lg p-6'>
        <p>길드를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div></div>
  );
};

export default GuildDashboard;
