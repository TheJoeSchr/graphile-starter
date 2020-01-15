
import { reactive, SetupContext } from "@vue/composition-api";
// import { Context } from "@nuxtjs/vuetify"
import { Framework} from "vuetify"

/** Get color code of one of default colors depending if theme is set to dark or light
 */
export function getThemeColor(colorName: "primary"| "secondary"| "accent"| "error" | "info" | "success" | "warning", ctx: SetupContext)
{

  const $vuetify:Framework = ctx!.parent!.$vuetify;
  const themeVariant = $vuetify.theme.dark ? "dark" : "light";

  return reactive($vuetify.theme.themes[themeVariant][colorName]);
}
