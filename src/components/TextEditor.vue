<template>
  <div
    data-component="text-editor"
    :style="`min-height: ${height}px`"
  >
    <textarea></textarea>
  </div>
</template>

<script type="text/javascript">
  import 'trumbowyg';
  import 'trumbowyg/dist/ui/trumbowyg.min.css';
  import svgIcons from 'trumbowyg/dist/ui/icons.svg';
  import { isStr } from '../utils';

  const events = [
    'focus',
    'blur',
    'change',
    'resize',
    'paste',
    'openfullscreen',
    'closefullscreen',
    'close'
  ];

  export default {
    props: {
      value: {
        default: null,
        required: true,
        validator(value) {
          return value === null
            || typeof value === 'string'
            || value instanceof String;
        }
      },
      // http://alex-d.github.io/Trumbowyg/documentation.html#basic-options
      config: {
        type: Object,
        default: () => ({})
      },
      svgPath: {
        type: [String, Boolean],
        default: svgIcons,
      },
      height: {
        type: Number,
        default: 300
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        el: null,
      };
    },
    watch: {
      /**
       * Listen to change from outside of component and update DOM
       *
       * @param newValue String
       */
      value(newValue) {
        if (this.el) {
          // prevent multiple input events
          if (newValue === this.el.trumbowyg('html')) {
            return;
          }
          // set new value
          this.el.trumbowyg('html', newValue);
        }
      },
      disabled(nextValue) {
        this.toggleDisabled(nextValue);
      }
    },
    mounted() {
      if (this.el) {
        return;
      }
      this.el = jQuery(this.$el);

      // set placeholder
      this.el.attr('placeholder', isStr(this.config.placeholder) ? this.config.placeholder : '');

      // init editor with config
      this.el.trumbowyg(Object.assign({
        svgPath: this.svgPath
      }, this.config));

      // set initial value
      this.el.trumbowyg('html', this.value);

      // set initial disabled state
      this.toggleDisabled(this.disabled);

      // watch for further changes
      this.el.on('tbwchange', this.onChange);
      this.el.on('tbwpaste', this.onChange);

      // register events
      this.registerEvents();
    },
    beforeDestroy() {
      // free up memory
      if (this.el) {
        this.el.trumbowyg('destroy');
        this.el = null;
      }
    },
    methods: {
      onChange(event) {
        this.$emit('input', event.target.innerHTML);
      },
      registerEvents() {
        events.forEach((name) => {
          this.el.on(`tbw${name}`, (...args) => {
            this.$emit(`tbw-${name}`, ...args);
          });
        });
      },
      toggleDisabled(isDisabled) {
        if (isDisabled) {
          this.el.trumbowyg('disable');
        } else {
          this.el.trumbowyg('enable');
        }
      }
    }
  };
</script>

<style lang="stylus">
  @import '../assets/stylus/theme.styl';

  [data-component="text-editor"] {
    background-color: transparent;
    font-size: 16px;
    height: auto !important;
  }

  .trumbowyg-box {
    min-height: auto;
  }
</style>
