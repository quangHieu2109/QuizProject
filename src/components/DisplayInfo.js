import React, { useEffect, useState } from "react";
import "./DisplayInfo.scss"
import logo from "../logo.svg"
// class DisplayInfo extends React.Component {
//     // constructor(props) {
//     //     console.log(">>> acll me constructor")
//     //     super(props);
//     //     this.state = {
//     //         isShowListUser: true
//     //     }
//     // }
//     // handleShowHide = () => {
//     //     this.setState({ isShowListUser: !this.state.isShowListUser })
//     // }
//     // componentDidMount() {
//     //     console.log(">>> call me conponent did mount")
//     // }
//     // componentDidUpdate(prevProps, prevState, snapshot) {
//     //     console.log(">>> call me component did update", this.props, prevProps)
//     //     if (this.props !== prevProps) {
//     //         if (this.props.listUser.length === 5) {
//     //             alert("You got 5 users")
//     //         }
//     //     }
//     // }
//     render() {
//         console.log(">>> call me render")
//         //props => viết tắt của properties
//         const { listUser } = this.props
//         const { name, age } = this.props

//         return (
//             <div className="display-info-container">
//                 {/* <img src={logo} /> */}
//                 {/* <div><span onClick={this.handleShowHide

//                 }>{this.state.isShowListUser ? "Hide" : "Show"} list user:</span></div> */}
//                 {true && <div>
//                     {listUser.map((user) => {
//                         //+"18" <=> 18 (string -> number)
//                         //css inline: sử dụng {} và truyền vào 1 object
//                         return (

//                             <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
//                                 {/* <div style={{ color: "yellow", paddingTop: "50px" }}>My name's {user.name}</div> */}
//                                 <div>My name's {user.name}</div>

//                                 <div>My age's {user.age}</div>
//                                 <button onClick={() => this.props.handleDeleteUser(user.id)}>Delete</button>
//                                 <hr />
//                             </div>

//                         )

//                     })
//                     }
//                 </div>}
//             </div>
//         );
//     }
// }
//function component tự truyền props vào
//stateless -> không có state
const DisplayInfo = (props) => {
    const { listUser } = props;
    const [isShowHideListUser, setShowHideListUser] = useState(true)
    const handleShowHideListUser = () => {
        // alert("click me")
        setShowHideListUser(!isShowHideListUser)
    }
    //Hàm useEffect chạy sau khi giao diện dc render
    //<=> componentDidMount
    useEffect(() => {
        setTimeout(() => {
            document.title = "Anh Mun";
        }, 3000)
        console.log(">>> call me useEffect")
    }, [listUser]);
    //Thêm [] vào useEffect giúp hàm này chỉ gọi 1 lần
    //render lại cũng k chạy lại
    //=> không gọi api nhiều lần 
    //thêm listUser vào [] thì khi listUser thay đổi -> useEffect đc gọi   
    //<=> componentDidUpdate
    console.log(">>> call me render")
    return (
        <div className="display-info-container">
            <div><span onClick={() => handleShowHideListUser()}>Show list user</span></div>
            {isShowHideListUser && <div>
                {listUser.map((user) => {
                    //+"18" <=> 18 (string -> number)
                    //css inline: sử dụng {} và truyền vào 1 object
                    return (

                        <div key={user.id} className={+user.age > 18 ? "red" : "green"}>
                            {/* <div style={{ color: "yellow", paddingTop: "50px" }}>My name's {user.name}</div> */}
                            <div>My name's {user.name}</div>

                            <div>My age's {user.age}</div>
                            <button onClick={() => props.handleDeleteUser(user.id)}>Delete</button>
                            <hr />
                        </div>

                    )

                })
                }
            </div>}
        </div>
    );

}
export default DisplayInfo;