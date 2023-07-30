<script setup>
import { useRouter } from "vitepress";

const router = useRouter();
const lang = navigator.language.substring(0, 2);

switch (lang) {
  case "zh":
    router.go("/zh/");
    break;
  default:
    router.go("/en/");
}
</script>
