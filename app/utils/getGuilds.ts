const getGuilds = async (accessToken: string) => {
  // 사용자 길드 목록을 가져옴
  const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch guilds');
  }

  let guilds = await res.json();

  // owner 또는 permissions값이 관리자 권한이 아닌 길드는 제외
  guilds = guilds.filter((guild: { owner: boolean; permissions: number }) => guild.owner || (guild.permissions & 0x8) === 0x8);

  // 각 길드에 대해 봇이 포함되어 있는지 확인
  const updatedGuilds = await Promise.all(
    guilds.map(async (guild: { id: string, deluna: boolean }) => {
      // 디스코드 API를 통해 해당 길드에 봇이 있는지 확인
      const botInGuild = await checkIfBotIsInGuild(guild.id);  // accessToken을 사용하여 봇 정보 확인
      
      // `deluna` 값을 기존 `guild` 객체에 추가
      guild.deluna = botInGuild;  // 봇이 있으면 true, 없으면 false
      return guild;
    })
  );


  return updatedGuilds;
};

// 봇이 해당 길드에 포함되어 있는지 확인하는 함수
const checkIfBotIsInGuild = async (guildId: string) => {
  const botId = '1297475714336948225';  // 봇의 ID를 하드코딩하거나 환경 변수로 저장

  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,  // 봇 토큰을 사용하여 인증
    },
  });

  if (!res.ok) {
    // 오류가 나면 false 반환 (예: 봇이 해당 길드에 없거나 다른 오류)
    return false;
  }

  const member = await res.json();

  console.log(member);

  return member ? true : false;  // 봇이 있으면 true, 없으면 false
};

export default getGuilds;
