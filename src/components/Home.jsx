import React, { useEffect, useState } from "react";

// styling
import "../style/Home.css";

// database
import {
  addItem,
  removeItem,
  getData,
  updateItem,
} from "../config/firebaseMethods";

// image
import loading from "../images/loading.gif";

const Home = () => {
  let [currentDate, setCurrentDate] = useState("");
  let [currentDay, setCurrentDay] = useState("");
  let [currentTime, setCurrentTime] = useState();
  let [flag, setFlag] = useState(true);
  let [flag1, setFlag1] = useState(true);
  let [flag2, setFlag2] = useState(false);

  let [preventValue, setPreventValue] = useState({
    id: 0,
    description: "",
    day: "",
    date: "",
    time: "",
  });

  let [data, setData] = useState({
    description: "",
    day: "",
    date: "",
    time: "",
  });

  let [store, setStore] = useState([]);

  const getCurrentDateFunction = () => {
    let date = new Date();

    let monthDay = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    setCurrentDate(
      `${year}-${month > 10 ? month : `0${month}`}-${
        monthDay > 10 ? monthDay : `0${monthDay}`
      }`
    );
  };

  const getCurrentDayFunction = () => {
    let day = new Date().getDay();

    let englishDayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    setCurrentDay(englishDayName[day]);
  };

  useEffect(() => {
    setFlag2(true);
    getCurrentDateFunction();
    getCurrentDayFunction();
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);

    getData("currentHistory")
      .then((res) => {
        setStore(Object.values(res));
        setFlag2(false);
      })
      .catch((err) => {
        console.log(err);
        setFlag2(false);
      });
  }, []);

  const addFunction = () => {
    setFlag(false);
    // convert 0 to 23 format into 1 to 12 format
    let inputEle = document.querySelector(".add_time");
    var timeSplit = inputEle.value.split(":"),
      hours,
      minutes,
      meridian;

    hours = timeSplit[0];
    minutes = timeSplit[1];

    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }

    if (data.description !== "" && data.date !== "" && data.day !== "") {
      if (store.length > 5) {
        // addItem it work to store value in database
        addItem(store, "AllHistory");

        // set the empty array in setStore
        setStore([]);

        // removeItem it work to remove old value from database
        removeItem();
        setFlag(true);
      } else {
        let obj = { ...data, time: `${hours}:${minutes} ${meridian}` };

        // store value in database
        addItem(obj, "currentHistory")
          .then((res) => {
            alert(res);

            setStore([...store, obj]);
            setFlag(true);
          })
          .catch((err) => {
            alert(err);
            setFlag(true);
          });
      }
    } else {
      alert("Please fill in all fields to store the data");
      setFlag(true);
    }
  };

  const addAnotherFunction = () => {
    setFlag1(false);

    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);

    if (store.length > 5) {
      // addItem it work to store value in database
      addItem(store, "AllHistory");

      // set the empty array in setStore
      setStore([]);

      // removeItem it work to remove old value from database
      removeItem();
      setFlag1(true);
    } else {
      let obj = {
        description: `Drum ${"0" + (store.length + 1)}`,
        day: currentDay,
        date: currentDate,
        time: currentTime,
      };

      // store value in database
      addItem(obj, "currentHistory")
        .then((res) => {
          alert(res);

          setStore([...store, obj]);
          setFlag1(true);
        })
        .catch((err) => {
          alert(err);
          setFlag1(true);
        });
    }
  };

  const deleteFunction = (val, id) => {
    // remove Item from database
    removeItem(val.key)
      .then((res) => {
        alert(res);
        setStore((val) => val.filter((val, index) => index !== id));
      })
      .catch((err) => console.log(err));
  };

  let updateScreen = document.querySelector(".update");

  const updateScreenOpen = (value, index) => {
    setPreventValue({ ...value, id: index });
    updateScreen.style.transform = "scale(1)";
  };

  const updateFunction = () => {
    setStore((val) => {
      return val.map((val, index) => {
        if (index === preventValue.id) {
          return preventValue;
        } else {
          return val;
        }
      });
    });
    updateItem(preventValue, preventValue.key)
      .then((res) => alert(res))
      .catch((err) => alert(err));

    updateScreen.style.transform = "scale(0)";
  };

  const closeFunction = () => {
    updateScreen.style.transform = "scale(0)";
  };

  return (
    <section className="Home">
      <div className="add_manually">
        <input
          className="description"
          type="text"
          placeholder="Text..."
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <input
          className="day"
          type="text"
          placeholder="day"
          onChange={(e) => setData({ ...data, day: e.target.value })}
        />
        <input
          className="add_date"
          type="date"
          placeholder="date"
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        <input className="add_time" type="time" placeholder="time" />

        <button className="add_text" onClick={addFunction}>
          {flag ? "Add" : <img src={loading} alt="loading" />}
        </button>
      </div>

      <div className="newTanker">
        <div className="heading">
          <h1>New Water Tanker Record</h1>
        </div>
        {/* <div style={{ overflowX: "auto", width: "100%" }}> */}
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Drum</th>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Function</th>
            </tr>
          </thead>

          <tbody>
            {store &&
              store.length > 0 &&
              store.map((val, index) => {
                let { description, date, time, day } = val;
                return (
                  <tr key={index}>
                    <td data-title="S.No.">
                      {index + 1 >= 10 ? index + 1 : `0${index + 1}`}
                    </td>
                    <td data-title="Drum">{description}</td>
                    <td data-title="Day">{day}</td>
                    <td data-title="Date">{date}</td>
                    <td data-title="Time">{time}</td>
                    <td data-title="Function">
                      <div>
                        <span onClick={() => deleteFunction(val, index)}>
                          <i className="fa-solid fa-trash"></i>
                        </span>

                        <span onClick={() => updateScreenOpen(val, index)}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {flag2 ? (
          <h1 style={{ fontSize: "1rem" }}>Loading...</h1>
        ) : (
          store &&
          store.length === 0 && (
            <div className="center">
              <p style={{ textAlign: "center" }}>Empty</p>
            </div>
          )
        )}

        {/* </div> */}
      </div>

      <div className="add" onClick={addAnotherFunction}>
        {flag1 ? (
          <h1>Add</h1>
        ) : (
          <img src={loading} alt="loading" style={{ width: "100px" }} />
        )}
      </div>

      {/* update */}
      <div className="update">
        <div className="box">
          <div className="cross_icon" onClick={closeFunction}>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <input
            type="text"
            placeholder="text..."
            value={preventValue.description}
            onChange={(val) =>
              setPreventValue({
                ...preventValue,
                description: val.target.value,
              })
            }
          />
          <button onClick={updateFunction}>Update</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
