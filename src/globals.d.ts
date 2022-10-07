import "@testing-library/jest-dom/extend-expect";
import {EditorManager} from "@/types/tinymce";

declare global {
    declare const tinymce: EditorManager;
}
