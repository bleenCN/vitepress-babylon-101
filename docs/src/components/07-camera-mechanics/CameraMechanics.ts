import { Camera, Engine, Scene } from "@babylonjs/core";

export class CameraMechanics {
  engine: Engine;
  scene: Scene;
  // camera:Camera
  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  private CreateScene() {
    const scene = new Scene(this.engine);
    return scene;
  }
}
