import { useState } from "react";
import "./App.css";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = MenuItem & {
  quantity: number;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "아메리카노",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "카페라떼",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "말차 라떼",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "초코 크로플",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "치즈 케이크",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "딸기 스무디",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
  },
];

function formatPrice(price: number) {
  return `${price.toLocaleString()}원`;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const addToCart = (menu: MenuItem) => {
    setCart((currentCart) => {
      const alreadyAdded = currentCart.find((item) => item.id === menu.id);

      if (alreadyAdded) {
        return currentCart.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { ...menu, quantity: 1 }];
    });
  };

  const changeQuantity = (id: number, change: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleOrder = () => {
    alert("주문이 완료되었습니다!");
    setCart([]);
  };

  return (
    <div className="app">
      <header className="header">
        <p className="header__label">JIYUL CAFE</p>
        <h1>메뉴를 골라 주세요 ☕</h1>
        <p>원하는 메뉴를 누르면 장바구니에 담깁니다.</p>
      </header>

      <main className="kiosk">
        <section className="menu-section">
          <h2>MENU</h2>

          <div className="menu-grid">
            {menuItems.map((menu) => (
              <button
                className="menu-card"
                key={menu.id}
                onClick={() => addToCart(menu)}
                type="button"
              >
                <img src={menu.image} alt={menu.name} />
                <div className="menu-card__content">
                  <p>{menu.name}</p>
                  <strong>{formatPrice(menu.price)}</strong>
                </div>
              </button>
            ))}
          </div>
        </section>

        <aside className="cart">
          <div className="cart__title">
            <h2>장바구니</h2>
            <span>{cart.length}개 메뉴</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>🛒</p>
              <strong>장바구니가 비어 있습니다.</strong>
              <span>메뉴를 클릭해 담아 보세요!</span>
            </div>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatPrice(item.price)}</span>
                  </div>

                  <div className="quantity-control">
                    <button
                      aria-label={`${item.name} 수량 줄이기`}
                      onClick={() => changeQuantity(item.id, -1)}
                      type="button"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`${item.name} 수량 늘리기`}
                      onClick={() => changeQuantity(item.id, 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="cart__bottom">
            <div className="total">
              <span>총 결제 금액</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <button
              className="order-button"
              disabled={cart.length === 0}
              onClick={handleOrder}
              type="button"
            >
              주문하기
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;