import dayjs from "dayjs";
import React, { useState ,useEffect } from "react";
import { generateDate, months } from "./util/calender";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import  { gapi } from 'gapi-script';
import Events from "./components/Events";
import Home from "./components/Home";
import { Route , Routes, useNavigate, Switch} from "react-router-dom";
export default function Calendar() {

	return (
    <><Routes>
       <Route exact path="/" Component={Home}/>
       <Route exact path="/events" Component={Events} />
    </Routes>
      </>
	);
}