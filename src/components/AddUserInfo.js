import React, { useState } from "react";
// class AddUserInfo extends React.Component {
//     state = {
//         name: "qHiu",
//         address: "HCMC",
//         age: 22
//     }
//     handleOnchangeName = (event) => {
//         //event.target -> trả về tag chứa nó <=> <input/>
//         this.setState({ name: event.target.value })
//     }
//     handleOnchangeAge = (event) => {
//         //event.target -> trả về tag chứa nó <=> <input/>
//         this.setState({ age: event.target.value })
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault();//ngăn reload trang
//         let newUser = {
//             id: Math.floor(Math.random() * 100) + "-random",
//             name: this.state.name,
//             age: this.state.age
//         }
//         this.props.handleAddNewUser(newUser);
//     }

//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and I'm {this.state.age} years old

//                 <form onSubmit={(event) => handleOnSubmit(event)}>
//                     <label>Your name:</label>
//                     <input
//                         value={this.state.name}
//                         type="text"
//                         onChange={(event) => this.handleOnchangeName(event)}
//                     />
//                     <label>Your age:</label>
//                     <input
//                         value={this.state.age}
//                         type="text"
//                         onChange={(event) => this.handleOnchangeAge(event)}
//                     />
//                     <button >Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }
const AddUserInfo = (props) => {
    const handleAddNewUser = props.handleAddNewUser
    const [name, setName] = useState("qHiu");
    const [address, setAddress] = useState("HCMC");
    const [age, setAge] = useState(22)

    const handleOnchangeName = (event) => {
        setName(event.target.value)
    }
    const handleOnchangeAge = (event) => {
        setAge(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        let newUser = {
            id: Math.floor(Math.random() * 100) + "-random",
            name: name,
            age: age
        }
        handleAddNewUser(newUser)
    }
    return (
        <div>
            My name is {name} and I'm {age} years old

            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label>Your name:</label>
                <input
                    value={name}
                    type="text"
                    onChange={(event) => handleOnchangeName(event)}
                />
                <label>Your age:</label>
                <input
                    value={age}
                    type="text"
                    onChange={(event) => handleOnchangeAge(event)}
                />
                <button >Submit</button>
            </form>
        </div>
    );
}
export default AddUserInfo;