# YouTube Facade

YouTube Facade is a lightweight, accessible YouTube embed solution that provides a facade/placeholder for YouTube videos with minimal JavaScript, optional modal playback, and improved performance. The library transforms regular YouTube links into interactive video embeds.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
- Install dependencies: `npm install` -- takes 35 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Build the library: `npm run build` -- takes 1-2 seconds. Very fast build process.
- Lint JavaScript code: `npm run lint-js` -- takes under 1 second.
- Watch mode for development: `npm run watch` -- builds continuously on file changes, initial build takes 1-2 seconds, incremental builds take 15ms.

### Development and Testing
- Start HTTP server for demo: `python3 -m http.server 8080` 
- Access demo page: `http://localhost:8080/demo/`
- ALWAYS run the bootstrapping steps first before development work.
- ALWAYS test your changes using the demo page to ensure functionality works correctly.

### Build Process Details
- Uses Parcel bundler for building CSS and JavaScript
- Source files in `src/` directory are built to `dist/` directory
- Generates source maps for debugging
- Build outputs: `dist/youtube-facade.js` (6.29 kB) and `dist/youtube-facade.css` (4.22 kB)
- No special build configuration needed - Parcel handles everything automatically

## Validation

### Manual Testing Requirements
After making ANY changes, ALWAYS validate using these scenarios:

1. **Basic Embed Test**:
   - Load `http://localhost:8080/demo/`
   - Click the first YouTube facade (left video) - should replace with iframe
   - Verify the video facade transforms into an embedded iframe

2. **Modal Test**:
   - Click the second YouTube facade (right video) - should open in modal
   - Verify modal opens with video embed
   - Test modal close functionality (ESC key and close button)

3. **Dynamic Addition Test**:
   - Click "Add dynamically" button
   - Verify a new YouTube facade appears at bottom
   - Click the newly added facade to ensure it works

4. **Development Workflow Test**:
   - Start `npm run watch`
   - Make a small change to any file in `src/`
   - Verify automatic rebuild happens in 15ms
   - Refresh demo page and test functionality still works

### Code Quality Validation
- ALWAYS run `npm run lint-js` before committing - must pass without errors
- Linting covers ESLint rules including stylistic formatting
- No separate test suite exists - validation is manual via demo page

## Project Structure

### Key Directories and Files
```
├── src/                          # Source files
│   ├── facade.js                # Main facade functionality and initialization
│   ├── youtube-facade.js        # Browser window integration
│   ├── youtube-facade.scss      # Styles for facade and modal
│   ├── loader.js                # YouTube Iframe API loader
│   └── utils.js                 # Utility functions (mobile detection, etc.)
├── dist/                        # Built output files (generated)
│   ├── youtube-facade.js        # Built JavaScript bundle
│   ├── youtube-facade.css       # Built CSS bundle
│   └── *.map                    # Source maps
├── demo/                        # Demo and test page
│   ├── index.html              # Demo page showcasing functionality
│   └── add.js                  # Dynamic addition functionality
├── index.js                    # Main entry point for npm package
├── package.json                # Dependencies and scripts
└── eslint.config.mjs           # ESLint configuration
```

### Core Functionality
- **Facade System**: Transforms YouTube links into video embeds on click
- **Modal Support**: Optional modal playback via `data-youtube-modal` attribute
- **Performance**: Preconnects to YouTube domains for faster loading
- **Mobile Support**: Automatic muting for autoplay on mobile devices
- **Accessibility**: Keyboard navigation and screen reader support

## Common Commands Reference

### Frequently Used Commands
```bash
# Development setup (run once)
npm install                      # 35 seconds

# Build and development
npm run build                    # 1-2 seconds
npm run watch                    # Continuous building, 15ms rebuilds
npm run lint-js                  # <1 second

# Testing
python3 -m http.server 8080      # Start demo server
# Then visit: http://localhost:8080/demo/
```

### File Locations for Common Tasks
- **Main functionality**: Edit `src/facade.js`
- **Styling changes**: Edit `src/youtube-facade.scss`
- **API integration**: Edit `src/loader.js`
- **Utility functions**: Edit `src/utils.js`
- **Demo/testing**: Use `demo/index.html`

### Development Workflow
1. Run `npm install` (first time only)
2. Start `npm run watch` for automatic rebuilding
3. Start `python3 -m http.server 8080` for demo
4. Make changes to source files in `src/`
5. Test changes at `http://localhost:8080/demo/`
6. Run `npm run lint-js` before committing

## Package Information
- **Type**: Browser library for YouTube video facades
- **Main Export**: `youtubeFacade` function from `index.js`
- **License**: MIT
- **Dependencies**: ESLint, Parcel, Sass (dev dependencies only)
- **Usage**: Can be used as static files or imported via npm as git dependency

### Integration Options
1. **Static files**: Copy `dist/` folder and include CSS/JS in HTML
2. **npm package**: Install via `npm install git+https://github.com/mikeh74/youtube-facade.git#tag`
3. **Bundler**: Import with `import youtubeFacade from 'youtube-facade'`

## Common Output Reference

### Repository Root Contents
```
.git/
.gitignore
LICENSE
README.md
demo/
dist/
eslint.config.mjs
index.js
node_modules/
package-lock.json
package.json
src/
```

### Build Output Example
```
⠋ Building youtube-facade.js...
✨ Built in 799ms

dist/youtube-facade.js     6.29 kB    73ms
dist/youtube-facade.css    4.22 kB    53ms
```

### Watch Mode Output Example
```
✨ Built in 619ms          # Initial build
✨ Built in 14ms           # Incremental rebuild after file change
```