import React, { useEffect, useState } from "react";
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
import axios from "axios";
import moment from "moment/moment";
import Select from 'react-select'

const ProductReport = () => {
 
  var NetSales=[];
  var Order=[];

  


  const [filterchange,setFilterchange] = useState('')

  const [getProduct, setGetProduct]= useState([])
  const [tableProduct, setGetTableProduct]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [ProductSearch,setProductSearch]=useState("")
  const [ProductError,setProductError]=useState("")
  const [venderList,setVenderList]=useState([])
  const[vendorId,setVendorId]=useState("")
  const[category,setCategory]=useState([])
  const[categoryId,setCategoryId]=useState("")
  const [brand,setBrand]=useState([])
  const[brandName,setBrandName]=useState([])
  const[location,setLocation]=useState([])





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
   if(value===3){
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

fetchData()

  }

   
  
  const fetchData=()=>{
    console.log( "from_date---"+fromDate)
    console.log( "to_date---"+toDate)
   

    axios.post(`${process.env.REACT_APP_BASEURL}/products_report`
    ,
    {
      "from_date":fromDate,
      "to_date":toDate,
      vendors_id:vendorId,
      categorys:categoryId,
      user_locations:location,
      brand:brandName
  }
    ).then((response) => {
        //  console.log('product data-all---'+JSON.stringify(response.data))
        //  console.log('product data [0] [0]--'+JSON.stringify(response.data[0][0]))
        // console.log('Product data'+JSON.stringify(response.data[1]))
        console.log('Product Error=======---------'+JSON.stringify(response.data.message))



        if(response.data.message=="No_Data"){
          setProductError(response.data.message)
          setGetProduct([0])
          setGetTableProduct([0])
        
   
        }
        else{


          setProductError('')
          setGetProduct(response.data[0][0])
          setGetTableProduct(response.data[1])
          setapicall(false)
       
        }
     
         
      
    }).catch(function (error) {
      console.log(error);
    });

  }


  const VenderData= async()=>{
    let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
     console.log("vendor----"+JSON.stringify(result.data))
    if(result.data){
      setVenderList(result.data)
    }
    
 }


 const CategoryData= async()=>{
  let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/category?category=all`)
  // console.log(result.data)
  if(result.data){
    setCategory(result.data)
  }
  
}


const BrandData= async()=>{
let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/brand_list`)

 console.log("Brand data-----"+ JSON.stringify(result.data))
if(result.data){
  setBrand(result.data)
}

}



          useEffect(() => {

          fetchData();
          VenderData();
          CategoryData();
          BrandData();  
           
          }, [apicall]);

          
      const submitHandler=()=>{
       
        setapicall(true)
         fetchData()
       }
            

      


    // getProduct.forEach((item,key)=>{
      
    //  ItemSold.push(item.product_count)
    // //  NetSales.push(item.net_sales)
    // //  Order.push(item.order_count)
    // })
    var ItemSold=getProduct.product_count;
    var NetSales=getProduct.net_sales;
    var Order=getProduct.order_count;
    console.log("Item Sold ------"+ItemSold)
    console.log("Net sales ------"+NetSales)
    console.log("Order ------"+Order)
    // // console.log("Net Sales ------"+ NetSales)
    // // console.log("Order ------"+ Order)


    const options = {
      chart: {
        type: "bar",
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
          data: [ItemSold],
        },
        {
          name: "Orders",
          data: [Order],
        },
        {
          name: "Net Sales",
          data: [NetSales],
        }
       
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
        name: "Sku",
        selector: (row) => row.product_id,
        sortable: true,
        width: "150px",
      },
      {
        name: "Product Name",
        selector: (row) => row.product_name,
        sortable: true,
        width: "160px",
      },
  
      {
        name: "Item Sold",
        selector: (row) => row.product_name,
        sortable: true,
        width: "140px",
        center: true,
      },
      {
        name: "Category",
        selector: (row) => row.category_name,
        sortable: true,
        width: "190px",
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
        name: "Orders",
        selector: (row) => row.order_count,
        sortable: true,
        width: "150px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Stock",
        selector: (row) => row.product_count,
        sortable: true,
        width: "140px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Status",
        selector: (row) => row.product_count,
        sortable: true,
        width: "100px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
    ];


    const options1 = [
      brand.map((item)=>(
        { value: `${item.brand}` ,label:`${item.brand}` }
      ))
    ]
    
    let  arrr=[];
    
    const brandHandler=(e)=>{
    
     arrr=[]
      e.map((item)=>{
       
      arrr.push(item.value)
      
      })
      setBrandName(arrr)
     
     }
    
    
    
    //  console.log("$$$$$$------"+JSON.stringify(brandName[0]))
    const options2 = [
      venderList.map((item)=>(
        { value: `${item.id}` ,label:`${item.shop_name}` }
      ))
    ]
    
     let  vendorArray=[];
    
     const VendorHandler=(e)=>{
    
      vendorArray=[]
       e.map((item)=>{
        
       vendorArray.push(item.value)
       
       })
       setVendorId(vendorArray)
      
      }
    
    console.log("$$$$$$------"+JSON.stringify(vendorId[0]))
    
     
    const options3 = [
      category.map((item)=>(
        { value: `${item.id}` ,label:`${item.category_name}` }
      ))
    ]
    
    
    let  CategoryArray=[];
    
    const categoryHandler=(e)=>{
    
     CategoryArray=[]
      e.map((item)=>{
       
      CategoryArray.push(item.value)
      
      })
      setCategoryId(CategoryArray)
     
     }
    
    
    
    
      
     const options4 = [
    
      { value: "indore" ,label:"Indore" },
      { value: "bhopal" ,label:"Bhopal" },
      { value: "dhar" ,label:"Dhar" },
      { value: "khandwa" ,label:"Khandwa" },
      { value: "khargone" ,label:"Khargone" },
    
    ]
    var  SearchArray=[]
    const SearchHandler=(e)=>{
    
    SearchArray=[]
     e.map((item)=>{
      
      SearchArray.push(item.value)
     
     })
     setLocation(SearchArray)
    
    }
    
   



  return (
    <div>
      <h2>Product Report</h2>
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
              <option name="today" value={1}>Today</option>
              <option name="yesterday" value={2}>yesterday</option>
              <option name="last_week" value={3}>Last week</option>
              <option name="last_month" value={4}>last month</option>
              <option name="last_6_month" value={5}>last 6  month</option>
              {/* <option value="6">custom month</option> */}
              <option value="7">custom date</option>

            </Form.Select>
          </div>
 

          <div className="col-md-3 col-sm-6 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Vendor"
              onChange={VendorHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options2[0]} 
            />
            
            </div>


            <div className="col-md-3 col-sm-6 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Brand"
              onChange={brandHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options1[0]} 
            />
         
            </div>

            <div className="col-md-3 col-sm-6 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Category"
              onChange={categoryHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options3[0]} 
            />
         
            </div>

            <div className="col-md-3 col-sm-6 mt-3 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Location"
              onChange={SearchHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options4} 
            />
         
            </div>
  
          {filterchange==='7'?
          <div className="col-md-3 col-sm-6 mt-3 d-flex aos_input">
      <div className="col-6  aos_input">
        <input type={"date"} plchldr={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'} />
        </div>
        
        <div className="col-6 aos_input">
        <input type={"date"} plchldr={"Search by date"}onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'}/> 
        </div>
        </div>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
        </div> : null}

        <div className="col-md-auto col-sm-6 mt-3 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler}  />
        </div>
        <div className="col-md-auto col-sm-6 mt-3 aos_input">
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
                      <h3>
                      {console.log("Product error----"+ProductError)}
                  {console.log(" Product count---===="+getProduct.product_count)}
                        { (ProductError)=="No_Data"||(getProduct.product_count)==null||(getProduct.product_count)==undefined||(getProduct.product_count)==""? <h3>No Record</h3>:  <h3>{getProduct.product_count}</h3> }  
                        </h3>
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
                    { (ProductError)=="No_Data"||(getProduct.net_sales)==null||(getProduct.net_sales)==undefined||(getProduct.net_sales)==""? <h3>No Record</h3>:  <h3>{getProduct.net_sales}</h3> }  
                     
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
                     
                      { (ProductError)=="No_Data"||(getProduct.order_count)==null||(getProduct.order_count)==undefined||(getProduct.order_count)==""? <h3>No Record</h3>:  <h3>{getProduct.order_count}</h3> }  
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

            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        {(getProduct.product_count)||(getProduct.net_sales)||(getProduct.order_count)?<HighchartsReact highcharts={Highcharts} options={options} />:null}
        

        {/*  */}

        {/* datatable */}


        <DataTable
          columns={columns}
          data={tableProduct}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body productreport_table"}
        />
      </div>
    </div>
  );
};

export default ProductReport;
