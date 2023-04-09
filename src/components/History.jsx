import React, { useEffect, useState } from "react";
import { getData } from "../config/firebaseMethods";

const History = () => {
  const [allData, setAllData] = useState([]);
  const [searching, setSearching] = useState([]);
  const [storingVal, setSortingVal] = useState([]);
  let [date, setDate] = useState("");
  let [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(true);
    getData("AllHistory")
      .then((res) => {
        if (res) {
          setAllData(Object.values(res));

          // original value convert into array
          let OVCIA = Object.values(res);
          let arr = [];
          // looping over that value
          OVCIA.forEach((val) => {
            // convert it again array
            let arr1 = Object.values(val);
            arr.push(...arr1);
          });

          setSearching(arr);
          setFlag(false);
        } else {
          setFlag(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setFlag(false);
      });
  }, []);

  const sortFn = () => {
    let sortingValue = searching.filter((val) => val.date == date);
    setSortingVal(sortingValue);
  };

  return (
    <section className="History">
      <div className="sortData">
        <div className="sorting">
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <button onClick={sortFn}>Sort</button>
        </div>

        {storingVal && storingVal.length > 0 && (
          <div className="sortingValue">
            <h1>Sorting Value</h1>

            <table border="2px">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Drum</th>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {storingVal &&
                  storingVal.length > 0 &&
                  storingVal.map((val, index) => {
                    return (
                      <tr key={val.key}>
                        <td data-title="S.No.">
                          {(index + 1) >= 10 ? index + 1 : `0${index + 1}`}
                        </td>
                        <td data-title="Drum">{val.description}</td>
                        <td data-title="Day">{val.day}</td>
                        <td data-title="Date">{val.date}</td>
                        <td data-title="time">{val.time}</td>
                      </tr>
                    );
                  })}
                <tr></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {allData.map((val, index) => {
        let arr = Object.values(val);
        return (
          <div className="newTanker" key={index}>
            <div className="heading">
              <h1>
                Water Tanker {(index + 1) >= 10 ? index + 1 : `0${index + 1}`}
              </h1>
            </div>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Drum</th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {arr &&
                    arr.length > 0 &&
                    arr.map((val, index) => {
                      if (typeof val === "object") {
                        let { description, date, time, day, key } = val;
                        return (
                          <tr key={key}>
                            <td data-title="S.No.">
                              {(index + 1) >= 10 ? index + 1 : `0${index + 1}`}
                            </td>
                            <td data-title="Drum">{description}</td>
                            <td data-title="Day">{day}</td>
                            <td data-title="Date">{date}</td>
                            <td data-title="time">{time}</td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {allData && allData.length === 0 && (
        <div className="center">
          <p style={{ textAlign: "center" }}>Empty</p>
        </div>
      )}

      {flag && (
        <div className="center">
          <h1 style={{ fontSize: "1rem" }}>Loading...</h1>
        </div>
      )}
    </section>
  );
};

export default History;
