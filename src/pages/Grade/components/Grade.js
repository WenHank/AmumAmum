import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  RadarController,
} from "chart.js";
import { Line, PolarArea, Radar } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

export const Lineoptions = {
  maintainAspectRatio: false,
};
export const Polaroptions = {
  maintainAspectRatio: false,
};
const labels = [];
let bstmeArr = [];
let bstbestArr = [];
let bstaverageArr = [];
let avlmeArr = [];
let avlbestArr = [];
let avlaverageArr = [];
let rbtmeArr = [];
let rbtbestArr = [];
let rbtaverageArr = [];
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function makeArr() {
  for (let i = 0; i < 10; i++) {
    bstmeArr.push(getRandom(5, 80));
    bstbestArr.push(getRandom(5, 80));
    bstaverageArr.push((bstmeArr[i] + bstbestArr[i]) / 2);
    avlmeArr.push(getRandom(5, 80));
    avlbestArr.push(getRandom(5, 80));
    avlaverageArr.push((avlmeArr[i] + avlbestArr[i]) / 2);
    rbtmeArr.push(getRandom(5, 80));
    rbtbestArr.push(getRandom(5, 80));
    rbtaverageArr.push((rbtmeArr[i] + rbtbestArr[i]) / 2);
    labels[i] = "第" + (i + 1) + "次";
  }
}
makeArr();

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}
export default function Grade() {
  const [meArr, setMeArr] = useState(bstmeArr);
  const [bestArr, setBestArr] = useState(bstbestArr);
  const [averageArr, setAverageArr] = useState(bstaverageArr);
  const [polarBest, setPolarBest] = useState(Math.max(...bstmeArr));
  const [polarWorst, setPolarWorst] = useState(Math.min(...bstmeArr));
  const Refresh = useNavigate();
  const [googlegrade, setGooglegrade] = useState("");
  const [renderF, setRenderF] = useState(<UserCard />);
  const [polarAverage, setPolarAverage] = useState(
    bstmeArr.reduce((a, b) => a + b) / bstmeArr.length
  );
  const data = {
    labels,
    datasets: [
      {
        label: "You",
        data: meArr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Best",
        data: bestArr,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Average",
        data: averageArr,
        borderColor: "rgb(43, 202, 56)",
        backgroundColor: "rgb(43, 202, 56, 0.5)",
      },
    ],
  };
  const datapolar = {
    labels: ["Best", "Worst", "Average"],
    datasets: [
      {
        label: "Hours Studied in Geeksforgeeks",
        data: [polarBest, polarWorst, polarAverage],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(53, 162, 235, 0.5)",
          "rgb(43, 202, 56, 0.5)",
        ],
      },
    ],
  };
  const radarData = {
    labels: ["知識型", "判斷型", "分析型", "應用型", "總分"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 76],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 61],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };
  const options = {
    scale: 1,
    max: 15,
    speed: 250,
  };
  const [UserData, setUserData] = useState("");
  let GetSid = sessionStorage.getItem("Sid");
  if (!UserData) {
    axios({
      method: "POST",
      data: {
        _id: GetSid,
      },
      withCredentials: true,
      url: process.env.REACT_APP_AXIOS_USERINFO,
    }).then((response) => {
      setUserData(response.data);
    });
  }

  function UserCard(params) {
    return (
      <Tilt className="gametitle playtitle" options={options}>
        <div className="gradetitle">
          <img
            style={{ position: "absolute", right: "100px" }}
            src="data:image/png;base64,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"
          />
          <div className="userCard">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADVklEQVRoge2ZTUgVURTHfz7Nj0I0JcSigr7ITAzMMqJaVUK7FgVFLapVRYWbaFe0DloVEZSbICLTdpUFpRhuhApDigrCrBDzI7LS1GlxzjRm+Zy59466eD94HN579/zv/8zMnTtzL6RIEQtpMWqvADYCq4B8YBToAVqBJmAkxr6tSQcOAe2Al+TzBtjqsmOXZ6QYqAM26fePQAvQBXTqb0uBauQs/QCuAzeApw59WJEPvEKO9mtgF5MfpARwgb/P0E1gbvw2p6YWMdQG5IVonwDWAKeAbs29E5u7kCxBBu4voNwgfxnQixRT7dBXZI6qiToLjbMEl9iMUa8mDltolKjGWyeODGlVE1UWGunAT2AMw0GfsOjcp1Bjv4XGKDCE3OkyTQRcFOLP0J6lTobGMZNkF4V0ayyy0ChALqlB4KuJgItCPmlcaKGxUuM7UwEXhbzQaDKH+GzR2GIq4KKQNo0bLDS2aWw2FXBRiK9RSTBgo5BJcEYGHPgx5jFyxzqN2dN0GnBGNR469BWZDjVhM0bKVeOlqYCLS6tdY4WFRqVG40JccBA5mu+BGoP8Gs31gAMOfUUmHbiNzMgDRDvLCc3xn57Tnbsz4BliqDRCTpnmdNh27mKM+DzRuD9Czr4JubOCCuTo9gILQrQvAL5ozuYYfRnRgBh7TPB4/z9ygfvatnEafEVmEfCZqV+0VmubfmC5i45djhGQNayuCP324Oj11nUhEO4Nz38Jy3LVaRyFZGv8lqTNoEZnhbimCCnAAxYnaZeHTKBDyLrYrKIMeI4UcS9E+1sEk+H6GH2FphS4DAwTrP0Wh8grJFi1HwGuAeti8jgpGcBu4BFyiXjIkk4tsqAdllzgqub6C9rNwB5gjkO//5ANHCd4WvWQgXsFWGuhWwJcIhhfHvABOAnkWOj+QxqygdM1rqN24AQw32E/ecAxgrHmIfssR3CwlzMPuDtOuJXpWTXfjmwA+f02qBcjspD9Pg+Zhfc6MBiVAwSXXBOGS6oXVaAT2S6bKcrUg4fsdkViJbJ5M4rszs40VYiXYWTHODTnkSPwIAZTpjQins5N/CPZs9YOjfVxODLE32fcOfGPZLe0PqJNbtNJH/KG+YfJCskBvsdux44cZJcrRYoUIfgNHq3EbO8epBkAAAAASUVORK5CYII=" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              {UserData.Name}
            </div>
          </div>
          <div className="userCard">
            <img
              style={{ width: "50px" }}
              src="data:image/png;base64,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"
            />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              鑽石
            </div>
          </div>
          <div className="userCard">
            <h3>BST</h3>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
          </div>
          <div className="userCard">
            <h3>AVL</h3>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAG3klEQVRoge2ZaYwURRTHf7NyswtyyCKHClFYEdAoKCjIJYgKiVFQwhcV0Zh4BBRBA4KKBBIPRBMMaoyoQZEEFBIjSBZwVfDAI0GjgAgoyKUci+FaZvzwf2X1jD09vTuzxBj+yWT6Vb+qrqr36l0Fp/HfRnfgIDDR6LuBQ0CviD5XA4eBsUZPBXYDF4bwdgb2AJOMvh3Yn2P8XsZzh9F1gHXAFxF9uBRIAZVAS+BBo1dF9BlsPHuAEuAZoxeH8L5j72YBDYGdRvePGH+18Ywz+k6jN0QtBGC5Mc4AGqPdzfWxT41nCnA28BeQBHoGeLoAJ4EjQFtgvPVZGzHuIOPZizapAbDd2m7OtZDepEvlEXJLpa/xHACaA08bvSzA8661zbYJ7TB6SMS4a4xngtEPG/0VkMi1EIAV1mE68aWy0nieQhtwyOhewEWkS+Mhe/dZxHhBlS0GmgL7rG1wnEWAl8pBtMOTyC2VnkidDgOt0CakkKousufn0dlw0oia0MfGM95oN96auItw+Mg6Pol2ZA+5pfKe8TwLnAn8aXQSSaMNXhqfRIxzrfHsRAsvRaqeJNrCheJKvFSaEU8qXfEq1A6YbH1SwBykpruMHhQxzjrjecDoF41eUt1FODi9f9wmEUcqC4xnLlK3FF4aE4yuiOh/vfH8hoxCB+AYUIXOWo3grNF+pCoTyS2VC4AT9nFndV4g3Whkk0YCOboUcK+1vWH0/JouwqHcBppKfAv2Cl6ljiJL5TYh6mwMN57tQH2gG1LVY0DHfBYBCkFS6OA2xdvyKKm0t4+nkH4HjcWALH0SyD+kgHusbSleogXBKrznjiMVd+iPokPvDEWUNG40nm1APaCP0YeB1nmvwNCf9LOSSyqLCT8b2RaeAL4xnruszW3e9Pynnw4XvE2OmFwjFKUm8WHOCbwvWQu8hOKk4kC/m4xnC1AXuMHoP9DGFRQDbPB9KIBzpnQVcI5NsBJ/yHP9DiETfR7wnbWNAYqAb4126UTB4czpo6RL5Th+19cg1euLfEdD4y1D0nsMHWontSr734xyjdFG77C+tYKB+LC6G7AxMJlXkYksMd6hwDx77ok/6Anr2wlYGFjQBuu/mXTLVWuoIH0nvwcutncjgQ/tuQdSGVDs9L4990Oq43A5fvJH7H8TOiu1ilvwer4URbpu9xog69MImdBzrb0uXlKj8ZZpFApKW+Ad7ymRRh2UQ7ikqR7QBPgaH1LESnjQof4RuMrouvjFrLexaw1P4NWpFVILkOXpUoPxmtl/O+B1FMo4NZuZ10wj0BZ56ipUpOiFwo7rsvDXQ4nTWOA265NNWiuQqU0AVyADcByZ9YLjObRTLwfayggv+wwBfuffvmMdCssz4dQogYoXLr8vWIzl0BjFPCdRmD4D7VwYuuCtj/PuxwP0RmQUMtEenb/5qP6VRNWYkhDeGsMlO6uBM1AQWJFlQm8FJj0O7XJzfJkpBdwa0q/Y2ouMXm+8wwq1CFCamkL5di44b/9DRvs1+IVMiehfhHL0aVRDverEYULODeBLFI3uQ1bmYAZfAoUgoOQoiM6B58xFBr+zHMVvc63tsphzjAVnElsjhzYbmd9caIHy/SX4SGAlUs8wOL8EWngK+LnGsw7BYRs07ExEoYx0q7WL7Bmig/tGCT6xKhhc2lqCCtszied5z0IF69fwlceTZK/bNjCeA/iFHM1n4pnYa4N2QtX2cVQ/hHCVyDjq0hivWrur+Z1IfE7uygnIETo1uj/k/X68VIpC3pciUw0+ZYiq1v+DsMHC4MLxvsghzkQqlolNgefhpIcknVAVBnRWkiH9hwJb0Sb0zfh2QTAKH5V2RXofFpqAImEnlbdRLjIC+CnQPifiW8XI2rlxRuY/fY8S/OVNp0B72xDeHsi/ZMvV1+NNbBBjUQkIfIhSic5LQeGqhwuRH3jTJhWmnmXoms1ZqiqUyk4iuwkfCfxqfd01xLwsvHnhfBT8JVEeMgYf0EVZsKZEp61t8JlkfXQ3k0RmNyxSLghm4SseLaxtBAog42aGmRiBwpnO6KZri31jRl4zzYH6+IvPciSJZcAl9r436YW3KNyHcg9Q2FOKT3UrqOVUF/ugu1ktx0umDcoY26AzFHbJ2QUtFhTdLrDnlvgS6VbixXEFQVf8YjajJKs7/oapB4qUQSmxKxENQzkNKF/vhxbm1GkbeVzm1BSleDVLovTUhep90LU2yMmts+cm6NY3YbyL8GFLBadQEpmoj7y8Cyqdn5iGQowydGaK7XmgvQs6zWPoYNf6mYiDjqgo4cL9OL9K5CcKYmJrajKzoRjl9wORJeuAvxY4APyCKpHlwAcoWjiN/yX+BgYvNMRVH7s1AAAAAElFTkSuQmCC" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
          </div>
          <div className="userCard">
            <h3>RBT</h3>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
            <img src="data:image/png;base64,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" />
            <div
              style={{
                display: "inline",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              XXX{" "}
            </div>
          </div>
        </div>
      </Tilt>
    );
  }
  function LineChart(params) {
    return (
      <Tilt className="gametitle playtitle" options={options}>
        <div
          className="gradetitle"
          style={{ padding: "10px", flexDirection: "row" }}
        >
          <Line options={Lineoptions} data={data} width="400px" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant="outline-dark"
              onClick={() => {
                setMeArr(bstmeArr);
                setBestArr(bstbestArr);
                setAverageArr(bstaverageArr);
              }}
            >
              BST
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {
                setMeArr(avlmeArr);
                setBestArr(avlbestArr);
                setAverageArr(avlaverageArr);
              }}
            >
              AVL
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {
                setMeArr(rbtmeArr);
                setBestArr(rbtbestArr);
                setAverageArr(rbtaverageArr);
              }}
            >
              RBT
            </Button>
          </div>
        </div>
      </Tilt>
    );
  }
  function PalorChart(params) {
    return (
      <Tilt className="polar" options={options}>
        <div
          className="gradetitle polar"
          style={{ padding: "10px", flexDirection: "row" }}
        >
          <PolarArea data={datapolar} width="400px" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant="outline-dark"
              onClick={() => {
                setPolarBest(Math.max(...bstmeArr));
                setPolarWorst(Math.min(...bstmeArr));
                setPolarAverage(
                  bstmeArr.reduce((a, b) => a + b) / bstmeArr.length
                );
              }}
            >
              BST
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {
                setPolarBest(Math.max(...avlmeArr));
                setPolarWorst(Math.min(...avlmeArr));
                setPolarAverage(
                  avlmeArr.reduce((a, b) => a + b) / avlmeArr.length
                );
              }}
            >
              AVL
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => {
                setPolarBest(Math.max(...rbtmeArr));
                setPolarWorst(Math.min(...rbtmeArr));
                setPolarAverage(
                  rbtmeArr.reduce((a, b) => a + b) / rbtmeArr.length
                );
              }}
            >
              RBT
            </Button>
          </div>
        </div>
      </Tilt>
    );
  }
  function RadarChart(params) {
    return (
      <Tilt className="polar" options={options}>
        <div
          className="gradetitle polar"
          style={{ padding: "10px", flexDirection: "row" }}
        >
          <Radar data={radarData} width="400px" />
        </div>
      </Tilt>
    );
  }
  return (
    <div className="A3">
      <div className="Gradecontainer">
        <img
          onClick={() => {
            Refresh("/Profile");
          }}
          style={{
            position: "absolute",
            left: "100px",
            top: "20px",
            cursor: "pointer",
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEs0lEQVR4nO2ba4hVVRTHf86MzuiUlaM9dCqmPlhCWVKJpB/ELDCH/GC+SFPCID9kGSiFhUREUNEDKqihJ/gheqE9hDRSYghTrBhMG3wxPbFEZrJxbOz2Ye3D2nvunTv3nHvO3nPp/uBy556791r/ve8+e6+19xmoUqVKlTCMBJYDnwHtwONAQ1BFnmgE7geOArkBry+BmnDSsqUJeAw4jtvoX4DvrM/zQgnMikuB54Ae3Ib/CKwG6oEJ1vUHw8hMn6uBN4A+3IbvARbiDvV51vd3+JWZPtcDbwP9uA3/CmgFRhSo86opcxo414/M9JkJbMVt9FlzbXqRejXAr6b81ow1pk4N8qvuxm14HzIKrirBxkyr3j3ZyEyfemAFcAC34T3AC0BzDFtPo6Pl4nRlZsNq4Dfchv8OPAKcn8Bep7GxKy2BWbIet+GHgDXA6IT2JuOuDqXcMsG4ADiFiP0JWArUlWmzGTc+OAO8CIwr024m3IYKbU3RbgvwDjIHRPb/BJal6CMVbkEFLsjA/jXkL6NvMozigkagGxG2I0M/d+LmC51I5wwLoiUrB8zI0M+FwIeWr25gbob+SmYSGtu/78HfWnRuOA0s8uBzSNrQwMXHsrUE6DU++5FEKiiT0V+lzZPPWcBfxmev+RyU99CYf5Inn7eit98JYIonvwW5EZ2gnvHodwGaZncC53j0ncd2dIb2GbltRDv/JY9+85hrCdno0W8NEofkgH+B+R5957EXzQbHePTbDPxhfB9F0vNE1JYp5CQSuTUiKfLuMu2VSrd5zUdS8BPA1558O9Qiu7s54AjFs8OlQBey/9eSgu86YL/xfRw4LwWbibgXnQvuGqRMHdJ4O+1tAy4p03erZXNDmbYSUw/8bER8T+Fd30XknwLlkOBmE+UdiXUYWwcH8e2FDWijbi/w/U50qN4EfIzbEfuBGxL6fsCyEyxCHItMiIX29qaiAp+yrs9G7+Ec8A8yGuLuMjWhucJrcYWnyZNoY262rkfJUz9w+YA6o5AYwj492gGMj+k7GlGHYqtOkYvQX2KLudYE/G2ufVCk7jTgB7QTDgPXxvBtb9b6yk0K8jIaoS0GXkGFzR6i7hhgs1X+JKVvusyw6i2JrTpFWtBRYL/aKW2GHgE8inRglGeUMrGNRJbWHPBEbNUpsxh3q7sDuCKmjVXonkMPcF0JdY6Z8q/H9JUJ45Bd5FkkD7dXop1wDNknLEa7Kbstob9hyTp0JO2ieGd+Ycrt9KDLK2+hnbC2SLnPTZntPkT5pAEJc6NJcbCT5z2mzKeedHllDjoKBpvkuob4vuKJNmJ7yY8Ux6JLZ6yssJKeyXvevDeQ/yTJVDTOOOhNUQC+RX7lvQOub0IPayb4FuWT6GyyH/dplGhv8pu4BivpFgBtYC3yHCLIyfE08/cncQ1WWgfY93e0HK4x72eRBzNjUWkdYOsdhaS+d5vPHyEhc2KDlYC9W9SHZH6jkfv/2SCKPLMCDYgeQtf+zSFF+SR6pjiHPqt4CrgspChf1FH4nyzuCynKJ8vIb/y7QRV5Zh9u4zuQHOB/wXTcxh8GJgZV5Bn7kfou4MqwcsKwEngYOWuoUqVKlVT4D0pjfHbbAVIsAAAAAElFTkSuQmCC"
        />
        <h1>Grade</h1>
        <div>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<UserCard />);
            }}
          >
            Game Level
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<LineChart />);
            }}
          >
            Game Line Chart
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<PalorChart />);
            }}
          >
            Game Polar Chart
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => {
              setRenderF(<RadarChart />);
            }}
          >
            Test Radar Chart
          </Button>
        </div>
        <div className="chart">{renderF}</div>
      </div>
    </div>
  );
}
