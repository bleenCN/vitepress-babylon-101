import {
  AbstractMesh,
  Color3,
  Engine,
  FreeCamera,
  MeshBuilder,
  PointLight,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import { Format } from "/utils/format";

export interface PointLightConfig {
  intensity?: number;
  diffuse?: string;
}
export class BaseScene {
  engine: Engine;
  scene: Scene;
  models: AbstractMesh[] = [];
  lightTubes: AbstractMesh[] = [];
  pointLights: PointLight[] = [];
  ball!: AbstractMesh;

  constructor(calvas: HTMLCanvasElement) {
    this.engine = new Engine(calvas);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  private createScene() {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -4), scene);
    camera.attachControl();
    camera.speed = 0.2;

    return scene;
  }

  async initModels() {
    const ball = MeshBuilder.CreateSphere(
      "ball",
      { diameter: 0.5 },
      this.scene
    );
    ball.position = new Vector3(0, 1, -1);
    this.ball = ball;

    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/assets/models/lightingScene.glb"
    );
    this.models = meshes;

    const lightTubes = meshes.filter(
      (mesh) =>
        mesh.name === "lightTube_left" || mesh.name === "lightTube_right"
    );
    this.lightTubes = lightTubes;

    const pointLight = new PointLight(
      "pointLight_left",
      new Vector3(0, 0, 0),
      this.scene
    );
    pointLight.diffuse = new Color3(68 / 255, 227 / 255, 241 / 255);
    pointLight.intensity = 0.2;
    const pointLightClone = pointLight.clone("pointLight_left") as PointLight;
    pointLight.parent = lightTubes[0];
    pointLightClone.parent = lightTubes[1];
    this.pointLights.push(pointLight);
    this.pointLights.push(pointLightClone);
  }

  setPointLightProperties(params: PointLightConfig) {
    this.pointLights.forEach((light) => {
      if (params.diffuse) light.diffuse = Format.getColor3(params.diffuse);
      if (params.intensity) light.intensity = params.intensity;
    });
  }
}
