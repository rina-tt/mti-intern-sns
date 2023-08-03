<template>
  <div>
    <sui-button @click.native="toggle">Show Modal</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>{{primaryText}}</sui-modal-header>
      <sui-modal-content scrolling image>
       
        <sui-modal-description>
          {{secondaryText}}
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          CANCEL
        </sui-button>
        <sui-button positive @click.native="onClickFunc">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: 'CommonDialog',
  props: {
      onClickFunc: {
          type: Function,
          required: true
      },
      primaryText: {
          type: String,
          required: true
      },
      secondaryText: {
          type: String,
          required: true
      },
  },
  data() {
    return { open: false };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
