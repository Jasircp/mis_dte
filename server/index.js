const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//add employee

app.post("/employee", async (req,res)=>{
    try {
        const{  empName, phone, email, college, post, joindate } = req.body;
        //id= select(id) query with college and post, order by date desc, top 1
        //CTP1   int.parse(id[3])
        //splice number append incremented nuber
        try {
            const empID = await pool.query(
                "SELECT emp_id FROM employees WHERE college = $1 AND post = $2 ORDER BY emp_id DESC LIMIT 1",
                [college, post]
            );
            
            // Check if any rows were returned
            if (empID.rows.length > 0) {
                var n = empID.rows[0].emp_id;
                var emp_id = n.slice(0,4)+String(parseInt(n[4])+1)
            } else {
                //first entry
                words=college.split(' ');
                const collegeInitials = words[0].charAt(0)+words[1].slice(0,2).toUpperCase();
                var postInitial
                if(post == 'Professor'){
                    postInitial = 'P';
                }
                else if(post == 'Associate Professor'){
                    postInitial = 'A';
                }
                else{
                    postInitial = 'S'
                }
                var emp_id = collegeInitials+postInitial+'1';
            }
        } catch (error) {
            console.error("Error executing query:", error.message);
        }
        
        const newEmployee = await pool.query("INSERT INTO employees (emp_id, emp_name, phone, email, college, post, join_date)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [emp_id, empName, phone, email, college, post, joindate]);
    } catch (error) {
        console.error(error.message);
    }
});

//show employees

app.get("/employee", async (req,res)=>{
    const viewEmployees = await pool.query("SELECT emp_id, emp_name, phone, email, college, post, TO_CHAR(join_date, 'YYYY-MM-DD') AS join_date FROM employees ORDER BY emp_id");
    res.json(viewEmployees.rows);
});

//delete an employee

app.delete("/employee/:id", async (req,res)=>{
    try {
        const { id } = req.params;
        const deleteEmployee = await pool.query("DELETE FROM employees WHERE emp_id = $1",[id]);
        res.json("Employee Deleted");
    } catch (error) {
        console.error(error.message);
    }
});

//edit an employee
app.put("/employee/:id", async (req,res)=>{
    try {
        const { id }=req.params;
        const{  empName, phone, email, college, post, joindate } = req.body;
        const editEmployee = await pool.query("UPDATE employees SET emp_name=$1, phone=$2, email=$3, college=$4, post=$5, join_date=$6 WHERE emp_id =$7",
            [empName, phone, email, college, post, joindate, id]
        );
        res.json("Updated");
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000,()=>{
    console.log("Server on port 5000");
});