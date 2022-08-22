import Header from "./Components/Header.jsx";
import SignUp from './Components/SignUp.jsx';
import SideBar from "./Components/SideBar.jsx";
import ItemForm from "./Components/ItemForm.jsx";
import FoodItems from './Components/FoodItems.jsx'
import OrderForm from "./Components/OrderForm.jsx";
import UpdateItemForm from './Components/UpdateItemForm';
import RiderForm from './Components/RiderForm.jsx';
import RegisterRiders from './Components/RegisterRiders';
import UpdateRiders from './Components/UpdateRiders.jsx';
import AssignRider from './Components/AssignRider.jsx';
import RiderTable from './Components/RiderTable.jsx';
import RecordFunction from './Components/RecordFunction.jsx';
import CancelOrderTable from './Components/CancelOrderTable.jsx';
import DeleteOrders from './Components/DeleteOrders.jsx';
import Footer from "./Components/Footer.jsx";
import UpdateIndRecord from './Components/UpdateIndRecord.jsx';
import UpdateCompRecord from './Components/UpdateCompRecord.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import axios from 'axios';
import "./App.css";

const App = () => {
const [login, setLogin] = useState(1);
const [getUsers, setGetUsers] = useState([]);

const [inputs, setInputs] = useState({
  Cnic:'',
  Password:''

})

const registerUsers = ()=>{
  axios.get(`https://api.khannburger.com/getRegisterUsersD.php?CNIC=`+inputs.Cnic)
  .then((res)=>{
  setGetUsers(res.data);
  // console.log(res.data);
  }).catch((error)=>{
    console.log(error);
  })
}


const SetLocalLogin= async ()=>{
  try{
    let userLogin = await AsyncStorage.getItem('login');
    let parsed = JSON.parse(userLogin);
    if(parsed !== null){
      setLogin(parsed);
    }
  }catch{
      return null;
  }
}

useEffect(()=>{
SetLocalLogin();
registerUsers();
},[])

const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
const SignIN = (e) => {
  e.preventDefault();
  getUsers.map((items)=>{
     if(inputs.Cnic=== items.CNIC && inputs.Password=== items.Password){
      AsyncStorage.setItem('login',JSON.stringify(2));
      setLogin(2);
          AsyncStorage.setItem('Cnic',JSON.stringify(inputs.Cnic));
      AsyncStorage.setItem('password',JSON.stringify(inputs.Password));
    }
    else if(inputs.Cnic === items.CNIC && inputs.Password=== items.Password){
        AsyncStorage.setItem('login',JSON.stringify(2));
      setLogin(2);
      AsyncStorage.setItem('Cnic',JSON.stringify(inputs.Cnic));
      AsyncStorage.setItem('password',JSON.stringify(inputs.Password));
    }
    else{
      toast.warn("Incorrect Credentials");

    }
    
  })
   
    setInputs({
      Cnic:'',
      Password:''
    });
}

if( login === 1){
  return( 
 <>
   <div className="bg-light text-dark" style={{paddingBottom:"10em"}}>
   <div  className="d-flex justify-content-center">
   <div className="login-box">
        <div className="login-logo">
          <a href="#">
            <b>RMS</b>
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Please Sign In</p>
            <form action="POST" method="post" onSubmit={SignIN}>
              <div className="input-group mb-3">
                <input
                  name="Cnic"
                  type="number"
                  className="form-control"
                  placeholder="Enter CNIC"
                  onChange={inputHandler}
                  value={inputs.Cnic}
                  onKeyUp={()=>{registerUsers()}}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  name="Password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={inputHandler}
                  value={inputs.Password}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                 <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>

              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              {/* <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
              </a> */}
            </div>
            {/* /.social-auth-links */}
            <p className="mb-1">
              <a href="/Login" onClick={()=>{alert("سروس فراہم کنندہ سے رابطہ کریں۔")}}>I forgot my password</a>
            </p>
            <p className="mb-0">
              <a  className="text-center" style={{cursor:"pointer"}}
              onClick={()=>{setLogin(3)}}
              >
                Register a new membership
              </a>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
      
  </div>
</div>
        <footer className="w-100 bg-transparent text-center mt-5">
          <p>©2021   <strong><a href="https://ussofts.netlify.app/">US-Softs</a> </strong>. All Rights Reserved | Terms and Condition</p>        
        </footer>  
</>

  )

}
else if(login === 2){
 return (
    <div className="wrapper">
      <Router   basename={'/#'} >
        <Header />
        <SideBar />
        <Switch>
        <Route path={`${process.env.PUBLIC_URL}/`}  exact component={OrderForm} />
        <Route path={`${process.env.PUBLIC_URL}/ItemForm`}  component={ItemForm}/>
        <Route path={`${process.env.PUBLIC_URL}/DeleteOrders`}  component={DeleteOrders}/>
        <Route path={`${process.env.PUBLIC_URL}/CancelOrderTable`}  component={CancelOrderTable}/>
        <Route path={`${process.env.PUBLIC_URL}/FoodItems`}  component={FoodItems}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateItemForm`}  component={UpdateItemForm}/>
        <Route path={`${process.env.PUBLIC_URL}/RecordFunction`} component={RecordFunction}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateIndRecord`} component={UpdateIndRecord}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateCompRecord`} component={UpdateCompRecord}/>

        
        <Route path={`${process.env.PUBLIC_URL}/RiderForm`}component={RiderForm}/>
        <Route path={`${process.env.PUBLIC_URL}/RegisterRiders`}component={RegisterRiders}/>
        <Route path={`${process.env.PUBLIC_URL}/UpdateRiders`}component={UpdateRiders}/>
        <Route path={`${process.env.PUBLIC_URL}/AssignRider`} component={AssignRider}/>
        <Route path={`${process.env.PUBLIC_URL}/RiderTable`} component={RiderTable}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

else if(login === 3){
  return (
  
    <SignUp/>
    
  )
}
 
}

export default App;
