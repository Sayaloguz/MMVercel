"use client";

import React, { FC } from "react";
import { Spin, Typography } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/common/hooks/useAuth";
import { useOpenJams } from "@/common/hooks/useOpenJams";
import GeneralJamCard from "../../GeneralJamCardAntd/Delivery";
import { Jam, User } from "@/common/types/utility";

const { Text } = Typography;

const GeneralJamList: FC = () => {
  const { user: currentUser, loading: authLoading } = useAuth();
  const { jams, loading: jamsLoading, error, setJams } = useOpenJams();

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
      const url = `http://localhost:8080/jams/${jam.id}/${endpoint}`;

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error en la operación");
      }
    }
  };

  if (authLoading || jamsLoading) {
    return (
      <>
        <ToastContainer />
        <Spin className="block mx-auto my-8" />
      </>
    );
  }

  if (error || jams.length === 0) {
    return (
      <>
        <ToastContainer />
        <Text className="block text-center">
          {error || "No hay jams abiertas disponibles."}
        </Text>
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
