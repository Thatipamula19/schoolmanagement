const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employee = require("../models/employee");

exports.addEmployee = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const employee = Employee({
            username: req.body.username,
            password: hash,
            fullname: req.body.fullname,
            gender: req.body.gender,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address
        });
        employee.save().then(addEmployee => {
            console.log(addEmployee);
            res.status(201).json({
                message: "Employee Added SuccessFully!",
                employee: {
                    ...addEmployee,
                    id: addEmployee._id
                }
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: "Adding Empployee Failed!"
        });
    });



}

exports.getEmployees = (req, res, next) => {
    Employee.find().then(employees => {
        res.status(200).json({
            message: "Employees Fethed Successfully",
            employees: employees
        })
    }).catch(err => {
        res.status(500).json({
            message: "Fetched Employee Failed!"
        });
    });
}

exports.employeeLogin = (req, res, next) => {
    let fetchedEmployee;

    Employee.findOne({ username: req.body.username }).then(employee => {
        if (!employee) {
            res.status(401).json({
                message: " Invalid UserName"
            })
        }

        fetchedEmployee = employee;
        return bcrypt.compare(req.body.password, employee.password);
    }).then(result => {
        console.log(result);
        if (!result) {
            res.status(401).json({
                message: "Invalid Password"
            })
        }
        const token = jwt.sign(
            { username: fetchedEmployee.username, employeeId: fetchedEmployee._id },
            "secret_this_is_employee_login",
            { expiresIn: "1h" }
        );
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            employeeId: fetchedEmployee._id
        })
    }).catch(err => {
        res.status(500).json({
            message: "Employee Login Failed!"
        });
    });

}
