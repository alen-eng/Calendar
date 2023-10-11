import dayjs from "dayjs";
import React, { useState ,useEffect } from "react";
import { generateDate, months } from "../util/calender";
import cn from "../util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import  { gapi } from 'gapi-script';
import { Route , Routes, useNavigate, Switch} from "react-router-dom";
export default function Calendar() {
 const navigate = useNavigate();
	const days = ["SU", "M", "T", "W", "T", "F", "S"];
	const currentDate = dayjs();
  const [event,setEvent]=useState([{title:"Meeting with team",time:"10:00 AM",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod."}])
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

  const CLIENT_ID = "458315659028-g0cpbg5aou8s8gefqqm1vljnuiriejol.apps.googleusercontent.com";
  const API_KEY = "AIzaSyA5B6NvXLVH9h5NwyCNodqCQAkmLxs3V0g";
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  const SCOPES = "https://www.googleapis.com/auth/calendar.events" ;
  
  // const accessToken = localStorage.getItem('access_token');
  // const expiresIn = localStorage.getItem('expires_in');
  
	
		const handleAuthClick = () => {
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('fetching!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            navigate("/events", {state: {events: events}})
          })
          
      
  
        })
      })
    }
    return (
    <div className="flex  justify-center  mx-auto w-full bg-[#88d0eb]  h-screen items-center sm:flex-row flex-col">
        <div className="w-1/3 h-96 bg-white p-4 overflow-hidden rounded-bl-lg rounded-tl-lg">
          <div className="flex justify-between items-center ">
            <h1 className="select-none font-semibold text-xl">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-10 items-center ">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                } } />
              <h1
                className=" cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(currentDate);
                } }
              >
                Today
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                } } />
            </div>
          </div>
          <div className="grid grid-cols-7 ">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  {...day === "SU" ? { className: "text-sm font-bold text-center h-14 w-14 grid place-content-center text-red-500 select-none" }
                    : { className: "text-sm font-bold text-center h-14 w-14 grid place-content-center text-gray-500 select-none" }}
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className=" grid grid-cols-7 ">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today
                          ? "bg-orange-400 text-white"
                          : "",
                        selectDate
                          .toDate()
                          .toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      } }
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className=" h-96 max-w-md sm:px-5 divide-y-2 pt-4 divide-gray-400 rounded-br-lg rounded-tr-lg bg-gray-600">
          <h1 className="text-center uppercase font-bold text-lg text-orange-400">Events </h1>
          <div>
            <h1 className="pt-4 font-semibold">
              Schedule for {selectDate.toDate().toDateString()}
            </h1>
            {event && event.map((item, index) => (
              <div key={index}>
                <p className=" text-lg pt-8 font-bold text-gray-400">{item?.title} at <span className="items-center justify-center text-md font-semibold text-center text-gray-400">{item?.time}</span></p>
                <p className="pt-2   text-gray-400">{item?.description}</p>
              </div>
            ))}

            <div className="grid place-items-end">
              <button className="text-orange-400 px-4 py-2 text-md font-semibold bg-gray-800  rounded-xl mt-16 hover:opacity-90"
                id="authorize_button"
                onClick={handleAuthClick}
              >
                Connect with google calender</button>
            </div>

          </div>
        </div>
      </div>
	);
}