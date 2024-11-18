import React, { useState } from 'react'

function App() {
  const data = [
    { id: 1, name: 'หมูตุ๋น', price: 10, amount: 10, count: 0 },
    { id: 2, name: 'ขาหมู', price: 20, amount: 10, count: 0 },
    { id: 3, name: 'ไก่', price: 20, amount: 10, count: 0 },
    { id: 4, name: 'ต้มยำ', price: 20, amount: 10, count: 0 },
  ]

  const [carts, setCart] = useState([])
  const [page, setPage] = useState('home')

  function addToCart(id) {
    setCart((cart) => {
      const item = data.find((dat) => dat.id === id)

      const itemInCart = cart.find((cartItem) => cartItem.id === id)

      if (itemInCart) {
        if (itemInCart.count < item.amount) {
          return cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        }
      } else {
        if (item.amount > 0) {
          return [...cart, { ...item, count: 1 }]
        }
      }
    })
  }

  function changePage(pageName) {
    setPage(pageName)
  }

  function calculateTotalPrice(price, count) {
    return price * count
  }

  return (
    <div className='flex flex-col items-center justify-center my-10 space-y-10'>
      <div>ก๋วยเตี๋ยวขาหมูกรุงศรีอยุธยา</div>
      <div className='flex space-x-10'>
        <button onClick={() => changePage('home')}>เมนูแนะนำ</button>
        <p>เมนูก๋วยเตี๋ยว</p>
        <p>เมนูข้าว</p>
        <p>เมนูน้ำ</p>
        <p>เมนูทานเล่น</p>
        <button onClick={() => changePage('carts')}>ตะกร้า</button>
      </div>
      {page === 'home' ? (
        <div className='flex space-x-10'>
          {data.map((dat) => (
            <div key={dat.id} className='space-y-2 text-center'>
              <p className='text-2xl'>{dat.name}</p>
              <button
                onClick={() => addToCart(dat.id)}
                className='px-3 py-1 m-2 text-sm transition-all duration-200 border border-black rounded-lg hover:bg-slate-400'>
                order
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex space-x-10'>
          {carts.length !== 0 ? (
            carts.map((dat) => (
              <div key={dat.id} className='space-y-2 text-center'>
                <p className='text-2xl'>
                  {dat.name} - {dat.count} จาน
                </p>
                <p className='text-2xl'>
                  ราคา {calculateTotalPrice(dat.price, dat.count)}
                </p>
              </div>
            ))
          ) : (
            <div>Empty Cart</div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
