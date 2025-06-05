"use client";
import React from "react";
import {
  Modal,
  DatePicker,
  TimePicker,
  InputNumber,
  Form,
  Input,
  Select,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Jam, JamUpdateDTO } from "@/common/types/utility";
import {
  durationOptions,
  gameModeOptions,
  languageOptions,
  voiceModeOptions,
} from "@/common/utils/mappers";

interface ModalJamProps {
  isVisible: boolean;
  onCancel: () => void;
  onUpdate: (updatedJam: JamUpdateDTO) => Promise<boolean>;
  players: number;
  jamData: Jam;
  isLoading?: boolean;
}

const { TextArea } = Input;

const ModalJam: React.FC<ModalJamProps> = ({
  isVisible,
  onCancel,
  onUpdate,
  players,
  jamData,
  isLoading = false,
}) => {
  const [form] = Form.useForm();

  if (!jamData) return null;

  const initialValues = {
    title: jamData.title ?? "",
    description: jamData.description ?? "",
    date: jamData.jamDate ? dayjs(jamData.jamDate) : null,
    time: jamData.jamTime ? dayjs(jamData.jamTime, "HH:mm") : null,
    maxPlayers: jamData.maxPlayers ?? players,
    gameMode: jamData.gameMode ?? "",
    voiceMode: jamData.voiceMode ?? "",
    language: jamData.language ?? "",
    duration: jamData.duration ?? "",
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const updatedJam = {
        id: jamData.id,
        title: values.title,
        description: values.description,
        jamDate: values.date?.format("YYYY-MM-DD") ?? null,
        jamTime: values.time?.format("HH:mm") ?? null,
        maxPlayers: values.maxPlayers,
        gameMode: values.gameMode,
        voiceMode: values.voiceMode,
        language: values.language,
        duration: values.duration,
      };

      const success = await onUpdate(updatedJam);

      if (success) {
        onCancel();
      }
    } catch (error) {
      toast.error("Completa todos los campos correctamente");
      console.error("Error en el formulario:", error);
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onCancel}
      onOk={handleOk}
      title="Editar Jam"
      okText="Actualizar"
      cancelText="Cancelar"
      confirmLoading={isLoading}
      width={700}
      className="custom-modal"
      key={jamData.id} // ayuda a resetear el form cuando cambian los datos
    >
      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: "El título es requerido" }]}
        >
          <Input placeholder="Título de la Jam" maxLength={100} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true, message: "La descripción es requerida" }]}
        >
          <TextArea
            rows={4}
            placeholder="Describe tu Jam..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="date"
            label="Fecha"
            rules={[{ required: true, message: "Selecciona una fecha" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="time"
            label="Hora"
            rules={[{ required: true, message: "Selecciona una hora" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="maxPlayers"
            label="Jugadores máximos"
            rules={[{ required: true, message: "Número requerido" }]}
          >
            <InputNumber
              min={players}
              max={100}
              style={{ width: "100%" }}
              disabled={players > (jamData.maxPlayers ?? 0)}
            />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duración"
            rules={[{ required: true, message: "Selecciona una duración" }]}
          >
            <Select
              options={durationOptions}
              placeholder="Selecciona duración"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="gameMode"
            label="Modo de juego"
            rules={[{ required: true, message: "Selecciona un modo" }]}
          >
            <Select options={gameModeOptions} placeholder="Selecciona modo" />
          </Form.Item>

          <Form.Item
            name="voiceMode"
            label="Modo de voz"
            rules={[{ required: true, message: "Selecciona un modo" }]}
          >
            <Select options={voiceModeOptions} placeholder="Selecciona modo" />
          </Form.Item>

          <Form.Item
            name="language"
            label="Idioma"
            rules={[{ required: true, message: "Selecciona un idioma" }]}
          >
            <Select options={languageOptions} placeholder="Selecciona idioma" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalJam;
