import * as React from "react";
import { ListingItem } from "../listing-item";

const marketItems = () => 
    fetch("https://ecomm-service.herokuapp.com/marketplace")
    .then((res) => res.json())

export const Marketplace = () => {

  const [listings, setListings] = React.useState("");
  const [title, setTitle] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [condition, setCondition] = React.useState("new")
  const [availability, setAvail] = React.useState("in-stock")
  const [numOfStock, setNumOfStock] = React.useState("")

//   const createListing = (title,
//     price,
//     description,
//     condition,
//     availability,
//     numOfStock) => {
//     const newListing = [...listings, {
//         "title":title,
//         "price":price,
//         "description":description,
//         "condition":condition,
//         "availability":availability,
//         "numOfStock":numOfStock
//     }];
//     setListings(newListing);
//     setTitle("");
//     setPrice("");
//     setDescription("");
//     setCondition("");
//     setAvail("");
//     setNumOfStock("");
//   }

const createListing = (data) =>
    fetch("https://ecomm-service.herokuapp.com/marketplace", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    }).then((res) => res.json())

  return (<div>
{/* MARKET FORM */}
<form 
onSubmit={(ev) => {
    ev.preventDefault();
    createListing({
        title,
        price: Number(price),
        description,
        condition,
        availability,
        numOfStock: Number(numOfStock)
    })
}}>
  <div className="p-3">New Listing</div>
  <div className="space-y-5 p-3">
    <div>
      <label htmlFor="title" className="block text-sm font-medium">
        Title
      </label>
      <input type="text" id="title" value={title} onChange={(ev)=>setTitle(ev.target.value)}/>
    </div>
    <div>
      <label htmlFor="price" className="block text-sm font-medium">
        Price
      </label>
      <input type="number" id="price" value={price} onChange={(ev)=>setPrice(ev.target.value)}/>
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium">
        Description
      </label>
      <textarea id="description" value={description} onChange={(ev)=>setDescription(ev.target.value)}/>
    </div>
    <div>
      <label htmlFor="condition" className="block text-sm font-medium">
        Condition
      </label>
      <select id="condition"value={condition} onChange={(ev)=>setCondition(ev.target.value)}>
        <option value="new">New</option>
        <option value="used_like-new">Used (like new)</option>
        <option value="used_good">Used (good)</option>
        <option value="used_fair">Used (fair)</option>
      </select>
    </div>
    <div>
      <label htmlFor="availability" className="block text-sm font-medium">
        Availability
      </label>
      <select id="availability"value={availability} onChange={(ev)=>setAvail(ev.target.value)}>
        <option value="in-stock">In Stock</option>
        <option value="single-item">Single Item</option>
      </select>
    </div>
    <div>
      <label htmlFor="numOfStock" className="block text-sm font-medium">
        Number of Available Stock
      </label>
      <input type="number" id="numOfStock" value={numOfStock} onChange={(ev)=>setNumOfStock(ev.target.value)}/>
    </div>
    <div>
      <button>ADD</button>
    </div>
  </div>
</form>
{/* MARKET ITEMS */}
    {/* <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8"> */}
        {/* <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6"> */}
      {listings? listings.map((item) => (
        <ListingItem
          title={item.title}
          description={item.description}
          price={item.price}
          imageUrl={item.imageUrl}
          stocks={item.numOfStock}
          condition={item.condition}
          key={item._id}
        />
      )) : null}
      {/* {listings? <h1>yes</h1> : <h2>NO</h2>} */}
      <button onClick={() => {marketItems().then((data) => setListings(data));}}>CLICK TO LOAD ITEMS</button>
    {/* </div> */}
    {/* </div> */}
  </div>);
};
