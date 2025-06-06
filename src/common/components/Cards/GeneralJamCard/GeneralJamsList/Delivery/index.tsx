"use client";

import React, { FC } from "react";
import { Spin, Typography } from "antd";
import { toast } from "react-toastify";
import { useAuth } from "@/common/hooks/useAuth";
import GeneralJamCard from "../../GeneralJamCardAntd/Delivery";
import { Jam, User } from "@/common/types/utility";
import "react-toastify/dist/ReactToastify.css";
import useFilteredJams from "@/common/hooks/useFIlteredJams";
import { API_URL } from "@/common/utils/config";

const { Text } = Typography;

const GeneralJamList: FC = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const { jams, loading, error, setJams } = useFilteredJams();

  const jwtValid = !!currentUser;

  const updateJamInList = (updatedJam: Jam) => {
    setJams((prev) =>
      prev.map((j) => (j.id === updatedJam.id ? updatedJam : j))
    );
  };

  const onJoinLeaveJam = async (jam: Jam) => {
    if (!jwtValid || !currentUser) {
      toast.info("Debes iniciar sesión para unirte a la Jam.");
      return;
    }

    const userIsInJam = jam.players.some(
      (p: User) => p.steamId === currentUser.steamId
    );

    try {
      const endpoint = userIsInJam
        ? `removePlayer/${currentUser.steamId}`
        : "addPlayer";
      const method = userIsInJam ? "DELETE" : "POST";
      const url = `${API_URL}/jams/${jam.id}/${endpoint}`;

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: !userIsInJam ? JSON.stringify(currentUser) : undefined,
      });

      if (!res.ok) throw new Error(await res.text());

      const updatedJam = await res.json();
      updateJamInList(updatedJam);

      toast.success(
        userIsInJam
          ? `Has salido de la Jam "${jam.title}" con éxito`
          : `Te has unido a la Jam "${jam.title}" con éxito`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Error en la operación.");
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Spin className="block mx-auto my-8" />
      </>
    );
  }

  if (error || jams.length === 0) {
    return (
      <>
        <Text className="block text-center">
          {error || "No hay jams disponibles."}
        </Text>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 my-8">
        {jams.map((jam) => (
          <GeneralJamCard
            key={jam.id}
            jam={jam}
            jwtValid={jwtValid}
            currentUser={currentUser}
            onJoinLeaveJam={onJoinLeaveJam}
          />
        ))}
      </div>
    </>
  );
};

export default GeneralJamList;
