import { display } from 'lib'
import { normalizeEvent } from 'services/api'
import { Event, EventModel } from './relay-models'
import { RelayStore } from './relay-store'

export const subscribeToUser = async (self: RelayStore, pubkey: string) => {
  display({
    name: 'subscribeToUser',
    preview: `Subscribing to ${pubkey}`,
  })

  const onEvent = (event: any, relay: any) => {
    display({
      name: 'Relay onEvent',
      preview: `Received event ${event.id ?? ''}`,
      value: { event, relay },
    })
    const eventToSave: Event = normalizeEvent(event)
    self.setEvent(eventToSave)
  }

  self.env.relay.pool.sub({
    cb: onEvent,
    filter: {
      author: pubkey,
    },
  })

  return true
}
