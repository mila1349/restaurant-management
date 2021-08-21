import React, {useState, useContext, useRef, useEffect} from 'react'
import './Setting.css'
import {StateContext} from './StateContext'
import {db, storage} from './config'
import { v4 as uuidv4 } from 'uuid';


function MenuItem({id, img, title, price, storageImg, orderFlag}) {
    const [editFlag, setEditFlag]=useState(false);
    const [editPrice, setEditPrice]=useState(price);
    const [editTitle, setEditTitle]=useState(title);
    const inputFile = useRef(null);
    const [fileImg, setFileImg]=useState('');
    const [imgFlag, setImgFlag]=useState(false);
    const [urlFlag, setUrlFlag]=useState(true);

    let imgName=storageImg;
    let imgUrl=img
    //const imgName=storageImg;

    const {menuProvide}=useContext(StateContext);
    const [menu, setMenu]=menuProvide;   

    const {currentProvide}=useContext(StateContext);
    const [currentTable, setCurrentTable]=currentProvide; 

    const {orderProvide}=useContext(StateContext);
    const [order, setOrder]=orderProvide; 

    useEffect(()=>{
        //check wheter there is img/ url
        if(img===""){
            setUrlFlag(false)
        }
    },[])

    function editClicked(e){
        e.preventDefault();
        setEditFlag(!editFlag);
        //put to database firestore
        if(editFlag){
            handleEdit() 
        }
    }

    async function handleEdit(){
        if(imgFlag){
            if(imgName!==""){
                //delete prev mg from storage
                storage.ref(`/images/${imgName}`).delete().then(function(response){
                }).catch(error=>alert(error.message))
            }

            //put new img to storage
            await putStorage(fileImg).then(res=>{
                imgUrl=res
                setUrlFlag(true)
                console.log(imgUrl)
            }).catch(err => console.log(err))

            console.log("success insert img")
        }
        //update new data to database
        await db.collection("menu").doc(id).update({
            name:editTitle,
            price:editPrice,
            img:imgUrl,
            storageImg:imgName
        });
        console.log("success update data")

        //edit context api
        setMenu(menu=>{
            menu.map(item=>{
                if(item.id===id){
                    item.name=editTitle
                    item.price=editPrice
                    item.img=imgUrl
                    item.storageImg=imgName
                }
            })
            return [...menu]
        })
        console.log("success update context api")

        setImgFlag(false)
        setFileImg('');
    }

    async function putStorage(file){
        imgName=uuidv4()
        await storage.ref(`/images/${imgName}`).put(file)
        return await storage.ref(`/images/${imgName}`).getDownloadURL()      
    }
    
    function handleImg(e){
        if(editFlag){
            inputFile.current && inputFile.current.click();
        }
    }

    function handlechange(e){
        setFileImg(e.target.files[0])
        setImgFlag(true)
    }

    function handleDelete(){
        //1. delete img file from storage if available
        if(storageImg!==""){
            storage.ref(`/images/${storageImg}`).delete().then(function(response){
            }).catch(error=>alert(error.message))   
        } 

        //2. delete doc in database
        db.collection("menu").doc(id).delete();

        //3. delete from context api
        setMenu(
            menu.filter(item=>item.id!==id)
        )
        setEditFlag(false)
        if(img===""){
            setUrlFlag(false)
        }else{
            setUrlFlag(true)
        }
    }

    function getTime(){
        const today=new Date()
        const time=today.getHours()+""+today.getMinutes()
        return time
    }
    
    //adding manu to order
    function addOrderItem(){
        let exist=false;
        let qty=0;
        let idOrder="";

        //checking wheter that table already order this menu
        order.forEach(item=>{
            if(item.name==title){
                exist=true;
                qty=item.qty;
                idOrder=item.id;
            }
        })    
        if(exist){
            //menu already ordered
            //update qty and total
            const total=(qty+1)*price
            db.collection('table')
                .doc(currentTable.id)
                .collection('order-items')
                .doc(idOrder)
                .update({
                    qty:qty+1,
                    total:total,
                })
                console.log("update>>>")
        }else{
            //this menu not ordered yet
            //add new order
            db.collection('table')
                .doc(currentTable.id)
                .collection('order-items')
                .add({
                    name:title,
                    qty:1,
                    price:price,
                    total:price,
                    ready:false
                })
            
            if(currentTable.active===false){
                console.log("length>>",order.length)
                db.collection("table").doc(currentTable.id).update({
                    active:true,
                    status:"ordered",
                    date:getTime()
                })
            }
        }

        
    }

    function InputPrice(){
        return(
            <input 
            onChange={e=>setEditPrice(e.target.value)} 
            className="input-edit" 
            type="number" 
            value={editPrice}
            />
        )
    }

    function InputTitle(){
        return(
            <input 
            autoFocus={true} 
            onChange={e=>setEditTitle(e.target.value)} 
            className="input-edit" 
            type="text" 
            value={editTitle}
            />
        )
    }

    function SetImg(){
        return(
            <img 
                onClick={handleImg} 
                src={img} 
                alt="" 
                style={imgFlag && editFlag?{border:'2px solid #ca3544', borderRadius:'10px'}:{border:'none'}}
            />
        ) 
    }
    
    function DivNoImg(){
        return(
            <div 
                className="no-img" 
                onClick={handleImg}
                style={imgFlag && editFlag?{border:'2px solid #ca3544', borderRadius:'10px'}:{border:'none'}}
            >NO IMAGE</div>
        )
    }

    function EditBtn(){
        return(
            <button 
                onClick={editClicked} 
                className="btn-secondary">
                {editFlag? "Submit" : "Edit Dish"}
            </button>
        )
    }

    function OrderBtn(){
        return(
            <button 
                className="btn-order"
                onClick={addOrderItem}
                >
                    Select
            </button>
        )
    }
    return (
        <div className="menu-item">
            <div className="img-menu" >
                <div className="delete-menu" onClick={handleDelete} style={editFlag?{display: 'flex'}:{display: 'none'}}>
                    <h1>X</h1>
                </div>

                {urlFlag? <SetImg/> : <DivNoImg/>}

                <input 
                    ref={inputFile} 
                    type='file' 
                    onChange={handlechange} 
                    style={{display: 'none'}}
                />
            </div>
            <h3>{editFlag? <InputTitle/> :title}</h3>
            <strong>{editFlag?<InputPrice/>: "Rp. "+ price}</strong>
            {orderFlag?<OrderBtn/>:<EditBtn/>}
            
        </div>
    )
}

export default MenuItem
