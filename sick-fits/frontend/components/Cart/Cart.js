import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import CartStyles from "../styles/CartStyles";
import Supreme from "../styles/Supreme";
import CloseButton from "../styles/CloseButton";
import SickButton from "../styles/SickButton";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  return (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={data.cartOpen}>
              <header>
                <CloseButton onClick={toggleCart} title="close">
                  &times;
                </CloseButton>
                <Supreme>Assigned Projects</Supreme>
                <p>You have __ Projects assigned to you.</p>
              </header>
              <footer>
                <p>Placeholder Texts</p>
                <SickButton>Placeholder Text</SickButton>
              </footer>
            </CartStyles>
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };