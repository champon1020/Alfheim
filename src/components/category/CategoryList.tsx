import * as React from "react";
import "../../assets/styles/category_list.css";

const CategoryList = () => {
  return(
    <div>
      <div id="category-list">
        <h2>Category List</h2>
        <ul>
          <li>Category1(1)</li>
          <li>Category2(2)</li>
        </ul>
      </div>
      <div id="others">
      </div>
    </div>
  );
};

export default CategoryList;