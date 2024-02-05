import React from 'react'
import { TreeSelect } from 'primereact/treeselect';

import "primereact/resources/themes/md-dark-indigo/theme.css";

import "./select-tree-group.css";

type Props = {
    nodes: any
    value: any
    onChange: (e: any) => void
}

const SelectTreeGroup: React.FC<Props> = (props: Props) => {
    return (
        <TreeSelect
            value={props.value}
            onChange={props.onChange}
            options={props.nodes}
            metaKeySelection={false}
            filter
            className='p-mr-15'
            selectionMode="multiple"
            placeholder="Selecione as categorias..." />
    )
}

export default SelectTreeGroup
