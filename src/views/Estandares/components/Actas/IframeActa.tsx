import React, {useEffect} from "react";

export function IframeActa(props: {html: string}) {
    const iframeRef = React.createRef<HTMLIFrameElement>();

    useEffect(
        () => {
            const html = props.html;

            const iframe = iframeRef.current;
            if (iframe === null) return;

            iframe.contentDocument?.write(html);
            const iFrameWindow = iframe.contentDocument;
            if (iFrameWindow === null || iFrameWindow.body === null) return;

            const height = iFrameWindow.body.scrollHeight;
            iframe.style.minHeight = `${height}px`;
        },
        [props.html],
    );

    return (
        <iframe style={{width: "100%"}} ref={iframeRef} />
    );
}
