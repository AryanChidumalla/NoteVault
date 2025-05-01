export const CoffeeMachine = () => {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="study">
        <rect width="64" height="64" />\{/* Background Rectangle */}
        <rect
          x="4"
          y="12"
          width="56"
          height="32"
          fill="#E0E0E0"
          stroke="#453F3C"
          strokeWidth="2"
        />
        <g id="coffeeMachineHeader">
          <rect
            id="CoffeeMachineContainer"
            x="4"
            y="4"
            width="56"
            height="10"
            fill="#797270"
            stroke="#453F3C"
            strokeWidth="2"
          />

          <circle cx="9" cy="9" r="2" fill="#282323" stroke="#615e5e" />
          <circle cx="15" cy="9" r="2" fill="#282323" stroke="#615e5e" />
          <circle cx="32" cy="9" r="2" fill="#9acfc5" stroke="#43beae" />

          <rect
            x="26"
            y="16"
            width="10"
            height="4"
            fill="#797270"
            stroke="#453F3C"
            strokeWidth="2"
          />

          <rect
            x="38"
            y="17"
            width="10"
            height="2"
            fill="#797270"
            stroke="#453F3C"
            strokeWidth="2"
          />
        </g>
        <g id="coffee">
          <rect
            x="30"
            y="22"
            width="2"
            height="8"
            fill="#797270"
            stroke="#453F3C"
            strokeWidth="2"
          />
        </g>
        <g id="cup">
          <rect
            id="Rectangle 978"
            x="29"
            y="34"
            width="5"
            height="7"
            fill="#CCC4C4"
            stroke="#453F3C"
            strokeWidth="2"
          />

          <path
            id="Ellipse_416"
            d="M35 38 C36.1046 38,37 37.1046,37 36 C37 34.8954,36.1046 34,35 34"
            stroke="#453F3C"
            strokeWidth="2"
          />
        </g>
        <g id="coffeeMachineFooter">
          <rect
            id="Rectangle 979"
            x="4"
            y="43" // Footer position
            width="56"
            height="10"
            fill="#797270"
            stroke="#453F3C"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
};
