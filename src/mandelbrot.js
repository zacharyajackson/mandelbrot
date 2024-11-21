const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const resetButton = document.getElementById('resetView')
const togglePanel = document.getElementById('togglePanel')
const controlsPanel = document.getElementById('controlsPanel')

let worker
let colorPalette = []
const INITIAL_REAL_SET = { start: -2, end: 1 }
const INITIAL_IMAGINARY_SET = { start: -1, end: 1 }
let REAL_SET = { ...INITIAL_REAL_SET }
let IMAGINARY_SET = { ...INITIAL_IMAGINARY_SET }
const ZOOM_FACTOR = 0.1
const TASKS = []

const lagrange = ([X1, Y1], [X2, Y2], x) => (((Y1 * (x - X2)) / (X1 - X2)) + ((Y2 * (x - X1)) / (X2 - X1)))

const makeRGB = (r, g, b, k) => {
    const calculate = pair => parseInt(lagrange(pair[0], pair[1], k))
    if (isNaN(r)) r = calculate(r)
    if (isNaN(g)) g = calculate(g)
    if (isNaN(b)) b = calculate(b)

    return [r, g, b]
}

const palette = (size = 250) => {
    const range = parseInt(size / 6)
    const colors = []
    let c
    for (let k = 0; k < size; k++) {
        if (k <= range)//red to yellow
            c = makeRGB(255, [[0, 0], [range, 255]], 0, k)
        else if (k <= range * 2)//yellow to green
            c = makeRGB([[range + 1, 255], [range * 2, 0]], 255, 0, k)
        else if (k <= range * 3)//green to cyan
            c = makeRGB(0, 255, [[range * 2 + 1, 0], [range * 3, 255]], k)
        else if (k <= range * 4)//cyan to blue
            c = makeRGB(0, [[range * 3 + 1, 255], [range * 4, 0]], 255, k)
        else if (k <= range * 5)//blue to purple
            c = makeRGB([[range * 4 + 1, 0], [range * 5, 255]], 0, 255, k)
        else//purple to red
            c = makeRGB(255, 0, [[range * 5 + 1, 255], [size - 1, 0]], k)

        colors.push(c)
    }
    return colors
}

const paletteBW = () => new Array(250).fill(0).map((_, i) => {
    const c = lagrange([0, 0], [250, 255], i)
    return [c, c, c]
})

const start = () => {
    TASKS.length = 0 // Clear existing tasks
    for (let col = 0; col < canvas.width; col++) TASKS[col] = col
    worker.postMessage({ col: TASKS.shift() })
}

const draw = (res) => {
    if (TASKS.length > 0)
        worker.postMessage({ col: TASKS.shift() })

    const { col, mandelbrotSets } = res.data
    for (let i = 0; i < canvas.height; i++) {
        const [m, isMandelbrotSet] = mandelbrotSets[i]
        let c = isMandelbrotSet ? [0, 0, 0] : colorPalette[m % (colorPalette.length - 1)]
        ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`
        ctx.fillRect(col, i, 1, 1)
    }
}

const getRelativePoint = (pixel, length, set) => set.start + (pixel / length) * (set.end - set.start)

const init = () => {
    if (worker) worker.terminate()
    worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
    worker.postMessage({ 
        w: canvas.width, 
        h: canvas.height, 
        realSet: REAL_SET, 
        imaginarySet: IMAGINARY_SET, 
        isSettingUp: true 
    })
    start()
    colorPalette = palette()
    worker.onmessage = draw
}

const resetView = () => {
    REAL_SET = { ...INITIAL_REAL_SET }
    IMAGINARY_SET = { ...INITIAL_IMAGINARY_SET }
    init()
}

const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
}

// Event Listeners
window.addEventListener('resize', handleResize)
canvas.addEventListener('dblclick', e => {
    const zfw = (canvas.width * ZOOM_FACTOR)
    const zfh = (canvas.height * ZOOM_FACTOR)

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    REAL_SET = {
        start: getRelativePoint(x - zfw, canvas.width, REAL_SET),
        end: getRelativePoint(x + zfw, canvas.width, REAL_SET)
    }
    IMAGINARY_SET = {
        start: getRelativePoint(y - zfh, canvas.height, IMAGINARY_SET),
        end: getRelativePoint(y + zfh, canvas.height, IMAGINARY_SET)
    }

    init()
})
resetButton.addEventListener('click', resetView)
togglePanel.addEventListener('click', () => {
    controlsPanel.classList.toggle('collapsed')
})

// Initial setup
handleResize()