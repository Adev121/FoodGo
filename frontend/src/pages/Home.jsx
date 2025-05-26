import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import Carousal from "../components/Carousal";
import axios from "axios";
import '../components/loader.css';

function Home() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://foodgo-backend-af04.onrender.com/api/getfood");
        const data = res.data;
        setAllData(data);
        setFilteredData(data); // show all by default
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  const filterbyCategory = (category) => {
    const filtered = allData.filter((item) => item.CategoryName === category);
    setFilteredData(filtered);
  };

  const resetFilter = () => {
    setFilteredData(allData);
  };

  const filterBySearch = (searchTerm)=>{
    if(searchTerm){
      const filtered = allData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())||item.CategoryName.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredData(filtered);
    }else{
      setFilteredData(allData);
    }
  }

  return (
    <div>
      <Navbar filterBySearch={filterBySearch}/>
      <Carousal />
      <div className="catgory">
        <h1 className="text-3xl font-bold text-center mt-10">Categories</h1>
        <div className="flex justify-center items-center gap-4 mt-5 flex-wrap">
          <button className="btn btn-secondary" onClick={resetFilter}>
            All
          </button>
          {[...new Set(allData.map((item) => item.CategoryName))].map(
            (category, index) => (
              <button
                key={index}
                className="btn btn-primary"
                onClick={() => filterbyCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 items-center justify-center mx-20">
        {filteredData.map((item) => (
          <Cards key={item.name} item={item} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
