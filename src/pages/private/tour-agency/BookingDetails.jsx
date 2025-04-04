import React from 'react'
import { useState, useEffect } from 'react'
export default function BookingDetails() {
  const mockData = [
    {
      id: 1,
      touristName: "John Doe",
      tour: "Desert Safari",
      status: "pending"
    },
    {
      id: 2,
      touristName: "Jane Smith",
      tour: "City Tour",
      status: "pending"
    }
  ];
  const [bookings,setBookings]=useState([]);
  const viewBookings=useEffect(()=>{
    setBookings(mockData);
  },[]);
  const handleStatus =(id,action)=>{
    const update = bookings.map(book=>
      bookings.id===id ?bookings.status=action:bookings
    );
    setBookings(update);
    };
  
  return (
    <div className='bookings'>
      <h1>agency tours</h1>
      <ul>
        <li>
          <div className='bookdetails'>
            <p>tourist name:{bookings.touristName}</p>
            <p>id:{bookings.id}</p>
            <p>tour:{bookings.tour}</p>
            <p>status:{bookings.status}</p>
            <button onClick={()=>handleStatus(bookings.id,"rejected")}>reject</button>
            <button onClick={()=>handleStatus(bookings.id,"approved")}>accept</button>
          </div>
        </li>
      </ul>
    </div>
  )
}
