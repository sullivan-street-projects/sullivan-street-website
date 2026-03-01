#!/usr/bin/env bash
set -euo pipefail

# Capture baseline screenshots for visual regression testing.
# Produces 9 sections × 3 viewports + 3 full-page = 30 images.

URL="${1:-http://localhost:5173}"
OUTDIR="screenshots/baselines"
SCRIPT="scripts/screenshot.js"

VIEWPORTS=(1440 768 375)

# Section selectors — Hero/Credentials use raw HTML ids,
# Intro/Approach/Services/PartnerOutcomes/About/Contact use Section component ids,
# Footer uses tag selector (only one <footer> on page).
SECTIONS=(
  "hero:#hero"
  "credentials:#credentials"
  "intro:#intro"
  "approach:#approach"
  "services:#services"
  "outcomes:#outcomes"
  "about:#about"
  "contact:#contact"
  "footer:footer"
)

# Hero and Contact contain TypewriterText — need longer settle for full text.
SETTLE_DEFAULT=1500
SETTLE_HERO=4000
SETTLE_CONTACT=4000

mkdir -p "$OUTDIR"

settle_for() {
  case "$1" in
    hero)    echo "$SETTLE_HERO" ;;
    contact) echo "$SETTLE_CONTACT" ;;
    *)       echo "$SETTLE_DEFAULT" ;;
  esac
}

echo "=== Baseline capture ==="
echo "URL: $URL"
echo "Output: $OUTDIR/"
echo ""

count=0

# Per-section captures (scroll-aware)
for entry in "${SECTIONS[@]}"; do
  name="${entry%%:*}"
  selector="${entry#*:}"

  for vp in "${VIEWPORTS[@]}"; do
    out="$OUTDIR/${name}-${vp}.png"
    settle=$(settle_for "$name")
    echo "  Capturing ${name} @ ${vp}px (settle ${settle}ms)..."
    node "$SCRIPT" "$URL" \
      --selector "$selector" \
      --settle "$settle" \
      -w "$vp" \
      -o "$out"
    count=$((count + 1))
  done
done

# Full-page captures (one per viewport)
for vp in "${VIEWPORTS[@]}"; do
  out="$OUTDIR/fullpage-${vp}.png"
  echo "  Capturing full page @ ${vp}px..."
  node "$SCRIPT" "$URL" \
    --full-page \
    -w "$vp" \
    -o "$out"
  count=$((count + 1))
done

echo ""
echo "=== Done: $count screenshots saved to $OUTDIR/ ==="
