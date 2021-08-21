import React, {useState, useContext} from 'react'
import {storage, db} from './config'
import { v4 as uuidv4 } from 'uuid';
import './Setting.css'
import {useHistory} from 'react-router-dom' 
import {StateContext} from './StateContext'
import {Link} from "react-router-dom"


function AddMenu() {
    const {menuProvide}=useContext(StateContext);
    const [menu, setMenu]=menuProvide;   
    const [imgAsFile, setImgAsFile]= useState("")
    const [dishName, setDishName]=useState("")
    const [price, setPrice]=useState(0)
    const history = useHistory();
    const [imgFlag, setImgFlag]=useState(false)
    let imgUrl="";
    let imgName=""


    const handleImgAsFile=(e)=>{
        const img=e.target.files[0]
        setImgAsFile(imgFile=>(img))
        setImgFlag(true)
    }

    async function handleFirebaseUpload(e){
        e.preventDefault();
        console.log("upload");
        //check if img is selected
        if(imgFlag){
            if(imgAsFile===""){
                console.error(`not an image the image file is a ${typeof(imgAsFile)}`)
            }else{
                //upload img to storage
                await putStorage(imgAsFile).then(res=>{
                    imgUrl=res
                    console.log(imgUrl)
                }).catch(err => console.log(err))
            }
        }
        //insert data to database
        db.collection('menu')
            .add({
                name:dishName,
                price:price,
                img:imgUrl,
                storageImg:imgName
            }).then(function(docRef){
                //get id doc and put data to context api
                const data={
                    id:docRef.id,
                    name:dishName,
                    price:price,
                    img:imgUrl,
                    storageImg:imgName
                }
                setMenu(prevMenu=>{
                    return [...prevMenu, data]
                })
                console.log(data.id)
                history.push('/setting')
            })
    }

    async function putStorage(file){
        imgName=uuidv4()
        await storage.ref(`/images/${imgName}`).put(file)
        return await storage.ref(`/images/${imgName}`).getDownloadURL()      
    }

    return (
        <div className="add-dish">
            <form onSubmit={handleFirebaseUpload} >
                <div className="account-container">
                <h2>Menu Name:</h2>
                <input type="text" required onChange={e=>setDishName(e.target.value)}/>
                <h2>Price:</h2>
                <input type="number" onChange={e=>setPrice(e.target.value)}/>
                <h2>Please input image:</h2>
                <input type="file" onChange={handleImgAsFile}/>
                <button className="btn-primary">Add</button>
                </div>
            </form>
            <Link to="/catalogue">
                <p>Add menu from Catalogue</p>
            </Link>
        </div>
    )
}

export default AddMenu
