//class component
//function conponent
import React, { useState } from "react";
import AddUserInfo from "./AddUserInfo";
import DisplayInfo from "./DisplayInfo";
// class MyComponent extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             listUser: [
//                 { id: 1, name: "qHiu", age: "22" },
//                 { id: 2, name: "aMun", age: "17" },
//                 { id: 3, name: "eBong", age: "16" }
//             ]
//         }
//     }
//     handleAddNewUser = (newUser) => {
//         this.setState({
//             listUser: [newUser, ...this.state.listUser]
//         })
//         console.log(">>> check data from parent ", newUser)
//     }
//     handleDeleteUser = (userId) => {
//         let listUserClone = [...this.state.listUser]
//         listUserClone = listUserClone.filter((user) => user.id !== userId)
//         this.setState({
//             listUser: listUserClone
//         })
//     }
//     //JSX
//     // <></> -> fragment dùng để làm thẻ cha cho component
//     render() {
//         const myAge = 22;
//         const firstUser = this.state.listUser[0];
//         //để hiển thị 1 object cần convert object sang string
//         return (
//             <>
//                 {/* {JSON.stringify(firstUser)} */}
//                 <AddUserInfo
//                     handleAddNewUser={this.handleAddNewUser}
//                 />
//                 <DisplayInfo listUser={this.state.listUser}
//                     handleDeleteUser={this.handleDeleteUser} />
//             </>
//         );
//     }
// }
const MyComponent = () => {
    const [listUser, setListUser] = useState([
        { id: 1, name: "qHiu", age: "22" },
        { id: 2, name: "aMun", age: "17" },
        { id: 3, name: "eBong", age: "16" }
    ])
    const handleAddNewUser = (newUser) => {
        setListUser([newUser, ...listUser])
        console.log(">>> check data from parent ", newUser)
    }
    const handleDeleteUser = (userId) => {
        let listUserClone = [...listUser]
        listUserClone = listUserClone.filter((user) => user.id !== userId)
        setListUser(listUserClone)
    }
    return (
        <>
            {/* {JSON.stringify(firstUser)} */}
            <AddUserInfo
                handleAddNewUser={handleAddNewUser}
            />
            <DisplayInfo listUser={listUser}
                handleDeleteUser={handleDeleteUser} />
        </>
    );
}

export default MyComponent;