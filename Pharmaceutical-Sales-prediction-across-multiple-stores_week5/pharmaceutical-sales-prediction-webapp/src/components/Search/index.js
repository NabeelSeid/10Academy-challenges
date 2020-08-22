import React, { Component } from "react";

class Search extends Component {
  componentDidMount() {
    if (this.input) this.input.focus();
  }

  setTextInputRef = (node) => (this.input = node);

  render() {
    const {
      searchTerm,
      onChange,
      onSubmit,
      children,
      placeholder,
    } = this.props;

    return (
      <form
        onSubmit={onSubmit}
        style={{ display: "inline-block", paddingRight: 50 }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={onChange}
          ref={this.setTextInputRef}
          placeholder={placeholder}
          required="required"
        />
        <button type="submit">{children}</button>
      </form>
    );
  }
}

export default Search;
