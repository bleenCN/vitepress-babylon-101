import { ILoadingScreen } from "@babylonjs/core";
export class CustomLoadingScreen implements ILoadingScreen {
  loadingUIBackgroundColor: string;
  loadingUIText: string;

  constructor(
    private loadingbar: HTMLElement,
    private progress: HTMLElement,
    private loader: HTMLElement
  ) {}
  displayLoadingUI() {
    this.loadingbar.style.width = "0%";
  }
  hideLoadingUI() {
    this.loader.id = "loader";
  }
}
