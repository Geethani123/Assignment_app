import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Basic = () => {
  const [value, setvalue] = useState([])
  const [popupData, setpopupData] = useState([])

  const [showDetailes, setshowDetailes] = useState(false)

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts')
      .then(res => res.json())
      .then((data) => {
        setvalue(data)
        console.log(data);
      }).catch(err => console.log(err))

  }, [])

  const getDate = (date) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apri', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
  }


  const handleClick = (data) => {
    setshowDetailes(true)
    setpopupData(data)
  }

  const handleCancel = () => {
    setshowDetailes(false)
  }


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", width: "80%" }}>
        {
          value.map((item, index) => {
            return (<div key={index} className="card" >
              <div style={{ backgroundImage: `url(${item.thumbnail.small})` }} className="imageContainer" ><div style={{ color: 'white', textAlign: 'center' }}>
                <div className='hoverContainer' onClick={() => handleClick(item)}>Learn More</div>
              </div></div>
              <div style={{ padding: '25px 10px 10px  25px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bolder', marginTop: '15px' }}>{item.title}</div>
                <div style={{ color: 'gray', marginTop: '28px', fontSize: '14px', paddingRight: "10px" }}>{item.content}</div>
                <div className='bottom'>
                  <div style={{ width: "50%" }}>{item.author.name}-{item.author.role}</div>
                  <div style={{ display: "flex", justifyContent: 'end', fontSize: '14px', width: '50%' }}>
                    <div >{getDate(item.date)}</div>
                  </div>
                </div>
              </div>
            </div>)
          })
        }
      </div >
      {
        showDetailes ? <div className='popUpcard' >

          <div className="card" >
            <div onClick={() => handleCancel()} className='cancelbtn' >
              X
            </div>
            <div style={{ backgroundImage: `url(${popupData.thumbnail.small})` }} className="imageContainer" ><div style={{ color: 'white', textAlign: 'center' }}>
            </div></div>
            <div style={{ padding: '25px 10px 10px  25px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bolder', marginTop: '15px' }}>{popupData.title}</div>
              <div style={{ color: 'gray', marginTop: '28px', fontSize: '14px', paddingRight: "10px" }}>{popupData.content}</div>
              <div className='bottom'>
                <div className='img' style={{ backgroundImage: `url(${popupData.author.avatar})` }}></div>
                <div style={{ marginLeft: '15px' }}>{popupData.author.name}-{popupData.author.role}</div>
                {/* <div style={{ display: "flex", justifyContent: 'end', fontSize: '14px', width: '50%' }}>
                    <div >{getDate(popupData.date)}</div>
                  </div> */}
              </div>
            </div>
          </div>


        </div> : null

      }
    </>
  )
}

export default Basic