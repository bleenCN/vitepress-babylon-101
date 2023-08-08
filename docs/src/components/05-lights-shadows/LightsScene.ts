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
import "@babylonjs/loaders";
import hexRgb from "hex-rgb";

export interface LightColorConfig {
  diffuse?: Color3 | string;
  specular?: Color3 | string;
  ground?: Color3 | string;
}

export type LightType =
  | "hemiLight"
  | "pointLight"
  | "directionalLight"
  | "spotLight";

export class LightsScene {
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
    const { meshes } = await SceneLoader.ImportMeshAsync(
      "",
      "/assets/models/",
      "lightingScene.glb"
    );

    this.models.concat(meshes);

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
  }

  createLight(type: LightType) {
    this.removeLight();

    switch (type) {
      case "hemiLight":
        this.createHemiLight();
        break;
      case "pointLight":
        this.createPointLight();
        break;
      case "directionalLight":
        this.createDirectionalLight();
        break;
      case "spotLight":
        this.createSpotLight();
        break;
    }
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

  private createPointLight() {
    const pointLight = new PointLight(
      "pointLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    this.light = pointLight;

    this.createGizmos(this.light);
  }

  private createDirectionalLight() {
    const pointLight = new DirectionalLight(
      "directionalLight",
      new Vector3(0, -1, 0),
      this.scene
    );
    this.light = pointLight;

    this.createGizmos(this.light);
  }

  private createSpotLight() {
    const pointLight = new SpotLight(
      "spotLight",
      new Vector3(0, 1, -3),
      new Vector3(0, 0, 1),
      Math.PI / 2,
      1,
      this.scene
    );
    this.light = pointLight;

    this.createGizmos(this.light);
  }

  setLightColors(config: LightColorConfig) {
    if (!this.light) return;
    console.log("set");

    if (!!config.diffuse) this.light.diffuse = this.formatColor(config.diffuse);
    if (!!config.specular)
      this.light.specular = this.formatColor(config.specular);

    if (!!config.ground && this.light instanceof HemisphericLight)
      this.light.groundColor = this.formatColor(config.ground);
  }

  formatColor(color: Color3 | string) {
    if (typeof color === "string") {
      const arr = hexRgb(color, { format: "array" });
      const rgb = arr.slice(0, 3).map((n) => n / 255);
      return new Color3(...rgb);
    } else return color;
  }

  private removeLight() {
    if (this.light) {
      this.light.dispose();
    }
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
