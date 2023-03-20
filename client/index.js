"use strict";

const button = document.querySelector("button")
const input = document.querySelector('input')

button.onclick = () => {
    const name = input.value.trim()
    if (!isNaN(name) || !name.trim()) {
        input.value = ''
        input.style.borderColor = 'red'
    } else {
        document.querySelector('p').textContent = ''
        input.value = ''
        document.querySelector('label').textContent = `Message from ${name}`
        button.textContent = 'Send'

        const ws = new WebSocket('ws://localhost:7777')
        ws.onmessage = messageEvent => {
            const p = document.createElement('p')
            p.textContent = messageEvent.data
            document.querySelector('div').appendChild(p)
        }

        ws.onopen = () => {
            button.onclick = () => {
                const message = input.value.trim()
                if (message) {
                    ws.send(`${name}: ${message}`)
                    input.value = ''
                }
            }
        }
    }
}