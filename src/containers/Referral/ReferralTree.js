import React, { useState, Suspense, useEffect } from 'react';
import Tree from "react-d3-tree";
import { URL } from "../../helpers/global";
import { useCenteredTree } from "./helpers";
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";
const containerStyles = {
  width: "100vw",
  height: "100vh"
};

  
// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <rect width="40" height="40" x="-15" fill="#feb101" onClick={toggleNode} />
    <text fill="#696969" strokeWidth="1" x="30">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="green" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

const ReferralTree=(props)=> {
  const [translate, containerRef] = useCenteredTree();
  const [isrander,setIsrander]=useState(true);
  const [members, setMembers] = useState([]);
  const getTreeData = (items) => {
    console.log("*&*&*&**&",items); 
    if (items && items.length > 0) {
      const data = [];
      const map = {};
      items.map((item) => {
        const id = item.memberId; 
        if (!map.hasOwnProperty(id)) {
          map[id] = {
            ...item,
            children: [],
          };
        }
      });
    //   select id, (case
    //     when parent_id is null then "Root"
    //     when id in (select parent_id from user_referral where parent_id is not null) then "Inner"
    //     else "Leaf"
    // end) as Type from user_referral as t1
      for (const id in map) {
        if (map.hasOwnProperty(id)) {
          let mappedElem = [];
          mappedElem = map[id];
          if ( mappedElem.parent_id && typeof map[mappedElem.parent_id] !=='undefined' && typeof map[mappedElem.parent_id] !=='null') {
            map[mappedElem.parent_id].children.push(mappedElem);
          } else {
            data.push(mappedElem);
          }
        }
      }
      return data;
    }
    return [];
  };
  const getReferralTeam = async () => {
    try{
    let data = JSON.stringify({
        "userId": props.id
    });
    let config ={
        method: 'post',
        // url: `https://api.tradekia.com/api/getUserNetwork`,
        url :  `${URL}getUserNetwork`,
        headers: {
            'x-access-token': `${props.token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios(config).then(function (response) {
                let res = response.data;
                let arr = res.data;
                console.log("4544",arr); 
                let ch=getTreeData(arr); 
                console.log("llll",ch); 
                if (members?.length === 0) {
                    for (let i = 0; i < ch?.length; i++) {
                        members.push(ch[i]);
                    }  
                }  
                setIsrander(false);      
        }).catch(err => console.log(err));
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
  useEffect(() => {
    getReferralTeam();
  },[isrander])
  return (
    <div style={containerStyles} ref={containerRef}>
   {(members && members?.length > 0)?
      <Tree
        data={members}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
      />:null}
    </div>
  );
}
const mapStateToProps = (state) => {
    return ({
        id: state.id,
        // loginUserId:state.userId,
        token: state.token,
    });
}
export default connect(mapStateToProps)(ReferralTree);