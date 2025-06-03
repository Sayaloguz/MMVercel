import { FC } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CustomArrow: FC<{
  direction: "left" | "right";
  onClick?: () => void;
}> = ({ direction, onClick }) => {
  const Icon = direction === "left" ? LeftOutlined : RightOutlined;
  const positionStyle = direction === "left" ? { left: -50 } : { right: -50 };

  return (
    <div
      className="custom-slick-arrow"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...positionStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 0, 0, 0.9)",
        borderRadius: "35%",
        width: 70,
        height: 200,
        zIndex: 20,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Icon style={{ color: "#f8fafc", fontSize: 40, fontWeight: "bold" }} />
    </div>
  );
};
export default CustomArrow;
