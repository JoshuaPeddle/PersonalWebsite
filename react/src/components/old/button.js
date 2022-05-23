import react, {Component} from 'react';

class Button extends Component{
  
    sayHello(){
        alert("clicked!")
    }

    render(){
        return <button onClick={this.sayHello}> Click me!</button>
    }
}
export default Button