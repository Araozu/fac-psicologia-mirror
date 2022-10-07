import React from "react";
import {Editor} from "@/types/tinymce";

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
            <textarea id="tiny-editor" rows={10} />
        </div>
    );
}
