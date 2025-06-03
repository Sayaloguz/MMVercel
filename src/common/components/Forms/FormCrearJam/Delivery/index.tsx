"use client";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Spin,
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { JamInputDTO, User, Game } from "@/common/types/utility";
import { toast } from "react-toastify";
import { modeOptions, voiceOptions } from "../Infrastructure/optionsmapper";

const FormCrearJam = () => {
  const [form] = Form.useForm();
  const [games, setGames] = useState<Game[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("CASUAL");
  const [voice, setVoice] = useState("TEXT");

  useEffect(() => {
    fetch("http://localhost:8080/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .finally(() => setLoading(false));

    fetch("http://localhost:8080/games/")
      .then((res) => res.json())
      .then((data) => {
        setGames(Array.isArray(data) ? data : data.games || []);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  const handleFinish = async (values: {
    title: string;
    desc: string;
    game: Game;
    date: dayjs.Dayjs;
    time: dayjs.Dayjs;
    state: "OPEN" | "FULL" | "FINISHED";
    createdBy: User;
    createdAt: string;
    numPlayers: number;
    players: User[];
    gameMode: "CASUAL" | "COMPETITIVE" | "COMPLETIST";
    voice: "TEXT" | "HEAR" | "TALK";
    lang: "INDEF" | "ES" | "EN" | "FR" | "PT" | "IT";
    duration: "15-30" | "30-60" | "60-120" | "120-180" | "180-240" | "240+";
  }) => {
    if (!user) {
      toast.error("Debes iniciar sesión para crear una jam.");
      return;
    }

    const selectedGame = games.find((g) => g.appid === values.game.appid);
    if (!selectedGame) {
      toast.error("Juego seleccionado no encontrado.");
      return;
    }

    const jamPayload: JamInputDTO = {
      title: values.title,
      description: values.desc || "¡Únete a mi partida!",
      game: selectedGame,
      jamDate: values.date.format("YYYY-MM-DD"),
      jamTime: values.time.format("HH:mm"),
      state: "OPEN",
      createdBy: user,
      createdAt: new Date().toISOString(),
      maxPlayers: values.numPlayers,
      players: [user],
      gameMode: values.gameMode,
      voiceMode: values.voice,
      language: values.lang.toUpperCase() as
        | "INDEF"
        | "ES"
        | "EN"
        | "FR"
        | "PT"
        | "IT",
      duration: values.duration,
    };

    try {
      const response = await fetch("http://localhost:8080/jams/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jamPayload),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      await response.json();
      toast.success("Jam creada con éxito 🎉");
      form.resetFields();
    } catch (error) {
      toast.error("Error al crear la jam.");
      console.error("Error al crear la jam:", error);
    }
  };

  if (loading) return <Spin />;
  if (!user)
    return (
      <p className="text-white text-center">
        Para crear una jam, inicia sesión primero.
      </p>
    );

  return (
    <Form
      className="w-full"
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      scrollToFirstError={{ behavior: "smooth", block: "center" }}
      initialValues={{
        gameMode: "CASUAL",
        voice: "TEXT",
        numPlayers: 2,
        desc: "¡Únete a mi partida!",
      }}
    >
      <Form.Item
        name="title"
        label="Título"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Input
          placeholder="Grupo para raidear Exodia, Fall Guys de tranquis..."
          className="text-left"
        />
      </Form.Item>

      <Form.Item
        name="game"
        label="Juego"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Select
          showSearch
          placeholder="Elige un juego"
          className="text-left"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={games.map((game) => ({
            value: game.appid,
            label: game.name,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="lang"
        label="Idioma"
        rules={[{ required: true, message: "Este campo es obligatorio" }]}
      >
        <Select
          showSearch
          placeholder="Selecciona el idioma preferido"
          className="text-left"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "NOLANG", label: "🌐 - Indiferente" },
            { value: "ES", label: "🇪🇸 - Español" },
            { value: "EN", label: "🇬🇧 - English" },
            { value: "PT", label: "🇵🇹 - Portuguese" },
            { value: "FR", label: "🇫🇷 - French" },
            { value: "IT", label: "🇮🇹 - Italian" },
          ]}
        />
      </Form.Item>

      <Form.Item name="desc" label="Descripción">
        <TextArea showCount rows={4} maxLength={300} />
      </Form.Item>

      <div className="flex gap-4">
        <Form.Item
          name="date"
          label="Fecha"
          rules={[{ required: true, message: "Selecciona una fecha" }]}
          className="flex-1"
        >
          <DatePicker
            style={{ width: "100%" }}
            className="text-left"
            showToday={false}
            disabledDate={(d) =>
              !d || d.isAfter(dayjs().add(1, "year")) || d.isBefore(dayjs())
            }
          />
        </Form.Item>

        <Form.Item
          name="time"
          label="Hora"
          rules={[{ required: true, message: "Selecciona una hora" }]}
          className="flex-1"
        >
          <TimePicker
            format="HH:mm"
            allowClear={false}
            showNow={false}
            style={{ width: "100%" }}
            className="text-left"
          />
        </Form.Item>
      </div>

      {/* Número de jugadores y duración en la misma línea */}
      <div className="flex gap-4">
        <Form.Item
          name="numPlayers"
          label="Número de jugadores"
          rules={[{ required: true, message: "Este campo es obligatorio" }]}
          className="flex-1"
        >
          <InputNumber
            min={2}
            max={100}
            style={{ width: "100%" }}
            className="text-left"
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duración"
          rules={[{ required: true, message: "Selecciona una duración" }]}
          className="flex-1"
        >
          <Select placeholder="Duración estimada" className="text-left">
            <Select.Option value="15-30">15–30 minutos</Select.Option>
            <Select.Option value="30-60">30–60 minutos</Select.Option>
            <Select.Option value="60-120">1–2 horas</Select.Option>
            <Select.Option value="120-180">2–3 horas</Select.Option>
            <Select.Option value="180-240">3–4 horas</Select.Option>
            <Select.Option value="240+">4+ horas</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item name="gameMode" label="Modo de juego">
        <Radio.Group
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="!flex w-full"
          buttonStyle="solid"
        >
          {modeOptions.map((opt) => (
            <Radio.Button
              key={opt.value}
              value={opt.value}
              className={`flex-1 !h-24 !w-28 !flex !flex-col !items-center !justify-center !text-center !p-2 ${
                mode === opt.value ? "!font-bold" : ""
              }`}
            >
              <div className="text-2xl bg-slate-50 rounded-lg">{opt.emoji}</div>
              <div className="mt-1 text-sm">{opt.label}</div>
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item name="voice" label="Comunicación">
        <Radio.Group
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="!flex w-full"
          buttonStyle="solid"
        >
          {voiceOptions.map((opt) => (
            <Radio.Button
              key={opt.value}
              value={opt.value}
              className={`flex-1 !h-24 !w-28 !flex !flex-col !items-center !justify-center !text-center !p-2 ${
                voice === opt.value ? "font-bold" : ""
              }`}
            >
              <div className="text-2xl bg-slate-50 rounded-lg">{opt.emoji}</div>
              <div className="mt-1 text-sm">{opt.label}</div>
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          🚀 Crear Jam
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCrearJam;
