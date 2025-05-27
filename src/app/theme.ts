"use client"
import { Button, createTheme, virtualColor } from "@mantine/core";

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primaryPink: [
      "#ffe9ff",
      "#fed1fd",
      "#faa1f6",
      "#f66ef1",
      "#f243eb",
      "#f028e9",
      "#f018e8",
      "#d609ce",
      "#bf00b9",
      "#a700a1"
    ],
    secondary: [
      "#f3edff",
      "#e0d7fa",
      "#beabf0",
      "#9a7de6",
      "#7c55de",
      "#693cd9",
      "#5f30d8",
      "#4f23c0",
      "#461eac",
      "#3b1898"
    ],
    primary: virtualColor({
      name: 'primary',
      dark: 'secondary',
      light: 'primaryPink',
    }),
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'sm',
      }
    })
  },
  autoContrast: true,
})