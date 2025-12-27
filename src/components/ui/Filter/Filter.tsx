import type { HTMLAttributes } from "react";

interface FilterProps extends HTMLAttributes<HTMLSelectElement> {
    options: { label: string, value: string }[];
}

export default function Filter(props: FilterProps) {
    const { options, ...restProps } = props;

    return (
        <select {...restProps}>
            {options && options?.length > 0 ? options.map((o) => (
                <option value={o?.value}>{o?.label}</option>
            )) : null}
        </select>
    )
}