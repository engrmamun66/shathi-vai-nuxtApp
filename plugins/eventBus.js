import mitt from 'mitt'

export default defineNuxtPlugin(() => {
    const emitter = mitt()
    return {
        provide: {
            eventBus: emitter.emit,
            on: emitter.on,
            off: emitter.on,
            all: emitter.all,
        }
    }
})