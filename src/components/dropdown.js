import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
class Dropdown extends Component {  
  static propTypes = {
    list:PropTypes.instanceOf(Array)
    
  };
  
  static defaultProps = {
    list: []
  };
  
  constructor(props) {
    super(props);    
    this.state = {
      isOpen: false,
      labelItem: this.props.list[0],
      typeDropdown: null
    };
  }

  componentWillMount() {

    const { label } = this.props;
    console.log(JSON.stringify(this.props.list));
    // const { label } = this.props.list[0];
    let firstItem = null;    
    if (typeof label != 'undefined') {
      this.checkType(false);
      firstItem = label;
    } else {
      this.checkType(true);
      firstItem = this.props.list[0];
    }        
    this.setState({
        labelItem: firstItem
    }); 
  }
  
  checkType = (value) => {
    this.setState({
        typeDropdown: value
    });    
  };
  showDropdown = () => {
    this.setState({ isOpen: true });
    document.addEventListener("click", this.hideDropdown);
  };
  hideDropdown = () => {
    this.setState({ isOpen: false });
    document.removeEventListener("click", this.hideDropdown);
  };

   
  chooseItem = (value) => {  
    if (this.state.labelItem !== value) {
      this.setState({
        labelItem: value      
      })
    }    
    this.props.callbackFromParent(value); 
  };
  
  renderDataDropDown = (item, index) => {    
    const {value, label} = this.state.typeDropdown ? {value: index, label: item} : item;    
    return (
      <li
        key={index}
        value={value}
        onClick={() => this.chooseItem(label)}
      >
        <a>{label}</a>
      </li> 
    )
  };
  render () {
    const { list } = this.props;    
    return (
      <div className={`dropdown ${this.state.isOpen ? 'open' : ''}`}>
        <button className="dropdown-toggle" type="button" onClick={this.showDropdown}>
         {this.state.labelItem}
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {list.map(this.renderDataDropDown)}
        </ul>
    </div>
   
    )
  }
}
export default Dropdown;