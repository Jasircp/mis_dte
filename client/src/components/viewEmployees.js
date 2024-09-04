import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);

    const editEmployee = async(id)=>{
      try {
        
      } catch (error) {
        console.error(error.message);
      }
    }

    const deleteEmployee = async (id)=>{
        try {
            const deleteEmployee = await fetch(`http://localhost:5000/employee/${id}`,
                {
                    method: "DELETE"
                }
            );
        } catch (error) {
            console.error(error.message);
        }
        window.location = "/";
    }

  const getEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/employee");
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Fragment>
      <div className="container mt-5">
      <h1 className="text-center mb-5">Employees</h1>
      <table className="table table-striped table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>College</th>
            <th>Post</th>
            <th>Join Date</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.emp_name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>{employee.college}</td>
              <td>{employee.post}</td>
              <td>{employee.join_date}</td>
              <td>
                <button 
                onClick={()=> editEmployee(employee.emp_id)}
                className="btn btn-warning btn-sm">Edit</button>
              </td>
              <td>
                <button
                  onClick={() => deleteEmployee(employee.emp_id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="text-center m-5">
      <Link to="/"><button className="btn btn-info">Go Back</button></Link>
    </div>
    </Fragment>
  );
};

export default ViewEmployees;
