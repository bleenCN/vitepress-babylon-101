<script setup>
import { useRouter } from "vitepress";
import {onMounted} from 'vue'

const router = useRouter();
onMounted(() => {
const lang = navigator.language.substring(0, 2);
switch (lang) {
  case "zh":
    router.go("/zh/");
    break;
  default:
    router.go("/en/");
}
})


</script>
