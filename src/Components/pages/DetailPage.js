import React from 'react'
import './DetailPage.css'
function DetailPage(props) {
    return (
        <>
            <div className="banner">
                <div className="subpic">
                    <img src="" alt="" />
                </div>
                <div className="nameTitle">
                    <h3 className='Title'>Lorem ipsum dolor sit amet consecte</h3>
                </div>
                <div className="detail">
                    <div className="amount">
                        <div className="textamount">400</div>

                        <div className="numberamount">
                            items
                        </div>

                    </div>
                    <div className="owners">

                        <div className="textowner">400</div>

                        <div className="numberowner">Owners</div>
                    </div>
                    <div className="price">

                        <div className="textprice">2</div>

                        <div className="numberprice">ETH</div>

                    </div>
                </div>
            </div>




        </>
    )
}

export default DetailPage