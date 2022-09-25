// import React, { useState } from "react";
// import "./searchbar.css"

// const Searchbar = (props) => {
//   const [search, setSearch] = useState("Mumbai");
//   const [state, setState] = useState("");
//   const [term, setTerm] = useState("");

//     const handleTermChange = (e) => {
//         setState({term: e.target.value});
//     }
//     // const search = () => {
//     //   props.onSearch(state.term)
//     // }

//   return (
//     <div>
//       <div className="container w-75 searchBar">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="City..."
//           aria-label="City..."
//           aria-describedby="button-addon2"
//           onChange={handleTermChange}
//         />
//         <div className="input-group-append">
//           <button
//             className="btn btn-outline-success"
//             type="button"
//             onKeyPress={search}
//           >
//             Search
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Searchbar;
