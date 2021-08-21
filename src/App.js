import React, {useContext, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Navbar from './Navbar'
import Home from './Home'
import Setting from  './Setting'
import Account from './Account'
import {StateContext} from './StateContext'
import {auth, db} from './config'
import SignUp from './SignUp'
import AddMenu from './AddMenu'
import Catalogue from './Catalogue'
import AddTable from './AddTable'
import Order from './Order'
import Kitchen from './Kitchen'
import Payment from './Payment'
import Tables from './Tables'

function App() {
  const {userProvide}=useContext(StateContext);
  const {menuProvide}=useContext(StateContext);

  const [user, setUser]=userProvide;
  const [menu, setMenu]=menuProvide; 

  const {currentProvide}=useContext(StateContext);
  const [currentTable, setCurrentTable]=currentProvide; 

  const {changeProvide}=useContext(StateContext);
  const [changes, setChanges]=changeProvide; 

  const {orderProvide}=useContext(StateContext);
  const [order, setOrder]=orderProvide;
  
  //get user
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        //there is user
        db.collection('user').where('email','==',authUser.email).limit(1).get().then((querySnapshot)=>{
          setUser(querySnapshot.docs[0].data().name)
        })
      }
    })
  },[])

  //get data menu
  useEffect(()=>{
    if(menu.length===0){
        db.collection('menu').get().then((querySnapshot) => {
            querySnapshot.docs.map((doc) => {
                //console.log("data>>>>>",doc.id, doc.data())
                //const temp=[doc.id, doc.data()]
                const data={
                    id:doc.id,
                    name:doc.data().name,
                    price:doc.data().price,
                    img:doc.data().img,
                    storageImg:doc.data().storageImg
                }
                setMenu(prevMenu=>{
                    return [...prevMenu, data]
                })
                return menu
            })
        })
    }
},[])

//get and listen to table in realtime
useEffect(()=>{
  db.collection('table').orderBy("no").onSnapshot(snapshot=>{
      const temp=[]
      snapshot.docs.map(doc=>{
          const data={
                  id:doc.id,
                  no:doc.data().no,
                  cap:doc.data().capacity,
                  active:doc.data().active,
                  status:doc.data().status,
                  date:doc.data().date
              }
          temp.push(data)
      })
      setChanges(temp)
 })
},[])

function getOrderItems(){
  db.collection('table').doc(currentTable.id).collection('order-items').onSnapshot(snapshot=>{
      const temp=[]
      snapshot.docs.map(doc=>{
          parseInt(doc.data().price)
          const data={
                  id:doc.id,
                  name:doc.data().name,
                  price:parseInt(doc.data().price),
                  qty:doc.data().qty,
                  total:parseInt(doc.data().total),
                  ready:doc.data().ready,
              }
          temp.push(data)
      })
      setOrder(temp)
  })
}

useEffect(()=>{
  if(currentTable.length===0){
      db.collection('table').limit(1).get().then((querySnapshot)=>{
          setCurrentTable({
              id:querySnapshot.docs[0].id,
              no:querySnapshot.docs[0].data().no,
              cap:querySnapshot.docs[0].data().capacity,
              status:querySnapshot.docs[0].data().status,
              active:querySnapshot.docs[0].data().active,
          })
          getOrderItems()
      })
  }else{
      getOrderItems()
  }
},[currentTable])

  return (
    <Router>
      <div className="App">
        <Switch>
          
          <Route path="/setting">
            <Navbar/>
            <Setting />
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/add-menu">
            <Navbar/>
            <AddMenu />
          </Route>

          <Route path="/catalogue">
            <Navbar/>
            <Catalogue />
          </Route>

          <Route path="/add-table">
            <Navbar/>
            <AddTable />
          </Route>

          <Route path="/order">
            <Navbar/>
            <Order/>
          </Route>

          <Route path="/kitchen">
            <Navbar/>
            <Kitchen/>
          </Route>

          <Route path="/payment">
            <Navbar/>
            <Payment/>
          </Route>

          <Route path="/setting-tables">
            <Navbar/>
            <Tables/>
          </Route>

          <Route path="/">
            <Navbar/>
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
