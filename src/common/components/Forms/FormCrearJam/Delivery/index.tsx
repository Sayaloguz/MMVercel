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
import {
  durationOptions,
  gameModeMap,
  gameModeOptions,
  languageOptions,
  voiceModeMap,
  voiceModeOptions,
} from "@/common/utils/mappers";

import { PlusCircleOutlined } from "@ant-design/icons";
import { API_URL } from "@/common/utils/config";

const FormCrearJam = () => {
  const [form] = Form.useForm();
  const [games, setGames] = useState<Game[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("CASUAL");
  const [voice, setVoice] = useState("TEXT");

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .finally(() => setLoading(false));

    fetch(`${API_URL}/games/`)
      .then((res) => res.json())
      .then((data) => {
        setGames(Array.isArray(data) ? data : data.games || []);
      })
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  const handleFinish = async (values: unknown) => {
    if (!user) {
      toast.error("Debes iniciar sesión para crear una jam.");
      return;
    }

    const selectedGame = games.find((g) => g.appid === values.game);
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
      language: values.lang,
      duration: values.duration,
    };

    try {
      const response = await fetch(`${API_URL}/jams/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jamPayload),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      await response.json();
      toast.success("Jam creada con éxito 🎉");
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          className="custom-input text-left"
          maxLength={40}
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
          className="custom-input text-left"
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
          className="custom-input text-left"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={languageOptions}
        />
      </Form.Item>

      <Form.Item name="desc" label="Descripción">
        <TextArea showCount rows={4} maxLength={150} className="custom-input" />
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
            className="custom-input-picker text-left"
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
            className="custom-input-picker text-left"
          />
        </Form.Item>
      </div>

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
          <Select
            placeholder="Duración estimada"
            className="custom-input text-left"
            options={durationOptions}
          />
        </Form.Item>
      </div>

      <Form.Item name="gameMode" label="Modo de juego">
        <Radio.Group
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="!flex w-full"
          buttonStyle="solid"
        >
          {gameModeOptions.map((opt) => (
            <Radio.Button
              key={opt.value}
              value={opt.value}
              className={`flex-1 !h-24 !w-28 !flex !flex-col !items-center !justify-center !text-center !p-2 ${
                mode === opt.value ? "!font-bold" : ""
              }`}
            >
              <div className="text-2xl bg-slate-50 rounded-lg">
                {gameModeMap[opt.value].split(" ")[0]}
              </div>
              <div className="mt-1 text-sm">
                {gameModeMap[opt.value].split(" ").slice(1).join(" ")}
              </div>
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
          {voiceModeOptions.map((opt) => (
            <Radio.Button
              key={opt.value}
              value={opt.value}
              className={`flex-1 !h-24 !w-28 !flex !flex-col !items-center !justify-center !text-center !p-2 ${
                voice === opt.value ? "font-bold" : ""
              }`}
            >
              <div className="text-2xl bg-slate-50 rounded-lg">
                {voiceModeMap[opt.value].split(" ")[0]}
              </div>
              <div className="mt-1 text-sm">
                {voiceModeMap[opt.value].split(" ").slice(1).join(" ")}
              </div>
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-3/5 !font-bold">
          <PlusCircleOutlined /> Crear Jam
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCrearJam;
