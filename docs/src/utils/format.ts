import { Color3 } from "@babylonjs/core";
import hexRgb from "hex-rgb";
type HexString = string;
export class Format {
  static getColor3(color: Color3 | HexString) {
    if (typeof color === "string") {
      const arr = hexRgb(color, { format: "array" });
      const rgb = arr.slice(0, 3).map((n) => n / 255);
      return new Color3(...rgb);
    } else return color;
  }
}
