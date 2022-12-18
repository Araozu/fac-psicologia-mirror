import React, {useEffect} from "react";

export function IframeActa(props: {html: string}) {
    const iframeRef = React.createRef<HTMLDivElement>();

    useEffect(
        () => {
            const html = props.html;

            const iframeContainer = iframeRef.current;
            if (iframeContainer === null) return;

            const oldIframe = iframeContainer.firstChild;
            if (oldIframe) {
                iframeContainer.removeChild(oldIframe);
            }

            const iframe = document.createElement("iframe");
            iframe.style.width = "100%";
            iframeContainer.appendChild(iframe);

            iframe.contentDocument?.write(html);
            const iFrameWindow = iframe.contentDocument;
            if (iFrameWindow === null || iFrameWindow.body === null) return;

            const height = iFrameWindow.body.scrollHeight;
            iframe.style.minHeight = `${height}px`;
        },
        [props.html],
    );

    return (
        <div ref={iframeRef}>
            <iframe style={{width: "100%"}} />
        </div>
    );
}
