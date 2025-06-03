/*import { useEffect } from 'react';

const Profile = () => {

  useEffect(() => {
    const saveUserData = async () => {
      if (session?.user) {
        const userData = {
          steamId: session.user.steamId,
          name: session.user.username,
          profileUrl: `https://steamcommunity.com/profiles/${session.user.steamId}`,
          avatar: session.user.avatar,
          timeCreated: new Date().toISOString(),
        };

        try {
          const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error('Error al guardar los datos del usuario');
          }

          const result = await response.json();
          console.log('Usuario guardado:', result);
        } catch (error) {
          console.error('Error al guardar usuario:', error);
        }
      }
    };

    saveUserData();
  }, [session]);

  if (!session?.user) {
    return <p>No has iniciado sesión. <a href="/api/auth/signin">Inicia sesión con Steam</a></p>;
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <img
        src={session.user.avatar}
        alt="Avatar"
        className="w-32 h-32 rounded-full"
      />
      <h1 className="text-2xl font-bold mt-4">{session.user.username}</h1>
      <p className="text-gray-500">SteamID: {session.user.steamId}</p>
    </div>
  );
};

export default Profile;*/