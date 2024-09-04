import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const AddEmployee = ()=>{
    const [empName , setEmpname] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState("")
    const [college , setCollege] = useState("CET Trivandrum")
    const [post , setPost] = useState("Professor")
    const [joindate , setjoinDate] = useState("")

    const onSubmitForm = async e=>{
        e.preventDefault();
        try {
            const newEmployee = {
                empName,
                phone,
                email,
                college,
                post,
                joindate
            };
            
            const response = await fetch("http://localhost:5000/employee",
                {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(newEmployee)
                }
            );
            console.log(JSON.stringify(newEmployee));
        } catch (error) {
            console.error(error.message);
        }
        window.location = "/";
    }
    return (
        <Fragment>
             <h1 className="text-center my-3">Management Information System</h1>
            <form onSubmit={onSubmitForm} className="w-50 mx-auto p-4 shadow rounded bg-light">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" required value={empName}
                        onChange={e => setEmpname(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="phone">Mobile</label>
                    <input type="tel" id="phone" required className="form-control"
                        value={phone}
                        onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="college">College</label>
                    <select id="college" name="college" className="form-select"
                        value={college}
                        onChange={e => setCollege(e.target.value)}>
                        <option value="CET Trivandrum">CET Trivandrum</option>
                        <option value="GEC Thrissur">GEC Thrissur</option>
                        <option value="GEC Idukki">GEC Idukki</option>
                        <option value="GEC Palakkad">GEC Palakkad</option>
                        <option value="GEC Barton Hill">GEC Barton Hill</option>
                        <option value="GEC Kozhikkode">GEC Kozhikkode</option>
                        <option value="GEC Wayanad">GEC Wayanadu</option>
                        <option value="GEC Kannur">GEC Kannur</option>
                        <option value="RIT Kottayam">RIT Kottayam</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="post">Post</label>
                    <select id="post" name="post" className="form-select"
                        value={post}
                        onChange={e => setPost(e.target.value)}>
                        <option value="Professor">Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                    </select>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="joindate">Date</label>
                    <input type="date" id="joindate" required className="form-control"
                        value={joindate}
                        onChange={e => {
                            const selectedDate = new Date(e.target.value);
                            const today = new Date();

                            selectedDate.setHours(0, 0, 0, 0);
                            today.setHours(0, 0, 0, 0);

                            if (selectedDate > today) {
                                alert("Invalid Joining Date");
                                setjoinDate("");
                            } else {
                                setjoinDate(e.target.value);
                            }
                        }} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100" onClick={() => alert('Employee added successfully!')}>Add Employee</button>
            </form>
            <div className="text-center m-3">
            <Link to="/emp"><button className="btn btn-info">View Employees</button></Link>
            </div>
        </Fragment>
    )
};
export default AddEmployee;