<template>
  <canvas ref="canvasRef" class="canvas" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const canvasRef = ref(null);

onMounted(() => {
  const canvas = canvasRef.value;

  new StandardScene(canvas);
});
</script>

<script lang="ts">
import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
PBRMaterial,
CubeTexture,
} from "@babylonjs/core";

class StandardScene {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(): Scene {
    const scene = new Scene(this.engine);
    
    const envTex = CubeTexture.CreateFromPrefilteredData(
      "/assets/textures/03-PBR/environment/sky.env",
      scene
    );
    scene.createDefaultSkybox(envTex,true)


    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), scene);
    camera.attachControl();
    camera.speed = 0.1;

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 5, 0),
      scene
    );
    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 10,
        height: 10,
      },
      scene
    );
    ground.material = this.createAsphalt(scene);

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, scene);
    ball.position = new Vector3(0, 1, 0);

    return scene;
  }


  createAsphalt(scene:Scene):PBRMaterial{
    const pbr = new PBRMaterial('asphalt',scene)
    const uvScale = 2

    const texArr:Texture[] = [] 

    const diffTex = new Texture('/assets/textures/03-PBR/asphalt/asphalt_diffuse.jpg',scene)
    pbr.albedoTexture  = diffTex
    texArr.push(diffTex)

    const normalTex = new Texture('/assets/textures/03-PBR/asphalt/asphalt_normal.jpg',scene)
    pbr.bumpTexture = normalTex
    texArr.push(normalTex)

    const metallicTex = new Texture('/assets/textures/03-PBR/asphalt/asphalt_ao_rough_metal.jpg',scene)
    pbr.metallicTexture = metallicTex
    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true
    texArr.push(metallicTex)


    texArr.forEach(tex => {tex.uScale = uvScale; tex.vScale = uvScale})
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true
    return pbr
  }

}
</script>
<style scoped>
.canvas {
  width: 100%;
  height: auto;
}
</style>
