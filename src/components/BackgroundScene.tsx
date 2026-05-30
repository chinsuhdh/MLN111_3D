import CosmicMindMap from './CosmicMindMap';

/**
 * The 3D philosophical universe — always sharp, always visible, always alive.
 * No blur. No dimming. The universe IS the experience.
 */
export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <CosmicMindMap />
    </div>
  );
}
