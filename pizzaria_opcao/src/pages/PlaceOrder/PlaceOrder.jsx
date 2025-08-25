import { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {

  const {getTotalCartAmount, token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData] = useState({
    fistName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }


  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Informaçao de Entrega</p>
        <div className="multi-fields">
          <input name="firstName" onChange={onChangeHandler} value={data.fistName} type="text" placeholder="Nome" />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Sobrenome" />
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Endereco" />
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="Cidade" />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="Estado" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="CEP" />
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Pais" />
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Telefone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Total do Carrinho</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Taxa de Entrega</p>
              <p>R${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>PROSSEGUIR PARA PAGAMENTO</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
