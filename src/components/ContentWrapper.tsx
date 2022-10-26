/**
 * Este componente aplica padding y mueve sus hijos 6rem hacia arriba.
 * Usado junto con los Header.
 * @param props Los elementos hijos
 */
export default function ContentWrapper(props: {children?: JSX.Element | Array<JSX.Element>}) {
    return (
        <div className="relative px-4 -top-24">
            {props.children}
        </div>
    );
}
