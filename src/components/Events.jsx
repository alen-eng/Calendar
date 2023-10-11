import React from 'react'
import { useState  } from 'react'
import { useLocation } from 'react-router-dom'

function Events() {
    const state = useLocation()
    const [event,setEvent]=useState(state)
    var arr = new Array();
    
    for(let i=0;i<event.state.events.length;i++){
      arr.push( 
        {
          id:event.state.events[i].id ,
          title:event.state.events[i].summary ,
          description:event.state.events[i].description ,
           attendees:"",
          date : event.state.events[i].start.dateTime.slice(0,10),
          start:event.state.events[i].start.dateTime.slice(11,16),
          end:event.state.events[i].end.dateTime.slice(11,16)
        } )
        for(let j=0;j<event.state.events[i].attendees.length;j++){
          arr[i].attendees=arr[i].attendees+" "+','+event.state.events[i].attendees[j].email
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#88d0eb]" > 
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">     
       <div className="bg-white rounded-3xl shadow-2xl flex justify-center w-4/5 ">

        <div className="p-8 flex flex-col items-center"> 
         <div className="flex flex-row  items-center  justify-center text-2xl font-sans font-extrabold">
          <img src='https://tycoonworld.in/wp-content/uploads/2023/09/Google-Calendar.jpg' height={25} width={100} alt='img' />
         </div>

         <div className="py-3">
          <h2 className="text-3xl text-black font-bold mb-2">
            Welcome!
            </h2>

            <div className=" flex py-2 items-center">
    <div className="flex-grow border-t border-gray-400"></div>
    <span className="flex-shrink mx-1 text-xs font-bold text-gray-400">Upcoming Events</span>
    <div className="flex-grow border-t border-gray-400"></div>
</div>

<div className='pt-8  pb-16'>
 <table className="table-auto">
  <thead>
    <tr>
      <th className='text-gray-800'>Events</th>
      <th className=' lg:pl-12 md:pl-4 sm:pl-2 text-gray-800'>Description</th>
      <th className='lg:pl-12 md:pl-4 sm:pl-2 text-gray-800'>Date</th>
      <th className='lg:pl-12 md:pl-4 sm:pl-2 text-gray-800'>Time</th>
      <th className='lg:pl-12 md:pl-4 sm:pl-2 text-gray-800'>Attendees</th>
    </tr>
  </thead>
  <tbody>
    {arr?.map((array,index) => (
    <tr className='divide-y'>
      <td className='pt-4 text-gray-600 font-bold' key={array.id}>{array.title}</td>
      <td className='w-80 pt-4 xl:pl-12  lg:pl-12 md:pl-4 sm:pl-2 text-gray-600 font-bold overflow-y-scroll'>{array.description}</td>
      <td className=' pt-4 xl:pl-12 lg:pl-12 md:pl-4 sm:pl-2 text-gray-600 font-bold'>{array.date}</td>
      <td className=' pt-4 xl:pl-12 lg:pl-24 md:pl-12 sm:pl-4 text-gray-600 font-bold'>{array.start} - {array.end}</td>
      <td className='w-28 xl:pl-12 pt-4 lg:pl-24 md:pl-12 sm:pl-4 text-gray-600 font-bold  overflow-y-scroll'>{array.attendees}</td>
    </tr>
    ))}
  </tbody>
</table>
</div>

</div>


</div>            
     </div>
    </main>
   </div>
  )
}

export default Events