<template>
  <canvas ref="canvasRef" class="canvas" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvas = canvasRef.value;
  new PBR(canvas!);
});
</script>

<script lang="ts">
import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  MeshBuilder,
  Texture,
  PBRMaterial,
  CubeTexture,
  Color3,
  GlowLayer,
} from "@babylonjs/core";

class PBR {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.createAsphalt()
    this.createMagicBall()

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  private createScene(): Scene {
    const scene = new Scene(this.engine);

    const envTex = CubeTexture.CreateFromPrefilteredData(
      "/assets/textures/03-PBR/environment/sky.env",
      scene
    );
    scene.createDefaultSkybox(envTex, true)


    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), scene);
    camera.attachControl();
    camera.speed = 0.1;

    const glowLayer = new GlowLayer('glowLayer', scene)
    glowLayer.intensity = 0.5

    return scene;
  }

  private createAsphalt() {
    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 10,
        height: 10,
      },
      this.scene
    );
    ground.material = this.createAsphaltPBR();
  }

  private createAsphaltPBR(): PBRMaterial {
    const pbr = new PBRMaterial('asphalt', this.scene)
    const uvScale = 2

    const texArr: Texture[] = []

    const diffTex = new Texture('/assets/textures/03-PBR/asphalt/asphalt_diffuse.jpg', this.scene)
    pbr.albedoTexture = diffTex
    texArr.push(diffTex)

    const normalTex = new Texture('/assets/textures/03-PBR/asphalt/asphalt_normal.jpg', this.scene)
    pbr.bumpTexture = normalTex
    texArr.push(normalTex)

    const metallicTex = new Texture('/assets/textures/03-PBR/asphalt/asphalt_ao_rough_metal.jpg', this.scene)
    pbr.metallicTexture = metallicTex
    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true
    texArr.push(metallicTex)


    texArr.forEach(tex => { tex.vScale = uvScale })
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true
    return pbr
  }

  private createMagicBall() {
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    ball.material = this.createMagicBallPBR()
  }

  private createMagicBallPBR(): PBRMaterial {
    const pbr = new PBRMaterial('ball', this.scene)
    const uvScale = 2

    const texArr: Texture[] = []

    const diffTex = new Texture('/assets/textures/03-PBR/magic-ball/magic_ball_diffuse.jpg', this.scene)
    pbr.albedoTexture = diffTex
    texArr.push(diffTex)

    const normalTex = new Texture('/assets/textures/03-PBR/magic-ball/magic_ball_normal.jpg', this.scene)
    pbr.bumpTexture = normalTex
    texArr.push(normalTex)

    const metallicTex = new Texture('/assets/textures/03-PBR/magic-ball/magic_ball_ao_rough_metal.jpg', this.scene)
    pbr.metallicTexture = metallicTex
    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true
    texArr.push(metallicTex)

    const emissiveTex = new Texture('/assets/textures/03-PBR/magic-ball/magic_ball_emissive.jpg', this.scene)
    pbr.emissiveTexture = emissiveTex
    pbr.emissiveColor = new Color3(1, 1, 1)
    texArr.push(emissiveTex)

    texArr.forEach(tex => { tex.vScale = uvScale })
    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true


    texArr.forEach(tex => { tex.vScale = uvScale; tex.uScale = uvScale })

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
