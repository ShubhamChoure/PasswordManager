"use client";

import NavBar from "@/components/NavBar";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [passList, setPassList] = useState([]);
  const [formData,setFormData]=useState({website:"",username:"",password:""});
  const [showPass,setShowPass]=useState(false);
  const isEditing = useRef(false);
  const editId = useRef("");

  const switchPass=()=>{
        setShowPass(!showPass);
  }
  const onInputChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const onClickEdit = (e,item) => {
    isEditing.current = true;
    editId.current = item.passId;
    let newData = {website:item.website,username:item.username,password:item.password};
    setFormData(newData);             
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    
    console.log("isEditing = " + isEditing.current + " " + editId.current);
    if (!isEditing.current) {
      let newId = uuidv4();
      let eWithId = { ...formData, passId: newId + "" };
      let res = await fetch("/api/add", {
        method: "POST",
        body: JSON.stringify(eWithId),
        headers: {
          "Content-type": "application/json",
        },
      });
      toast("Password Saved");
      setFormData({website:"",username:"",password:""});
      setAllData();
    } else {
      isEditing.current = false;

      let newData = { ...formData, passId: editId.current };
      console.log(newData);
      let response = await fetch("/api/editData", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-type": "application/json",
        },
      });
      toast("Password Updated");
      setFormData({website:"",username:"",password:""});
      setAllData();
    }
  };

  const onClickDelete = async (e, itemId) => {
    await fetch("/api/deleteData", {
      method: "POST",
      body: JSON.stringify({ passId: itemId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    toast("Deleted");
    setAllData();
  };

  const setAllData = async () => {
    let res = await fetch("/api/allData", { method: "POST" });
    let resJson = await res.json();
    let resParsed = JSON.parse(resJson);
    setPassList(resParsed);
  };

  const onCopyClick = (e, itemId) => {
    console.log(e.target.name);
    let data = passList.find((item) => item.passId == itemId);
    console.log(data);
    let purpose = e.target.id;
    if (purpose == "website") {
      navigator.clipboard.writeText(data.website);
      toast(`Website Copied`);
    } else if (purpose == "username") {
      navigator.clipboard.writeText(data.username);
      toast(`username Copied`);
    } else if (purpose == "password") {
      navigator.clipboard.writeText(data.password);
      toast(`password Copied`);
    }
  };

  useEffect(() => {
    setAllData();
  }, []);

  useEffect(() => {
    console.log(passList);
  }, [passList]);

  return (
    <>
      <Script src="https://cdn.lordicon.com/lordicon.js"></Script>
      <Script src="https://unpkg.com/react@16.0.0/umd/react.production.min.js"></Script>
      <Script src="https://unpkg.com/react-copy-to-clipboard/build/react-copy-to-clipboard.js"></Script>
      <ToastContainer />
      <div className=" h-screen w-screen bg-green-50 flex flex-col items-center">
        <NavBar />
        <div className=" flex flex-col mt-14 gap-1">
          <div className="logo text-3xl text-black font-extrabold text-center h-fit">
            <span className=" text-green-400">&lt;</span>Pass
            <span className=" text-green-400">OP/&gt;</span>
          </div>
          <span className=" text-center text-base">
            Your Own Password Manager
          </span>
        </div>

        <form
          action=""
          className=" flex flex-col justify-center items-center gap-5 mt-5"
          onSubmit={(e)=>{onFormSubmit(e)}}
        >
          <input
            type="text"
            placeholder="Enter Website URL"
            name="website"
            onChange={(e)=>{onInputChange(e)}}
            className=" px-3 w-[80vw] rounded-xl border-2 border-green-200"
            value={formData.website}
          />
          <div className="flex justify-between w-[80vw]">
            <input
              type="text"
              placeholder="User Name"
              name='username'
              onChange={(e)=>{onInputChange(e)}}
              className=" px-3 w-[55vw] rounded-xl border-2 border-green-200"
              value={formData.username}
            />

            <div className="w-[20vw] h-fit relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                name='password'
                onChange={(e)=>{onInputChange(e)}}
                className=" px-3 w-full rounded-xl border-2 border-green-200"
                value={formData.password}
              />
              {!showPass && (
                <Image
                  src="/showPass.png"
                  height={25}
                  width={25}
                  className=" absolute right-2 bottom-[1px] hover:cursor-pointer"
                  onClick={switchPass}
                ></Image>
              )}
              {showPass && (
                <Image
                  src="/closeEye.png"
                  height={30}
                  width={30}
                  className=" absolute right-2 bottom-2 hover:cursor-pointer"
                  onClick={switchPass}
                ></Image>
              )}
            </div>
          </div>
          <button
            className="flex justify-center items-center m-5 h-fit w-fit py-2 px-3 rounded-full bg-green-400 hover:cursor-pointer hover:scale-110 transition-transform" 
            type="submit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/slmechys.json"
              trigger="hover"
            ></lord-icon>
            <span>Save</span>
          </button>
        </form>
        <div className="list w-[80vw] bg-green-700">
          <div className=" text-center text-white font-bold">Site</div>
          <div className=" text-center  text-white font-bold">Username</div>
          <div className=" text-center  text-white font-bold">Password</div>
          <div className=" text-center  text-white font-bold">Actions</div>
        </div>
        <div className="list w-[80vw] bg-green-200 text-center pb-5">
          {passList.map((item) => {
            return (
              <>
                <div className="flex items-center justify-center">
                  {item.website}{" "}
                  <lord-icon
                    src="https://cdn.lordicon.com/depeqmsz.json"
                    trigger="hover"
                    id="website"
                    onClick={(e) => {
                      onCopyClick(e, item.passId);
                    }}
                  ></lord-icon>
                </div>
                <div className="">
                  {item.username}
                  <lord-icon
                    src="https://cdn.lordicon.com/depeqmsz.json"
                    trigger="hover"
                    id="username"
                    onClick={(e) => {
                      onCopyClick(e, item.passId);
                    }}
                  ></lord-icon>
                </div>
                <div className="">
                  ********
                  <lord-icon
                    src="https://cdn.lordicon.com/depeqmsz.json"
                    trigger="hover"
                    id="password"
                    onClick={(e) => {
                      onCopyClick(e, item.passId);
                    }}
                  ></lord-icon>
                </div>
                <div className="flex justify-center gap-2">
                  <lord-icon
                    src="https://cdn.lordicon.com/ogkflacg.json"
                    trigger="hover"
                    onClick={(e) => {
                      onClickEdit(e,item);
                    }}
                  ></lord-icon>
                  <lord-icon
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    onClick={(e) => {
                      onClickDelete(e, item.passId);
                    }}
                  ></lord-icon>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
