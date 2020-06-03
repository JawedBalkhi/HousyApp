import React,{Component} from 'react';


class Typewonning extends Component{
    constructor(props){
        super(props);
            this.state ={
                items :[],
                isLoded: false,
            
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(json => {
        this.setState({
            isLoded: true,
            items :json,
        })
        });
    }
    render(){

        var{isLoded , items} =this.state;
        if (!isLoded){
            return <dic>Loading....</dic>
        }

        else {
        return(
            <div>
                    <ul>
                        {items.map(item=> (
                            <li key={item.id===1}>
                               Name : {item.address.geo.lng} | Email :{item.address.geo.lat}
                            </li>

                        ))};
                    </ul>
            </div>
        );
    }
}
}
export default Typewonning;