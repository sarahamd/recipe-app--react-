import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
// import { getrecpie } from "../redux/slice/Getdetails";

const Details = () => {
  const state = useSelector((st) => st.getrecpie.getrecpie);
  console.log("state",state.idMeal) /// correct   {}
  const [recipe, setRecipe] = useState([]);

  // Function to toggle full text display
  const [showFullText, setShowFullText] = useState(false);
  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };

  // Function to handle checkbox change
  const [isChecked, setIsChecked] = useState({});

  const handleCheckboxChange = (key) => (event) => {
    setIsChecked((prev) => ({
      ...prev,
      [key]: event.target.checked,
    }));
  };

  useEffect(() => {
 const response=axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state.idMeal}`).then((response)=>{
  setRecipe(response.data.meals)
 }).catch((err)=>{
console.log(err)
 })

  }, [state]);

  
  console.log("Details page rendered");
  console.log(recipe);

  return (
  
    <div> 
      <Navbar></Navbar> 
      {recipe && recipe.map((u, index) => (
        <div key={index} className="p-3 m-5 ">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className=" mb-0 text-success fs-1 fw-bold ">        
                    {/* <img src="../images/cook.PNG" style={{borderRadius:'40px', width:'70px'}} alt={u.strMeal}></img> */}
                    {u.strMeal}
                  </h2>
                  <i
                    className="bi bi-bookmark-fill"
                    style={{ color: "#198754", fontSize: "25px" }}
                  ></i>
                </div>
                {/* <hr></hr> */}
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-lg-7 col-md-6 col-sm-12 ">
                <img
                  src={u.strMealThumb}
                  alt="recipe"
                  style={{ width: "75%" }}
                />
                
                <div className="mt-3" style={{ background: "#efefef", width: "75%" }}>
        <p className="m-2 p-4 fs-3" style={{ display: "inline-block" }}>
          <h2 className="text-success fs-2 fw-bold"> <i className="fa-solid fa-kitchen-set px-3" ></i>
          Instructions:</h2>
          {/* <hr /> */}
          {showFullText ? (
            <span>
              {u.strInstructions}
              <button
                className="btn btn-success"
                onClick={toggleFullText}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-arrow-up"></i> 
                See Less
              </button>
            </span>
          ) : (
            <span>
              {u.strInstructions?.substring(0, 200)}
              <button
                className="btn btn-success"
                onClick={toggleFullText}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-arrow-down"></i> 
                See More
              </button>
            </span>
          )}
        </p>
      </div>
    
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 " style={{width:'40%'}}>
  <div className="p-4" style={{ background: "#efefef", borderRadius: "21px" }}>
    <h2 className="mb-3 p-2 text-success fs-2 fw-bold p-2">
      

Ingredients:</h2>
    {/* <hr></hr> */}
    <ul className="m-0 p-0 ">
      {Object.keys(u).map((key, i) => {
        if (key.includes("strIngredient") && u[key]) {
          const measureKey = key.replace("strIngredient", "strMeasure");
          const measure = u[measureKey];
          return (
            <p key={i}  className="fs-4 ">
              <input
                type="checkbox"
                id={key}
                name={key}
                value={u[key]}
                checked={isChecked[key]}
                onChange={handleCheckboxChange(key)}
               
              />
              <label
                className="ps-1"
                htmlFor={key}
                style={{
                  position: "relative",
               
                }}
              >
                {measure} {u[key]}
                <span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: isChecked[key] ? "2px" : "0",
                    backgroundColor: isChecked[key] ? "green" : "black",
                  }}
                ></span>
              </label>
            </p>
          );
        } else {
          return null;
        }
      })}
    </ul>
  </div>
  <div className="d-flex" style={{ marginBlock: "5rem", maxWidth: "30%" }}>
        <YouTube videoId={u.strYoutube?.split("=")[1]} />
      </div>
    
</div>

         
              
            </div>
         
          </div>
        </div>
      ))}
        <Footer></Footer>
    </div>
  
  );
};

export default Details;



// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import YouTube from "react-youtube";

// const Details = () => {
//   const state = useSelector((st) => st.getrecpie.getrecpie);
//   const [recipe, setRecipe] = useState([]);

//   const [showFullText, setShowFullText] = useState(false);
//   const toggleFullText = () => {
//     setShowFullText(!showFullText);
//   };

//   const [isChecked, setIsChecked] = useState({});

//   const handleCheckboxChange = (key) => (event) => {
//     setIsChecked((prev) => ({
//       ...prev,
//       [key]: event.target.checked,
//     }));
//   };

//   useEffect(() => {
//     if (typeof state[0] === "object") {
//       localStorage.setItem("recipeState", JSON.stringify(state));
//     }
//   }, [state]);

//   useEffect(() => {
//     const storedState = JSON.parse(localStorage.getItem("recipeState"));
//     if (storedState) {
//       setRecipe(storedState);
//     }
//   }, []);

//   return (
//     <div className="container">
//       {recipe && recipe.map((u, index) => (
//         <div key={index} className="p-3 m-5 bg-light rounded">
//           <div className="row">
//             <div className="col-md-12">
//               <h2 className="text-success fs-1 fw-bold mb-3">
//                 {u.strMeal}
//               </h2>
              
//               <i
//                     className="bi bi-bookmark-fill"
//                     style={{ color: "#198754", fontSize: "25px" }}
//                   ></i>
//                 </div>
//                 <hr></hr>
          
//           </div>

//           <div className="row mb-1">
//             <div className="col-md-12 h-50 ">
//               <img src={u.strMealThumb} alt="recipe" className="img-fluid w-100 h-25" />
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-6">
//               <div className="bg-light rounded p-4">
//                 <h3 className="text-success fs-2 fw-bold mb-3">Ingredients:</h3>
//                 <hr />
//                 <ul className="list-unstyled">
//                   {Object.keys(u).map((key, i) => {
//                     if (key.includes("strIngredient") && u[key]) {
//                       const measureKey = key.replace("strIngredient", "strMeasure");
//                       const measure = u[measureKey];
//                       return (
//                         <li key={i} className="fs-4">
//                           <input
//                             type="checkbox"
//                             id={key}
//                             name={key}
//                             value={u[key]}
//                             checked={isChecked[key]}
//                             onChange={handleCheckboxChange(key)}
//                           />
//                           <label htmlFor={key} className="ps-1" style={{ position: "relative" }}>
//                             {measure} {u[key]}
//                             <span style={{ position: "absolute", bottom: "0", left: "0", width: "100%", height: isChecked[key] ? "2px" : "0", backgroundColor: isChecked[key] ? "green" : "black" }}></span>
//                           </label>
//                         </li>
//                       );
//                     } else {
//                       return null;
//                     }
//                   })}
//                 </ul>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="bg-light rounded p-4 mb-3">
//                 <h3 className="text-success fs-2 fw-bold mb-3">Instructions:</h3>
//                 <hr />
//                 <p className="fs-3">
//                   {showFullText ? u.strInstructions : `${u.strInstructions.substring(0, 200)}...`}
//                   <button className="btn btn-success ms-2" onClick={toggleFullText}>
//                     {showFullText ? "See Less" : "See More"}
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-md-12">
//               <div className="d-flex justify-content-center">
//                 <div className="embed-responsive embed-responsive-16by9" style={{ maxWidth: "100%" }}>
//                   <YouTube videoId={u.strYoutube.split("=")[1]} className="embed-responsive-item" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Details;
