import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFeatch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms,setSelectedRoom]=useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
    const navigate = useNavigate();
    const {date} = useContext(SearchContext)

    const handleSelect = (e)=> {
        const checked = e.target.checked
        const value = e.target.value
        //! if it is checked take the previous rooms and add more id AND if it is not checked we are going to filter our selected room and pull a room id from the selected rooms
        //? to basically remove if selected and remove if unselected
        
        setSelectedRoom(checked ? [...selectedRooms,value] :selectedRooms.filter((room) => room !== value))
    }
    //! we get the date in the form of from 2 to 5 but we actually want them in an array [2,3,4,5]
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };
    const alldates = getDatesInRange(date[0].startDate, date[0].endDate);
    
    //! we want to check if this unavailableDates includes any of these dates or not
    const isNotAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return isFound;
      };
    
    const handleClick = async (e)=> {
        //! update the selected dates
        
        try {
            await Promise.all(selectedRooms.map(roomId =>{
            const res = axios.patch(`/availability/${roomId}`,{dates:alldates})
            return res.data.data
            }))
        } catch (e) {
            
        }
        setOpen(false)
        navigate("/")
    }
    
    return (
        <div className="reserve">
          <div className="rContainer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
            <span>Select your rooms:</span>
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">${item.price}</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={isNotAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </div>
        </div>
      );
}

export default Reserve