import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import {
  BsBagPlus,
} from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiTakeMyMoney, GiSellCard } from "react-icons/gi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const CategoryReport = () => {
  const options = {
    chart: {
      type: "line",
      borderRadius: "5",
      borderColor: "#335cad",
    },
    title: {
      text: " Figures",
      style: { color: "green", fontSize: "22px" },
      align: "left",
    },
    series: [
      {
        name: "Item Sold",
        data: [1, 2, 1, 4, 3, 6, 9, 4, 1, 8, 3, 5],
      },
      {
        name: "Net Sales",
        data: [1, 3, 1, 3, 2, 5, 1, 4, 1, 8, 3, 5],
      },
      {
        name: "Orders",
        data: [2, 1, 6, 7, 4, 6, 2, 4, 1, 8, 3, 5],
      },
    ],
    xAxis: {
      categories: [
        "1",
        "3",
        "5",
        "7",
        "9",
        "11",
        "13",
        "15",
        "17",
        "19",
        "21",
        "23",
      ],
    },
    yAxis: {
      categories: ["0", "200", "400", "600", "800", "1000"],
    },
  };
  const columns = [
  
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "260px",
    },
    {
      name: "Item Sold",
      selector: (row) => row.isold,
      sortable: true,
      center: true,
    },
    {
      name: "Net Revenue",
      selector: (row) => row.net,
      sortable: true,
      
    },

    {
      name: "Orders",
      selector: (row) => row.order,
      sortable: true,
      
    },
    {
      name: "Products",
      selector: (row) => row.product,
      sortable: true,
     
    },
   
  ];

  const data = [
    {
      id: 1,
      net: "$250",
      isold: "25",
      category: <p className="reviewdesc"> Decoration Decoration </p>,
      product: "120",
      order:"12"
    },
    {
      id: 2,
      net: "$250",
      category: "Backpacks",
      order: "120",
      products: "$14",
      isold: "25",
    },
    {
      id: 1,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",


    },
    {
      id: 2,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
    {
      id: 1,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
    {
      id: 2,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
    {
      id: 1,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
    {
      id: 2,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
    {
      id: 1,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
    {
      id: 2,
      net: "$250",
      category: "Backpacks",
      order: "120",
      product: "25",
      isold: "25",

    },
  ];
  const [filterchange,setFilterchange] = useState('')
  const TimeChange = (e)=>{
    setFilterchange(e.target.value)
          }
  return (
    <div>
      <h2>Category Report</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
      <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={TimeChange}
            >
              <option>Search by category</option>
              <option value="1">1 day</option>
              <option value="2">1 week</option>
              <option value="3">current month</option>
              <option value="4">last month</option>
              <option value="5">last 6  month</option>
              <option value="6">custom month</option>
              <option value="7">custom date</option>

            </Form.Select>
          </div>
          {filterchange==='7'?
          <>
      <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        </>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
        </div> : null}
        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} />
        </div>
        <div className="col-md-auto col-sm-6 aos_input">
        <DropdownButton id="dropdown-variant-success" title="Download" variant="button main_button">
      <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Pdf</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
        </div>
      </div>

        {/* upload */}

        {/*  */}
        {/* box */}
        <div className="col-12 px-3">
          {/* card */}
          <div className=" row main_dashboard_row1 d-flex mb-3 ">
           {/* item sold */}
           <div className="card py-2 px-4 col-4 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiSellCard className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Item Sold</h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <h3>2,356</h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* net */}
            <div className="card py-2 px-4 col-4 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mx-2" />
                <h5 className="text-success">Net Sales </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <h3>2,356</h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* net end */}
            {/* order */}
            <div className="card py-2 px-4 col-4 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsBagPlus className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Orders </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                      <h3>2,356</h3>
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        <HighchartsReact highcharts={Highcharts} options={options} />

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body categoryreport_table"}
        />
      </div>
    </div>
  );
};

export default CategoryReport;