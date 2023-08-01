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
    ground.material = this.createGroundMaterial(scene);

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, scene);
    ball.material = this.createBallMaterial(scene);
    ball.position = new Vector3(0, 1, 0);

    return scene;
  }

  createGroundMaterial(scene: Scene): StandardMaterial {
    const groundMat = new StandardMaterial("groundMat", scene);
    const uvScale = 5;
    const textArr: Texture[] = [];

    const diffTex = new Texture(
      "/assets/textures/02-standard/stone/stone_diffuse.jpg",
      scene
    );
    groundMat.diffuseTexture = diffTex;
    textArr.push(diffTex);

    const aoTex = new Texture("/assets/textures/02-standard/stone/stone_ao.jpg", scene);
    groundMat.ambientTexture = aoTex;
    textArr.push(aoTex);

    const normalTex = new Texture(
      "/assets/textures/02-standard/stone/stone_normal.jpg",
      scene
    );
    groundMat.bumpTexture = normalTex;
    groundMat.invertNormalMapX = true;
    groundMat.invertNormalMapY = true;
    textArr.push(normalTex);

    const specTex = new Texture("/assets/textures/02-standard/stone/stone_spec.jpg", scene);
    groundMat.specularTexture = specTex;
    textArr.push(specTex);

    textArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return groundMat;
  }

  createBallMaterial(scene: Scene): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", scene);

    const uvScale = 4;
    const textArr: Texture[] = [];

    const diffTex = new Texture("/assets/textures/02-standard/metal/metal_diffuse.jpg");
    ballMat.diffuseTexture = diffTex;
    textArr.push(diffTex);

    const aoTex = new Texture("/assets/textures/02-standard/metal/metal_ao.jpg");
    ballMat.ambientTexture = aoTex;
    textArr.push(aoTex);

    const normalTex = new Texture("/assets/textures/02-standard/metal/metal_normal.jpg");
    ballMat.bumpTexture = normalTex;
    ballMat.invertNormalMapX = true;
    ballMat.invertNormalMapY = true;
    textArr.push(normalTex);

    const specTex = new Texture("/assets/textures/02-standard/metal/metal_spec.jpg");
    ballMat.specularTexture = specTex;
    textArr.push(specTex);

    textArr.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    return ballMat;
  }
}
</script>
<style scoped>
.canvas {
  width: 100%;
  height: auto;
}
</style>
