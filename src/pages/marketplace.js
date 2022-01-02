import * as React from "react";
import { ListingItem } from "../listing-item";

const marketItems = (page, signal) => 
    // fetch("https://ecomm-service.herokuapp.com/marketplace")
    fetch(`https://ecomm-service.herokuapp.com/marketplace?page=${page}&limit=3`, {signal})
    .then((res) => res.json())

export const Marketplace = () => {

  const [listings, setListings] = React.useState("");
  const [title, setTitle] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [condition, setCondition] = React.useState("new")
  const [availability, setAvail] = React.useState("in-stock")
  const [numOfStock, setNumOfStock] = React.useState("")
  const [page, setPage] = React.useState(1)

const loadItems = (page) => marketItems(page).then((data) => setListings(data)) 

const createListing = (data) =>
    fetch("https://ecomm-service.herokuapp.com/marketplace", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    }).then((res) => res.json())

React.useEffect(() => {
  const ab = new AbortController();
  loadItems(page, ab.signal);
  return () => {
    ab.abort()
  };
}, [page])

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
    }).then(() => loadItems());
}}>
  <div className="p-3">New Listing</div>
  <div className="space-y-5 p-3">
    <div>
      <label htmlFor="title" className="block text-sm font-medium">
        Title
      </label>
      <input type="text" id="title" value={title} onChange={(ev)=>setTitle(ev.target.value)} required/>
    </div>
    <div>
      <label htmlFor="price" className="block text-sm font-medium">
        Price
      </label>
      <input type="number" id="price" value={price} onChange={(ev)=>setPrice(ev.target.value)} required/>
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium">
        Description
      </label>
      <textarea id="description" value={description} onChange={(ev)=>setDescription(ev.target.value)} required/>
    </div>
    <div>
      <label htmlFor="condition" className="block text-sm font-medium">
        Condition
      </label>
      <select id="condition"value={condition} onChange={(ev)=>setCondition(ev.target.value)} required>
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
      <select id="availability"value={availability} onChange={(ev)=>setAvail(ev.target.value)} required>
        <option value="in-stock">In Stock</option>
        <option value="single-item">Single Item</option>
      </select>
    </div>
    <div>
      <label htmlFor="numOfStock" className="block text-sm font-medium">
        Number of Available Stock
      </label>
      <input type="number" id="numOfStock" value={numOfStock} onChange={(ev)=>setNumOfStock(ev.target.value)} required/>
    </div>
    <div>
      <button type="button"
      className="
              js-edit-btn
              inline-flex
              justify-center
              items-center
              py-2
              px-4
              border border-transparent
              shadow-sm
              text-sm
              font-medium
              rounded-md
              text-white
              bg-pink-600
              hover:bg-pink-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-pink-500
            ">ADD</button>
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
      ))
      : <button onClick={() => {marketItems().then(() => loadItems());}}>CLICK TO LOAD ITEMS</button>}
{/* previous button */}
      <button type="button"
     className="
     js-delete-btn
      inline-flex
      justify-center
      items-center
      py-2
      px-4
      border border-pink-500
      shadow-sm
      text-sm
      font-medium
      rounded-md
      text-pink-500
      bg-white
      hover:text-pink-700
      focus:outline-none
      focus:ring-2
      focus:ring-offset-2
      focus:ring-pink-500
   "
      disabled={page === 1}
      onClick={() => {setPage(page - 1)
      console.log(page)}}>PREVIOUS</button>
{/* next button */}
      <button type="button"
      className="
        js-delete-btn
        inline-flex
        justify-center
        items-center
        py-2
        px-4
        border border-pink-500
        shadow-sm
        text-sm
        font-medium
        rounded-md
        text-pink-500
        bg-white
        hover:text-pink-700
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-pink-500
    "
      onClick={() => {setPage(Number(page) + 1)
      console.log(page)}}>NEXT</button>
      {/* {listings? <h1>yes</h1> : <h2>NO</h2>} */}
    {/* </div> */}
    {/* </div> */}
  </div>);
};
