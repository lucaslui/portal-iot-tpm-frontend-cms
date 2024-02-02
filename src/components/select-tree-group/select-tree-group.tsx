import React from 'react'
import DropdownTreeSelect from 'react-dropdown-tree-select'

import Styles from './select-tree-group.module.scss'
import 'react-dropdown-tree-select/dist/styles.css'

type Props = any

class SelectTreeGroup extends React.Component<Props, { data: string }> {
  constructor (props) {
    super(props)
    this.state = { data: props.data }
  }

  UNSAFE_componentWillReceiveProps = (nextProps): void => {
    if (!(JSON.stringify(nextProps.data) === JSON.stringify(this.state.data))) {
      this.setState({ data: nextProps.data })
    }
  }

  shouldComponentUpdate = (nextProps): boolean => {
    return !(JSON.stringify(nextProps.data) === JSON.stringify(this.state.data))
  }

  render (): any {
    const { data, label, ...rest } = this.props
    return (
      <div className={`${Styles.selectTreeGroup}`}>
        <label> {label} </label>
        <DropdownTreeSelect
          data={this.state.data}
          {...rest}
          keepTreeOnSearch={true}
          keepChildrenOnSearch={true}
        />
      </div>
    )
  }
}

export default SelectTreeGroup
