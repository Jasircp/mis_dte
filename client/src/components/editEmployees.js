import React, {Fragment, useState} from "react";

const editEmployee = ({employee})=>{
    const [empName , setEmpname] = useState(employee.emp_name)
    const [email , setEmail] = useState(employee.email)
    const [phone , setPhone] = useState(employee.phone)
    const [college , setCollege] = useState(employee.college)
    const [post , setPost] = useState(employee.post)
    const [joindate , setjoinDate] = useState(employee.joindate)
}