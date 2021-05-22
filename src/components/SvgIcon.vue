<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
@Component({})
export default class SvgIcon extends Vue {
  @Prop({
    required: true,
  })
  private iconClass!: string;
  @Prop({
    default: "",
  })
  private className!: string;
  /**
   * @description: 计算icon名称
   * @return {string}: icon名称
   */
  get iconName() {
    return `#icon-${this.iconClass}`
  }

  /**
   * @description: 计算svg名称
   * @return {string}: svg名称
   */
  get svgClass() {
    if (this.className) {
      return `svg-icon${this.className}`
    } else {
      return "svg-icon"
    }
  }
}
</script>

<style scoped>
svg {
  width: 5rem;
  height: 5rem;
  color: #ffffff;
  fill: currentColor;
}
</style>
