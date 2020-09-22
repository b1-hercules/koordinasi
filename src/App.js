import React, {useEffect, useState} from 'react';
import './App.css';
import EmployeeTable from './tables/employeeTable'
import axios from 'axios';
import {Button, Card} from "antd";
import Header from "./header";
import {Link} from "react-router-dom";

const App = () => {

    const [empData, setEmpData] = useState([]);

    const URL = `http://25.22.95.51:9010/main`; //API kang andi
    //const URL = `https://spring-boot-angular6.herokuapp.com/main`

    const getDataEmployee = () => {

        axios.get(`${URL}/employees`)
            .then(response => {
                setEmpData(response.data)
            })
    }

    useEffect(() => {
        getDataEmployee()
    }, [])

    return (
        <div className="App">
            <Header />
            <div>
                <Card>
                    <h1 style={{fontSize: '42px'}}>Employees</h1>
                    <EmployeeTable datum={empData}/>
                    <Button
                        type="primary"
                    >
                        <Link to={{
                            pathname:`/form`,
                            dataRecord : {
                                form : 'add',
                            }
                        }}
                        >
                            Add an Employee
                        </Link>
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default App;
