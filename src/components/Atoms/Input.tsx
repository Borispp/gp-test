import React, { PureComponent } from 'react';

/**
 * The props for the Input components.
 */
interface InputProps {
  name: string;
  label?: string;
  error?: string;
  onChange(name: string, value: string): void;
}
/**
 * The state for the Input components.
 */
interface InputState {
  value: string;
}

/**
 * The Default Input component
 */
class Input extends PureComponent<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    this.state = {
      value: ''
    };
  }
  /**
   * Renders the Input component
   */
  public render(): JSX.Element {
    const { value } = this.state;
    const { name, label, error } = this.props;

    return (
      <div className='the-input'>
        <input
          type='text'
          id={name}
          name={name}
          onChange={this.onInputChange}
          className={`the-input__input ${error ? 'error' : ''}`}
        />
        <label
          htmlFor={name}
          className={`the-input__label ${value && 'filled'}`}
        >

          {label}
        </label>
        {error && <span className='the-input__error'>{error}</span>}
      </div>
    );
  }

  /**
   * Handle Input change
   */
  private onInputChange = ({ target: { value } }: { target: { value: string}}): void => {
    this.setState({
      value
    });

    this.props.onChange(this.props.name, value);
  }

}
export { Input };
