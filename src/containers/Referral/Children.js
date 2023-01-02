import React, { useEffect, useState } from 'react';
import { URL } from "../../helpers/global";
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import "./SCSS/Referral.css";

const Children = (props) => {
    const [members, setMembers] = useState([]);


        // const member = [
        //     {
        //         "memberId": 1,
        //         "parent_id": null,
        //         "name": "Me",
        //         "tree": null
        //     },
        //     {
        //         "memberId": 2,
        //         "name": "Hritik",
        //         "parent_id": 1,
        //         "tree": "1,2"
        //     },


        //     {
        //         "memberId": 8,
        //         "name": "Suresh",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 9,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 10,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 11,
        //         "name": "rohan",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 18,
        //         "name": "Suresh",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 19,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 100,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 110,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 120,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 101,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 102,
        //         "name": "rohan",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 180,
        //         "name": "Suresh",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 190,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 1000,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 115,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },
        //     {
        //         "memberId": 127,
        //         "name": "Rishav",
        //         "parent_id": 1,
        //         "tree": "1,3"
        //     },

        //     {
        //         "memberId": 4,
        //         "name": "sahan",
        //         "parent_id": 2,
        //         "tree": "1,2,4"
        //     },
        //     {
        //         "memberId": 5,
        //         "name": "nick",
        //         "parent_id": 4,
        //         "tree": "1,2,4,5"
        //     },
        //     {
        //         "memberId": 6,
        //         "name": "umesh",
        //         "parent_id": 1,
        //         "tree": "1,2,4,5,6"
        //     },
        //     {
        //         "memberId": 7,
        //         "name": "ankit",
        //         "parent_id": 3,
        //         "tree": "1,3,7"
        //     }
        // ];
    // console.log(member);
    // const [members, setMembers] = useState({});
    // let members = [{}];


    useEffect(() => {
        const getReferralTeam = async () => {
            try{
            let data = JSON.stringify({
                "userId": props.id
            });
            let config ={
                method: 'post',
                url: `${URL}getUserNetwork`,
                headers: {
                    'x-access-token': `${props.token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            await axios(config)
                .then(function (response) {
                        let res = response.data;
                        let arr = res.data;
                        // console.log("15445",arr.length); 
                        if (members?.length === 0) {
                            for (let i = 0; i < arr?.length; i++) {
                                members.push(arr[i]);
                            } 
                        }       
                }).catch(err => console.log(err))
            }catch(error) {
                    toast.error(error.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                };
        };

        getReferralTeam();

        console.log("1223234",members);

        // setTimeout(() => {
            // (function heya(parent_id) {
            //     // This is slow and iterates over each object everytime.
            //     // Removing each item from the array before re-iterating 
            //     // may be faster for large datasets.
                // members.map((object, i) => {
                //     {console.log("98898",object)}
                //     let member = object;
                //     let parent;
                //     if(parent_id!==null){
                //         if (object.parent_id === parent_id) {
                //             parent = parent_id ? $("#containerFor" + parent_id) : $("#mainContainer");
                //             let memberId = member.memberId;
                //             parent.append("<div class='referralContainer cssContainer" + i + "' id='containerFor" + memberId + "'><div class='member'>" + member.name.charAt(0).toUpperCase() + member.name.slice(1) + "</div></div>");
                //             heya(memberId)
                //         }
                //     }
                   
    
                // })
    
            //     // for(let i=0; i<members.length; i++){
            //     //     for(let j =0; j<members.length; j++){
            //     //         if(members[i].id !== members[j].parent_id){
            //     //             $(".member").css("display","none")
            //     //         }
            //     //     }
            //     // }
    
            // }(null))
        // }, 3000);
        // makes it pretty:
        // recursivley resizes all children to fit within the parent.
        let pretty = function () {
            let self = $(this),
                children = self.children(".referralContainer"),
                // subtract 4% for margin/padding/borders.
                width = (100 / children.length) - 2

            children
                .css("width", width + "%")
                .each(pretty);

            // console.log(children);

        };

        $("#mainContainer").each(pretty);

    
    }, [props.id, props.token]);

    

    return (
        <>

            <div id="container">
                <div id="thumbs" className='scroll_box'>
                    <div id="mainContainer" className="clearfix">
                        {
                        members.map((object, i) => {
                            {console.log("98898",object)}
                            let member = object;
                            let parent;
                            if(props.id!==null){
                                if (object.parent_id === props.id) {
                                    parent = props.id ? $("#containerFor" + props.id) : $("#mainContainer");
                                    let memberId = member.memberId;
                                    parent.append("<div class='referralContainer cssContainer" + i + "' id='containerFor" + memberId + "'><div class='member'>" + member.name.charAt(0).toUpperCase() + member.name.slice(1) + "</div></div>");
                                    // heya(memberId)
                                }
                            }
                        

                        })
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

const mapStateToProps = (state) => {
    return ({
        id: state.id,
        token: state.token,
    });
}

export default connect(mapStateToProps)(Children);