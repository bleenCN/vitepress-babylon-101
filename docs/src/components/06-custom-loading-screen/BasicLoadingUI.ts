import {
  AbstractMesh,
  Color3,
  DirectionalLight,
  Engine,
  FreeCamera,
  GizmoManager,
  GlowLayer,
  HemisphericLight,
  Light,
  LightGizmo,
  MeshBuilder,
  PointLight,
  Scene,
  SceneLoader,
  SpotLight,
  Vector3,
} from "@babylonjs/core";
import { Format } from "/utils/format";
import {
  LightType,
  LightColorConfig,
} from "components/05-lights-shadows/LightsScene";

export interface PointLightConfig {
  intensity?: number;
  diffuse?: string;
}
export class BasicLoadingUI {
  scene: Scene;
  engine: Engine;
  lightTubes: AbstractMesh[] = [];
  models: AbstractMesh[] = [];
  ball: AbstractMesh | undefined;
  light?: Light;
  gizmomanager?: GizmoManager;
  lightGizmo?: LightGizmo;

  constructor(canas: HTMLCanvasElement) {
    this.engine = new Engine(canas);
    this.scene = this.createScene();
    this.createEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  private createScene() {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camera", new Vector3(0, 1, -4), scene);
    camera.attachControl();
    camera.speed = 0.25;

    const glowLayer = new GlowLayer("glowlayer", scene);
    glowLayer.intensity = 0.75;

    return scene;
  }

  private async createEnvironment() {
    this.engine.displayLoadingUI();
    let meshes: AbstractMesh[] = [];
    try {
      const { meshes: mesh } = await SceneLoader.ImportMeshAsync(
        "",
        "/assets/models/",
        "lightingScene.glb"
      );

      this.models.concat(mesh);
    } catch (error) {
      console.log("加载模型出错", error);

      this.engine.hideLoadingUI();
    }

    const lightTubes = meshes.filter(
      (mesh) =>
        mesh.name === "lightTube_left" || mesh.name === "lightTube_right"
    );
    this.lightTubes.concat(lightTubes);

    const ball = MeshBuilder.CreateSphere(
      "ball",
      { diameter: 0.5 },
      this.scene
    );
    ball.position = new Vector3(0, 1, -1);

    this.createHemiLight();
    this.engine.hideLoadingUI();
  }

  setLightIntensity(intensity: number) {
    if (this.light) this.light.intensity = intensity;
  }

  private createHemiLight() {
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    this.light = hemiLight;

    this.createGizmos(this.light);
  }

  createGizmos(customLight: Light) {
    if (!this.lightGizmo) {
      this.lightGizmo = new LightGizmo();
      this.lightGizmo.scaleRatio = 2;
    }
    this.lightGizmo.light = customLight;

    this.gizmomanager = new GizmoManager(this.scene);
    this.gizmomanager.positionGizmoEnabled = true;
    this.gizmomanager.rotationGizmoEnabled = true;
    this.gizmomanager.usePointerToAttachGizmos = false;
    this.gizmomanager.attachToMesh(this.lightGizmo.attachedMesh);
  }
}
