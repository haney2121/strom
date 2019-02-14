import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./Auth/User";
import Signin from "./Auth/Signin";

import { InnerContainer } from "./Page";

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <InnerContainer>
            <p>Please Sign In</p>
            <Signin />
          </InnerContainer>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
