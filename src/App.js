import {AppRoutes} from "./common/AppRoutes";
import {Header} from "./common/Header";
import {Footer} from "./common/Footer";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {GRAPHQL_ENDPOINT} from "./Constants";

export const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache({
        typePolicies: {
            QuickStats: {
                keyFields: [],
            },
        },
    }),
});

function App({renderMode}) {
    return (
      <>
          <Header/>
          <AppRoutes />
          <Footer/>
      </>
  );
}

export default App;
