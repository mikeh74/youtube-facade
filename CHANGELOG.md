# Changelog

## [1.3.4] - 2025-08-28

### Added
- Separate modal close button functionality from styling using a data attribute.
- Custom modal template support via `customModalTemplate` option.
- Custom event `youtube-facade-active` dispatched when a facade is activated.

### Changed
- Switched color model in modal close SVG from HSL to RGB.
- Improved modal content structure with a dedicated inner container.
- Refined loading state handling: loading class is now removed when the player is ready or modal closes.
- Updated demo page to showcase new data-target and modal features.

### Fixed
- Ensured loading class is always removed when modal closes.
- Improved error handling for YouTube API loading and player creation.


## [1.3.0] - 2025-08-12

### Added
- Improved element targeting for output location
- Added no scroll to body when modal is active

### Changed
- Refactored facade initialization for better performance and maintainability.
- Updated build outputs and source maps for easier debugging.

### Fixed
- Resolved minor styling issues in modal and facade components.

---

## [1.2.0] - Previous release
- Initial modal support and basic facade functionality.
- Basic accessibility and mobile support.
