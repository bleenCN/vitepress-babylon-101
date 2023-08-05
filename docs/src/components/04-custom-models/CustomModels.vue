<template>
  <canvas ref="canvasRef" class="canvas" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps<{ model: Model }>()
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvas = canvasRef.value;
  const babylonCtx = new CustomModel(canvas!);
  babylonCtx.loadModel(props.model)
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
  SceneLoader,
} from "@babylonjs/core";
import '@babylonjs/loaders'

interface Model {
  meshName: string,
  path: string,
  fileName: string
}

class CustomModel {
  scene: Scene;
  engine: Engine;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.createScene();
    this.createAsphalt()

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

  public async loadModel(model: Model) {
    const models = await SceneLoader.ImportMeshAsync(
      model.meshName,
      model.path,
      model.fileName,
      this.scene
    );

    models.meshes.forEach(mesh => mesh.position._y += 0.1)

    console.log('models:', models);
  }
}
</script>
<style scoped>
.canvas {
  width: 100%;
  height: auto;
}
</style>
