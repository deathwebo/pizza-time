import { 
  ApolloClient,
  ApolloQueryResult,
} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { ReceivedPizzaSize } from '../types';

interface FetchAllPizzasQueryResponse {
  pizzaSizes: ReceivedPizzaSize[];
}

class ApiService {
  client: ApolloClient<NormalizedCacheObject>;
  apiUrl: string;

  constructor() {
    this.apiUrl = 'https://core-graphql.dev.waldo.photos/pizza';
    this.client = new ApolloClient({
      link: new HttpLink({ uri: this.apiUrl }),
      cache: new InMemoryCache(),
    });
  }

  fetchAllPizzaSizes(): 
    Promise<ApolloQueryResult<FetchAllPizzasQueryResponse>> {
    const allPizzaSizesQuery = gql`{
      pizzaSizes {
        name
        maxToppings
        basePrice
        toppings {
          topping {
            name
            price
          }
          defaultSelected
        }
      }
    }`;

    return this.client.query({ query: allPizzaSizesQuery });
  }

}

export default ApiService;