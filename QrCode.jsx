import React, { useState } from 'react'

export const QrCode = () => {
  const[img,setImg]=useState("")
  const[loading,setLoading]=useState(false)
  const[qrdata,setQrdata]=useState('kavya')
  const[qrsize,setQrsize]=useState('150')

  function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
      setImg(url)
    }
    catch(error){
      console.error("Error generating QR code",error)
    }
    finally{
      setLoading(false)
    }
  }
  function downloadQR(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement('a')
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
    })
    .catch((error)=>{
      console.log("Error downloading QR code",error)
    })
  }
  return (
    <div className='app-container'>
        <h1>QR CODE GENERATOR</h1>
        { loading && <p>Loading Please Wait...</p>}
        {img && <img src={img} alt="" className='qr-code-image'/>}
        <div>
            <label htmlFor="datainput" className='input-label'>Data For QR Code :</label>
            <input type="text" value={qrdata} id='datainput' placeholder='Enter data for QR Code' 
            onChange={(e)=>setQrdata(e.target.value)} />
            <label htmlFor="sizeinput" className='input-label'>Image Size(e.g.,150):</label>
            <input type="text" value={qrsize} onChange={(e)=>setQrsize(e.target.value)} id='sizeinput' placeholder='Enter image size' />
            <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR Code</button>
            <button className='download-button' onClick={downloadQR} >Download QR Code</button>

        </div>
        <p className='footer'>Designed By <a href="">Kavya_krishnan</a> </p>
    </div>
  )
}
