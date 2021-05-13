import React, {
  useState,
} from 'react';
import { useSession } from 'next-auth/client';
import useFetch from '../../services/useFetch';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';

function Orders() {
  // Restrict access to page to admin users
  const [session] = useSession();
  const { data: orders, error, loading } = useFetch('getallorders');
  // TODO: Link authorized users to database
  if (session?.user?.email !== 'mnstucky@gmail.com') {
    return (
      <div className="container pr-3 pl-3">
        <h1 className="title is-4 mt-2">Add Item</h1>
        <p className="block">
          Sorry, you don't have permission to access this page.
        </p>
      </div>
    );
  }
  console.log(orders);
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="container pl-3 pr-3">
      <h1 className="is-size-4 has-text-weight-bold mb-3">Open Orders</h1>
      <div className="block">
        {orders.map((order) => (
          <section key={order.date}>
            <div className="columns mb-0">
              <div className="column">
                <p>
                  {new Date(order.date).toLocaleString({
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
              </div>
              <div className="column">
                <p className="has-text-weight-bold">Shipping Info:</p>
                <p>{order.shipping.name}</p>
                <p>{order.shipping.address.line1}</p>
                <p>{order.shipping.address.line2}</p>
                <p>
                  {order.shipping.address.city}
                  ,
                  {' '}
                  {order.shipping.address.state}
                  {' '}
                  {order.shipping.address.postal_code}
                </p>
                <p>{order.shipping.address.country}</p>
              </div>
              <div className="column">
                <p className="has-text-weight-bold">Items</p>
                {order.items.map((item) => <p key={item.description}>{`${item.description} x ${item.quantity}`}</p>)}
                <p className="mt-5">{`Subtotal: $${order.subtotal / 100.0}`}</p>
                <p className="has-text-weight-bold">{`Total: $${order.total / 100.0}`}</p>
              </div>
            </div>
            <hr className="navbar-divider mt-0" />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Orders;