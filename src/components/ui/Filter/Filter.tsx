import { useContext, useRef, type HTMLAttributes } from "react";
import ThemeContext from "../../../contexts/ThemeContext";

interface FilterProps extends HTMLAttributes<HTMLDivElement> {
    options: { label: string, value: string }[];
    selectProps: HTMLAttributes<HTMLSelectElement>;
}

const Filter = (props: FilterProps) => {
    const { options, selectProps, ...restProps } = props;

    return (
        <div {...restProps}>
            <select {...selectProps}>
                {options && options?.length > 0 ? options.map((o) => (
                    <option value={o?.value}>{o?.label}</option>
                )) : null}
            </select>
            <i className="fa-solid fa-chevron-down" style={{ paddingInline: '1em' }}></i>
        </div>
    )
};

export default Filter;