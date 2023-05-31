import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
  } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Result from './pages/Result';
import SingleRecord from './pages/SingleRecord';
import Nav from './components/Nav';
import Cart from './components/Cart';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  function App() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
          <StoreProvider>
              <Nav />
              <Routes>
                <Route 
                  path="/" 
                  element={<Home />} 
                />
                <Route 
                  path="/login" 
                  element={<Login />} 
                />
                <Route 
                  path="/signup" 
                  element={<Signup />} 
                />
                <Route 
                  path="/profile" 
                  element={<Profile />} 
                />
                <Route 
                  path="/results" 
                  element={<Result />} 
                />
                <Route 
                  path="/results/:id" 
                  element={<SingleRecord />} 
                />
                <Route 
                  path="/cart" 
                  element={<Cart />} 
                />
              </Routes>
              </StoreProvider>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
  
  export default App;