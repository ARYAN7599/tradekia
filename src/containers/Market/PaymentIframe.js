function paymentIframe(props) {
    let pdata=props.data; 
    let url=`https://oneninelabs.com/Payment.html?name=${pdata.name}&userId=${pdata.userId}&amount=${pdata.amount}&fromcoin=${pdata.fromcoin}&tocoin=${pdata.tocoin}&trxprize=${pdata.trxprize}&network=${pdata.network}&usdtPrize=${pdata.usdtPrize}&email=${pdata.email}`;
    return (
      <div className="Payment_iframe">
        <iframe id="pay_iframe"src={url} style={{width:'100%', height:'400px',justifyContent:"space-between"}} loading='eager'></iframe>
      </div>
    );
  }
  
  export default paymentIframe;