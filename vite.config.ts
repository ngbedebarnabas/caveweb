import { sveltekit } from "@sveltejs/kit/vite";
import houdini from "houdini/vite";
import type { UserConfig } from "vite";
import presetIcons from "@unocss/preset-icons";
import UnoCSS from "unocss/vite";

const config: UserConfig = {
  plugins: [
    houdini(),
    sveltekit(),
    UnoCSS({
      presets: [
        presetIcons({
          /* options */
        }),
      ],
    }),
  ],
};

export default config;
