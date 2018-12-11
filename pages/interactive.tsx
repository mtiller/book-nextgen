import { Injector } from "./types";

export const interactiveInjector: Injector = (node, children, index, def) => {
    if (node.type == "text") return null;
    const classes = node.attribs["class"];
    if (!classes) return null;
    const classList = classes.split(" ");
    if (classList.indexOf("interactive") == -1) return null;
    const src = node.attribs["src"];
    const id = src.slice(16, src.length - 4);
    return <Interactive key={index} id={id} content={def(node, children, index)} />;
};

const Interactive = (props: { id: string; content: JSX.Element }) => {
    return (
        <div>
            Interactive Figure for {props.id} goes here
            <div>{props.content}</div>
        </div>
    );
};
