import { AvatarComponent } from "@rainbow-me/rainbowkit";

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  // const color = generateColorFromAddress(address);
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: "red",
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      :^
    </div>
  );
};
