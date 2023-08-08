import {
  GizmoManager,
  LightGizmo,
  ShadowGenerator,
  SpotLight,
  Vector3,
} from "@babylonjs/core";
import { BaseScene } from "./BaseScene";

export class Shadow extends BaseScene {
  spotLight: SpotLight | undefined;
  lightGizmo: LightGizmo | undefined;
  gizmoManager: GizmoManager | undefined;
  shadowGen: ShadowGenerator | undefined;

  createLight() {
    const spotLight = new SpotLight(
      "spotLight",
      new Vector3(0, 1, -4),
      new Vector3(0, 0, 1),
      Math.PI / 2,
      1,
      this.scene
    );
    spotLight.shadowEnabled = true;
    this.spotLight = spotLight;
  }

  setLightproperties(properties: {
    intensity?: number;
    angle?: number;
    exponent?: number;
  }) {
    if (!this.spotLight) return;
    if (properties.intensity) this.spotLight.intensity = properties.intensity;
    if (properties.angle) this.spotLight.angle = properties.angle;
    if (properties.exponent) this.spotLight.exponent = properties.exponent;
  }

  createShadow() {
    const shadowGen = new ShadowGenerator(1024, this.spotLight!);
    shadowGen.addShadowCaster(this.ball);
    this.models.forEach((mesh) => (mesh.receiveShadows = true));
    this.shadowGen = shadowGen;
  }

  setShadowProperties(properties: { mapSize?: number }) {
    if (!this.shadowGen) return;
    if (properties.mapSize) this.shadowGen.mapSize = properties.mapSize;
  }

  createGizmo(spotLight: SpotLight) {
    if (!this.lightGizmo) {
      const lightGizmo = new LightGizmo();
      lightGizmo.scaleRatio = 2;
      this.lightGizmo = lightGizmo;
    }
    this.lightGizmo.light = spotLight;

    if (!this.gizmoManager) {
      const gizmoManager = new GizmoManager(this.scene);
      gizmoManager.scaleGizmoEnabled = true;
      gizmoManager.rotationGizmoEnabled = true;
      gizmoManager.usePointerToAttachGizmos = false;
      this.gizmoManager = gizmoManager;
    }
    this.gizmoManager.attachToMesh(this.lightGizmo.attachedMesh);
  }
}
