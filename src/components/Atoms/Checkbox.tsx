import React, { PureComponent } from 'react';

import CheckIcon from 'images/check.svg';

/**
 * The props for the Checkbox components.
 */
interface CheckboxProps {
  name: string;
  label?: string;
  onChange(name: string, checked: boolean): void;
}
/**
 * The state for the Checkbox components.
 */
interface CheckboxState {
  checked: boolean;
}

/**
 * The Default Checkbox component
 */
class Checkbox extends PureComponent<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);

    this.state = {
      checked: false
    };
  }

  /**
   * Handle Checkbox change
   */
  private onCheckboxChange = ({ target: { checked } }: { target: { checked: boolean}}): void => {
    this.setState({
      checked
    });

    this.props.onChange(this.props.name, checked);
  }

  /**
   * Renders the Checkbox component
   */
  public render(): JSX.Element {
    const { checked } = this.state;
    const { name, label } = this.props;

    return (
      <div className='the-checkbox'>
        <input
          type='checkbox'
          id={name}
          name={name}
          onChange={this.onCheckboxChange}
          className='the-checkbox__input'
          aria-checked='false'
          checked={checked}
        />
        <label
          htmlFor={name}
          className={`the-checkbox__label ${checked && 'filled'}`}
        >
          <span className='the-checkbox__check'>
            <CheckIcon />
          </span>

          {label}
        </label>
      </div>
    );
  }
}
export { Checkbox };
