import React, { useState } from "react";

const EditBtn = (props) => {
  return (
    <button
      type="button"
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
            "
    >
      <svg
        className="h-4 w-4 mr-1.5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
      </svg>
      EDIT
    </button>
  );
};

const DeleteBtn = (props) => {
  const [deleting, setDeleting] = React.useState(true);
  return (
    <button
      type="button"
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
      onClick={() => {
        setDeleting(!deleting);
      }}
    >
      <svg
        className="w-4 h-4 mr-1.5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      {deleting ? "DELETE" : "DELETING..."}
    </button>
  );
};

const ProductName = (props) => {
  return (
    <p
      className="
      block
      text-sm
      font-medium
      text-gray-900
      truncate
      pointer-events-none
      "
    >
      {props.title}
    </p>
  );
};

export const ListingItem = (props) => {
  return (
    <>
      <img
        src={props.imageUrl}
        alt=""
        className="
                    object-cover
                    pointer-events-none
                    group-hover:opacity-75
                    h-48
                    w-full
                  "
      ></img>
      <div
        className="
                  flex-1 flex\
                  md:flex-col
                  justify-between
                  items-start
                  md:items-stretch
                  gap-3
                  px-2
                "
      >
        <div className="mt-1 flex-1">
          <div className="flex justify-between items-center gap-3">
            <div>
              RM <span className="text-2xl font-bold">{props.price}</span>
            </div>
            <div className="text-sm text-gray-500">
              {props.stocks} piece available
            </div>
          </div>
          <ProductName />
          <p
            className="
                      block
                      text-sm
                      font-medium
                      text-gray-500
                      pointer-events-none
                    "
          >
            {/* Inexpensive. Best as birthday gift for your enemy. */}
            {props.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 py-3">
          <EditBtn />
          <DeleteBtn />
        </div>
      </div>
    </>
  );
};
