import colors from "vuetify/es5/util/colors";
import "@mdi/font/css/materialdesignicons.css" // Ensure you are using css-loader
import * as reply from "~/preset/reply"
import _ from "lodash"

const preset = reply.default;
export const options = function({ app }) {
  const customOptions = {
    breakpoint: { scrollbarWidth: 12 },
    theme: {
      themes: {
        light: { primary: 'blue' },
      },
    },
  };

  return {
    icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.red,
          test: colors.blue
        }
      }
    },
    preset:_.merge(preset, customOptions),
  };
}

export default options;
