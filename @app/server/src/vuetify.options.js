import colors from "vuetify/es5/util/colors";
import { preset } from 'vue-cli-plugin-vuetify-preset-reply/preset'

const options = {
  breakpoint: { scrollbarWidth: 12 },
  theme: {
    themes: {
      light: { primary: 'blue' },
    },
  },
};

export default {
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.red,
        test: colors.blue
      }
    }
  },
  preset:{...preset, ...options},
};
