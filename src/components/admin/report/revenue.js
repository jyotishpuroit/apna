import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import moment from "moment/moment";
import {
    BsCashCoin
  } from "react-icons/bs";
import { HiOutlineReceiptRefund,HiOutlineGift } from "react-icons/hi";
import {AiOutlineArrowRight}  from "react-icons/ai";
import {GiTakeMyMoney,GiPayMoney}  from "react-icons/gi";
import {MdOutlineLocalShipping}  from "react-icons/md";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ApexCharts from 'apexcharts'
import ReactApexChart from "react-apexcharts";




const RevenueReport = () => {

  
 
  const [filterchange,setFilterchange] = useState('')

  const [getRevenue, setGetRevenue]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [tabledate, setTabledata]=useState([]) 
   const [RevenueError,setRevenueError]=useState("")
   const [venderList,setVenderList]=useState([])

  var GrossAmmount=[];
  var totalSales=[];
  var totalGSt=[];
  var TotalShipping=[];
  var NetSales=[];
  var Discount=[]

  // var Refund=[]

  // const [fromDate, setFrom]



  const [option,setOption]=useState(
    {
  
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: []  ,
    markers: {
      size: 0
    },
    xaxis: {
      type: ''
    },
    yaxis: {
      title: {
        text: 'Points',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
    
        }
      }
    }
  }
  )


  const [series,setSeries]=useState([
 
   {
    name: 'TEAM B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  }, 
  {
    name: 'TEAM C',
    type: 'line',
    data: [30, 25, 36, 30, 70, 35, 64, 52, 45, 36, 39]
  },

  {
    name: 'TEAM D',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }

])
 


// setSeries([
 
//   {
//    name: 'TEAM B',
//    type: 'area',
//    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//  }, 
//  {
//    name: 'TEAM C',
//    type: 'line',
//    data: GrossAmmount
//  },

//  {
//    name: 'TEAM D',
//    type: 'line',
//    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//  }

// ])





  // setOption( {
  
  //   chart: {
  //     height: 350,
  //     type: 'line',
  //     stacked: false,
  //   },
  //   stroke: {
  //     width: [0, 2, 5],
  //     curve: 'smooth'
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '50%'
  //     }
  //   },
    
  //   fill: {
  //     opacity: [0.85, 0.25, 1],
  //     gradient: {
  //       inverseColors: false,
  //       shade: 'light',
  //       type: "vertical",
  //       opacityFrom: 0.85,
  //       opacityTo: 0.55,
  //       stops: [0, 100, 100, 100]
  //     }
  //   },
  //   labels: GrossAmmount,
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'value'
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Points',
  //     },
  //     min: 0
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: function (y) {
  //         if (typeof y !== "undefined") {
  //           return y.toFixed(0) + " points";
  //         }
  //         return y;
    
  //       }
  //     }
  //   }
  // })




    const options = {
        chart: {
          type: 'spline',
          borderRadius:'5',
          borderColor:'#335cad'
        },
        title: {
            text: ' Figures',
            style:{ "color": "green", "fontSize": "22px" },
            align:"left"
          },
        series: [
          {
            name:"Gross Revenue",
            data:GrossAmmount
          },
     
          {
            name:"Discount",
            data:Discount
          },
          {
            name:"Taxes",
            data: totalGSt
          },
          {
            name:"Net Revenue",
            data:NetSales
          },
          {
            name:"shipping",
            data:TotalShipping
          },

          {
            name:" Total Refund",
            data:[getRevenue.return_total]
          },
          
          {
            name:"Coupon",
            data:[getRevenue.total_discount]
          },
          {
            name:" Total Shipping Charge",
            data:[getRevenue.total_shipping_charges]
          },
          {
            name:"Taxes",
            data:[getRevenue.total_gst]
          },

          {
            name:"Total Sales",
            data:[getRevenue.net_sale]
          }
        ],
        xAxis: {
            categories:GrossAmmount
        },
        yAxis: { 
          
          categories:totalSales
      },
      };


/////////////////////////////////////////////////New Apexchart //////////////////////////////////////////////

// var  Chartoptions = {
//   series: [
//   {
//     name: "High - 2013",
//     data: [28, 29, 33, 36, 32, 32, 33]
//   },
//   {
//     name: "Low - 2013",
//     data: [12, 11, 14, 18, 17, 13, 13]
//   }
// ],
//   chart: {
//   height: 350,
//   type: 'line',
//   dropShadow: {
//     enabled: true,
//     color: '#000',
//     top: 18,
//     left: 7,
//     blur: 10,
//     opacity: 0.2
//   },
//   toolbar: {
//     show: false
//   }
// },
// colors: ['#77B6EA', '#545454'],
// dataLabels: {
//   enabled: true,
// },
// stroke: {
//   curve: 'smooth'
// },
// title: {
//   text: 'Average High & Low Temperature',
//   align: 'left'
// },
// grid: {
//   borderColor: '#e7e7e7',
//   row: {
//     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//     opacity: 0.5
//   },
// },
// markers: {
//   size: 1
// },
// xaxis: {
//   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   title: {
//     text: 'Month'
//   }
// },
// yaxis: {
//   title: {
//     text: 'Temperature'
//   },
//   min: 5,
//   max: 40
// },
// legend: {
//   position: 'top',
//   horizontalAlign: 'right',
//   floating: true,
//   offsetY: -25,
//   offsetX: -5
// }
// };






















    const columns = [
        {
          name: "Date",
          selector: (row) => (
              row.uniquedates
          ),
          sortable: true,
          width: "170px",
          center: true,
        }
        ,
        {
          name: "Vendor list",
          selector: (venderList) => venderList.id,
          sortable: true,
          width: "150px",
        },
        {
          name: "Gross Revenue",
          selector: (row) => row.gross_amount,
          sortable: true,
          width: "150px",
        },
        {
          name: "Total GST",
          selector: (row) => row.total_gst,
          sortable: true,
          width: "150px",
        },
        {
          name: "Discount",
          selector: (row) => row.discount,
          sortable: true,
          width: "150px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
      
        {
          name: "Taxes",
          selector: (row) => row.return_value,
          sortable: true,
          width: "150px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
        {
          name: "Shipping",
          selector: (row) => row.total_shipping_charges,
          sortable: true,
          width: "160px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
        {
            name: "Net Revenue",
            selector: (row) => row.net_sales,
            sortable: true,
            width: "150px",
            center: true,
            style: {
              paddingRight: "32px",
              paddingLeft: "0px",
            },
          },

          {
            name: "Total Revenue",
            selector: (row) => row.total_sales,
            sortable: true,
            width: "150px",
            center: true,
            style: {
              paddingRight: "32px",
              paddingLeft: "0px",
            },
          },
        
       
      ];
      
      


      const TimeChange = (e)=>{
        setFilterchange(e.target.value)

        let value = e.target.value;
        console.log("---------------------------------------------"+value);
        if(value==1){
          setFromDate(moment().format("YYYY-MM-DD"))
          console.log("From date"+e.target.value)
          console.log("today")
          setToDate(moment().format("YYYY-MM-DD"))
        }

        if(value==2){
          setFromDate(moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD'));
          console.log("From date"+e.target.value);
         
          setToDate( moment().format("YYYY-MM-DD"));
          console.log("yesterday--"+moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'));

        }
       if(value==3){
          setFromDate( moment().subtract(1, 'weeks').startOf('weeks').format('YYYY-MM-DD')  );
        
          console.log("From date"+e.target.value)
          
          setToDate( moment().format("YYYY-MM-DD")  );
          // console.log("last week"+moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'))
       
       }

       if(value==4){
       

        setFromDate(moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD'));
        console.log("From last month"+e.target.value)
        setToDate(  moment().format("YYYY-MM-DD")    );
        // setToDate("2022-12-14");
  
        
     }
     if(value==5){
      setFromDate(moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD') );
      console.log("From last 6 month"+e.target.value)
      setToDate( moment().format("YYYY-MM-DD") );
   }
      }


      const fetchData=()=>{
        console.log( "from_date---"+fromDate)
        console.log( "to_date----"+toDate)
          axios.post(`${process.env.REACT_APP_BASEURL}/revenue`
        ,
         {
           "from_date":fromDate,
              "to_date":toDate,
              "vendors_id":[],
              "categorys":[],
              "user_locations":[],
              "brand":[]
        }
        ).then((response) => {
            // console.log('revenue data'+JSON.stringify(response.data))
            // console.log(" revenue error"+JSON.stringify(response))


                
            if(response.data.message=="no_data"){
              setRevenueError(response.data.message)
              
                setGetRevenue([0])
              setTabledata([0])
       
            }
            else{


              setRevenueError('')
               setGetRevenue(response.data[0])
              setTabledata(response.data[0].ravenue_date_data)
             
           
            }
       

          

         
        }).catch(function (error) {
          console.log(error);
          
        });
       } 

       const VenderData= async()=>{
          let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
          console.log(result.data)
          if(result.data){
            setVenderList(result.data)
          }
          
       }

       


       


      useEffect(() => {
    
    
        fetchData();
        VenderData();
    
       
      }, [ apicall]);
        



      const submitHandler=()=>{
       
       setapicall(true)
        fetchData()
      }



      // console.log("get revenue------"+JSON.stringify(getRevenue))
      // console.log("data====="+ JSON.stringify(tabledate))
      


      


  

     tabledate.map((item)=>{

      GrossAmmount.push(item.gross_amount)
      totalSales.push(item.total_sales)
      totalGSt.push(item.total_gst)
       TotalShipping.push(item.total_shipping_charges)
       NetSales.push(item.net_sales)
       Discount.push(item.discount)

     })


  

 
    //  console.log("gross ammount ------"+GrossAmmount)
    //  console.log("total sales ------"+ totalSales)
    //  console.log("total GST ------"+ totalGSt)
    //  console.log("total Shipping ------"+ TotalShipping)
    //  console.log("net Sales ------"+ NetSales)
    //  console.log("Discount ------"+ Discount)
   

     
       



    return (
        <div>
              <h2>Revenue Report</h2>
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
              <option >Search by category</option>
              <option name="today" value={1}>Today</option>
              <option name="yesterday" value={2}>yesterday</option>
              <option name="last_week" value={3}>Last week</option>
              <option name="last_month" value={4}>last month</option>
              <option name="last_6_month" value={5}>last 6  month</option>
              {/* <option name="custom_month" value="6">custom month</option> */}
              <option name="custom_date" value="7">custom date</option>

            </Form.Select>


            
            </div>

            <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={TimeChange}
            >
              <option >Search by Vendor ID</option>
              {
                venderList.map((item)=>{
                  return(
                    <>
                     <option  value={1}>{item.id}</option>
                    </>
                  )
                })
              }
              
          
     

            </Form.Select>


            
            </div>


           
          {filterchange==='7'?
         
          <>
             
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'}/>
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'}/>
        </div>
        </>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
       
        </div> : null}
        
        
        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler} />
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
            {/* revenue */}
            <div className="card p-2 col-2 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <BsCashCoin className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Gross Revenue </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.gross_total_amount)==null||(getRevenue.gross_total_amount)==undefined||(getRevenue.gross_total_amount)==""? <h3>No Record</h3>:  <h3>{getRevenue.gross_total_amount}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
            {/* Refund */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <HiOutlineReceiptRefund className="text-success h1 mx-2" />
                <h5 className="text-success">Refund </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.return_total)==null||(getRevenue.return_total)==undefined||(getRevenue.return_total)==""? <h3>No Record</h3>:  <h3>{getRevenue.return_total}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
{/* refund end */}
{/* coupon */}
<div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <HiOutlineGift className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Coupons </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.total_discount)==null||(getRevenue.total_discount)==undefined||(getRevenue.total_discount)==""? <h3>No Record</h3>:  <h3>{getRevenue.total_discount}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
            {/* tax */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <GiPayMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Taxes </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.total_discount)==null||(getRevenue.total_discount)==undefined||(getRevenue.total_discount)==""? <h3>No Record</h3>:  <h3>{getRevenue.total_gst}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
            {/* shipping */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <MdOutlineLocalShipping className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Shipping </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.total_shipping_charges)==null||(getRevenue.total_shipping_charges)==undefined||(getRevenue.total_shipping_charges)==""? <h3>No Record</h3>:  <h3>{getRevenue.total_shipping_charges}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
   
            {/* net */}
            <div className="card p-2 col-2 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Net Revenue </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  {(RevenueError)=="no_data"|| (getRevenue.net_sale)==null||(getRevenue.net_sale)==undefined||(getRevenue.net_sale)==""? <h3>No Record</h3>:  <h3>{getRevenue.net_sale}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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


            <div className="card p-2 col-2 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Total Sales </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.total_amount_with_shipping)==null||(getRevenue.total_amount_with_shipping)==undefined||(getRevenue.total_amount_with_shipping)==""? <h3>No Record</h3>:  <h3>{getRevenue.total_amount_with_shipping}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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

<HighchartsReact highcharts={Highcharts} options={options}  />

<div id="chart">
  <ReactApexChart options={option} series={series} type="line" height={350} />
</div>





{/*  */}


      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={tabledate }
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body revenue_table"}
      />

</div>




        </div>
    );
}

export default RevenueReport;
