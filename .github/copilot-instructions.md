# YouTube Facade

YouTube Facade is a lightweight, accessible YouTube embed solution written in JavaScript. It provides a simple way to embed YouTube videos with minimal JavaScript, optional modal playback, and improved performance. The project uses Parcel for bundling and includes a demo for testing functionality.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Dependencies
```bash
npm install
```
- Takes ~40 seconds on fresh install
- Installs 266+ packages including Parcel, ESLint, and Sass
- May show 2 low severity vulnerabilities (known, related to ESLint plugin-kit)

### Build Commands
```bash
npm run build
```
- **NEVER CANCEL** - Build completes in ~1.2 seconds. Set timeout to 30+ seconds for safety.
- Uses Parcel to bundle `src/youtube-facade.js` and `src/youtube-facade.scss`
- Outputs to `dist/` directory: `youtube-facade.js`, `youtube-facade.css`, and source maps
- Always run this after making changes to source files

```bash
npm run watch
```
- **NEVER CANCEL** - Starts Parcel watch mode for development. Set timeout to 60+ minutes.
- Automatically rebuilds when source files change
- Run in background during development: `npm run watch &`
- Kill with `pkill -f "parcel watch"` when done

### Code Quality
```bash
npm run lint-js
```
- Takes ~0.8 seconds. Set timeout to 30+ seconds.
- Runs ESLint with auto-fix on `index.js` and `src/**/*.js`
- **ALWAYS run before committing** - no CI/CD exists but linting prevents common errors
- Uses flat config in `eslint.config.mjs`

## Manual Validation

**CRITICAL**: This project has NO automated tests. Manual validation is REQUIRED after every change.

### Start Demo Server
```bash
# From repository root (NOT from demo/ directory)
python3 -m http.server 8080
```
- **NEVER CANCEL** - Keeps server running. Set timeout to 60+ minutes.
- Access demo at: `http://localhost:8080/demo/`
- Must serve from root directory for correct asset paths

### Required Validation Scenarios

**ALWAYS test ALL scenarios after making changes:**

1. **Basic YouTube Embed**:
   - Click first YouTube link (no modal)
   - Verify iframe replaces the link element
   - Expected: YouTube embed loads inline

2. **Modal YouTube Embed**:
   - Click second YouTube link (has `data-youtube-modal`)
   - Verify modal overlay appears with YouTube embed
   - Test close button (X icon)
   - Test ESC key to close modal
   - Expected: Modal opens/closes correctly

3. **Dynamic Content**:
   - Click "Add dynamically" button
   - Verify new YouTube link appears
   - Click the new link to test modal functionality
   - Expected: Event delegation works for dynamically added content

4. **Keyboard Accessibility**:
   - Tab through all interactive elements
   - Use ENTER key to activate links
   - Use ESC key to close modals
   - Expected: All functionality accessible via keyboard

### Common Validation Issues
- **Images not loading**: YouTube thumbnails blocked by browser - NORMAL in dev environment
- **"This page has been blocked by Chrome"**: Expected for iframes in testing environment
- **404 errors for CSS/JS**: Ensure serving from repository root, not demo/ directory

## Project Structure

### Source Files (`src/`)
- `facade.js` - Main YouTube facade implementation and modal logic
- `youtube-facade.js` - Browser global version (exports to `window.youtubeFacade`)
- `utils.js` - Utility functions (video ID extraction, mobile detection, event delegation)
- `loader.js` - YouTube Iframe API loader with error handling
- `youtube-facade.scss` - Styles for facade elements and modal

### Key Entry Points
- `index.js` - Main module export for npm package usage
- `dist/youtube-facade.js` - Built browser-ready JavaScript
- `dist/youtube-facade.css` - Built CSS styles

### Demo Files
- `demo/index.html` - Interactive demo page
- `demo/add.js` - Dynamic content addition example

## API Usage

### Basic Implementation
```javascript
import youtubeFacade from 'youtube-facade';
youtubeFacade(); // Initialize with defaults
```

### Configuration Options
```javascript
youtubeFacade({
  selector: '.youtube-facade',    // CSS selector (default)
  muteForAutoplay: true          // Mute on mobile (default)
});
```

### HTML Structure
```html
<a href="https://www.youtube.com/watch?v=VIDEO_ID"
   class="youtube-facade"
   data-youtube-modal          <!-- Optional: opens in modal -->
   target="_blank" rel="noopener noreferrer">
  <img src="https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg"
       class="youtube-facade-img" alt="Click to play video">
  <div class="youtube-facade-playbtn"></div>
</a>
```

## Development Workflow

### Making Changes
1. **Start watch mode**: `npm run watch &`
2. **Start demo server**: `python3 -m http.server 8080`
3. **Make code changes** in `src/` files
4. **Test in browser** at `http://localhost:8080/demo/`
5. **Run validation scenarios** (all 4 scenarios above)
6. **Lint before commit**: `npm run lint-js`

### Testing Device-Specific Behavior
- **Mobile detection**: Resize browser to < 600px width
- **API vs iframe**: Different behavior on Apple devices vs others
- **Autoplay muting**: Test `muteForAutoplay` option on mobile

### Common Development Tasks
- **Add new utility function**: Edit `src/utils.js`, export function, import in `src/facade.js`
- **Style changes**: Edit `src/youtube-facade.scss`, check both inline and modal rendering
- **API changes**: Update both `src/facade.js` and demo usage
- **Always check event delegation** still works for dynamic content

## Troubleshooting

### Build Issues
- **"Command not found"**: Run `npm install` first
- **Build fails**: Check syntax in source files, run `npm run lint-js`
- **Old build artifacts**: Delete `dist/` and `.parcel-cache/`, then rebuild

### Demo Issues
- **404 for assets**: Serve from repository root, not demo/ directory
- **JavaScript errors**: Check browser console, verify build completed successfully
- **Modal not working**: Verify `data-youtube-modal` attribute present

### Performance
- **Slow builds**: Parcel is optimized, 1-2 seconds is normal
- **Large bundle**: Check if new dependencies were added unintentionally
- **Memory usage**: Watch mode can accumulate memory over time

## Common File Locations

### Repository Root
```
├── README.md              # User documentation
├── package.json           # npm scripts and dependencies
├── index.js              # Main module entry point
├── eslint.config.mjs     # ESLint flat configuration
├── src/                  # Source files (edit these)
├── dist/                 # Built files (generated)
└── demo/                 # Demo and testing
```

### Frequently Accessed Files
- **Main logic**: `src/facade.js`
- **Styles**: `src/youtube-facade.scss`
- **Testing page**: `demo/index.html`
- **Build config**: Check `package.json` targets property

Always build, test all validation scenarios, and lint before committing changes.