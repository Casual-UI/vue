<script setup lang="ts">
import { matClose } from '@quasar/extras/material-icons'
import { CIcon, CPopup, useNotifications } from '@casual-ui/vue'

const { closeByPositionGroupAndID, notifications } = useNotifications()
</script>

<template>
  <div class="c-notification">
    <CPopup
      v-for="({ x, y, items }, groupName) in notifications"
      :key="groupName"
      :model-value="false"
      :horizontal-align="x"
      :vertical-align="y"
      addition-class="c-popup--notification"
    >
      <div class="c-notification--item-list">
        <transition-group :name="`c-notification-${x}-${y}`">
          <div
            v-for="noItem in items"
            :key="noItem.id"
            class="c-notification--item-card" :class="[
              `c-notification--item-theme-${noItem.theme}`,
            ]"
          >
            <div class="c-notification--header">
              <div class="c-notification--title">
                {{ noItem.title }}
              </div>
              <div
                v-if="noItem.closeIcon"
                class="c-notification--close-icon"
                @click="closeByPositionGroupAndID(groupName, noItem.id)"
              >
                <svg class="c-notification--countdown-bar" viewBox="0 0 24 24">
                  <circle
                    v-if="noItem.timeout && noItem.timeout > 0"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="transparent"
                    class="c-notification--countdown-bar-circle"
                    :style="{
                      animation: `close-count-down ${
                        noItem.timeout / 1000
                      }s linear forwards`,
                    }"
                  />
                </svg>
                <CIcon
                  :content="matClose"
                  class="c-notification--close-icon-icon"
                />
              </div>
            </div>
            <div class="c-notification--message">
              {{ noItem.message }}
            </div>
          </div>
        </transition-group>
      </div>
    </CPopup>
  </div>
</template>
