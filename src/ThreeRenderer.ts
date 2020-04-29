import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
} from "three";

import { GUI } from "dat.gui";

interface GUIParams
{
    label: string
}

export class ThreeRenderer {
    constructor() {
        this.renderer_ = new WebGLRenderer();
        this.renderer_.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer_.domElement);

        const aspect = window.innerWidth / window.innerHeight;
        this.scene_ = new Scene();
        this.camera_ = new PerspectiveCamera(45, aspect, 1, 1000);
        this.camera_.position.set(5, 5, 5);
        this.camera_.lookAt(0, 0, 0);

        var geometry = new BoxGeometry();
        var material = new MeshBasicMaterial({ color: 0x00ff00 });
        let cube = new Mesh(geometry, material);
        cube.matrixAutoUpdate = false;
        cube.matrix.setPosition(0.5, 0.5, 0);
        this.scene_.add(cube);

        this.guiParams_ = {label:"Hello world!"};
        var gui = new GUI();
        gui.add(this.guiParams_, "label");
        gui.open();

        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        window.addEventListener('resize', this.onWindowResize, false);
        this.animate();
    }

    private animate() {
        requestAnimationFrame(this.animate);
        this.renderer_.render(this.scene_, this.camera_);
    }

    private onWindowResize() {
        this.camera_.aspect = window.innerWidth / window.innerHeight;
        this.camera_.updateProjectionMatrix();

        this.renderer_.setSize(window.innerWidth, window.innerHeight);
    }

    //#region Private variables

    private renderer_: WebGLRenderer;
    private scene_: Scene;
    private camera_: PerspectiveCamera;
    private guiParams_: GUIParams;

    //#endregion
}
