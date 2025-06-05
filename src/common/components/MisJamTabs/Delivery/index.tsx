"use client";

import { useEffect, useState } from "react";
import { Tabs, Spin } from "antd";
import { Jam } from "@/common/types/utility";
import MisJamList from "@/common/components/MisJamList";
import { useAuth } from "@/common/hooks/useAuth";

const MisJamTabs = () => {
  const { user, loading: authLoading, error: authError } = useAuth();

  const [createdJams, setCreatedJams] = useState<Jam[]>([]);
  const [joinedJams, setJoinedJams] = useState<Jam[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const refreshJams = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const [createdRes, joinedRes] = await Promise.all([
        fetch(`http://localhost:8080/jams/byCreator/${user.steamId}`),
        fetch(`http://localhost:8080/jams/byUser/${user.steamId}`),
      ]);

      const created = createdRes.ok ? await createdRes.json() : [];
      const joined = joinedRes.ok ? await joinedRes.json() : [];

      const createdIds = new Set(created.map((jam: Jam) => jam.id));

      const filteredCreated = created.filter(
        (jam: Jam) => jam.state !== "FINISHED"
      );

      const filteredJoined = joined.filter(
        (jam: Jam) => !createdIds.has(jam.id) && jam.state !== "FINISHED"
      );

      setCreatedJams(filteredCreated);
      setJoinedJams(filteredJoined);
    } catch (err) {
      console.error("Error al cargar datos de las jams", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.steamId && !hasFetched) {
      refreshJams();
      setHasFetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.steamId, hasFetched]);

  if (authLoading) return null;
  if (authError) return <p className="text-red-500">{authError}</p>;

  return (
    <Spin spinning={loading}>
      <Tabs
        className="misjams-tabs"
        defaultActiveKey="joined"
        centered
        size="large"
        items={[
          {
            key: "joined",
            label: "Participaciones",
            children: (
              <MisJamList
                jams={joinedJams}
                refreshJams={refreshJams}
                editable
              />
            ),
          },
          {
            key: "created",
            label: "Jams creadas",
            children: (
              <MisJamList
                jams={createdJams}
                refreshJams={refreshJams}
                editable
              />
            ),
          },
        ]}
      />
    </Spin>
  );
};

export default MisJamTabs;
