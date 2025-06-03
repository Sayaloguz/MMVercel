"use client";

import React from "react";
import Icon from "@ant-design/icons";
import type { GetProps } from "antd";

type CustomIconComponentProps = GetProps<typeof Icon>;

const UserGroupSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <title>User group icon</title>

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
    />
  </svg>
);

const DiscordSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <title>Discord icon</title>
    <path d="M20.317 4.369A19.791 19.791 0 0 0 15.57 3c-.2.347-.44.81-.6 1.17-1.77-.27-3.54-.27-5.31 0-.16-.37-.42-.823-.61-1.17a19.736 19.736 0 0 0-4.747 1.37C.743 9.042-.297 13.579.104 18.057a19.87 19.87 0 0 0 5.993 2.933 14.72 14.72 0 0 0 1.263-2.048 12.79 12.79 0 0 1-1.997-.956c.167-.122.33-.248.486-.377a13.3 13.3 0 0 0 11.442 0c.156.13.318.255.486.377a12.79 12.79 0 0 1-1.997.956c.363.713.801 1.394 1.31 2.048a19.834 19.834 0 0 0 6.005-2.933c.5-5.177-.838-9.68-3.681-13.688zM8.02 15.583c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418.002 1.334-.955 2.419-2.157 2.419zm7.95 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418.002 1.334-.947 2.419-2.157 2.419z" />
  </svg>
);

export const UserGroupIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UserGroupSvg} {...props} />
);

export const DiscordIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DiscordSvg} {...props} />
);
