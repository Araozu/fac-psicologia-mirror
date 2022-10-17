import React from "react";
import {Editor} from "@/types/tinymce";
import HeaderEstandar8 from "@/views/Estandares/Estandar8/Headers/HeaderEstandar8";

export default function() {
    const tinyEditorRef = React.useRef<Editor>();

    React.useEffect(
        () => {
            tinymce.init({
                selector: "#tiny-editor",
                plugins: "anchor link image lists table",
                language: "es_MX",
                toolbar: "undo redo | fontfamily fontsize | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent removeformat",
            })
                .then((editors) => {
                    tinyEditorRef.current = editors[0];
                });
        },
        [],
    );

    return (
        <div>
            <HeaderEstandar8 titulo="Narrativa Estandar 8" descripcion="Editar una narrativa del Estandar 8" />
            <div className="relative px-4" style={{top: "-6rem"}}>
                <textarea id="tiny-editor" rows={10} />
            </div>
        </div>
    );
}
