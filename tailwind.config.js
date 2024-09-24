const { colors } = require("@mui/material");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Teal: "#77C2C0",
        LightAqua: "#9EF2EB",
        SoftTeal: "#EDF7F6",
        SoftBlack: "#323232",
        SoftWhite: "#EAF1FB",
      },
      fontSize: {
        Heading1: "32px",
        Heading2: "24px",
        Heading3: "20px",
        BodyText: "16px",
        CaptionText: "12px",
        ButtonText: "16px",
        "LinkText:": "16px",
      },
    },
  },
  plugins: [],
};
