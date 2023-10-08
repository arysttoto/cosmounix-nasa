'use client'
import "@google/model-viewer";
import React, { Suspense } from 'react';

function SaturnModel() {
  return (
    <> 
    <Suspense fallback={<div>Loading...</div>}>
      <div id="card"> 
        <model-viewer
          src="/saturn_model.glb"
          ios-src=""
          alt="A 3D model of Saturn"
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{ width: '300px', height: '300px' }}
        ></model-viewer> 
      </div>
    </Suspense>
    </>
  ); 
}
  
export default SaturnModel;