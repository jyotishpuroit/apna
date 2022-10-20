import React from 'react';
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const CustomerReport = () => {
    const columns = [
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true,
          width:"170px"

        },
        {
          name: "User Name",
          selector: (row) => row.uname,
          sortable: true,
          width: "200px",
        },
       
        {
          name: "Last Active",
          selector: (row) => row.lactive,
          sortable: true,
          width:"150px"

          
        },
        {
          name: "Sign Up",
          selector: (row) => row.signup,
          sortable: true,
          width:"150px"

        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            width:"210px"

          }, 
          {
            name: "Order",
            selector: (row) => row.order,
            sortable: true,
            width:"120px"
          },
          {
            name: "Total Spend",
            selector: (row) => row.spend,
            sortable: true,
            width:"130px"

          },
      ];
    
      const data = [
        {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        },
        {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        }, {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        }, {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        }, {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        }, {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        }, {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        }, {
          id: 1,
          name: "Newton",
          uname: "Nicolas Edison",
          lactive:"23 Sep,2022",
          signup:"21 Oct,2025",
          email:"newton@gmail1524/.com",
          order:"25",
          spend:"$250.2",
        },
      ];
    return (
        <div>
              <h2>Customer Report</h2>
              {/* search bar */}
      <div className="card mt-3 p-3 ">
      <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <DropdownButton id="dropdown-variant-success" title="Download" variant="button main_button w-100">
      <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Pdf</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
        </div>
      </div>
       {/* datatable */}
   
       <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        className={"productlist_table"}
      />
      </div>

        </div>
    );
}

export default CustomerReport;
