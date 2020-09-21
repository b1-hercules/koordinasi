import React, {useEffect, useState} from 'react';
import './App.css';
import EmployeeTable from './tables/employeeTable'
import axios from 'axios';
import {Button, Card} from "antd";
import history from "./history";
import Header from "./header";

const App = () => {

    const [empData, setEmpData] = useState([]);

    const URL = `http://25.22.95.51:9010/main`;

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
                        onClick={() => history.push('/form')}
                    >
                        Add an Employee
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default App;
