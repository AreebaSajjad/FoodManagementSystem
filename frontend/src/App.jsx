import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [foods, setFoods] = useState([]);
  const [activeTab, setActiveTab] = useState('Customer');
  const [orders, setOrders] = useState([]);

  const getFoodImage = (name) => {
    const foodName = name.toLowerCase();

    if (foodName.includes('blue lagoon')) return 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500';
    if (foodName.includes('mint margrita') || foodName.includes('margarita')) return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500';
    if (foodName.includes('drink') || foodName.includes('ice') || foodName.includes('juice')) return 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500';
    if (foodName.includes('lava cake') || foodName.includes('chocolate lava') || foodName.includes('cake') || foodName.includes('brownie')) return 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500';
    if (foodName.includes('burger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500';
    if (foodName.includes('pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500';
    if (foodName.includes('pasta')) return 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500';
    if (foodName.includes('sandwich')) return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500';
    if (foodName.includes('steak')) return 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500';
    if (foodName.includes('fries')) return 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500';

    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500';
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get(`${API}/api/foods/all`)
      .then(res => setFoods(res.data))
      .catch(err => console.log("Database connection error:", err));
  };

  const handleOrder = (food) => {
    const newOrder = {
      orderId: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: food.name,
      price: food.price,
      status: 'Preparing',
      time: new Date().toLocaleTimeString()
    };
    setOrders([newOrder, ...orders]);
    alert(`${food.name} has been ordered successfully!`);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      name: e.target.name.value,
      price: e.target.price.value,
      category: e.target.category.value,
      description: e.target.description.value
    };

    axios.post(`${API}/api/foods/add`, newItem)
      .then(() => {
        alert("New item added to the menu!");
        fetchFoods();
        e.target.reset();
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`${API}/api/foods/delete/${id}`)
        .then(() => {
          alert("Item deleted successfully!");
          fetchFoods();
        })
        .catch(err => console.log(err));
    }
  };

  const handleUpdate = (id) => {
    const newName = prompt("Enter the new name:");
    const newDesc = prompt("Enter the new description:");

    if (newName && newDesc) {
      axios.put(`${API}/api/foods/update/${id}`, { name: newName, description: newDesc })
        .then(() => {
          alert("Menu item updated successfully!");
          fetchFoods();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: '#1a1a1a', padding: '15px 30px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', color: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2 style={{ marginRight: 'auto', color: '#ff9f43', margin: 0 }}>FOODIE-PRO</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['Customer', 'Restaurant', 'Admin', 'Order'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: 'none',
              backgroundColor: activeTab === tab ? '#ff9f43' : 'transparent',
              color: 'white', fontWeight: 'bold'
            }}>{tab} Module</button>
          ))}
        </div>
      </nav>

      <div style={{ padding: '40px' }}>
        {activeTab === 'Customer' && (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🍕 Freshly Prepared For You</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {foods.map(f => (
                <div key={f._id} style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                  <img src={getFoodImage(f.name)} alt={f.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{f.name}</h3>
                      <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginBottom: '15px', minHeight: '40px' }}>{f.description}</p>
                    </div>
                    <div>
                      <h3 style={{ color: '#27ae60', margin: '10px 0' }}>Rs. {f.price}</h3>
                      <button onClick={() => handleOrder(f)} style={{ width: '100%', backgroundColor: '#ff9f43', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Order Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Restaurant' && (
          <div style={{ maxWidth: '900px', margin: 'auto' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <h3>➕ Add New Dish to Menu</h3>
              <form onSubmit={handleAddItem} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <input name="name" placeholder="Dish Name" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input name="price" type="number" placeholder="Price (Rs.)" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input name="category" placeholder="Category" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input name="description" placeholder="Description" required style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <button type="submit" style={{ gridColumn: 'span 2', backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save to Menu</button>
              </form>
            </div>
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
              <h2 style={{ color: '#2c3e50' }}>👨‍🍳 Inventory</h2>
              <table style={{ width: '100%', textAlign: 'left', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '15px' }}>Name</th>
                    <th style={{ padding: '15px' }}>Price</th>
                    <th style={{ padding: '15px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map(f => (
                    <tr key={f._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px' }}>{f.name}</td>
                      <td style={{ padding: '15px' }}>Rs. {f.price}</td>
                      <td style={{ padding: '15px' }}>
                        <button onClick={() => handleUpdate(f._id)} style={{ marginRight: '10px', color: '#3498db', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Edit</button>
                        <button onClick={() => handleDelete(f._id)} style={{ color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Admin' && (
          <div>
            <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>🛡️ Admin Control</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
              <StatCard label="Total Menu Items" value={foods.length} color="#3498db" />
              <StatCard label="Total Orders" value={orders.length} color="#e67e22" />
              <StatCard label="Live Revenue" value={`Rs. ${orders.reduce((acc, curr) => acc + curr.price, 0)}`} color="#2ecc71" />
            </div>
          </div>
        )}

        {activeTab === 'Order' && (
          <div style={{ maxWidth: '600px', margin: 'auto' }}>
            <h2>📦 Order Status</h2>
            {orders.length === 0 && (
              <p style={{ color: '#888', marginTop: '20px' }}>No orders placed yet.</p>
            )}
            {orders.map((o, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', marginTop: '20px', borderLeft: '6px solid #ff9f43' }}>
                <strong>{o.orderId} - {o.name}</strong>
                <p>Status: <span style={{ color: '#ff9f43' }}>{o.status}</span></p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{o.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const StatCard = ({ label, value, color }) => (
  <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '15px', width: '250px', textAlign: 'center', borderTop: `5px solid ${color}`, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
    <h1 style={{ color: color, margin: '0' }}>{value}</h1>
    <p style={{ color: '#7f8c8d', fontWeight: 'bold', fontSize: '0.8rem' }}>{label}</p>
  </div>
);

export default App;