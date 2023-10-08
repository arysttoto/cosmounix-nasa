'use client'
import "@google/model-viewer";

function VenusModel() {
  return (
    <>
    <div id="card"> 
      <model-viewer
        src="/venus_model.glb"
        ios-src=""
        alt="A 3D model of Venus"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: '300px', height: '300px' }}
      ></model-viewer> 
    </div>
    </>
  ); 
}
  
export default VenusModel;