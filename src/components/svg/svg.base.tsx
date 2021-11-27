import { SvgBaseProps } from "./svg.base.props";

export const SvgBase: React.FC<SvgBaseProps> = ({ width, height, viewBox, children }) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={width || "32"}
            height={height || "32"}
            viewBox={viewBox || "0 0 32 32"}
        >
            {children}
        </svg >
    );

};