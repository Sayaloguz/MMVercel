"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image, Layout, Menu, Skeleton, Drawer, Button } from "antd";
import {
  MenuOutlined,
  GlobalOutlined,
  ExperimentOutlined,
  FolderOpenOutlined,
  HourglassOutlined,
} from "@ant-design/icons";

import LoginButton from "../LoginButton/Delivery";
import UserNavAvatar from "../UserNavAvatar/Delivery";
import { useAuth } from "@/common/hooks/useAuth";

const { Header } = Layout;

const navItems = [
  {
    key: "jams",
    icon: (
      <span className="shadowed-element mr-2">
        <GlobalOutlined />
      </span>
    ),
    text: "Jams",
    href: "/jams",
  },
  {
    key: "crear",
    icon: (
      <span className="shadowed-element mr-2">
        <ExperimentOutlined />
      </span>
    ),
    text: "Crear Jam",
    href: "/crear-jam",
  },
  {
    key: "mis",
    icon: (
      <span className="shadowed-element mr-2">
        <FolderOpenOutlined />
      </span>
    ),
    text: "Mis Jams",
    href: "/mis-jams",
  },
  {
    key: "historial",
    icon: (
      <span className="shadowed-element mr-2">
        <HourglassOutlined />
      </span>
    ),
    text: "Historial",
    href: "/historial",
  },
];

const NavBar: FC = () => {
  const pathname = usePathname();
  const selectedKey = navItems.find((item) =>
    pathname.startsWith(item.href)
  )?.key;

  const { user, loading } = useAuth();

  const [hasMounted, setHasMounted] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const filteredItems = navItems.filter(({ key }) => {
    const requiereAuth = ["crear", "mis", "historial"];
    return !requiereAuth.includes(key) || user;
  });

  return (
    <Header className="font-bold bg-primary-dark shadow-sm min-h-17 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 min-w-[180px]">
        <Link href="/" className="flex items-center">
          <Image
            src="/mmkr_logov2.png"
            alt="Logo de Matchmaker"
            className="shadowed-element"
            height={48}
            width={48}
            preview={false}
          />
          <span
            className="shadowed-text ml-2 text-sm text-white hover:text-red-400 transition"
            style={{
              fontFamily: "var(--font-press-start)",
            }}
          >
            MatchMaKeR
          </span>
        </Link>
      </div>

      {/* Menú de navegación */}
      <div className="hidden md:flex flex-1 min-w-0 justify-center overflow-x-hidden max-w-full">
        {hasMounted && (
          <>
            {loading ? (
              <div className="flex gap-4">
                {[...Array(4)].map((_, idx) => (
                  <Skeleton.Button
                    key={idx}
                    active
                    size="small"
                    style={{
                      width: 100,
                      height: 32,
                    }}
                  />
                ))}
              </div>
            ) : (
              <Menu
                mode="horizontal"
                selectedKeys={selectedKey ? [selectedKey] : []}
                className="border-none bg-transparent h-17"
                disabledOverflow
                items={filteredItems.map(({ key, icon, text, href }) => ({
                  key,
                  label: (
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-white hover:text-red-400 transition"
                    >
                      {icon}
                      <span className="shadowed-text">{text}</span>
                    </Link>
                  ),
                  className: "flex items-center text-xl h-16 leading-[62px]",
                }))}
              />
            )}
          </>
        )}
      </div>

      {/* Hamburguesa */}
      <div className="flex md:hidden">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20, color: "#fff" }} />}
          onClick={() => setDrawerVisible(true)}
        />
      </div>

      {/* Avatar o login (solo visible en escritorio) */}
      <div className="hidden md:flex items-center flex-shrink-0 min-w-[100px] justify-end">
        {loading ? (
          <Skeleton.Avatar active size="small" />
        ) : user ? (
          <UserNavAvatar user={user} />
        ) : (
          <LoginButton />
        )}
      </div>

      {/* Drawer responsive */}
      <Drawer
        title={null}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        closeIcon={<span className="text-white text-xl">×</span>}
        className="bg-primary-dark"
        styles={{
          header: {
            backgroundColor: "#1c2331",
            borderBottom: "1px solid #333",
          },
          body: {
            backgroundColor: "#1c2331",
            padding: "16px",
          },
        }}
      >
        {loading ? (
          <Skeleton active />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="mt-6">
              {user ? <UserNavAvatar user={user} /> : <LoginButton />}
            </div>
            {filteredItems.map(({ key, icon, text, href }, index) => (
              <div key={key} className="flex flex-col">
                {index === 0 && <hr className="my-4 border-gray-600" />}
                <Link
                  href={href}
                  onClick={() => setDrawerVisible(false)}
                  className={`pl-4 text-sm pb-3 transition flex items-center gap-2 ${
                    selectedKey === key ? "!text-red-400" : "!text-white"
                  }`}
                >
                  {icon}
                  <span className="shadowed-text">{text}</span>
                </Link>
                <hr className="mt-2 border-gray-600" />
              </div>
            ))}
          </div>
        )}
      </Drawer>
    </Header>
  );
};

export default NavBar;
