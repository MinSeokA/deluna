"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation"; // useRouter 임포트

const Guilds = () => {
  const { data: session } = useSession();
  const router = useRouter(); // useRouter 훅 사용

  if (!session?.user) {
    return (
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <p>Loading...</p>
      </div>
    ); // 세션이 없으면 로딩 중 메시지
  }

  // 길드 아이콘 URL 생성 함수
  const getGuildIconUrl = (guildId: string | null, icon: string | null) => {
    if (icon) {
      return `https://cdn.discordapp.com/icons/${guildId}/${icon}.png`;
    }
    return undefined; // 아이콘이 없으면 undefined 반환
  };


  return (
    <div className="max-w-6xl mx-auto shadow-md rounded-lg p-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {session.user.global_name}님의 길드목록
      </h2>

      {/* 길드 카드 3x3 레이아웃 */}
      <div className="grid grid-cols-3 gap-6">
        {session.user.guilds
          ?.sort((a: { deluna: boolean }, b: { deluna: boolean }) => (b.deluna ? 1 : 0) - (a.deluna ? 1 : 0)) // deluna가 true인 길드를 맨 앞에 정렬
          .map((guild: { id: string; name: string; deluna: boolean; icon: string | null }) => (
            <div key={guild.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              {guild.icon ? (
                <Image
                  src={getGuildIconUrl(guild.id, guild.icon) || "/default-icon.png"} // 길드 아이콘 URL 또는 기본 아이콘 경로
                  alt={`Icon of ${guild.name}`}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                  width={96}  // width for Image component
                  height={96}  // height for Image component
                  unoptimized={true}  // Allow external images without optimization
                />
              ) : (
                <div className="w-24 h-24 flex justify-center items-center text-gray-500 bg-gray-200 rounded-full mb-4">
                  {guild.name[0]}
                </div>
              )}
              <span className="text-lg font-medium mb-2">{guild.name}</span>
              <Button
                variant={"outline"}
                onClick={() => router.push(`/dashboard/${guild.id}`)} // 라우터를 이용한 대시보드 이동
                className="w-full text-sm font-medium rounded-md border-2 py-2 text-black bg-white"
              >
                {guild.deluna ? "대시보드" : "초대하기"}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Guilds;
