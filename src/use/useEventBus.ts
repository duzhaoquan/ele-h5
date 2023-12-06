import { EventEmitter } from '@/utils/event'

let eventBus: EventEmitter
export function useEventBus() {
  if (!eventBus) {
    eventBus = new EventEmitter()
  }
  return eventBus
}
