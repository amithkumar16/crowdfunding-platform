"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateprofile } from "@/actions/useractions";

const Dashboard = () => {
  const { data: session, status,update } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    razorpay_id: "",
    credentials: "",
  });

  useEffect(() => {
    if (status === "loading") return; // Wait for session to resolve

    if (!session) {
      router.push("/login");
    } else {
      getdata();
    }
    console.log(session)
  }, [router, session, status]);
  
  const getdata = async()=>{
    let u = await fetchuser(session.user.name)
    setForm(u)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    let a=await updateprofile(e,session.user.name)
    alert("profile updated")  
  };


  return (
    <>
      <div className="container flex flex-col w-1/2 justify-center items-center mx-auto">
        <h1 className="text-3xl font-bold text-white my-3">
          Welcome to your dashboard
        </h1>
        <form action={handleSubmit} className="w-full">
          <div className="w-full mb-4">
            <label htmlFor="name" className="block text-white mb-1">Name</label>
            <input
              id="name"
              name="name"
              value={form.name?form.name:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="email" className="block text-white mb-1">Email</label>
            <input
              id="email"
              name="email"
              value={form.email?form.email:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="username" className="block text-white mb-1">Username</label>
            <input
              id="username"
              name="username"
              value={form.username?form.username:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="profilepic" className="block text-white mb-1">Profile Picture</label>
            <input
              id="profilepic"
              name="profilepic"
              value={form.profilepic?form.profilepic:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="text"
              placeholder="Enter profile picture URL"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="coverpic" className="block text-white mb-1">Cover Picture</label>
            <input
              id="coverpic"
              name="coverpic"
              value={form.coverpic?form.coverpic:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="text"
              placeholder="Enter cover picture URL"
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="razorpay_id" className="block text-white mb-1">razor pay id</label>
            <input
              id="razorpay_id"
              name="razorpay_id"
              value={form.razorpay_id?form.razorpay_id:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="text"
              placeholder="Enter razorpay id"
            />
          </div><div className="w-full mb-4">
            <label htmlFor="razorpay_secret" className="block text-white mb-1">razorpay secret</label>
            <input
              id="razorpay_secret"
              name="razorpay_secret"
              value={form.razorpay_secret?form.razorpay_secret:""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700"
              type="text"
              placeholder="Enter razorpay secret"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-3"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
