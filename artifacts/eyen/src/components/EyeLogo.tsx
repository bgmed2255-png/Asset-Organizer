interface EyeLogoProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function EyeLogo({
  size = 60,
  color = "#EAE5D9",
  opacity = 1,
  className,
  style,
}: EyeLogoProps) {
  const w = size * 2.2;
  const h = size;
  const cx = w / 2;
  const cy = h / 2;

  const outerPath = `
    M ${cx},${cy * 0.08}
    Q ${w * 0.72},${cy * 0.08} ${w - 4},${cy}
    Q ${w * 0.72},${cy * 1.92} ${cx},${cy * 1.92}
    Q ${w * 0.28},${cy * 1.92} 4,${cy}
    Q ${w * 0.28},${cy * 0.08} ${cx},${cy * 0.08}
    Z
  `;

  const innerPath = `
    M ${cx},${cy * 0.32}
    Q ${w * 0.67},${cy * 0.32} ${w * 0.84},${cy}
    Q ${w * 0.67},${cy * 1.68} ${cx},${cy * 1.68}
    Q ${w * 0.33},${cy * 1.68} ${w * 0.16},${cy}
    Q ${w * 0.33},${cy * 0.32} ${cx},${cy * 0.32}
    Z
  `;

  const irisR = h * 0.31;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", opacity, ...style }}
    >
      <path
        d={`${outerPath} ${innerPath}`}
        fill={color}
        fillRule="evenodd"
      />
      <circle cx={cx} cy={cy} r={irisR} fill={color} />
    </svg>
  );
}
