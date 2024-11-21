# Mandelbrot Set Visualizer

An interactive, high-performance Mandelbrot Set visualization tool built with JavaScript and Web Workers. This project provides a real-time, zoomable interface for exploring the fascinating mathematical beauty of the Mandelbrot Set.

![Mandelbrot Set Visualization](https://i.imgur.com/example.png)

## Features

- 🚀 Real-time rendering using Web Workers
- 🔍 Smooth zoom functionality with double-click
- 🎨 Dynamic color palette generation
- 📱 Fully responsive design
- ⚙️ Collapsible control panel
- 🔄 View reset capability

## Tech Stack

- Vanilla JavaScript (ES6+)
- HTML5 Canvas
- Web Workers API
- Vite (Build tool)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mandelbrot-set.git
cd mandelbrot-set
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

### Basic Navigation

- **Double-click**: Zoom in on any point
- **Reset Button**: Return to the initial view
- **Toggle Button**: Show/hide the control panel

### Example Interactions

1. Initial View
   - The complete Mandelbrot Set is visible
   - Black region represents the set
   - Colored regions show escape-time values

2. Zooming
   - Double-click on interesting boundary regions
   - Each zoom level provides more detail
   - Colors indicate iteration counts

## Development

### Project Structure

```
mandelbrot-set/
├── src/
│   ├── mandelbrot.js    # Main application logic
│   └── worker.js        # Web Worker for calculations
├── index.html           # Entry point
├── package.json         # Project configuration
└── README.md           # Documentation
```

### Key Components

- **Main Thread (`mandelbrot.js`)**
  - Handles UI interactions
  - Manages the canvas
  - Coordinates with Web Worker

- **Web Worker (`worker.js`)**
  - Performs Mandelbrot Set calculations
  - Handles complex number operations
  - Returns iteration results

### Building

```bash
npm run build
```

The built files will be in the `dist` directory.

## Testing

Currently, the project relies on manual testing. Key test cases:

1. Viewport Resizing
2. Zoom Functionality
3. Color Rendering
4. Worker Communication
5. Control Panel Operation

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` directory to your preferred hosting service.

3. For Netlify:
   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add comments for complex calculations
- Update documentation as needed
- Test thoroughly before submitting

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```